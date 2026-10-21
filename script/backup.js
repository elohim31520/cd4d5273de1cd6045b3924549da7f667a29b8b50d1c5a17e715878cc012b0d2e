import { spawnSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// 備份檔放在專案根目錄，檔名為 project_backup.<副檔名>
const NAME = 'project_backup'
// 不備份的資料夾 (任何層級的同名資料夾皆排除)
const EXCLUDES = ['node_modules']

// 只要指令存在 (沒有 ENOENT) 就視為可用，不管 exit code
function canRun(command) {
	return !spawnSync(command, ['--help'], { stdio: 'ignore' }).error
}

const tar = {
	label: 'tar',
	ext: '.tar.gz',
	find: () => (canRun('tar') ? 'tar' : null),
	args: (out) => [
		'-czf',
		out,
		...EXCLUDES.map((name) => `--exclude=${name}`),
		`--exclude=${NAME}.*`,
		'.',
	],
}

const sevenZip = {
	label: '7z',
	ext: '.7z',
	// 7-Zip 安裝程式預設不會加進 PATH，所以也找預設安裝路徑
	find: () =>
		[
			'7z',
			path.join(process.env.ProgramFiles ?? 'C:\\Program Files', '7-Zip', '7z.exe'),
		].find(canRun) ?? null,
	args: (out) => [
		'a',
		'-t7z',
		out,
		'*',
		...EXCLUDES.map((name) => `-xr!${name}`),
		`-x!${NAME}.*`,
	],
}

// Windows 優先用 7z，找不到再用內建的 tar；其他平台用 tar
const candidates = process.platform === 'win32' ? [sevenZip, tar] : [tar]

let tool
let command
for (const candidate of candidates) {
	command = candidate.find()
	if (command) {
		tool = candidate
		break
	}
}

if (!tool) {
	console.error(
		`備份失敗：找不到可用的壓縮工具 (${candidates.map((c) => c.label).join(' / ')})`
	)
	process.exit(1)
}

const finalName = `${NAME}${tool.ext}`
const tmpName = `${finalName}.tmp`
const tmpPath = path.join(ROOT, tmpName)

console.log(`備份專案 (排除 ${EXCLUDES.join(', ')}) -> ${finalName} [${tool.label}]`)

// 先寫到暫存檔，成功後才取代舊備份，失敗時不會弄丟上一份
fs.rmSync(tmpPath, { force: true })
const result = spawnSync(command, tool.args(tmpName), {
	cwd: ROOT,
	stdio: 'inherit',
})

if (result.error || result.status !== 0) {
	fs.rmSync(tmpPath, { force: true })
	console.error(`備份失敗：${result.error?.message ?? `exit code ${result.status}`}`)
	process.exit(1)
}

fs.renameSync(tmpPath, path.join(ROOT, finalName))
const sizeMB = (fs.statSync(path.join(ROOT, finalName)).size / 1024 / 1024).toFixed(1)
console.log(`備份完成：${finalName} (${sizeMB} MB)`)

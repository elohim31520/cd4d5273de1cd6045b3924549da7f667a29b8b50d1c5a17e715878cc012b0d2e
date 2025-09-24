import { exec } from 'child_process'
import { series, task } from 'gulp'

// 顯示子進程的輸出
function runCommand(command) {
	return (done) => {
		const process = exec(command)
		process.stdout.on('data', (data) => {
			console.log(data.toString())
		})
		process.stderr.on('data', (data) => {
			console.error(data.toString())
		})
		process.on('exit', (code) => {
			if (code === 0) {
				done()
			} else {
				done(new Error(`Command failed with exit code ${code}`))
			}
		})
	}
}

// 任務：轉換圖片
task('convertImages', runCommand('node script/convert-png-to-webp.js'))

// 任務：執行 astro build
task('astroBuild', runCommand('astro build'))

// 新增任務：壓縮 src/content 和 src/assets 資料夾
task(
	'compressSrcFolders',
	runCommand(
		'rm -f src_backup.7z && 7z a src_backup.7z ./src/content ./src/assets'
	)
)

// 預設任務：先轉換圖片，然後建置，最後壓縮指定的 src 資料夾
task('default', series('convertImages', 'astroBuild', 'compressSrcFolders'))

// dist整坨上傳

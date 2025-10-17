import fs, { readFile } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONFIG = {
	searchDir: path.join(__dirname, '../src/assets/blog'),
	// WebP 品質 (0-100)
	quality: 80, // 調整品質以取得更好的壓縮效果
	// 是否保留原始 PNG 檔案
	keepOriginal: false,
	// 輸出資訊
	verbose: true,
	// 僅轉換未存在 WebP 版本的檔案
	skipExisting: true,
}

/**
 * 遞歸搜尋指定目錄下的所有圖片檔案 (PNG/JPG/JPEG)
 * @param {string} dir - 搜尋目錄
 * @returns {Promise<string[]>} 圖片檔案路徑陣列
 */
async function findImageFiles(dir) {
	const imageFiles = []
	const allowedExtensions = ['.png', '.jpg', '.jpeg']

	async function searchDirectory(currentDir) {
		const entries = await fs.promises.readdir(currentDir, {
			withFileTypes: true,
		})

		for (const entry of entries) {
			const fullPath = path.join(currentDir, entry.name)

			if (entry.isDirectory()) {
				await searchDirectory(fullPath)
			} else if (
				entry.isFile() &&
				allowedExtensions.includes(path.extname(entry.name).toLowerCase())
			) {
				imageFiles.push(fullPath)
			}
		}
	}

	await searchDirectory(dir)
	return imageFiles
}

/**
 * 遞歸搜尋指定目錄下的所有 WebP 檔案
 * @param {string} dir - 搜尋目錄
 * @returns {Promise<string[]>} WebP 檔案路徑陣列
 */
async function findWebpFiles(dir) {
	const webpFiles = []
	const allowedExtensions = ['.webp']

	async function searchDirectory(currentDir) {
		const entries = await fs.promises.readdir(currentDir, {
			withFileTypes: true,
		})

		for (const entry of entries) {
			const fullPath = path.join(currentDir, entry.name)

			if (entry.isDirectory()) {
				await searchDirectory(fullPath)
			} else if (
				entry.isFile() &&
				allowedExtensions.includes(path.extname(entry.name).toLowerCase())
			) {
				webpFiles.push(fullPath)
			}
		}
	}

	await searchDirectory(dir)
	return webpFiles
}

/**
 * 轉換單個圖片檔案為 WebP
 * @param {string} imagePath - 圖片檔案路徑
 * @returns {Promise<boolean>} 轉換是否成功
 */
async function convertToWebp(imagePath) {
	const webpPath = imagePath.replace(/\.(png|jpe?g)$/i, '.webp')

	// 檢查是否跳過已存在的 WebP 檔案
	if (CONFIG.skipExisting && fs.existsSync(webpPath)) {
		if (CONFIG.verbose) {
			console.log(`跳過 (已存在): ${path.relative(CONFIG.searchDir, webpPath)}`)
		}
		return true
	}

	try {
		const image = sharp(imagePath)
		const metadata = await image.metadata()

		let imageProcessor = image

		if (metadata.width > 3000) {
			const newWidth = Math.round(metadata.width * 0.5)
			imageProcessor = image.resize(newWidth)
			if (CONFIG.verbose) {
				console.log(
					`圖片將被壓縮: ${metadata.width}x${metadata.height} -> ${newWidth}x${Math.round(
						(metadata.height * newWidth) / metadata.width
					)}`
				)
			}
		}

		await imageProcessor.webp({ quality: CONFIG.quality }).toFile(webpPath)

		if (CONFIG.verbose) {
			console.log(`轉換成功: ${path.relative(CONFIG.searchDir, imagePath)}`)
		}

		// 如果不保留原始檔案，則刪除
		if (!CONFIG.keepOriginal) {
			await fs.promises.unlink(imagePath)
			if (CONFIG.verbose) {
				console.log(
					`刪除原始檔案: ${path.relative(CONFIG.searchDir, imagePath)}`
				)
			}
		}

		return true
	} catch (error) {
		console.error(`轉換失敗: ${path.relative(CONFIG.searchDir, imagePath)}`)
		console.error(`錯誤: ${typeof error === 'string' ? error : error.message}`)
		return false
	}
}

/**
 * 檢查並縮放單個 WebP 檔案
 * @param {string} webpPath - WebP 檔案路徑
 * @returns {Promise<boolean>} 處理是否成功
 */
async function checkAndResizeWebp(webpPath) {
	try {
		const image = sharp(webpPath)
		const metadata = await image.metadata()

		if (metadata.width > 2800) {
			const newWidth = Math.round(metadata.width * 0.6)
			if (CONFIG.verbose) {
				console.log(
					`WebP 檔案過大，將被壓縮: ${metadata.width}x${
						metadata.height
					} -> ${newWidth}x...`
				)
			}

			// 讀取檔案到 buffer，縮放後再寫回原檔案
			const inputBuffer = await fs.promises.readFile(webpPath)
			const outputBuffer = await sharp(inputBuffer)
				.resize(newWidth)
				.webp({ quality: CONFIG.quality })
				.toBuffer()
			await fs.promises.writeFile(webpPath, outputBuffer)

			if (CONFIG.verbose) {
				const newMetadata = await sharp(outputBuffer).metadata()
				console.log(
					`WebP 檔案壓縮成功: ${path.relative(
						CONFIG.searchDir,
						webpPath
					)}, 新尺寸: ${newMetadata.width}x${newMetadata.height}`
				)
			}
		}
		return true
	} catch (error) {
		console.error(
			`處理 WebP 檔案失敗: ${path.relative(CONFIG.searchDir, webpPath)}`
		)
		console.error(`錯誤: ${error.message}`)
		return false
	}
}

async function main() {
	console.log('圖片 (PNG/JPG/JPEG) 轉 WebP')
	console.log(`搜尋目錄: ${CONFIG.searchDir}`)
	console.log(`品質設定: ${CONFIG.quality}`)
	console.log(`保留原檔: ${CONFIG.keepOriginal ? '是' : '否'}\n`)

	try {
		const imageFiles = await findImageFiles(CONFIG.searchDir)

		if (imageFiles.length === 0) {
			console.log('未找到任何圖片檔案 (PNG/JPG/JPEG)')
			return
		}

		console.log(`找到 ${imageFiles.length} 個圖片檔案\n`)

		let successCount = 0
		let failCount = 0

		for (let i = 0; i < imageFiles.length; i++) {
			const imageFile = imageFiles[i]
			console.log(`[${i + 1}/${imageFiles.length}] 處理中...`)

			const success = await convertToWebp(imageFile)
			if (success) {
				successCount++
			} else {
				failCount++
			}
			console.log('')
		}

		console.log('轉換完成!')
		console.log(`成功: ${successCount} 個檔案`)
		console.log(`失敗: ${failCount} 個檔案\n`)
	} catch (error) {
		console.error('執行錯誤:', error.message)
		process.exit(1)
	}
}

main()

async function checkWebpSize(imagePath) {
	console.log('開始檢查現有 WebP 檔案尺寸...')
	const webpFiles = await findWebpFiles(CONFIG.searchDir)

	if (webpFiles.length === 0) {
		console.log('未找到任何 WebP 檔案。')
	} else {
		console.log(`找到 ${webpFiles.length} 個 WebP 檔案，開始檢查尺寸...\n`)

		let resizeSuccessCount = 0
		let resizeFailCount = 0

		for (let i = 0; i < webpFiles.length; i++) {
			const webpFile = webpFiles[i]
			console.log(
				`[${i + 1}/${webpFiles.length}] 檢查中: ${path.relative(
					CONFIG.searchDir,
					webpFile
				)}`
			)

			const success = await checkAndResizeWebp(webpFile)
			if (success) {
				resizeSuccessCount++
			} else {
				resizeFailCount++
			}
		}

		console.log('\nWebP 檔案尺寸檢查完成!')
		console.log(`成功處理: ${resizeSuccessCount} 個檔案`)
		console.log(`處理失敗: ${resizeFailCount} 個檔案`)
	}
}

checkWebpSize()

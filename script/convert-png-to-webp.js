import fs from 'fs'
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
	keepOriginal: true,
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
		console.log(`失敗: ${failCount} 個檔案`)

		if (failCount === 0) {
			console.log('所有檔案轉換成功!')
		}
	} catch (error) {
		console.error('執行錯誤:', error.message)
		process.exit(1)
	}
}

main()

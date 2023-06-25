import type { Stats } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import { equalFiles } from 'file-sync-cmp'

export interface FileItem {
  name: string
  dir: string
}

export interface FileItemStats extends FileItem {
  stats: Stats
}

export const getFilesList = (rootDir: string): Promise<FileItem[]> => fs.readdir(rootDir, null)
  .then(files => files.map(fileName => ({
    name: fileName,
    dir: rootDir,
  })))

export const getFilesMap = async (filesList: FileItem[]): Promise<FileItemStats[]> => {
  const promises: Promise<Stats>[] = []

  filesList.forEach(({ name, dir }) => {
    promises.push(fs.stat(`${dir}${path.sep}${name}`))
  })

  const filesStats = await Promise.all(promises)

  return filesStats.map((stats, i) => ({
    ...filesList[i],
    stats,
  }))
}

// Compare files by size, if equal, then by content (byte by byte)
export const getDuplicates = (filesList: FileItemStats[]): FileItemStats[][] => {
  const duplicates: FileItemStats[][] = []
  const filesMap = new Map(filesList.map((file, i) => [i, file]))

  while (filesMap.size) {
    const firstKey = [...filesMap.keys()][0]
    const firstFile = filesMap.get(firstKey) as FileItemStats
    filesMap.delete(firstKey)
    const duplicatesBucketIndex = duplicates.length

    // Compare with each other file
    filesMap.forEach((file, key) => {
      const isDuplicate = equalFiles(
        firstFile.dir + path.sep + firstFile.name,
        file.dir + path.sep + file.name,
      )

      if (isDuplicate) {
        // Create bucket
        if (!Array.isArray(duplicates[duplicatesBucketIndex])) {
          duplicates[duplicatesBucketIndex] = [firstFile]
        }

        duplicates[duplicatesBucketIndex].push(file)
        filesMap.delete(key)
      }
    })
  }

  return duplicates
}

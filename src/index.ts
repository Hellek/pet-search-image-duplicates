import path from 'path'
import {
  getDuplicates, getFilesList, getFilesMap,
} from './utils'

const rootDir = path.resolve(__filename, '..', '..', '..', '..', 'test')

getFilesList(rootDir)
  .then(getFilesMap)
  .then(getDuplicates)
  .then(res => {
    // eslint-disable-next-line no-console
    console.log(res)
  })

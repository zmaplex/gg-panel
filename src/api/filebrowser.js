import request from '../utils/request'
//http://35.78.82.158:8000/api/FileBrowser/query/?directory=/var/db_backups/test1_ODmDSSx
const api = {
  fileBrowser: "/api/FileBrowser",

}

export function listDirectory(directory) {
  return request({
    url: `${api.fileBrowser}/query/`,
    params: {
      "directory": directory
    }
  })

}

export function getDownloadFileUrl(absPath){
  return request.getUri({
    url: request.defaults.baseURL + `api/FileBrowser/download_file/`,
    params: {
      "path": absPath
    }
  })
}

export function uploadFile(directory, file) {
  let formData = new FormData();
  formData.append("file", file);
  return request({
    url: `${api.fileBrowser}/upload_file/`,
    params: {
      "directory": directory
    },
    method: 'post',
    data:formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

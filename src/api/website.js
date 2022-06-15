import request from '../utils/request'
import {ACCESS_TOKEN} from "src/utils/mutation-types";

const api = {
  application: '/api/Application',
  website:'/api/Website'

}


export function listApplication() {
  return request({
    url: `${api.application}/list_application/`
  })
}

export function createWebsite(data) {
  return request({
    url: `${api.website}/`,
    method: 'post',
    data: data
  })
}

export function attachDatabase(dbPk){
  return request({
    url: `${api.website}/`,
    method:'patch',
    data:{

    }
  })

}

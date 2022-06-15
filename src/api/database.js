import request from '../utils/request'
import {ACCESS_TOKEN} from "src/utils/mutation-types";

const api = {
  database: '/api/DataBase'

}


export function listDatabase() {
  return request({
    url: `${api.database}/`
  })
}

export function createNewDatabase(data) {
  return request({
    url: `${api.database}/`,
    method: "post",
    data: data
  })
}
export function createDataBaseInstance(pk){
  return request({
    url: `${api.database}/${pk}/create_instance/`,
    method: "post"
  })
}

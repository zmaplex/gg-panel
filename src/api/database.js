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

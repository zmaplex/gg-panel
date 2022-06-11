import request from '../utils/request'
import {ACCESS_TOKEN} from "src/utils/mutation-types";

const api = {
  application: '/api/Application'

}


export function listApplication() {
  return request({
    url: `${api.application}/list_application/`
  })
}

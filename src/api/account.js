import request from '../utils/request'
import {ACCESS_TOKEN} from "src/utils/mutation-types";

const api = {
  account: "/api/User",

}

export async function requestLogin(data) {
  let res = await request({
    method: 'post',
    url: `${api.account}/login/`,
    data: data
  })
  window.sessionStorage.setItem(ACCESS_TOKEN, res.token)
  return res
}


import request from '../utils/request'
import {ACCESS_TOKEN, USER_INFO} from "src/utils/mutation-types";

const api = {
  account: "/api/User",

}

export async function requestLogin(data) {
  let res = await request({
    method: 'post',
    url: `${api.account}/login/`,
    data: data
  })
  console.log(res)
  window.sessionStorage.setItem(ACCESS_TOKEN, res.token)
  window.sessionStorage.setItem(USER_INFO, JSON.stringify(res, null, 2))
  return res
}


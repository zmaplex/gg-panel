import {Cookies} from "quasar";
import {ACCESS_TOKEN} from "src/utils/mutation-types";

let protocol = 'ws'
let address = '35.78.82.158'
let port = "8000"


export default function createWebsocket(path) {
  let url = `${protocol}://${address}:${port}/ws/${path}/?token=${Cookies.get(ACCESS_TOKEN)}`
  return new WebSocket(url)
}

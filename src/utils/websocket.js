import {Cookies} from "quasar";
import {ACCESS_TOKEN} from "src/utils/mutation-types";


let wsAddress = localStorage.getItem("api_url").replace("http", "ws")
if (wsAddress.charAt(wsAddress.length - 1) === "/") {
  // http://127.0.0.1:8000/  => http://127.0.0.1:8000
  wsAddress = wsAddress.substring(0, wsAddress.length - 1)
}
export default function createWebsocket(path) {
  let url = `${wsAddress}/ws/${path}/?token=${Cookies.get(ACCESS_TOKEN)}`
  return new WebSocket(url)
}

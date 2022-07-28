const DEFAULT = {
  'php': 'php',
  'py': 'python',
  'sql': 'sql',
  'css': 'css',
  'html': 'html',
}
const NGINX = {
  'config': 'nginx',
  'conf': 'nginx',
}
const OSQUERY = {
  'history': 'sql',

}

const Map = {
  "/etc/nginx": NGINX,
  "/root/.osquery": OSQUERY,
}

function getMap(path) {
  for (let i in Map) {
    if (path.startsWith(i)) {
      return Map[i]
    }
  }
  return DEFAULT

}


export function detection(path) {
  let _map = getMap(path)
  console.log(_map)
  for (const e in _map) {
    if (path.endsWith("." + e)) {
      return _map[e]
    }
  }
  return 'text'
}



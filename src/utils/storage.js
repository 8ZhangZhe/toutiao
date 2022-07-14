// 获取本地储存数据的方法
export function getStorage (key) {
  let datas = localStorage.getItem(key)
  try {
    datas = JSON.parse(datas)
  } catch (e) {
    console.log(e)
  }
  return datas
}

// 存储本地存储数据的方法
export function setStorage (key, value) {
  localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
}

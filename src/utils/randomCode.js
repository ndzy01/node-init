/**
 * 产生随机码 random code
 * 导入 例如： import randomCode from '../util/randomCode.js'//随机码
 * 使用 例如：id = randomCode(8)
 */

const randomCode = (number) => {
  const str =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = str.length
  let pwd = ''
  for (let i = 0; i < number; i++) {
    pwd += str.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

const getRandomCode = (number) => {
  return randomCode(number)
}
module.exports = getRandomCode

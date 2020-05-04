const formatData = (date) => {
  const date_ = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S+': date.getMilliseconds(),
  }
  let fmt = 'yyyy-MM-dd HH:mm:ss'
  for (let k in date_) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      // RegExp.$1 匹配 yyyy MM dd HH mm ss
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 4
          ? ('0000' + date_[k]).substr(String(date_[k]).length)
          : ('00' + date_[k]).substr(String(date_[k]).length)
      )
    }
  }
  return fmt
}

module.exports = formatData

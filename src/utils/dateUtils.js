/* 处理时间的模块 */

export default function formateDate(time) { 
  if(!time) return ''
  var date = new Date(time*1000)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  + ' '+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
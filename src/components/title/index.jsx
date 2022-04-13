import menuList from '../../config/menuConfig'

function getTitle(path) {
  let title
  menuList.forEach(item=>{
    if(item.key===path){
      title = item.title
    }else if(item.children){
      const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
      if(cItem){
        title = cItem.title
      }
    }
  })
  return title
}
export default getTitle
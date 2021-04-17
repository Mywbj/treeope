/**
 * 描述：treeCreate 可根据你传入的属性名在平级或子级下插入一个数据
 *      如果第5个参数为true的情况下，你插入的name和同层级的相同则会覆盖掉
 * @param {*} data 第1个参数是你需要处理的数据 一个数组或对象
 * @param {*} name 第2个参数是属性名
 * @param {*} params 第3个参数是你需要插入的value
 * @param {*} newName 第4个参数是你需要插入的key
 * @param {*} isLevel 第5个参数是否在同级身上插入，true为同级，false为子级，默认值true
 * @returns treeCreate会返回你传入的data
 * @author Myway
 */

export default function treeCreate(data, name, params, newName, isLevel=true) {
  function carateTool(tempData) {
    for(let item in tempData) {
      if(Array.isArray(tempData[item])) {
        if(item === name) {
          insert(tempData, item, params, newName, isLevel)
        }
        carateTool(tempData[item])
      } else if(typeof tempData[item] === 'object') {
        if(item === name) {
          insert(tempData, item, params, newName, isLevel)
        }
        carateTool(tempData[item])
      } else {
        if(item === name) {
          insert(tempData, item, params, newName, isLevel)
        }
      }
    }
  }
  carateTool(data)
  return data
}

function insert(handleData, item, params, newName, isLevel) {
  if(isLevel) {
    if(Array.isArray(handleData)) {
      handleData.push([newName, params])
    } else if(typeof handleData === 'object') {
      handleData[newName] = params
    } else {
      handleData = params
    }
  } else {
    if(Array.isArray(handleData[item])) {
      handleData[item].push([newName, params])
    } else if(typeof handleData[item] === 'object') {
      handleData[item][newName] = params
    } else {
      handleData[item] = params
    }
  }
}

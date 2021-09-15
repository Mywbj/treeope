
/**
 * 描述：根据id值查询，true为查出整条祖先链，false为查出自己所在的地方
 * 例子：var arr = [{id:1,child:[{zid:10}]},{id:2,child:[{zid:20}]}] 
 *       treeQuery(arr,20) // {zid:20}
 * @param {*} arr 第一个参数为数组
 * @param {*} id 第二个参数为id值
 * @param {*} whom 第三个参数，'ancestors'为查出整条祖先链 'parent'为查出父亲，'self'为查自己，默认值为'self'
 * @returns treeQuery
 * @author Myway
 */
// 祖先ancestors，父亲parent，自己self
export default function treeQuery(data, id, whom = 'self') {
  if(typeof id !== 'number' && typeof id !== 'string') {
    throw new Error('ID must be numeric or string type')
  }
  const SELF = 'self'
  const PARENT = 'parent'
  const ANCESTORS = 'ancestors'
  let storageArr = []
  let result = null
  // 检查是否为多重数组，是的话先合并为一维数组
  data = mergeArr(data)
  function queryTool(oldData, parentData) {
    if(Array.isArray(oldData)) {
      for (let i = 0; i < oldData.length; i++) {
        const item = oldData[i]
        if(typeof item === 'object') {
          queryTool(item, oldData)
        }
      }
    } else {
      storageArr.push(oldData)
      for (let i = 0; i < Object.keys(oldData).length; i++) {
        const item = oldData[Object.keys(oldData)[i]]
        if(typeof item === 'object') {
          queryTool(item, oldData)
        } else {
          if(item === id) {
            switch(whom) {
              case SELF:
                result = oldData
                break
              case PARENT:
                result = parentData
                break
              case ANCESTORS:
                for (let i = 0; i < data.length; i++) {
                  for (let j = 0; j < storageArr.length; j++) {
                    if(data[i] === storageArr[j]) {
                      result = storageArr[j]
                    }
                  }
                }
                break
              default:
                throw new Error('The third parameter is not valid. Select [ancestors, parent, self] in the selection area')
            }
          }
        }
      }
    }
  }
  queryTool(data);
  return result
}
// 合并为一维数组
function mergeArr(oldArr, newArr = []) {
  if(!Array.isArray(oldArr)) {
    return [oldArr]
  }
  for (var i = 0; i < oldArr.length; i++) {
    const item = oldArr[i]
    if(Array.isArray(item)) {
      mergeArr(item, newArr)
    } else {
      newArr.push(item)
    }
  }
  return newArr
}

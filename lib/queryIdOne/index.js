
/**
 * 描述：根据id值查询，true为查出整条祖先链，false为查出自己所在的地方
 * 例子：var arr = [{id:1,child:[{zid:10}]},{id:2,child:[{zid:20}]}] 
 *       treeQuery(arr,20) // {id:2,child:[{zid:20}]}
 * @param {*} arr 第一个参数为数组
 * @param {*} id 第二个参数为id值
 * @param {*} ancestors 第三个参数，true为查出整条祖先链 false为查出自己所在的地方，默认值 false
 * @returns treeQuery
 * @author Myway
 */
export default function treeQuery(data, id, ancestors=true) {
  id = Number(id)
  if(typeof id !== 'number') return;
  let storageArr = []
  let tempArr = []
  // 检查是否为多重数组，是的话先合并为一维数组
  data = mergeArr(data)
  function queryTool(oldData) {
    for(let item in oldData) {
      if(Array.isArray(oldData[item])) {
        queryTool(oldData[item])
      } else if(typeof oldData[item] === 'object') {
        storageArr.push(oldData[item])
        queryTool(oldData[item])
      } else {
        if(oldData[item] === id) {
          if(ancestors) {
            for(let key1 in data) {
              for(let key2 in storageArr) {
                if(data[key1] === storageArr[key2]) {
                  tempArr.push(storageArr[key2])
                }
              }
            }
          } else {
            tempArr.push(oldData)
          }
        }
      }
    }
  }
  queryTool(data);
  return tempArr[tempArr.length - 1];
}
// 合并为一维数组
function mergeArr(oldArr) {
  let newArr = []
  function mergeTool(oldArr) {
    oldArr.forEach(key => {
      if(Array.isArray(key)) {
        mergeTool(key)
      } else {
        newArr.push(key)
      }
    })
  }
  mergeTool(oldArr)
  return newArr
}
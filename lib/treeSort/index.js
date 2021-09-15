/**
 * 描述：treeSort是一个JavaScript树形排序工具，无论你的name在多少层级下都能够将它们排序好
 * @params treeSort(arr, name, {[, asynchronous] [, isMax]}) 参数必须按顺序传递
 * @param {*} arr 需要排序的数组数据 【必传】
 * @param {*} name 你要以哪个属性排序？例如 treeSort([{id:2},{id:1},{id:3}],'id')【必传】
 * @param {*} async 可选，是否开启异步，返回一个promise，true为异步，默认值false
 * @param {*} isMax  可选，true为从大到小，false为从小到大，默认值false
 * @returns treeSort会返回一个全新的数组
 * @author Myway
 */
 export default function treeSort(oldArr, name, {async = false, isMax = false}) {
   console.log(isMax);
  if(async) {
    // 异步模式
    return new Promise((resolve, reject) => {
      if(!Array.isArray(oldArr)) {
        reject(new Error('The first parameter passed in must be an array'))
      }
      resolve(circlesCall(oldArr, name, oldArr, isMax))
    })
  } else {
    // 同步模式
    if(!Array.isArray(oldArr)) {
      return new Error('The first parameter passed in must be an array')
    }
    return circlesCall(oldArr, name, oldArr, isMax)
  }
}
function circlesCall(oldArr, name, handle, isMax) {
  let length = handle.length // 数组长度
  let pos = 0 // 指针
  function circlesTool(oldArr) {
    for(let item in oldArr) {
      if(oldArr[item] instanceof Object) {
        // 如果是对象或者数组继续查找
        circlesTool(oldArr[item])
      } else {
        if(item === name) {
          if(pos < length) {
            handle[pos][`temp_${name}`] = oldArr[item]
            pos++
          }
        }
      }
    }
  }
  circlesTool(oldArr)

  if(isMax) {
    return handle.sort((a, b) => b['temp_son_id'] - a['temp_son_id']).filter(key => delete key[`temp_${name}`])
  }
  return handle.sort((a, b) => a['temp_son_id'] - b['temp_son_id']).filter(key => delete key[`temp_${name}`])
  // return sortTool(handle, name, isMax)
}

// function sortTool(oldArr, name, isMax) {
//   function mySort(oldArr) {
//     if(oldArr.length === 1) return oldArr;
  
//     let half = Math.floor(oldArr.length / 2)
//     let left = oldArr.slice(0, half)
//     let right = oldArr.slice(half)
  
//     return myTool(mySort(left), mySort(right))
//   }

//   function myTool(left, right) {
//     const newArr = []
//     if(typeof left[0] === 'number' || typeof left[0] === 'string') {
//       if(isMax) {
//         while(left.length !== 0 && right.length !== 0) {
//           if(left[0] < right[0]) {
//             newArr.push(right.shift())
//           } else {
//             newArr.push(left.shift())
//           }
//         }
//       } else {
//         while(left.length !== 0 && right.length !== 0) {
//           if(left[0] > right[0]) {
//             newArr.push(right.shift())
//           } else {
//             newArr.push(left.shift())
//           }
//         }
//       }
//     } else {
//       if(isMax) {
//         while(left.length !== 0 && right.length !== 0) {
//           if(left[0][`temp_${name}`] < right[0][`temp_${name}`]) {
//             newArr.push(right.shift())
//           } else {
//             newArr.push(left.shift())
//           }
//         }
//       } else {
//         while(left.length !== 0 && right.length !== 0) {
//           if(left[0][`temp_${name}`] > right[0][`temp_${name}`]) {
//             newArr.push(right.shift())
//           } else {
//             newArr.push(left.shift())
//           }
//         }
//       }
//     }
//     return newArr.concat(left, right)
//   }
//   return mySort(oldArr).filter(key => delete key[`temp_${name}`])
// }


/**
 * 描述：treeDelete 可根据你输入的key去删除一个属性，无论层级有多少
 * @param {*} data 第1个参数是你需要处理的数据 一个数组或对象
 * @param {*} key 第2个参数是属性值，根据key去删除属性
 * @returns treeDelete会返回你传入的data
 */
export default function treeDelete(data, key) {
  function deleteTool(tempData) {
    for(let item in tempData) {
      if(Array.isArray(tempData[item])) {
        

        if(Array.isArray(key)) {
          if(Array.isArray(tempData[item])) {
            tempData[item].forEach((par,i) => {
              key.forEach(pra2 => {
                if(pra2 === par) {
                  tempData[item].splice(i, 1)
                }
              })
            })
          }

        key.forEach(pars => {
            if(pars === item) {
              delete tempData[item]
            }
          })
        } else {
          if(item === key) {
            delete tempData[item]
          }
        }
        deleteTool(tempData[item])
      } else if(typeof tempData[item] === 'object') {
        if(Array.isArray(key)) {
          key.forEach(pars => {
            if(pars === item) {
              delete tempData[item]
            }
          })
        } else {
          if(item === key) {
            delete tempData[item]
          }
        }
        deleteTool(tempData[item])
      } else {
        if(Array.isArray(key)) {
          key.forEach(pars => {
            if(pars === item) {
              delete tempData[item]
            }
          })
        } else {
          if(Array.isArray(tempData)) {
            tempData.forEach((par,i) => {
              if(par === key) {
                tempData.splice(i, 1)
              }
            })
          }
          if(item === key) {
            delete tempData[item]
          }
        }
      }
    }
  }
  deleteTool(data)
  return data
}
import treeSort from './treeSort/index.js'
import treeQuery from './queryIdOne/index.js'
import treeCreate from './createData/index.js'
import treeDelete from './deleteData/index.js'




export {
  treeSort, // 根据id排序数据
  treeQuery, // 根据id查询数据
  treeCreate, // 根据key插入数据
  treeDelete // 根据key删除数据
}

/*
  注意: node中对ES6模块化的支持
    目前我使用的node版本是v12.16.1，从node v13.2.0开始，
    node才对ES6模块化提供了支持:node v13.2.0之前，需要进行如下操作︰
      在package.json中添加属性:|"type": "module" ;
      在执行命令中添加如下选项: node --experimental-modules src/index.js;node v13.2.0之后，
      只需要进行如下操作︰
        在package.json中添加属性: “type" : "module" ;口注意:导入文件时，需要跟上.js后缀名;

*/
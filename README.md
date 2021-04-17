## TreeOpe

### 描述：TreeOpe 是一个 JavaScript 对于树形结构的排序以及操作查询的工具库

GitHub：https://github.com/Mywbj/treeope.git	npm：https://www.npmjs.com/package/treeope

```
npm install treeope
yarn add treeope
```

## 内容

- [treeSort](#treeSort)	树形数据排序 无论你的key在多少层级下都能够根据你的id来将它们排序好
- [treeQuery](#treeQuery)	根据id值查询，true为查出整条祖先链，false为查出自己所在的地方
- [treeCreate](#treeCreate)	根据你传入的属性名在平级或子级下插入一个数据
- [treeDelete](#treeDelete)	无论层级有多少，都会根据你输入的key去删除一个属性

## 版本预告

1. 更多常用功能
2. 优化代码

<h2 name="treeSort">treeSort</h2>

使用递归将数据结构查找一遍，直到查出你的key，再根据key去排序数据结构

参数1：是一个数组，参数2：排序的key值，参数3：true为从大到小，false为从小到大，默认值false（此参数可选），参数4：是否开启异步，true为异步返回一个promise，默认值false，（此参数可选），

```
import { treeSort } from 'treeope'
let list = [{
    name: 'zs',
    id: 20,
    obj: {
      '1': 1,
      arr: [{
        ids: 2,
        children: [{
          goods_id: 200,
          sonChi: [{
            son_id: 222
          }]
        }]
      }]
    }
  },
  {
    name: 'ls',
    id: 50,
    obj: {
      '1': 1,
      arr: [{
        ids: 5,
        children: [{
          goods_id: 500,
          sonChi: [{
            son_id: 555
          }]
        }]
      }]
    }
  },
  {
    name: 'zl',
    id: 10,
    obj: {
      '1': 1,
      arr: [{
        ids: 1,
        children: [{
          goods_id: 100,
          sonChi: [{
            son_id: 111
          }]
        }]
      }]
    }
  },
  {
    name: 'my',
    id: 40,
    obj: {
      '1': 1,
      arr: [{
        ids: 4,
        children: [{
          goods_id: 400,
          sonChi: [{
            son_id: 444
          }]
        }]
      }]
    }
  },
  {
    name: 'ls',
    id: 30,
    obj: {
      '1': 1,
      arr: [{
        ids: 3,
        children: [{
          goods_id: 300,
          sonChi: [{
            son_id: 333
          }]
        }]
      }]
    }
  }
]
const newData = treeSort(list, 'son_id') // 输入日志如下
```

#### output log：

```
[
    {
        "name": "zl",
        "id": 10,
        "obj": {
            "1": 1,
            "arr": [
                {
                    "ids": 1,
                    "children": [
                        {
                            "goods_id": 100,
                            "sonChi": [
                                {
                                    "son_id": 111
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        "name": "zs",
        "id": 20,
        "obj": {
            "1": 1,
            "arr": [
                {
                    "ids": 2,
                    "children": [
                        {
                            "goods_id": 200,
                            "sonChi": [
                                {
                                    "son_id": 222
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        "name": "ls",
        "id": 30,
        "obj": {
            "1": 1,
            "arr": [
                {
                    "ids": 3,
                    "children": [
                        {
                            "goods_id": 300,
                            "sonChi": [
                                {
                                    "son_id": 333
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        "name": "my",
        "id": 40,
        "obj": {
            "1": 1,
            "arr": [
                {
                    "ids": 4,
                    "children": [
                        {
                            "goods_id": 400,
                            "sonChi": [
                                {
                                    "son_id": 444
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        "name": "ls",
        "id": 50,
        "obj": {
            "1": 1,
            "arr": [
                {
                    "ids": 5,
                    "children": [
                        {
                            "goods_id": 500,
                            "sonChi": [
                                {
                                    "son_id": 555
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
]
```



<h2 name="treeQuery">treeQuery</h2>

#### 利用递归根据id值查询，查出整条祖先链 或者查出自己所在的地方

参数1：是一个数组，参数2：id值，参数3：true为查出整条祖先链 false为查出自己所在的地方，默认值 true（此参数可选）

```
import { treeQuery } from 'treeope'
let list = [
	{id: 1, children: ['子', {sonId: 10}]},
	{id: 3, children: ['子', {sonId: 30}]},
	{id: 2, children: ['子', {sonId: 20}]},
]
treeQuery(list, 30, true) //output log： {id:3,children: ['子', {sonId: 30}]}
treeQuery(list, 30, false) //output log： {sonId: 30}
```



<h2 name="treeCreate">treeCreate</h2>

#### 可根据你传入的属性名在平级或子级下插入一个数据

参数1：需要处理的数据 一个数组或对象，参数2：你需要在哪个属性下插入？是一个key，参数3：需要插入的value，参数4：需要插入的key，参数5：是否在同级身上插入，true为同级，false为子级，默认值true

注意：你插入的key和同层级的相同则会覆盖掉

```
import { treeCreate } from 'treeope'
let list = [
	{id: 1, children: ['子', {sonArr: [1,2]}]},
	{id: 3, children: ['子', {sonArr: [3,4]}]},
	{id: 2, children: ['子', {sonArr: [5,6]}]},
]
let dom1 = treeCreate(list, 'sonArr', {a:1}, 'newObj', true) // 在sonArr同级上添加{a:1}
let dom2 = treeCreate(list, 'sonArr', {a:1}, 'newObj', false) // 在sonArr下添加{a:1}
let dom3 = treeCreate(list, 'children', {a:1}, 'children', true)// 插入的key和同层级的相同则会覆盖掉
```

#### output log：

```
dom1:
[
	{id: 1, children: ['子', {sonArr: [1,2], {a:1}}]},
	{id: 3, children: ['子', {sonArr: [3,4], {a:1}]},
	{id: 2, children: ['子', {sonArr: [5,6], {a:1}]},
]
dom2:
[
	{id: 1, children: ['子', {sonArr: [1,2,[newObj,{a:1}]]}]},
	{id: 3, children: ['子', {sonArr: [3,4,[newObj,{a:1}]]}]},
	{id: 2, children: ['子', {sonArr: [5,6,[newObj,{a:1}]]}]},
]
dom3: // 插入的key和同层级的相同则会覆盖掉
[
	{id: 1, children: {a:1}},
	{id: 3, children: {a:1}},
	{id: 2, children: {a:1}},
]
```



<h2 name="createData">treeDelete</h2>

参数1：需要处理的数据 一个数组或对象，参数2：属性值，根据key去删除属性，也可以是一个数组，数组里面包含需要删除的key或者值

```
import { treeDelete } from 'treeope'
let list = [
	{id: 1, children: ['子', {sonArr: [1,2]}, 'hello'], abc: 43},
	{id: 3, children: ['子', {sonArr: [3,4]}, 'hello'], abc: 434},
	{id: 2, children: ['子', {sonArr: [5,6]}, 'hello'], abc: 34},
]
let dom1 = treeDelete(list, 'sonArr') // 如果是删除属性的话就必须传属性名
let dom2 = treeDelete(list, 'hello') // 如果是删除数组里面的值的话，就直接传值
let dom3 = treeDelete(list, ['子', 1, 4, 5, 'abc', 'id']) // 可以是一个数组，可以是值可以是属性，注意的是值得类型必须要一致
```

#### output log：

```
dom1:
[
	{id: 1, children: ['子', {}]},
	{id: 3, children: ['子', {}]},
	{id: 2, children: ['子', {}]},
]
dom2:
[
	{id: 1, children: ['子', {sonArr: [1,2]}], abc: 43},
	{id: 3, children: ['子', {sonArr: [3,4]}], abc: 434},
	{id: 2, children: ['子', {sonArr: [5,6]}], abc: 34},
]
dom3:
[
	{"children": [{"sonArr": [2]}, "hello"]},
    {"children": [{"sonArr": [3]}, "hello"]},
    {"children": [{"sonArr": [6]}, "hello"]}
]
```


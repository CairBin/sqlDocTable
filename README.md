# dbToDocTable

## 介绍

此工具用于根据数据库的表结构绘制论文的三线表

## 使用

使用yarn安装依赖，在此之前使用npm全局安装yarn

```sh
npm install -g yarn
yarn install
```

在`./config.js`中填写配置信息:

* `dbConfig`部分为数据库信息
* `mapper`部分为字段映射信息，`mapper.struct`它会将处理过程对象的键对应的映射值填写到三线表的表头，`mapper.value`会将处理过程中的值转换成对应的值填写到三线表的数据部分。
* `tableFields`部分为需要显示的字段信息，例如只需要显示字段名、类型、是否为空、默认值、描述信息，可以填写`["field", "type", "null", "default", "comment"]`，不填写的部分不会在三线表中展示。

```js
export default {
    dbConfig: {
        host: 'localhost',
        user: 'your_username',
        password: 'your_password',
        database: 'your_db_name'
    },

    mapper: {
        struct:{
            "field": "字段",
            "type": "类型",
            "null": "是否为空",
            "key": "是否主键",
            "default": "默认值",
            "extra": "额外信息",
            "comment": "描述",
            "collation": "排序规则"
        },
        value:{
            "true": "是",
            "false" : "否",
            "null" : "null"
        }
    },

    tableFields: [
        "field", "type", "null", "key", "default", "comment"
    ]
}

```

运行程序，然后会生成`./dist`目录，里面有生成的三线表。

```sh
yarn run start
```
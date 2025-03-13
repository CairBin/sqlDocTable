export default {
    dbConfig: {
        host: 'localhost',
        user: 'your_username',
        password: 'your_password',
        database: 'your_db_name'
    },

    mapper: {
        struct: {
            "field": "字段",
            "type": "类型",
            "null": "是否为空",
            "key": "是否主键",
            "default": "默认值",
            "extra": "额外信息",
            "comment": "描述",
            "collation": "排序规则"
        },
        value: {
            "true": "是",
            "false": "否",
            "null": "null"
        }
    },

    tableFields: [
        "field", "type", "null", "key", "default", "comment"
    ]
}
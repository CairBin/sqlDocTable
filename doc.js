import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, TextRun, AlignmentType } from 'docx';
import fs from 'fs';
import mapper from './mapper.js';
import config from './config.js';


const styles = {
    paragraphStyles: [
        {
            id: "normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            run: {
                font: "Times New Roman", // 默认英文字体
                size: 21, // 五号字，21磅（1磅 = 2.83点）
            },
        },
    ],
};

const geneTableHeaderRow = (fieldNameArray) => {
    let array = [];
    fieldNameArray.forEach(item => {
        // console.log(mapper.mapperStruct(item))
        array.push(new TableCell({
            children: [new Paragraph({ text: mapper.mapperStruct(item), alignment: AlignmentType.CENTER })], // 文本居中
            margins: { top: 100, bottom: 100, left: 100, right: 100 }, // 单元格边距
            borders: {
                top: { size: 12, color: "000000", style: "single" }, // 顶部边框，1.5磅（12点）
                bottom: { size: 6, color: "000000", style: "single" }, // 第一行底部边框，0.75磅（6点）
                left: { size: 0, color: "FFFFFF", style: "single" }, // 隐藏左边框
                right: { size: 0, color: "FFFFFF", style: "single" }, // 隐藏右边框
            },
        }))
    })

    return new TableRow({
        children: array,
    });
}

const geneTableRowArray= (fieldNameArray, tableObjArray) => {
    let result = [];
    result.push(geneTableHeaderRow(fieldNameArray));
    for(let i=0; i<tableObjArray.length; i++){
        let array = [];
        fieldNameArray.forEach(name => {
            array.push(new TableCell({
                children: [new Paragraph({ text: mapper.mapperValue(tableObjArray[i][name]), alignment: AlignmentType.CENTER })], // 文本居中
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                borders: {
                    top: { size: 0, color: "FFFFFF", style: "single" }, // 隐藏顶部边框
                    // 底部边框如果不是最后一行数据就隐藏，如果是不隐藏1.5磅
                    bottom: i !== tableObjArray.length - 1 ? { size: 0, color: "FFFFFF", style: "single" } : { size: 12, color: "000000", style: "single" },
                    left: { size: 0, color: "FFFFFF", style: "single" }, // 隐藏左边框
                    right: { size: 0, color: "FFFFFF", style: "single" }, // 隐藏右边框
                },
            }))
        });
        result.push(new TableRow({
            children: array, 
        }))
    }
    return result;
}

const geneTableDoc = (tableName, objs) => {
    const nameArray = config.tableFields;
    const dataRowArray = geneTableRowArray(nameArray, objs);
    
    const doc = new Document({
       styles: styles,
        sections: [{
            children: [
                new Paragraph({
                    text: `${tableName}`,
                    alignment: AlignmentType.CENTER, // 文本居中
                    spacingAfter: { value: 10, unit: 'pt' } 
                    // heading: "Heading1", // 可选：设置标题样式
                    // spacing: { before: 200, after: 200 }, // 设置段前和段后间距
                }),
                new Table({
                    width: {
                        size: 100, // 表格宽度为100%
                        type: WidthType.PERCENTAGE,
                    },
                    rows: dataRowArray,
                }),
            ],
        },]
    })

    return doc;
}

export default{
    geneTableDoc,
}
import Doc from './doc.js';
import Sql from './sql.js';
import { Packer } from 'docx';
import fs from 'fs';

async function main() {
    if (!fs.existsSync("dist")){
        fs.mkdirSync("dist", { recursive: true });
    }
    const tableNames = await Sql.getTablesName();
    tableNames.forEach(async table => {
        console.log("Generating table: " + table);
        const tables = await Sql.getTableStructure(table);
        const doc = Doc.geneTableDoc(table, tables);
        Packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync(`dist/${table}.docx`, buffer);
            console.log("Word文档已生成：dist/" + table + ".docx");
        })
    })

    Sql.getConnection().end();
}

main();
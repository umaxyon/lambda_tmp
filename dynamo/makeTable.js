const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

//ex: node makeTable.js hogehoge.yaml
const ddlName = path.resolve(__dirname, `${process.argv[2]}`);
const ddlYaml = yaml.load(fs.readFileSync(ddlName, 'utf8'));

const tmpDir = fs.mkdtempSync(path.resolve(__dirname, 'tmp'));
try {
    for (let nm in ddlYaml.Resources) {
        const tmpJsonName = path.resolve(tmpDir, "ddl.json");
        fs.writeFileSync(tmpJsonName, JSON.stringify(ddlYaml.Resources[nm]['Properties']));
        execSync('aws dynamodb create-table --region ap-northeast-1 --endpoint-url http://localhost:8000 --cli-input-json file://' + tmpJsonName); 
    }
} catch(e) {
    console.log(e);
} finally {
    fs.rmdirSync(tmpDir, { recursive: true });
}

console.log('end.')
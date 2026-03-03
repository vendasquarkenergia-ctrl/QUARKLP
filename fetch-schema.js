import fs from 'fs';

const schemaStr = fs.readFileSync('schema.json', 'utf8');
const schema = JSON.parse(schemaStr);

console.log('--- Tabelas ---');
const tables = Object.keys(schema.definitions || {});
tables.forEach(t => console.log(t));

console.log('\n--- Buscando Colunas para Leads ---');
const leadTable = tables.find(t => t.toLowerCase().includes('lead') || t.toLowerCase().includes('client') || t.toLowerCase().includes('crm'));

if (leadTable) {
    console.log(`\nTabela provável encontrada: ${leadTable}`);
    console.log(JSON.stringify(schema.definitions[leadTable].properties, null, 2));
} else {
    console.log(' Nenhuma tabela com nome lead/client/crm encontrada.');
    console.log('Listando as chaves (paths) para identificar a tabela baseadas nos nomes encontrados:');
    const paths = Object.keys(schema.paths || {});
    paths.forEach(p => console.log(p));
}

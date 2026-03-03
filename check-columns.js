import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sumydaewtszecrvdgoku.supabase.co';
const supabaseAnonKey = 'sb_publishable_YSHgrXjsvOroxDokhAZavg_GBQY8Hha';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkColumns() {
    console.log('Buscando 1 lead da tabela "leads"...');
    const { data, error } = await supabase.from('leads').select('*').limit(1);

    if (error) {
        console.error('Erro ao buscar:', error);
    } else if (data && data.length > 0) {
        console.log('Colunas encontradas na tabela leads:');
        console.log(Object.keys(data[0]));
        console.log('\nExemplo de dados:');
        console.log(data[0]);
    } else {
        console.log('Tabela leads retornou vazia (ou sem permissão de leitura).');
    }
}

checkColumns();

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Erro: Variáveis do Supabase não encontradas no .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLeads() {
    console.log('🔄 Buscando o último lead cadastrado...');

    const { data, error } = await supabase
        .from('landing_page_leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error('❌ Erro ao buscar leads:', error);
    } else if (data && data.length > 0) {
        console.log('✅ Último lead cadastrado:', data[0]);
    } else {
        console.log('⚠️ Nenhum lead encontrado.');
    }
}

checkLeads();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sumydaewtszecrvdgoku.supabase.co';
const supabaseAnonKey = 'sb_publishable_YSHgrXjsvOroxDokhAZavg_GBQY8Hha';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testCRMLead() {
    console.log('Enviando Lead de Teste para o CRM (Tabela leads)...');

    const leadId = crypto.randomUUID();
    const leadData = {
        id: leadId,
        name: "Lead de Teste IA",
        phone: "82 999999999",
        city: "Maceió",
        value: "100",  // para ficar na formatação
        consumption: "500 kWh",
        status: "Novos Leads",
        source: "Teste de Integração"
    };

    const { error } = await supabase.from('leads').insert([
        {
            id: leadId,
            data: leadData,
            updated_at: new Date().toISOString()
        }
    ]);

    if (error) {
        console.error('Erro:', error);
    } else {
        console.log('Lead de teste inserido com sucesso!');
    }
}

testCRMLead();

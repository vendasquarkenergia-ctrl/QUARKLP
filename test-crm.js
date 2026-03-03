import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sumydaewtszecrvdgoku.supabase.co';
const supabaseAnonKey = 'sb_publishable_YSHgrXjsvOroxDokhAZavg_GBQY8Hha';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testCRMLead() {
    console.log('Enviando Lead de Teste para o CRM (Tabela leads)...');

    const leadId = crypto.randomUUID();
    const { error } = await supabase.from('landing_page_leads').insert([
        {
            name: "Lead de Teste IA",
            whatsapp: "82 999999999",
            flow_type: 'solar',
            service: 'Orçamento de Energia Solar',
            city_and_bill: 'Maceió, 500',
            roof_and_plans: 'Telhado comum',
            pain_points: 'Preço alto',
            payoff: 'Garantia'
        }
    ]);

    if (error) {
        console.error('Erro:', error);
    } else {
        console.log('Lead de teste inserido com sucesso!');
    }
}

testCRMLead();

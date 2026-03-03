import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { TrendingDown, AlertTriangle, Wallet, Calculator } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const formatCurrencyShort = (value: number) => {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(0)}k`;
  return `R$ ${value}`;
};

export default function PainSection() {
  const [monthlyBill, setMonthlyBill] = useState(500);
  const [years, setYears] = useState(10);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);

  const { chartData, cumulativeGrid } = useMemo(() => {
    const data = [];
    let cumulative = 0;

    for (let i = 0; i <= years; i++) {
      const currentMonthlyGrid = monthlyBill * Math.pow(1.08, i);
      // Fatura com solar geralmente é apenas a taxa mínima de conexão (estimada em ~10% do valor)
      const currentMonthlySolar = monthlyBill * 0.10;

      data.push({
        year: `Ano ${i}`,
        grid: Math.round(currentMonthlyGrid),
        solar: Math.round(currentMonthlySolar)
      });

      if (i > 0) {
        cumulative += (monthlyBill * Math.pow(1.08, i - 1)) * 12;
      }
    }
    return { chartData: data, cumulativeGrid: Math.round(cumulative) };
  }, [monthlyBill, years]);

  const painCards = [
    {
      icon: <TrendingDown className="w-7 h-7 text-red-400" />,
      title: 'Inflação Energética',
      desc: 'A tarifa sobe muito acima da inflação todos os anos. A conta de luz é a única despesa que você tem certeza que vai piorar.',
    },
    {
      icon: <Wallet className="w-7 h-7 text-red-400" />,
      title: 'Dinheiro Queimado',
      desc: 'Pagar conta de luz é como pagar aluguel. O dinheiro vai embora todos os meses e você não constrói nenhum patrimônio.',
    },
    {
      icon: <AlertTriangle className="w-7 h-7 text-red-400" />,
      title: 'Refém do Sistema',
      desc: 'Bandeiras tarifárias, taxas extras e apagões. Você paga absurdamente caro por um serviço sobre o qual não tem controle.',
    },
  ];

  return (
    <section id="pain-section" className="py-20 md:py-32 px-4 md:px-6 bg-quark-dark relative border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6">
            Faça as contas de quanto você já{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">perdeu</span>
          </h2>
          <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-sans">
            A conta de luz é um aluguel eterno que você paga para a concessionária. Descubra exatamente quanto dinheiro você já deixou na mesa.
          </p>
        </motion.div>

        {/* Calculator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto bg-[#161B22] border border-white/10 rounded-3xl p-6 md:p-10 mb-16 md:mb-24 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />

          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Inputs */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-3 mb-2 md:mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Calculator className="w-5 h-5 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Calculadora de Perdas</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wider">Valor médio da conta</label>
                  <span className="text-xl md:text-2xl font-bold text-white">{formatCurrency(monthlyBill)}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-quark-yellow"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wider">Projeção (Anos)</label>
                  <span className="text-xl md:text-2xl font-bold text-white">{years} {years === 1 ? 'ano' : 'anos'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-quark-yellow"
                />
              </div>

              <div className="bg-[#0A0F1E] rounded-2xl p-6 border border-white/5 text-center relative flex flex-col justify-center">
                <span className="text-xs md:text-sm font-medium text-red-400 uppercase tracking-widest mb-2 block">Dinheiro Queimado (Sem Solar)</span>
                <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-orange-600 tracking-tighter">
                  {formatCurrency(cumulativeGrid)}
                </div>
                <p className="text-[10px] md:text-xs text-slate-500 font-sans mt-2">
                  *Considerando inflação energética média de 8% a.a.
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="lg:col-span-7 h-[300px] md:h-[400px] w-full relative">
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center mb-4 z-10 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs font-medium text-slate-300">Conta Mensal (Sem Solar)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-quark-green" />
                  <span className="text-xs font-medium text-slate-300">Conta Mensal (Com Solar)</span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 40, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D26A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00D26A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis
                    stroke="#475569"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatCurrencyShort}
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0A0F1E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => formatCurrency(value)}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="grid" name="Sem Solar" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorGrid)" />
                  <Area type="monotone" dataKey="solar" name="Com Solar" stroke="#00D26A" strokeWidth={3} fillOpacity={1} fill="url(#colorSolar)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Pain Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {painCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.02] border border-white/[0.05] p-6 md:p-10 rounded-3xl md:rounded-[2rem] hover:bg-white/[0.04] transition-colors cursor-default"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/5 flex items-center justify-center mb-6 md:mb-8 border border-red-500/20 shadow-inner">
                {card.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 md:mb-4">{card.title}</h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-sans">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

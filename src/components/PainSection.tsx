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

  const { chartData, cumulativeGrid, cumulativeSolar, totalSavings } = useMemo(() => {
    const data = [];
    let cumulativeGridTotal = 0;
    let cumulativeSolarTotal = 0;

    // Inflação energética: 4% a.a. (ANEEL histórico)
    const INFLATION = 0.04;

    // Tarifa média nacional cheia (geração + transmissão + distribuição + impostos)
    // Usada para estimar o consumo em kWh a partir do valor da conta
    const AVG_FULL_TARIFF = 0.85; // R$/kWh

    // Fio B real (encargo de uso da rede de distribuição - TUSD)
    const FIO_B_TARIFF = 0.2628; // R$/kWh

    // CIP (Contribuição de Iluminação Pública) - estimativa residencial ~5% da conta
    const CIP_RATE = 0.05;

    // Estimativa de consumo mensal em kWh com base na conta atual
    const estimatedKwh = monthlyBill / AVG_FULL_TARIFF;

    // Conta mensal com solar = (Fio B × kWh) + CIP
    // O solar elimina o custo de geração, mas o cliente continua usando a rede
    const solarMonthlyBase = (FIO_B_TARIFF * estimatedKwh) + (monthlyBill * CIP_RATE);

    for (let i = 0; i <= years; i++) {
      // Sem solar: conta cresce com inflação energética
      const currentMonthlyGrid = monthlyBill * Math.pow(1 + INFLATION, i);
      // Com solar: Fio B + CIP também corrigidos pela mesma inflação
      const currentMonthlySolar = solarMonthlyBase * Math.pow(1 + INFLATION, i);

      data.push({
        year: `Ano ${i}`,
        grid: Math.round(currentMonthlyGrid),
        solar: Math.round(currentMonthlySolar)
      });

      if (i > 0) {
        cumulativeGridTotal += (monthlyBill * Math.pow(1 + INFLATION, i - 1)) * 12;
        cumulativeSolarTotal += (solarMonthlyBase * Math.pow(1 + INFLATION, i - 1)) * 12;
      }
    }
    return {
      chartData: data,
      cumulativeGrid: Math.round(cumulativeGridTotal),
      cumulativeSolar: Math.round(cumulativeSolarTotal),
      totalSavings: Math.round(cumulativeGridTotal - cumulativeSolarTotal)
    };
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
    <section id="pain-section" className="py-16 md:py-32 px-4 md:px-6 bg-transparent relative border-t border-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-[3.5rem] font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Faça as contas de quanto você já{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">perdeu.</span>
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
          className="max-w-5xl mx-auto bg-white/[0.02] border border-white/[0.05] rounded-[32px] p-5 md:p-10 mb-16 md:mb-24 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl relative overflow-hidden focus-within:border-white/[0.1] transition-colors"
        >
          {/* Subtle top glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Inputs */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-3 mb-2 md:mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Calculator className="w-5 h-5 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Calculadora de Perdas</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wider">Valor médio da conta</label>
                  <span className="text-xl md:text-2xl font-bold text-white">{formatCurrency(monthlyBill)}</span>
                </div>
                {/* Slider customizado — trilha + thumb com alinhamento perfeito */}
                <div className="relative h-7 flex items-center">
                  {/* Trilha de fundo */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-white/10" />
                  {/* Trilha de progresso amarela */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-r from-quark-yellow to-yellow-400"
                    style={{ width: `${((monthlyBill - 100) / (5000 - 100)) * 100}%` }}
                  />
                  {/* Thumb (bola) */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 md:w-6 md:h-6 rounded-full -translate-x-1/2 shadow-[0_0_0_3px_rgba(250,204,21,0.25),0_0_18px_rgba(250,204,21,0.55)]"
                    style={{
                      left: `${((monthlyBill - 100) / (5000 - 100)) * 100}%`,
                      background: 'radial-gradient(circle at 35% 35%, #fff 0%, #FACC15 55%, #e6a800 100%)'
                    }}
                  />
                  {/* Input invisível por cima para capturar eventos */}
                  <input
                    type="range" min="100" max="5000" step="50" value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wider">Projeção (Anos)</label>
                  <span className="text-xl md:text-2xl font-bold text-white">{years} {years === 1 ? 'ano' : 'anos'}</span>
                </div>
                {/* Slider customizado — trilha + thumb com alinhamento perfeito */}
                <div className="relative h-7 flex items-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-white/10" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-r from-quark-yellow to-yellow-400"
                    style={{ width: `${((years - 1) / (25 - 1)) * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 md:w-6 md:h-6 rounded-full -translate-x-1/2 shadow-[0_0_0_3px_rgba(250,204,21,0.25),0_0_18px_rgba(250,204,21,0.55)]"
                    style={{
                      left: `${((years - 1) / (25 - 1)) * 100}%`,
                      background: 'radial-gradient(circle at 35% 35%, #fff 0%, #FACC15 55%, #e6a800 100%)'
                    }}
                  />
                  <input
                    type="range" min="1" max="25" step="1" value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Card Sem Solar */}
              <div className="bg-[#050505]/50 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.03] relative flex flex-col gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">Sem Solar</span>
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <div className="relative z-10 text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-orange-600 tracking-tighter">
                  {formatCurrency(cumulativeGrid)}
                </div>
                <p className="relative z-10 text-[10px] text-slate-500 font-sans leading-relaxed">
                  Tarifa + inflação energética de 4% a.a.
                </p>
              </div>

              {/* Card Com Solar */}
              <div className="bg-[#050505]/50 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.03] relative flex flex-col gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-quark-green/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-quark-green uppercase tracking-widest">Com Solar</span>
                  <div className="w-2 h-2 rounded-full bg-quark-green" />
                </div>
                <div className="relative z-10 text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-quark-green to-emerald-300 tracking-tighter">
                  {formatCurrency(cumulativeSolar)}
                </div>
                <p className="relative z-10 text-[10px] text-slate-500 font-sans leading-relaxed">
                  Fio B R$ 0,2628/kWh + CIP — encargos obrigatórios mesmo com solar
                </p>
              </div>

              {/* Card Economia */}
              <div className="bg-[#050505]/50 backdrop-blur-sm rounded-2xl p-5 border border-quark-yellow/10 relative flex flex-col gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-quark-yellow/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-quark-yellow uppercase tracking-widest">Economia Total</span>
                  <span className="text-xs font-bold text-quark-yellow">🔥</span>
                </div>
                <div className="relative z-10 text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-quark-yellow to-orange-300 tracking-tighter">
                  {formatCurrency(totalSavings)}
                </div>
                <p className="relative z-10 text-[10px] text-slate-500 font-sans leading-relaxed">
                  Diferença em {years} {years === 1 ? 'ano' : 'anos'} com energia solar instalada
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="lg:col-span-7 h-[300px] md:h-[400px] w-full relative">
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center mb-4 z-10 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs font-medium text-slate-300">Sem Solar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-quark-green" />
                  <span className="text-xs font-medium text-slate-300">Com Solar (Fio B + CIP)</span>
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

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {painCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.02] border border-white/[0.05] p-5 md:p-10 rounded-3xl md:rounded-[2rem] hover:bg-white/[0.05] hover:border-red-500/20 hover:shadow-[0_0_40px_rgba(239,68,68,0.1)] transition-all duration-300 cursor-default group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/5 flex items-center justify-center mb-6 md:mb-8 border border-red-500/20 group-hover:from-red-500/30 transition-all duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 md:mb-4 group-hover:text-red-400 transition-colors">{card.title}</h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-medium">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, LineChart, TrendingUp, Eye, EyeOff, Calendar } from "lucide-react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface ChartData {
  month: string;
  commandes: number;
  requetes: number;
  benefices: number;
}

type ChartType = 'area' | 'line' | 'bar';
type PeriodType = 12 | 24 | 36;

export default function ActivityChart() {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [period, setPeriod] = useState<PeriodType>(24);
  const [showCommandes, setShowCommandes] = useState(true);
  const [showRequetes, setShowRequetes] = useState(true);
  const [showBenefices, setShowBenefices] = useState(true);

  // Données complètes sur 36 mois
  const fullData: ChartData[] = [
    { month: 'Jan 2023', commandes: 2800, requetes: 1200, benefices: 45000 },
    { month: 'Fév 2023', commandes: 3200, requetes: 1400, benefices: 52000 },
    { month: 'Mar 2023', commandes: 2900, requetes: 1300, benefices: 47000 },
    { month: 'Avr 2023', commandes: 3500, requetes: 1600, benefices: 58000 },
    { month: 'Mai 2023', commandes: 3800, requetes: 1700, benefices: 62000 },
    { month: 'Juin 2023', commandes: 4200, requetes: 1900, benefices: 68000 },
    { month: 'Juil 2023', commandes: 3900, requetes: 1800, benefices: 64000 },
    { month: 'Août 2023', commandes: 3600, requetes: 1700, benefices: 59000 },
    { month: 'Sep 2023', commandes: 4100, requetes: 1900, benefices: 67000 },
    { month: 'Oct 2023', commandes: 4400, requetes: 2000, benefices: 72000 },
    { month: 'Nov 2023', commandes: 4700, requetes: 2100, benefices: 76000 },
    { month: 'Déc 2023', commandes: 5200, requetes: 2300, benefices: 84000 },
    { month: 'Jan 2024', commandes: 4800, requetes: 2200, benefices: 78000 },
    { month: 'Fév 2024', commandes: 4500, requetes: 2100, benefices: 73000 },
    { month: 'Mar 2024', commandes: 4900, requetes: 2300, benefices: 80000 },
    { month: 'Avr 2024', commandes: 5300, requetes: 2400, benefices: 86000 },
    { month: 'Mai 2024', commandes: 5600, requetes: 2500, benefices: 91000 },
    { month: 'Juin 2024', commandes: 5900, requetes: 2600, benefices: 96000 },
    { month: 'Juil 2024', commandes: 5500, requetes: 2500, benefices: 89000 },
    { month: 'Août 2024', commandes: 5200, requetes: 2400, benefices: 84000 },
    { month: 'Sep 2024', commandes: 5700, requetes: 2600, benefices: 92000 },
    { month: 'Oct 2024', commandes: 6000, requetes: 2700, benefices: 97000 },
    { month: 'Nov 2024', commandes: 6300, requetes: 2800, benefices: 102000 },
    { month: 'Déc 2024', commandes: 6800, requetes: 3000, benefices: 110000 },
    { month: 'Jan 2025', commandes: 6400, requetes: 2900, benefices: 104000 },
    { month: 'Fév 2025', commandes: 6100, requetes: 2800, benefices: 99000 },
    { month: 'Mar 2025', commandes: 6500, requetes: 3000, benefices: 106000 },
    { month: 'Avr 2025', commandes: 6900, requetes: 3100, benefices: 112000 },
    { month: 'Mai 2025', commandes: 7200, requetes: 3200, benefices: 117000 },
    { month: 'Juin 2025', commandes: 7500, requetes: 3300, benefices: 122000 },
    { month: 'Juil 2025', commandes: 7100, requetes: 3200, benefices: 115000 },
    { month: 'Août 2025', commandes: 6800, requetes: 3100, benefices: 110000 },
    { month: 'Sep 2025', commandes: 7300, requetes: 3300, benefices: 118000 },
    { month: 'Oct 2025', commandes: 7600, requetes: 3400, benefices: 123000 },
    { month: 'Nov 2025', commandes: 7900, requetes: 3500, benefices: 128000 },
    { month: 'Déc 2025', commandes: 8400, requetes: 3700, benefices: 136000 }
  ];

  // Filtrer les données selon la période sélectionnée
  const data = useMemo(() => {
    return fullData.slice(-period);
  }, [fullData, period]);

  // Préparer les données pour Recharts
  const chartData = useMemo(() => {
    return data.map(item => ({
      month: item.month,
      commandes: showCommandes ? item.commandes : undefined,
      requetes: showRequetes ? item.requetes : undefined,
      benefices: showBenefices ? item.benefices : undefined
    }));
  }, [data, showCommandes, showRequetes, showBenefices]);

  // Configuration des couleurs
  const colors = {
    commandes: '#3b82f6',
    requetes: '#f59e0b',
    benefices: '#10b981'
  };

  // Tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4">
          <p className="text-sm font-semibold text-gray-800 dark:text-white mb-3">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm mb-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600 dark:text-gray-300">
                {entry.name === 'benefices' ? 'Bénéfices' : 
                 entry.name === 'commandes' ? 'Commandes' : 'Requêtes'}: 
                <span className="font-semibold ml-1">
                  {entry.name === 'benefices' ? `€${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
                </span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Fonction pour formater les valeurs Y (gauche - commandes et requêtes)
  const formatYAxisLeft = (tickItem: number) => {
    return tickItem.toLocaleString();
  };

  // Fonction pour formater les valeurs Y (droite - bénéfices)
  const formatYAxisRight = (tickItem: number) => {
    return `${(tickItem / 1000).toFixed(0)}k€`;
  };

  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-white">
            Évolution sur {period} mois
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Dernière période: {data[data.length - 1].month}</span>
          </div>
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mb-6 flex-shrink-0">
        {/* Type de graphique et période */}
        <div className="flex items-center space-x-4">
          {/* Type de graphique */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { type: 'area' as ChartType, icon: TrendingUp, label: 'Aires' },
              { type: 'line' as ChartType, icon: LineChart, label: 'Lignes' },
              { type: 'bar' as ChartType, icon: BarChart3, label: 'Barres' }
            ].map(({ type, icon: Icon, label }) => (
              <motion.button
                key={type}
                onClick={() => setChartType(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                  chartType === type
                    ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </motion.button>
            ))}
          </div>

          {/* Sélection de période */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[12, 24, 36].map((p) => (
              <motion.button
                key={p}
                onClick={() => setPeriod(p as PeriodType)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                  period === p
                    ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                {p} mois
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Légende */}
        <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {[
            { key: 'commandes', label: 'Commandes', color: 'blue', state: showCommandes, setter: setShowCommandes },
            { key: 'requetes', label: 'Requêtes', color: 'amber', state: showRequetes, setter: setShowRequetes },
            { key: 'benefices', label: 'Bénéfices', color: 'green', state: showBenefices, setter: setShowBenefices }
          ].map(({ key, label, color, state, setter }) => (
            <motion.button
              key={key}
              onClick={() => setter(!state)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                state 
                  ? `bg-${color}-50 dark:bg-${color}-900/20 shadow-sm` 
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {state ? (
                <Eye className={`w-4 h-4 text-${color}-600`} />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-400" />
              )}
              <div className={`w-3 h-3 rounded-full ${state ? `bg-${color}-500` : 'bg-gray-300'}`} />
              <span className={`text-sm font-medium ${state ? `text-${color}-600` : 'text-gray-500'}`}>
                {label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Graphique Recharts avec axes séparés */}
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={chartData} margin={{ top: 20, right: 50, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxisLeft}
                orientation="left"
                label={{ value: 'Commandes & Requêtes', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }}
                ticks={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500]}
              />
              <YAxis 
                yAxisId="right"
                stroke="#10b981"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxisRight}
                orientation="right"
                label={{ value: 'Bénéfices (€)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#10b981' } }}
                ticks={[0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000]}
                domain={[0, 140000]}
                allowDataOverflow={false}
              />
              <Tooltip content={<CustomTooltip />} />
              {showCommandes && (
                <Bar 
                  yAxisId="left"
                  dataKey="commandes" 
                  fill={colors.commandes} 
                  radius={[4, 4, 0, 0]}
                  name="Commandes"
                />
              )}
              {showRequetes && (
                <Bar 
                  yAxisId="left"
                  dataKey="requetes" 
                  fill={colors.requetes} 
                  radius={[4, 4, 0, 0]}
                  name="Requêtes"
                />
              )}
              {showBenefices && (
                <Bar 
                  yAxisId="right"
                  dataKey="benefices" 
                  fill={colors.benefices} 
                  radius={[4, 4, 0, 0]}
                  name="Bénéfices"
                />
              )}
            </BarChart>
          ) : chartType === 'area' ? (
            <AreaChart data={chartData} margin={{ top: 20, right: 50, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorCommandes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.commandes} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors.commandes} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorRequetes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.requetes} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors.requetes} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorBenefices" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.benefices} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors.benefices} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxisLeft}
                orientation="left"
                label={{ value: 'Commandes & Requêtes', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }}
                ticks={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500]}
              />
              <YAxis 
                yAxisId="right"
                stroke="#10b981"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxisRight}
                orientation="right"
                label={{ value: 'Bénéfices (€)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#10b981' } }}
                domain={[0, 140000]}
                allowDataOverflow={false}
                tickCount={15}
              />
              <Tooltip content={<CustomTooltip />} />
              {showCommandes && (
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="commandes" 
                  stroke={colors.commandes} 
                  fill="url(#colorCommandes)" 
                  strokeWidth={2}
                  name="Commandes"
                />
              )}
              {showRequetes && (
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="requetes" 
                  stroke={colors.requetes} 
                  fill="url(#colorRequetes)" 
                  strokeWidth={2}
                  name="Requêtes"
                />
              )}
              {showBenefices && (
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="benefices" 
                  stroke={colors.benefices} 
                  fill="url(#colorBenefices)" 
                  strokeWidth={2}
                  name="Bénéfices"
                />
              )}
            </AreaChart>
          ) : (
            <RechartsLineChart data={chartData} margin={{ top: 20, right: 50, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxisLeft}
                orientation="left"
                label={{ value: 'Commandes & Requêtes', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }}
                ticks={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500]}
              />
              <YAxis 
                yAxisId="right"
                stroke="#10b981"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxisRight}
                orientation="right"
                label={{ value: 'Bénéfices (€)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#10b981' } }}
                domain={[0, 140000]}
                allowDataOverflow={false}
                tickCount={15}
              />
              <Tooltip content={<CustomTooltip />} />
              {showCommandes && (
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="commandes" 
                  stroke={colors.commandes} 
                  strokeWidth={3}
                  dot={{ fill: colors.commandes, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Commandes"
                />
              )}
              {showRequetes && (
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="requetes" 
                  stroke={colors.requetes} 
                  strokeWidth={3}
                  dot={{ fill: colors.requetes, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Requêtes"
                />
              )}
              {showBenefices && (
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="benefices" 
                  stroke={colors.benefices} 
                  strokeWidth={3}
                  dot={{ fill: colors.benefices, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Bénéfices"
                />
              )}
            </RechartsLineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
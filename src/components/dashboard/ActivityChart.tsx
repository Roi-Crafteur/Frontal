import React, { useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const fullData = [
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

const COLORS = {
  commandes: '#3b82f6', // blue-500
  requetes: '#f59e0b',  // amber-500
  benefices: '#10b981', // green-500
};

const LABELS = {
  commandes: 'Commandes',
  requetes: 'Requêtes',
  benefices: 'Bénéfices',
};

type ChartType = 'line' | 'area' | 'bar';
type PeriodType = 12 | 24 | 36;

const ActivityChart: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [period, setPeriod] = useState<PeriodType>(24);
  const [show, setShow] = useState({ commandes: true, requetes: true, benefices: true });

  // Filtrer les données selon la période sélectionnée
  const data = useMemo(() => fullData.slice(-period), [period]);
  const categories = useMemo(() => data.map(d => d.month), [data]);

  // Préparer les séries pour ApexCharts avec axes Y fixes
  const series = useMemo(() => [
    show.commandes && {
      name: LABELS.commandes,
      data: data.map(d => d.commandes),
      color: COLORS.commandes,
      type: chartType,
      yAxis: 0, // Toujours axe gauche
    },
    show.requetes && {
      name: LABELS.requetes,
      data: data.map(d => d.requetes),
      color: COLORS.requetes,
      type: chartType,
      yAxis: 0, // Toujours axe gauche
    },
    show.benefices && {
      name: LABELS.benefices,
      data: data.map(d => d.benefices),
      color: COLORS.benefices,
      type: chartType,
      yAxis: 1, // Toujours axe droit
    },
  ].filter(Boolean), [data, show, chartType]);

  // Options ApexCharts
  const options: ApexOptions = {
    chart: {
      id: 'activity-apex',
      type: chartType,
      fontFamily: 'inherit',
      toolbar: { show: false },
      zoom: { enabled: false },
      height: '100%',
      stacked: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4,
    },
    xaxis: {
      categories,
      labels: { style: { fontSize: '13px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        seriesName: ['Commandes', 'Requêtes'], // Lie cet axe à ces séries spécifiquement
        labels: {
          style: { fontSize: '13px' },
          formatter: (val: number) => val.toLocaleString(),
        },
        title: { 
          text: 'Commandes & Requêtes',
          style: { color: '#6B7280' }
        },
        show: show.commandes || show.requetes, // Affiche si au moins une série gauche est active
      },
      {
        seriesName: 'Bénéfices', // Lie cet axe spécifiquement aux bénéfices
        opposite: true,
        labels: {
          style: { fontSize: '13px' },
          formatter: (val: number) => `${(val / 1000).toFixed(0)}k€`,
        },
        title: { 
          text: 'Bénéfices (€)',
          style: { color: '#6B7280' }
        },
        show: show.benefices, // Affiche uniquement si les bénéfices sont actifs
      },
    ],
    colors: [COLORS.commandes, COLORS.requetes, COLORS.benefices],
    legend: {
      show: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val: number, opts: any) => {
          // Identifie les bénéfices par le nom de la série plutôt que par l'index
          const seriesName = opts.w.config.series[opts.seriesIndex]?.name;
          if (seriesName === 'Bénéfices') {
            return `€${val.toLocaleString()}`;
          }
          return val.toLocaleString();
        },
      },
    },
    markers: {
      size: 5,
      strokeWidth: 3,
      hover: { size: 7 },
    },
    fill: {
      type: chartType === 'area' ? 'gradient' : 'solid',
      gradient: {
        shadeIntensity: 0.2,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
  };

  // Légende interactive
  const legendItems = [
    { key: 'commandes', color: COLORS.commandes, label: LABELS.commandes },
    { key: 'requetes', color: COLORS.requetes, label: LABELS.requetes },
    { key: 'benefices', color: COLORS.benefices, label: LABELS.benefices },
  ];

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col">
      {/* Contrôles */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          {(['area', 'line', 'bar'] as ChartType[]).map(type => (
            <button
                key={type}
                onClick={() => setChartType(type)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all duration-200 ${chartType === type ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {type === 'area' ? 'Aires' : type === 'line' ? 'Lignes' : 'Barres'}
            </button>
            ))}
          </div>
        <div className="flex items-center gap-2">
            {[12, 24, 36].map((p) => (
            <button
                key={p}
                onClick={() => setPeriod(p as PeriodType)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all duration-200 ${period === p ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {p} mois
            </button>
            ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {legendItems.map(item => (
            <button
              key={item.key}
              onClick={() => setShow(s => ({ ...s, [item.key]: !s[item.key as keyof typeof s] }))}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border transition-all duration-200 ${show[item.key as keyof typeof show] ? '' : 'opacity-50 grayscale'} border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {/* Graphique */}
      <div className="flex-1 min-h-[320px]">
        <ReactApexChart
          options={options}
          series={series as any}
          type={chartType}
          height={400}
          width="100%"
        />
      </div>
    </div>
  );
};

export default ActivityChart;
import { useState, useEffect, useMemo } from "react";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";
import { ShoppingCart, Package, BarChart, LineChart, DollarSign, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function StatsCards() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showChart, setShowChart] = useState<string | null>(null);

  // 🔄 Actualisation automatique
  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    const refreshStats = () => setLastUpdate(new Date());

    const timeInterval = setInterval(updateTime, 1000);
    const statsInterval = setInterval(refreshStats, 30000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const currentTimeString = currentTime.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  // 📊 Données dynamiques
  const getRandomVariation = (base: number, variation: number = 2) => {
    const random = Math.floor(Math.random() * (variation * 2 + 1)) - variation;
    return Math.max(0, base + random);
  };

  // 🎯 DONNÉES HIER VS AUJOURD'HUI
  const getYesterdaySameTime = () => {
    const yesterday = new Date(currentTime);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 🚨 ALERTES ET INDICATEURS CRITIQUES
  const getPerformanceStatus = () => {
    const todayCommandes = getRandomVariation(23);
    const yesterdayCommandes = 20;
    const variation = ((todayCommandes - yesterdayCommandes) / yesterdayCommandes) * 100;
    
    if (variation >= 10) return { status: 'excellent', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' };
    if (variation >= 0) return { status: 'bon', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100' };
    return { status: 'attention', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100' };
  };

  const performanceStatus = getPerformanceStatus();

  const statsItems = [
    {
      title: "AUJOURD'HUI",
      description: `${currentTimeString} - En cours`,
      link: "#",
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      stats: [
        { value: getRandomVariation(23).toString(), label: "Commandes", priority: true },
        { value: getRandomVariation(20).toString(), label: "Lignes", priority: false },
        { value: getRandomVariation(94, 5).toString(), label: "Unités", priority: false }
      ],
      highlight: true
    },
    {
      title: "HIER À LA MÊME HEURE",
      description: `${getYesterdaySameTime()}`,
      link: "#",
      icon: <ShoppingCart className="w-5 h-5 text-gray-600" />,
      stats: [
        { value: "20", label: "Commandes", priority: true },
        { value: "18", label: "Lignes", priority: false },
        { value: "85", label: "Unités", priority: false }
      ]
    }
  ];

  const chartButtons = [
    { id: 'commandes', icon: BarChart, label: 'Commandes', color: 'blue' },
    { id: 'requetes', icon: LineChart, label: 'Requêtes', color: 'amber' },
    { id: 'benefices', icon: DollarSign, label: 'Bénéfices', color: 'green' }
  ];

  // 🎯 GRAPHIQUE JOURNÉE OPTIMISÉ
  const DailyChart = ({ type }: { type: string }) => {
    const chartData = {
      commandes: [
        { hour: '00h', value: 12, target: 15 },
        { hour: '04h', value: 8, target: 10 },
        { hour: '08h', value: 45, target: 40 },
        { hour: '12h', value: 78, target: 75 },
        { hour: '16h', value: 92, target: 85 },
        { hour: '20h', value: 34, target: 30 },
        { hour: '24h', value: 15, target: 12 }
      ],
      requetes: [
        { hour: '00h', value: 5, target: 6 },
        { hour: '04h', value: 3, target: 4 },
        { hour: '08h', value: 18, target: 20 },
        { hour: '12h', value: 32, target: 35 },
        { hour: '16h', value: 41, target: 38 },
        { hour: '20h', value: 15, target: 12 },
        { hour: '24h', value: 7, target: 5 }
      ],
      benefices: [
        { hour: '00h', value: 1200, target: 1500 },
        { hour: '04h', value: 800, target: 1000 },
        { hour: '08h', value: 4500, target: 4000 },
        { hour: '12h', value: 7800, target: 7500 },
        { hour: '16h', value: 9200, target: 8500 },
        { hour: '20h', value: 3400, target: 3000 },
        { hour: '24h', value: 1500, target: 1200 }
      ]
    };

    const data = chartData[type as keyof typeof chartData] || chartData.commandes;
    const maxValue = Math.max(...data.map(d => Math.max(d.value, d.target)));
    const colors = {
      commandes: { bar: 'bg-blue-500', target: 'bg-blue-200' },
      requetes: { bar: 'bg-amber-500', target: 'bg-amber-200' },
      benefices: { bar: 'bg-green-500', target: 'bg-green-200' }
    };

    const color = colors[type as keyof typeof colors];

    return (
      <div className="h-80 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="text-xs text-gray-500 mb-2 font-medium">{item.hour}</div>
            
            {/* Barre cible */}
            <div 
              className={`${color.target} rounded-t w-full opacity-50 mb-1`}
              style={{ 
                height: `${(item.target / maxValue) * 280}px`,
                minHeight: '2px'
              }}
            />
            
            {/* Barre réelle */}
            <div 
              className={`${color.bar} rounded-t w-full transition-all duration-300 hover:opacity-80 shadow-sm`}
              style={{ 
                height: `${(item.value / maxValue) * 280}px`,
                minHeight: '4px'
              }}
            />
            
            <div className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-2 text-center">
              {type === 'benefices' ? `€${item.value.toLocaleString()}` : item.value}
            </div>
            
            {/* Indicateur de performance */}
            <div className={`text-xs mt-1 font-medium ${
              item.value >= item.target ? 'text-green-600' : 'text-orange-600'
            }`}>
              {item.value >= item.target ? '✓' : '!'}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  // Génère des valeurs réalistes arrondies au 500ème près
  function randomSerie(base: number, variance: number) {
    return Array.from({ length: 7 }, (_, i) => {
      const val = base + Math.round((Math.random() - 0.5) * variance);
      return Math.round(val / 500) * 500;
    });
  }

  const COLORS = {
    commandes: '#3b82f6', // blue-500 (bleu)
    requetes: '#f59e0b',  // amber-500 (orange)
    benefices: '#10b981', // green-500 (vert)
  };

  // Données fixes pour éviter le rechargement constant
  const commandes = useMemo(() => [3000, 4500, 3500, 4000, 3000, 2500, 4500], []);
  const requetes = useMemo(() => [2500, 3200, 2800, 3500, 2700, 3000, 3300], []); // Données distinctes pour les requêtes
  const benefices = useMemo(() => [1200, 1800, 900, 2100, 1500, 1050, 1800], []); // Réduit pour plus de visibilité

  // Totaux de la semaine
  const totalCommandes = commandes.reduce((a, b) => a + b, 0);
  const totalRequetes = requetes.reduce((a, b) => a + b, 0);
  const totalBenefices = benefices.reduce((a, b) => a + b, 0);

  // Calcul min/max dynamiques pour axes
  const leftValues = [...commandes, ...requetes];
  const rightValues = benefices;
  const minLeft = Math.min(...leftValues);
  const maxLeft = Math.max(...leftValues);
  const minRight = Math.min(...rightValues);
  const maxRight = Math.max(...rightValues);

  const series = useMemo(() => [
    {
      name: 'Commandes',
      data: commandes,
      color: COLORS.commandes,
      yAxis: 0,
    },
    {
      name: 'Requêtes',
      data: requetes,
      color: COLORS.requetes,
      yAxis: 0,
    },
    {
      name: 'Bénéfices',
      data: benefices,
      color: COLORS.benefices,
      yAxis: 1,
    },
  ], [commandes, requetes, benefices]);

  const options: ApexOptions = useMemo(() => ({
    chart: {
      id: 'weekly-chart-stable',
      type: 'area',
      height: '100%',
      sparkline: { enabled: false },
      animations: { 
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      toolbar: { show: false },
      zoom: { enabled: false },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
      background: 'transparent',
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: '9px',
                fontWeight: '600',
              },
            },
          },
          markers: {
            size: 3,
            strokeWidth: 1.5,
          },
          stroke: {
            width: [2, 2, 2],
          },
          grid: {
            strokeDashArray: 1,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: '10px',
                fontWeight: '600',
              },
            },
          },
          markers: {
            size: 4,
            strokeWidth: 2,
          },
          stroke: {
            width: [2.5, 2.5, 2.5],
          },
          grid: {
            strokeDashArray: 1.5,
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          markers: {
            size: 5,
            strokeWidth: 2.5,
          },
          stroke: {
            width: [3, 3, 3],
          },
        },
      },
    ],
    stroke: {
      curve: 'smooth',
      width: [3, 3, 3],
      lineCap: 'round',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: [
          'rgba(59, 130, 246, 0.1)',
          'rgba(245, 158, 11, 0.1)', 
          'rgba(16, 185, 129, 0.1)'
        ],
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.05,
        stops: [0, 50, 100],
        colorStops: []
      },
    },
    colors: [COLORS.commandes, COLORS.requetes, COLORS.benefices],
    dataLabels: { enabled: false },
    xaxis: {
      categories: days,
      labels: { 
        show: true,
        style: {
          fontSize: '11px',
          colors: '#6B7280',
          fontWeight: '600',
        },
        offsetY: 5,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        show: true,
        width: 1,
        position: 'back',
        opacity: 0.3,
        stroke: {
          color: '#6B7280',
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: [
      {
        show: false,
        min: 2000,
        max: 5000,
      },
      {
        show: false,
        min: 800,
        max: 2200,
        opposite: true,
      },
    ],
    grid: { 
      show: true,
      borderColor: 'rgba(229, 231, 235, 0.6)',
      strokeDashArray: 2,
      position: 'back',
      xaxis: {
        lines: { show: false }
      },
      yaxis: {
        lines: { show: true }
      },
      row: {
        colors: ['transparent', 'rgba(248, 250, 252, 0.4)'],
        opacity: 0.5
      },
    },
    legend: { show: false },
    tooltip: { 
      enabled: true,
      shared: true,
      intersect: false,
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'inherit',
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const commandes = series[0][dataPointIndex];
        const requetes = series[1][dataPointIndex];
        const benefices = series[2][dataPointIndex];
        const day = w.globals.labels[dataPointIndex];
        
        return `
          <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[200px]">
            <div class="font-semibold text-gray-800 mb-2 text-center">${day}</div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span class="text-sm text-gray-600">Commandes</span>
                </div>
                <span class="font-semibold text-blue-600">${commandes?.toLocaleString() || 0}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span class="text-sm text-gray-600">Requêtes</span>
                </div>
                <span class="font-semibold text-amber-600">${requetes?.toLocaleString() || 0}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  <span class="text-sm text-gray-600">Bénéfices</span>
                </div>
                <span class="font-semibold text-green-600">${benefices?.toLocaleString() || 0}€</span>
              </div>
            </div>
          </div>
        `;
      },
    },
    markers: {
      size: 5,
      colors: ['#ffffff'],
      strokeColors: [COLORS.commandes, COLORS.requetes, COLORS.benefices],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      hover: {
        size: 8,
        sizeOffset: 3
      }
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.15,
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'darken',
          value: 0.35,
        }
      }
    },
  }), []);

  const BigStatsCard = useMemo(() => (
    <motion.div 
      className="bg-gradient-to-br from-white via-gray-50/50 to-white rounded-xl border border-gray-200/60 shadow-lg p-3 sm:p-4 md:p-5 w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] flex flex-col backdrop-blur-sm transition-all duration-500 ease-out overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Gradient overlay pour plus d'élégance */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-green-500/5 pointer-events-none" />
      
      {/* En-tête avec totaux - responsive */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="text-center sm:text-left">
          <motion.div 
            className="text-sm md:text-base font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            📊 Semaine
          </motion.div>
          <div className="text-xs text-gray-500 font-medium">Performance globale</div>
        </div>
        <motion.div 
          className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 text-center sm:text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div 
            className="min-w-0 bg-white/60 backdrop-blur-sm rounded-lg px-2 py-1 border border-blue-200/50"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs sm:text-sm font-bold text-blue-600">{totalCommandes.toLocaleString()}</div>
            <div className="text-xs text-gray-500 font-medium">Commandes</div>
          </motion.div>
          <motion.div 
            className="min-w-0 bg-white/60 backdrop-blur-sm rounded-lg px-2 py-1 border border-amber-200/50"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(245, 158, 11, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs sm:text-sm font-bold text-amber-600">{totalRequetes.toLocaleString()}</div>
            <div className="text-xs text-gray-500 font-medium">Requêtes</div>
          </motion.div>
          <motion.div 
            className="min-w-0 bg-white/60 backdrop-blur-sm rounded-lg px-2 py-1 border border-green-200/50"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs sm:text-sm font-bold text-green-600">{totalBenefices.toLocaleString()}€</div>
            <div className="text-xs text-gray-500 font-medium">Bénéfices</div>
          </motion.div>
        </motion.div>
      </motion.div>
      
             {/* Graphique responsive avec animation */}
       <motion.div 
         className="flex-1 min-h-0 w-full overflow-hidden rounded-lg relative z-10"
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
         style={{
           background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.9) 100%)",
           transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
         }}
       >
        <ReactApexChart
          options={options}
          series={series as any}
          type="area"
          height="100%"
          width="100%"
          key="stable-chart"
        />
        
        {/* Overlay subtil pour l'effet glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none rounded-lg" />
      </motion.div>
      
      {/* Indicateur de mise à jour animé */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full z-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  ), [options, series, totalCommandes, totalRequetes, totalBenefices]);

  return (
    <motion.div
      initial={{ opacity: 0.9, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* 🎯 HEADER AVEC INDICATEURS CRITIQUES */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
            Tableau de Bord Opérationnel
          </h2>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${performanceStatus.bg}`}>
            <performanceStatus.icon className={`w-4 h-4 ${performanceStatus.color}`} />
            <span className={`text-sm font-medium ${performanceStatus.color}`}>
              {performanceStatus.status.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Dernière MAJ: {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
      
      {/* 🎯 CARTES STATISTIQUES + GRAPHIQUE DE LA SEMAINE */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Carte Aujourd'hui - responsive */}
          <div className="md:col-span-1 lg:col-span-1">
            {/* Rendu direct de la carte sans HoverEffect */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 h-[220px] lg:h-[220px] md:h-[180px] sm:h-[160px] flex flex-col justify-center">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {statsItems[0].icon}
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">{statsItems[0].title}</h3>
                </div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">{statsItems[0].description}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 lg:gap-3">
                {statsItems[0].stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`text-lg lg:text-2xl font-bold ${stat.priority ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Carte Hier - responsive */}
          <div className="md:col-span-1 lg:col-span-1">
            {/* Rendu direct de la carte sans HoverEffect */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 h-[220px] lg:h-[220px] md:h-[180px] sm:h-[160px] flex flex-col justify-center">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {statsItems[1].icon}
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">{statsItems[1].title}</h3>
                </div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">{statsItems[1].description}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 lg:gap-3">
                {statsItems[1].stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`text-lg lg:text-2xl font-bold ${stat.priority ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Graphique de la semaine - responsive avec animations */}
          <motion.div 
            className="md:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2 
            }}
            layout
            layoutId="weekly-chart-container"
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key="big-stats-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  transformOrigin: "center",
                  willChange: "transform, opacity"
                }}
              >
                {BigStatsCard}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* 🎯 BOUTONS GRAPHIQUES RAPIDES */}
      {showChart && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-wrap gap-3 justify-center"
        >
          {chartButtons.map((button) => (
            <motion.button
              key={button.id}
              onClick={() => setShowChart(showChart === button.id ? null : button.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                showChart === button.id
                  ? `bg-${button.color}-500 text-white shadow-lg`
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <button.icon className="w-5 h-5" />
              <span>{button.label}</span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* 🎯 GRAPHIQUE JOURNÉE AGRANDI */}
      {showChart && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Graphique {chartButtons.find(b => b.id === showChart)?.label} - Journée
            </h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span>Cible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 ${chartButtons.find(b => b.id === showChart)?.color === 'blue' ? 'bg-blue-500' : chartButtons.find(b => b.id === showChart)?.color === 'amber' ? 'bg-amber-500' : 'bg-green-500'} rounded`}></div>
                <span>Réel</span>
              </div>
            </div>
          </div>
          <DailyChart type={showChart} />
        </motion.div>
      )}
    </motion.div>
  );
}
import { useState, useEffect } from "react";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";
import { ShoppingCart, Package, BarChart, LineChart, DollarSign, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

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
    },
    {
      title: "STOCK DISPONIBLE",
      description: "État du catalogue",
      link: "#",
      icon: <Package className="w-5 h-5 text-green-600" />,
      stats: [
        { value: "52 231", label: "Articles", priority: true },
        { value: "354", label: "Officines", priority: false },
        { value: getRandomVariation(98, 1) + "%", label: "Disponibilité", priority: true }
      ],
      alert: getRandomVariation(98, 1) < 95
    },
    {
      title: "PERFORMANCE",
      description: "Comparaison instantanée",
      link: "#",
      icon: <performanceStatus.icon className={`w-5 h-5 ${performanceStatus.color}`} />,
      stats: [
        { 
          value: "+12%", 
          label: "Commandes", 
          change: "vs hier",
          priority: true,
          trend: "up" as const
        },
        { 
          value: "€89,432", 
          label: "CA", 
          change: "+8%",
          priority: true,
          trend: "up" as const
        }
      ],
      status: performanceStatus.status
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

  return (
    <motion.div
      key={lastUpdate.getTime()}
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
      
      {/* 🎯 CARTES STATISTIQUES */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <HoverEffect 
          items={statsItems} 
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-2" 
        />
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
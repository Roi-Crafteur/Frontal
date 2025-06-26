import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, LineChart, TrendingUp, Settings, Eye, EyeOff } from "lucide-react";

interface ChartData {
  month: string;
  commandes: number;
  requetes: number;
}

type ChartType = 'area' | 'line' | 'bar';

export default function ActivityChart() {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [showCommandes, setShowCommandes] = useState(true);
  const [showRequetes, setShowRequetes] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: ChartData } | null>(null);

  // Données pour 24 mois avec des valeurs plus réalistes
  const rawData: ChartData[] = [
    { month: 'avr. 2023', commandes: 2800, requetes: 1000 },
    { month: 'mai 2023', commandes: 1800, requetes: 800 },
    { month: 'juin 2023', commandes: 2900, requetes: 1100 },
    { month: 'juil. 2023', commandes: 2500, requetes: 900 },
    { month: 'août 2023', commandes: 2700, requetes: 1000 },
    { month: 'sept. 2023', commandes: 2300, requetes: 850 },
    { month: 'oct. 2023', commandes: 2400, requetes: 900 },
    { month: 'nov. 2023', commandes: 2800, requetes: 1050 },
    { month: 'déc. 2023', commandes: 2600, requetes: 950 },
    { month: 'janv. 2024', commandes: 2900, requetes: 1100 },
    { month: 'févr. 2024', commandes: 1700, requetes: 750 },
    { month: 'mars 2024', commandes: 2500, requetes: 950 },
    { month: 'avr. 2024', commandes: 2400, requetes: 900 },
    { month: 'mai 2024', commandes: 2600, requetes: 950 },
    { month: 'juin 2024', commandes: 2200, requetes: 800 },
    { month: 'juil. 2024', commandes: 1800, requetes: 750 },
    { month: 'août 2024', commandes: 2300, requetes: 850 },
    { month: 'sept. 2024', commandes: 2100, requetes: 800 },
    { month: 'oct. 2024', commandes: 1600, requetes: 700 },
    { month: 'nov. 2024', commandes: 2400, requetes: 900 },
    { month: 'déc. 2024', commandes: 2200, requetes: 850 },
    { month: 'janv. 2025', commandes: 2000, requetes: 800 },
    { month: 'févr. 2025', commandes: 2300, requetes: 850 },
    { month: 'mars 2025', commandes: 2500, requetes: 950 }
  ];

  // Calcul des valeurs min/max pour l'échelle
  const { minValue, maxValue } = useMemo(() => {
    const allValues = rawData.flatMap(d => [
      showCommandes ? d.commandes : 0,
      showRequetes ? d.requetes : 0
    ]).filter(v => v > 0);
    
    if (allValues.length === 0) return { minValue: 0, maxValue: 3000 };
    
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1;
    
    return {
      minValue: Math.max(0, min - padding),
      maxValue: max + padding
    };
  }, [rawData, showCommandes, showRequetes]);

  // Génération des points pour les courbes
  const generatePoints = (data: number[], color: string, opacity: number = 1) => {
    const width = 800;
    const height = 200;
    const stepX = width / (data.length - 1);
    
    return data.map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - minValue) / (maxValue - minValue)) * height;
      return { x, y, value, index };
    });
  };

  // Génération du path SVG pour les courbes avec morphing
  const generatePath = (points: { x: number; y: number }[], type: ChartType) => {
    if (points.length === 0) return '';
    
    if (type === 'bar') return ''; // Les barres sont gérées séparément
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    if (type === 'line') {
      // Ligne droite avec points de contrôle pour le morphing
      for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const currentPoint = points[i];
        // Ajouter des points de contrôle même pour les lignes droites pour permettre le morphing
        const cpx1 = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.3;
        const cpy1 = prevPoint.y;
        const cpx2 = currentPoint.x - (currentPoint.x - prevPoint.x) * 0.3;
        const cpy2 = currentPoint.y;
        path += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${currentPoint.x} ${currentPoint.y}`;
      }
    } else {
      // Courbe lisse pour area avec morphing amélioré
      for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const currentPoint = points[i];
        const nextPoint = points[i + 1];
        
        // Calcul des points de contrôle avec tension variable
        const tension = 0.4;
        const cpx1 = prevPoint.x + (currentPoint.x - prevPoint.x) * tension;
        const cpy1 = prevPoint.y + (currentPoint.y - prevPoint.y) * 0.1;
        const cpx2 = currentPoint.x - (currentPoint.x - prevPoint.x) * tension;
        const cpy2 = currentPoint.y - (nextPoint ? (nextPoint.y - currentPoint.y) * 0.1 : 0);
        
        path += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${currentPoint.x} ${currentPoint.y}`;
      }
    }
    
    if (type === 'area') {
      // Fermer le path pour créer une aire avec morphing fluide
      path += ` L ${points[points.length - 1].x} ${200} L ${points[0].x} ${200} Z`;
    }
    
    return path;
  };

  const commandesData = rawData.map(d => d.commandes);
  const requetesData = rawData.map(d => d.requetes);
  
  const commandesPoints = showCommandes ? generatePoints(commandesData, '#3b82f6') : [];
  const requetesPoints = showRequetes ? generatePoints(requetesData, '#f59e0b') : [];

  const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convertir la position de la souris en index de données
    const dataIndex = Math.round((x / rect.width) * (rawData.length - 1));
    
    if (dataIndex >= 0 && dataIndex < rawData.length) {
      setHoveredPoint({
        x: x,
        y: y,
        data: rawData[dataIndex]
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const chartTypeButtons = [
    { type: 'area' as ChartType, icon: TrendingUp, label: 'Aires' },
    { type: 'line' as ChartType, icon: LineChart, label: 'Lignes' },
    { type: 'bar' as ChartType, icon: BarChart3, label: 'Barres' }
  ];

  // Variants pour les animations de morphing
  const morphVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0,
      rotateX: -15,
      y: 20
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      rotateX: 15,
      y: -20,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    }
  };

  const pathMorphVariants = {
    initial: { 
      pathLength: 0, 
      opacity: 0,
      scale: 0.9,
      filter: "blur(4px)"
    },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        pathLength: { 
          duration: 1.5, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        },
        opacity: { 
          duration: 0.8, 
          ease: "easeOut" 
        },
        scale: { 
          duration: 1.2, 
          ease: [0.34, 1.56, 0.64, 1] 
        },
        filter: { 
          duration: 0.6, 
          ease: "easeOut" 
        }
      }
    },
    exit: { 
      pathLength: 0, 
      opacity: 0,
      scale: 0.9,
      filter: "blur(4px)",
      transition: {
        duration: 0.8,
        ease: [0.55, 0.085, 0.68, 0.53]
      }
    }
  };

  const barMorphVariants = {
    initial: { 
      scaleY: 0, 
      opacity: 0,
      y: 200,
      filter: "blur(2px)"
    },
    animate: { 
      scaleY: 1, 
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        mass: 0.8
      }
    },
    exit: { 
      scaleY: 0, 
      opacity: 0,
      y: 200,
      filter: "blur(2px)",
      transition: {
        duration: 0.6,
        ease: [0.55, 0.085, 0.68, 0.53]
      }
    }
  };

  const pointMorphVariants = {
    initial: { 
      scale: 0, 
      opacity: 0,
      rotate: -180
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass: 0.5
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      rotate: 180,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.8,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-full"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-xl h-full flex flex-col">
        {/* Header avec contrôles */}
        <div className="flex flex-col space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <motion.h3 
              className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-white"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              Activité sur 24 mois
            </motion.h3>
            
            {/* Type de graphique avec morphing */}
            <motion.div 
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {chartTypeButtons.map(({ type, icon: Icon, label }) => (
                <motion.button
                  key={type}
                  onClick={() => setChartType(type)}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: chartType === type ? undefined : "rgba(255,255,255,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-500 ${
                    chartType === type
                      ? 'bg-white dark:bg-gray-700 text-teal-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                  }`}
                  layout
                  layoutId={`chart-type-${type}`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: chartType === type ? 360 : 0,
                      scale: chartType === type ? 1.1 : 1
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                  <span className="hidden sm:inline">{label}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
          
          {/* Légende interactive avec morphing */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={() => setShowCommandes(!showCommandes)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-700 ${
                showCommandes 
                  ? 'bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                animate={{ 
                  scale: showCommandes ? 1 : 0.8,
                  opacity: showCommandes ? 1 : 0.5,
                  rotate: showCommandes ? 0 : -90
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              >
                {showCommandes ? (
                  <Eye className="w-4 h-4 text-blue-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
              </motion.div>
              <motion.div 
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm`}
                animate={{ 
                  backgroundColor: showCommandes ? '#3b82f6' : '#d1d5db',
                  scale: showCommandes ? 1 : 0.8,
                  rotate: showCommandes ? 0 : 180
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                whileHover={{
                  scale: showCommandes ? 1.2 : 1,
                  transition: { duration: 0.2 }
                }}
              />
              <motion.span 
                className={`text-xs sm:text-sm font-medium`}
                animate={{ 
                  color: showCommandes ? '#1d4ed8' : '#6b7280',
                  opacity: showCommandes ? 1 : 0.7,
                  x: showCommandes ? 0 : -2
                }}
                transition={{ duration: 0.4 }}
              >
                Commandes traitées
              </motion.span>
            </motion.button>
            
            <motion.button
              onClick={() => setShowRequetes(!showRequetes)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-700 ${
                showRequetes 
                  ? 'bg-amber-50 dark:bg-amber-900/20 shadow-sm' 
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                animate={{ 
                  scale: showRequetes ? 1 : 0.8,
                  opacity: showRequetes ? 1 : 0.5,
                  rotate: showRequetes ? 0 : -90
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              >
                {showRequetes ? (
                  <Eye className="w-4 h-4 text-amber-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
              </motion.div>
              <motion.div 
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm`}
                animate={{ 
                  backgroundColor: showRequetes ? '#f59e0b' : '#d1d5db',
                  scale: showRequetes ? 1 : 0.8,
                  rotate: showRequetes ? 0 : 180
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                whileHover={{
                  scale: showRequetes ? 1.2 : 1,
                  transition: { duration: 0.2 }
                }}
              />
              <motion.span 
                className={`text-xs sm:text-sm font-medium`}
                animate={{ 
                  color: showRequetes ? '#d97706' : '#6b7280',
                  opacity: showRequetes ? 1 : 0.7,
                  x: showRequetes ? 0 : -2
                }}
                transition={{ duration: 0.4 }}
              >
                Requêtes traitées
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Graphique avec morphing avancé */}
        <div className="relative flex-1 min-h-0">
          {/* Y-axis labels */}
          <motion.div 
            className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 pr-2 sm:pr-4 font-medium z-10"
            animate={{ 
              opacity: (showCommandes || showRequetes) ? 1 : 0.5,
              x: (showCommandes || showRequetes) ? 0 : -10
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.1,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              >
                {Math.round(maxValue - (i * (maxValue - minValue) / 5))}
              </motion.span>
            ))}
          </motion.div>

          {/* Chart container */}
          <div className="ml-6 sm:ml-8 h-full flex flex-col">
            <motion.svg 
              viewBox="0 0 800 200" 
              className="w-full flex-1 cursor-crosshair"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: "1000px" }}
            >
              {/* Grid lines avec morphing */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.line
                  key={i}
                  x1="0"
                  y1={i * 40}
                  x2="800"
                  y2={i * 40}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-gray-200 dark:text-gray-700"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 0.5, scaleX: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
              ))}
              
              {/* Vertical grid lines */}
              {rawData.map((_, i) => {
                if (i % 4 === 0) {
                  const x = (i / (rawData.length - 1)) * 800;
                  return (
                    <motion.line
                      key={`v-${i}`}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="200"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-gray-200 dark:text-gray-700"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 0.3, scaleY: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.3 + i * 0.05,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    />
                  );
                }
                return null;
              })}
              
              {/* Gradients avec morphing */}
              <defs>
                <motion.linearGradient 
                  id="gradient1" 
                  x1="0%" 
                  y1="0%" 
                  x2="0%" 
                  y2="100%"
                  animate={{
                    opacity: showCommandes ? 1 : 0
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </motion.linearGradient>
                <motion.linearGradient 
                  id="gradient2" 
                  x1="0%" 
                  y1="0%" 
                  x2="0%" 
                  y2="100%"
                  animate={{
                    opacity: showRequetes ? 1 : 0
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                </motion.linearGradient>
              </defs>
              
              {/* Data visualization avec morphing avancé */}
              <AnimatePresence mode="wait">
                {chartType === 'bar' ? (
                  // Barres avec morphing
                  <motion.g
                    key="bars"
                    variants={morphVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {rawData.map((data, index) => {
                      const x = (index / (rawData.length - 1)) * 800;
                      const barWidth = 800 / rawData.length * 0.6;
                      const commandesHeight = showCommandes ? ((data.commandes - minValue) / (maxValue - minValue)) * 200 : 0;
                      const requetesHeight = showRequetes ? ((data.requetes - minValue) / (maxValue - minValue)) * 200 : 0;
                      
                      return (
                        <g key={index}>
                          <AnimatePresence>
                            {showCommandes && (
                              <motion.rect
                                variants={barMorphVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ 
                                  delay: index * 0.03,
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 15
                                }}
                                x={x - barWidth/4}
                                y={200 - commandesHeight}
                                width={barWidth/2}
                                height={commandesHeight}
                                fill="#3b82f6"
                                rx="2"
                                whileHover={{
                                  scale: 1.05,
                                  filter: "brightness(1.1)",
                                  transition: { duration: 0.2 }
                                }}
                              />
                            )}
                          </AnimatePresence>
                          <AnimatePresence>
                            {showRequetes && (
                              <motion.rect
                                variants={barMorphVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ 
                                  delay: index * 0.03 + 0.1,
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 15
                                }}
                                x={x + barWidth/4}
                                y={200 - requetesHeight}
                                width={barWidth/2}
                                height={requetesHeight}
                                fill="#f59e0b"
                                rx="2"
                                whileHover={{
                                  scale: 1.05,
                                  filter: "brightness(1.1)",
                                  transition: { duration: 0.2 }
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </g>
                      );
                    })}
                  </motion.g>
                ) : (
                  // Courbes et aires avec morphing avancé
                  <motion.g
                    key={`curves-${chartType}`}
                    variants={morphVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <AnimatePresence>
                      {showCommandes && (
                        <motion.path
                          key="commandes-path"
                          d={generatePath(commandesPoints, chartType)}
                          fill={chartType === 'area' ? 'url(#gradient1)' : 'none'}
                          stroke="#3b82f6"
                          strokeWidth={chartType === 'line' ? "3" : "2"}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          variants={pathMorphVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          style={{ 
                            transformOrigin: "center",
                            filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2))"
                          }}
                        />
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {showRequetes && (
                        <motion.path
                          key="requetes-path"
                          d={generatePath(requetesPoints, chartType)}
                          fill={chartType === 'area' ? 'url(#gradient2)' : 'none'}
                          stroke="#f59e0b"
                          strokeWidth={chartType === 'line' ? "3" : "2"}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          variants={pathMorphVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ delay: 0.2 }}
                          style={{ 
                            transformOrigin: "center",
                            filter: "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.2))"
                          }}
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Points interactifs avec morphing */}
                    {chartType !== 'area' && (
                      <>
                        <AnimatePresence>
                          {showCommandes && commandesPoints.map((point, index) => (
                            <motion.circle
                              key={`c-${index}`}
                              cx={point.x}
                              cy={point.y}
                              r="4"
                              fill="#3b82f6"
                              stroke="white"
                              strokeWidth="2"
                              variants={pointMorphVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              whileHover="hover"
                              transition={{ 
                                delay: 0.6 + index * 0.02,
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                              }}
                              className="cursor-pointer"
                              style={{ 
                                filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"
                              }}
                            />
                          ))}
                        </AnimatePresence>
                        <AnimatePresence>
                          {showRequetes && requetesPoints.map((point, index) => (
                            <motion.circle
                              key={`r-${index}`}
                              cx={point.x}
                              cy={point.y}
                              r="4"
                              fill="#f59e0b"
                              stroke="white"
                              strokeWidth="2"
                              variants={pointMorphVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              whileHover="hover"
                              transition={{ 
                                delay: 0.8 + index * 0.02,
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                              }}
                              className="cursor-pointer"
                              style={{ 
                                filter: "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))"
                              }}
                            />
                          ))}
                        </AnimatePresence>
                      </>
                    )}
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.svg>

            {/* Tooltip avec morphing */}
            <AnimatePresence>
              {hoveredPoint && (
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    scale: 0.6, 
                    y: 20,
                    rotateX: -15
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    rotateX: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.6, 
                    y: 20,
                    rotateX: 15
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-3 pointer-events-none z-20"
                  style={{
                    left: Math.min(hoveredPoint.x, 600),
                    top: Math.max(hoveredPoint.y - 80, 10),
                    transformStyle: "preserve-3d"
                  }}
                >
                  <motion.div 
                    className="text-sm font-semibold text-gray-800 dark:text-white mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {hoveredPoint.data.month}
                  </motion.div>
                  {showCommandes && (
                    <motion.div 
                      className="flex items-center space-x-2 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <motion.div 
                        className="w-3 h-3 bg-blue-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Commandes: {hoveredPoint.data.commandes.toLocaleString()}
                      </span>
                    </motion.div>
                  )}
                  {showRequetes && (
                    <motion.div 
                      className="flex items-center space-x-2 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div 
                        className="w-3 h-3 bg-amber-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                      />
                      <span className="text-gray-600 dark:text-gray-300">
                        Requêtes: {hoveredPoint.data.requetes.toLocaleString()}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* X-axis labels avec morphing */}
            <motion.div 
              className="hidden sm:flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {rawData.filter((_, i) => i % 4 === 0).map((data, i) => (
                <motion.span 
                  key={i} 
                  className="text-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 1.3 + i * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                >
                  {data.month}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Mobile X-axis labels */}
            <motion.div 
              className="flex sm:hidden justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {['2023', '2024', '2025'].map((year, i) => (
                <motion.span
                  key={year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 1.3 + i * 0.1,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                >
                  {year}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
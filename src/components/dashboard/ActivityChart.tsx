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

  // Génération du path SVG pour les courbes
  const generatePath = (points: { x: number; y: number }[], type: ChartType) => {
    if (points.length === 0) return '';
    
    if (type === 'bar') return ''; // Les barres sont gérées séparément
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    if (type === 'line') {
      // Ligne droite
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
      }
    } else {
      // Courbe lisse pour area et line
      for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const currentPoint = points[i];
        const cpx1 = prevPoint.x + (currentPoint.x - prevPoint.x) / 3;
        const cpy1 = prevPoint.y;
        const cpx2 = currentPoint.x - (currentPoint.x - prevPoint.x) / 3;
        const cpy2 = currentPoint.y;
        path += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${currentPoint.x} ${currentPoint.y}`;
      }
    }
    
    if (type === 'area') {
      // Fermer le path pour créer une aire
      path += ` L ${points[points.length - 1].x} ${200} L ${points[0].x} ${200} Z`;
    }
    
    return path;
  };

  const commandesData = rawData.map(d => d.commandes);
  const requetesData = rawData.map(d => d.requetes);
  
  const commandesPoints = showCommandes ? generatePoints(commandesData, '#fb7185') : [];
  const requetesPoints = showRequetes ? generatePoints(requetesData, '#f87171') : [];

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
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-white">
              Activité sur 24 mois
            </h3>
            
            {/* Type de graphique */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {chartTypeButtons.map(({ type, icon: Icon, label }) => (
                <motion.button
                  key={type}
                  onClick={() => setChartType(type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    chartType === type
                      ? 'bg-white dark:bg-gray-700 text-teal-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Légende interactive */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={() => setShowCommandes(!showCommandes)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                showCommandes 
                  ? 'bg-pink-50 dark:bg-pink-900/20' 
                  : 'bg-gray-100 dark:bg-gray-800 opacity-50'
              }`}
            >
              {showCommandes ? (
                <Eye className="w-4 h-4 text-pink-600" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-400" />
              )}
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                showCommandes ? 'bg-gradient-to-r from-pink-400 to-pink-500' : 'bg-gray-300'
              } shadow-sm`}></div>
              <span className={`text-xs sm:text-sm font-medium ${
                showCommandes ? 'text-pink-700 dark:text-pink-300' : 'text-gray-500'
              }`}>
                Commandes traitées
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => setShowRequetes(!showRequetes)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                showRequetes 
                  ? 'bg-red-50 dark:bg-red-900/20' 
                  : 'bg-gray-100 dark:bg-gray-800 opacity-50'
              }`}
            >
              {showRequetes ? (
                <Eye className="w-4 h-4 text-red-600" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-400" />
              )}
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                showRequetes ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gray-300'
              } shadow-sm`}></div>
              <span className={`text-xs sm:text-sm font-medium ${
                showRequetes ? 'text-red-700 dark:text-red-300' : 'text-gray-500'
              }`}>
                Requêtes traitées
              </span>
            </motion.button>
          </div>
        </div>

        {/* Graphique */}
        <div className="relative flex-1 min-h-0">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 pr-2 sm:pr-4 font-medium z-10">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i}>
                {Math.round(maxValue - (i * (maxValue - minValue) / 5))}
              </span>
            ))}
          </div>

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
            >
              {/* Grid lines */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 40}
                  x2="800"
                  y2={i * 40}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-gray-200 dark:text-gray-700"
                  opacity="0.5"
                />
              ))}
              
              {/* Vertical grid lines */}
              {rawData.map((_, i) => {
                if (i % 4 === 0) {
                  const x = (i / (rawData.length - 1)) * 800;
                  return (
                    <line
                      key={`v-${i}`}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="200"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-gray-200 dark:text-gray-700"
                      opacity="0.3"
                    />
                  );
                }
                return null;
              })}
              
              {/* Gradients */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fb7185" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f87171" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Data visualization */}
              <AnimatePresence>
                {chartType === 'bar' ? (
                  // Barres
                  <g>
                    {rawData.map((data, index) => {
                      const x = (index / (rawData.length - 1)) * 800;
                      const barWidth = 800 / rawData.length * 0.6;
                      const commandesHeight = showCommandes ? ((data.commandes - minValue) / (maxValue - minValue)) * 200 : 0;
                      const requetesHeight = showRequetes ? ((data.requetes - minValue) / (maxValue - minValue)) * 200 : 0;
                      
                      return (
                        <g key={index}>
                          {showCommandes && (
                            <motion.rect
                              initial={{ height: 0, y: 200 }}
                              animate={{ height: commandesHeight, y: 200 - commandesHeight }}
                              transition={{ duration: 0.8, delay: index * 0.02 }}
                              x={x - barWidth/4}
                              width={barWidth/2}
                              fill="#fb7185"
                              opacity="0.8"
                            />
                          )}
                          {showRequetes && (
                            <motion.rect
                              initial={{ height: 0, y: 200 }}
                              animate={{ height: requetesHeight, y: 200 - requetesHeight }}
                              transition={{ duration: 0.8, delay: index * 0.02 + 0.1 }}
                              x={x + barWidth/4}
                              width={barWidth/2}
                              fill="#f87171"
                              opacity="0.6"
                            />
                          )}
                        </g>
                      );
                    })}
                  </g>
                ) : (
                  // Courbes et aires
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    {showCommandes && (
                      <motion.path
                        d={generatePath(commandesPoints, chartType)}
                        fill={chartType === 'area' ? 'url(#gradient1)' : 'none'}
                        stroke="#fb7185"
                        strokeWidth={chartType === 'line' ? "3" : "2"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    )}
                    {showRequetes && (
                      <motion.path
                        d={generatePath(requetesPoints, chartType)}
                        fill={chartType === 'area' ? 'url(#gradient2)' : 'none'}
                        stroke="#f87171"
                        strokeWidth={chartType === 'line' ? "3" : "2"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.7 }}
                      />
                    )}
                    
                    {/* Points interactifs */}
                    {chartType !== 'area' && (
                      <>
                        {showCommandes && commandesPoints.map((point, index) => (
                          <motion.circle
                            key={`c-${index}`}
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="#fb7185"
                            stroke="white"
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.8 + index * 0.02 }}
                            className="hover:r-6 transition-all cursor-pointer"
                          />
                        ))}
                        {showRequetes && requetesPoints.map((point, index) => (
                          <motion.circle
                            key={`r-${index}`}
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="#f87171"
                            stroke="white"
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 1 + index * 0.02 }}
                            className="hover:r-6 transition-all cursor-pointer"
                          />
                        ))}
                      </>
                    )}
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.svg>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredPoint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 pointer-events-none z-20"
                  style={{
                    left: Math.min(hoveredPoint.x, 600),
                    top: Math.max(hoveredPoint.y - 80, 10)
                  }}
                >
                  <div className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                    {hoveredPoint.data.month}
                  </div>
                  {showCommandes && (
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        Commandes: {hoveredPoint.data.commandes.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {showRequetes && (
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        Requêtes: {hoveredPoint.data.requetes.toLocaleString()}
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* X-axis labels */}
            <div className="hidden sm:flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
              {rawData.filter((_, i) => i % 4 === 0).map((data, i) => (
                <span key={i} className="text-xs">{data.month}</span>
              ))}
            </div>
            
            {/* Mobile X-axis labels */}
            <div className="flex sm:hidden justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
              <span>2023</span>
              <span>2024</span>
              <span>2025</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
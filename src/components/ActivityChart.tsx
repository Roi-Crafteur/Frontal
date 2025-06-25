import React from 'react';

export default function ActivityChart() {
  // Generate sample data points for the chart
  const generatePath = (points: number[], color: string, opacity: number = 1) => {
    const width = 800;
    const height = 200;
    const stepX = width / (points.length - 1);
    
    let path = `M 0 ${height - (points[0] / 3000) * height}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = height - (points[i] / 3000) * height;
      path += ` L ${x} ${y}`;
    }
    
    // Close the path to create filled area
    path += ` L ${width} ${height} L 0 ${height} Z`;
    
    return (
      <path
        d={path}
        fill={color}
        fillOpacity={opacity}
        stroke="none"
      />
    );
  };

  // Sample data for 24 months
  const commandesData = [
    2800, 1800, 2900, 2500, 2700, 2300, 2400, 2800, 2600, 2900, 
    1700, 2500, 2400, 2600, 2200, 1800, 2300, 2100, 1600, 2400, 
    2200, 2000, 2300, 2500
  ];
  
  const requetesData = [
    1000, 800, 1100, 900, 1000, 850, 900, 1050, 950, 1100,
    750, 950, 900, 950, 800, 750, 850, 800, 700, 900,
    850, 800, 850, 950
  ];

  const months = [
    'avr. 2023', 'mai 2023', 'juin 2023', 'juil. 2023', 'août 2023', 'sept. 2023',
    'oct. 2023', 'nov. 2023', 'déc. 2023', 'janv. 2024', 'févr. 2024', 'mars 2024',
    'avr. 2024', 'mai 2024', 'juin 2024', 'juil. 2024', 'août 2024', 'sept. 2024',
    'oct. 2024', 'nov. 2024', 'déc. 2024', 'janv. 2025', 'févr. 2025', 'mars 2025'
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Activité sur 24 mois</h3>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-pink-400 rounded"></div>
            <span className="text-sm text-gray-600">Commandes traitées</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span className="text-sm text-gray-600">Requêtes traitées</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
          <span>3000</span>
          <span>2500</span>
          <span>2000</span>
          <span>1500</span>
          <span>1000</span>
          <span>500</span>
        </div>

        {/* Chart */}
        <div className="ml-12">
          <svg viewBox="0 0 800 200" className="w-full h-48">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 40}
                x2="800"
                y2={i * 40}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            ))}
            
            {/* Data areas */}
            {generatePath(commandesData, '#fb7185', 0.7)}
            {generatePath(requetesData, '#f87171', 0.5)}
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {months.filter((_, i) => i % 4 === 0).map((month, i) => (
              <span key={i}>{month}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
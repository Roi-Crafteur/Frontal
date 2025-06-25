import React from 'react';

interface StatCardProps {
  title: string;
  date: string;
  time: string;
  stats: {
    commandes: number;
    lignes: number;
    unites: number;
  };
  totals?: {
    commandes: number;
    lignes: number;
    unites: number;
  };
  isToday?: boolean;
}

export default function StatCard({ title, date, time, stats, totals, isToday }: StatCardProps) {
  return (
    <div className={`rounded-xl p-6 text-white ${isToday ? 'bg-teal-500' : 'bg-teal-400'}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-teal-100 text-sm">Jusqu'à {time}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.commandes}</div>
          <div className="text-xs text-teal-100">commandes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.lignes}</div>
          <div className="text-xs text-teal-100">lignes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.unites}</div>
          <div className="text-xs text-teal-100">unités</div>
        </div>
      </div>

      {totals && (
        <>
          <div className="text-xs text-teal-100 mb-2">Toute la journée:</div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold">{totals.commandes}</div>
              <div className="text-xs text-teal-100">commandes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{totals.lignes}</div>
              <div className="text-xs text-teal-100">lignes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{totals.unites}</div>
              <div className="text-xs text-teal-100">unités</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconBg?: string;
  sub?: string;
  trend?: { value: string; positive: boolean };
}

export default function StatCard({ label, value, icon, iconBg = 'bg-indigo-50', sub, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-start gap-4">
      <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500 font-500">{label}</p>
        <p className="text-2xl font-700 text-slate-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
        {trend && (
          <p className={`text-xs font-500 mt-1 ${trend.positive ? 'text-green-600' : 'text-red-500'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}

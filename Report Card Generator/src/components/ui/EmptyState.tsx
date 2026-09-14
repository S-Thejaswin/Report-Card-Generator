import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({
  title = 'No data available',
  description = 'No academic data available yet.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <Inbox className="w-7 h-7 text-slate-400" />
      </div>
      <p className="text-sm font-600 text-slate-700">{title}</p>
      <p className="text-sm text-slate-400 mt-1 max-w-xs">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

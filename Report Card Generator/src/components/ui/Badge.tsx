interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'indigo';
  size?: 'sm' | 'md';
}

const variants = {
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-amber-100 text-amber-800',
  info: 'bg-blue-100 text-blue-800',
  neutral: 'bg-slate-100 text-slate-700',
  indigo: 'bg-indigo-100 text-indigo-800',
};

export function statusVariant(status: string): BadgeProps['variant'] {
  const map: Record<string, BadgeProps['variant']> = {
    ACTIVE: 'success',
    INACTIVE: 'neutral',
    PASS: 'success',
    FAIL: 'danger',
    ARREAR: 'danger',
    INCOMPLETE: 'warning',
    COMPLETED: 'neutral',
    UPCOMING: 'info',
    THEORY: 'indigo',
    PRACTICAL: 'info',
    LAB: 'success',
    PROJECT: 'warning',
    ELECTIVE: 'neutral',
  };
  return map[status] ?? 'neutral';
}

export default function Badge({ children, variant = 'neutral', size = 'sm' }: BadgeProps) {
  const cls = variants[variant] ?? variants.neutral;
  const pad = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`inline-flex items-center rounded-full font-500 ${cls} ${pad}`}>
      {children}
    </span>
  );
}

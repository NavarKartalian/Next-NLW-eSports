
interface DuoInfoProps {
  label: string;
  value: string | number;
  textColor?: 'green' | 'red';
}

export function DuoInfo({ label, value, textColor }: DuoInfoProps) {
  return (
    <div className="w-full mb-4">
      <h2 className="text-zinc-500 mb-1">
        {label}
      </h2>

      <p className={`font-semibold ${textColor ? textColor === 'green' ? 'text-emerald-400' : 'text-red-400' :'text-white'}`}>
        {value}
      </p>
    </div>
  );
}
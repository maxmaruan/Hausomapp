import { VocabTag } from '../data/vocabulary';

export function TagPicker({
  options,
  selected,
  onToggle,
}: {
  options: VocabTag[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="tag-picker">
      {options.map(({ id, label, icon: Icon }) => {
        const active = selected.includes(id);
        return (
          <button
            key={id}
            type="button"
            className={`tag-picker-item ${active ? 'tag-picker-item--active' : ''}`}
            onClick={() => onToggle(id)}
          >
            <Icon size={15} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

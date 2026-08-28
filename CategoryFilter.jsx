import { CATEGORIES } from '../utils/constants';

const allCategories = [{ name: 'All', slug: 'all' }, ...CATEGORIES];

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Filter articles by category">
      {allCategories.map((cat) => {
        const isActive = selected === cat.name || (!selected && cat.name === 'All');

        return (
          <button
            key={cat.name}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(cat.name === 'All' ? '' : cat.name)}
            className={`
              px-4 py-2 rounded-full font-mono text-[13px] font-medium tracking-wide
              border transition-all duration-200 cursor-pointer
              ${isActive
                ? 'bg-plum text-paper border-plum'
                : 'bg-transparent text-ink border-line hover:border-plum/40 hover:bg-plum/5'
              }
            `}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}

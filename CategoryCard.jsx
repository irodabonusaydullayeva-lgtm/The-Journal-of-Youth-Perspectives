import { useNavigate } from 'react-router-dom';

/**
 * SVG icons for each category.
 */
const icons = {
  scales: (
    <svg viewBox="0 0 44 44" fill="none" className="w-11 h-11">
      <path d="M22 6v32" stroke="#3D1F4E" strokeWidth="2.5" />
      <path d="M10 14h24" stroke="#DFA23D" strokeWidth="2.5" />
      <path d="M10 14l-4 14h12l-4-14" stroke="#3D1F4E" strokeWidth="1.5" fill="#3D1F4E" opacity="0.15" />
      <path d="M34 14l-4 14h12l-4-14" stroke="#3D1F4E" strokeWidth="1.5" fill="#C23B6B" opacity="0.15" />
      <rect x="16" y="36" width="12" height="3" rx="1" fill="#3D1F4E" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 44 44" fill="none" className="w-11 h-11">
      <path d="M8 36 C8 16 28 6 38 6 C38 26 18 36 8 36Z" fill="#3D1F4E" opacity="0.12" stroke="#3D1F4E" strokeWidth="1.5" />
      <path d="M8 36 Q18 26 38 6" stroke="#DFA23D" strokeWidth="2" fill="none" />
      <path d="M18 28 Q24 20 32 14" stroke="#C23B6B" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  ),
  equality: (
    <svg viewBox="0 0 44 44" fill="none" className="w-11 h-11">
      <circle cx="22" cy="16" r="9" stroke="#3D1F4E" strokeWidth="2" fill="#3D1F4E" opacity="0.1" />
      <path d="M22 25v13" stroke="#3D1F4E" strokeWidth="2.5" />
      <path d="M15 32h14" stroke="#DFA23D" strokeWidth="2.5" />
      <path d="M15 37h14" stroke="#C23B6B" strokeWidth="2.5" />
    </svg>
  ),
};

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/articles?category=${encodeURIComponent(category.name)}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-white border-[1.5px] border-ink rounded p-7 md:p-8 text-left transition-all duration-200 hover:-translate-y-1 hover:bg-gold/8 hover:border-gold/60 cursor-pointer group w-full"
      aria-label={`View ${category.name} articles`}
    >
      <div className="mb-4 transition-transform duration-200 group-hover:scale-110">
        {icons[category.icon] || icons.scales}
      </div>

      <div className="font-mono text-[13px] font-semibold text-rose tracking-wider uppercase mb-2">
        {category.name}
      </div>

      <h3 className="text-xl md:text-[22px] mb-2.5 font-serif">{category.name}</h3>

      <p className="text-[15px] opacity-80 max-w-[32ch] leading-relaxed">
        {category.description}
      </p>

      <span className="inline-flex items-center gap-1.5 mt-5 font-mono text-[13px] font-semibold text-plum border-b-[1.5px] border-rose pb-0.5 transition-opacity group-hover:opacity-70">
        Explore articles →
      </span>
    </button>
  );
}

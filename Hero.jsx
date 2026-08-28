import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-14 items-center">
        {/* Text content */}
        <div>
          <div className="eyebrow">International Youth Academic Journal</div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] leading-[1.04] mt-5 mb-6">
            Where young minds{' '}
            <em className="italic text-rose not-italic" style={{ fontStyle: 'italic' }}>
              shape
            </em>{' '}
            the conversation.
          </h1>

          <p className="text-lg md:text-[18.5px] opacity-85 max-w-[46ch] mb-8 leading-relaxed">
            The Journal of Youth Perspectives is an international platform for
            young thinkers to publish research, share perspectives, and engage
            with the issues defining our generation.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-plum text-paper rounded font-semibold text-[15px] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-plum/25"
            >
              Explore Articles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 px-6 py-3.5 border-[1.5px] border-ink text-ink rounded font-semibold text-[15px] no-underline transition-all duration-200 hover:-translate-y-0.5"
            >
              Submit an Article
            </Link>
          </div>
        </div>

        {/* Visual element */}
        <div className="flex justify-center items-center">
          <svg viewBox="0 0 300 300" fill="none" className="w-full max-w-[340px] h-auto">
            <circle cx="150" cy="150" r="145" stroke="#3D1F4E" strokeWidth="1.5" opacity="0.25" />
            <circle cx="150" cy="150" r="145" stroke="#DFA23D" strokeWidth="2" strokeDasharray="2 10" opacity="0.6" />

            {/* Open book / journal icon */}
            <rect x="70" y="95" width="160" height="110" rx="6" fill="#3D1F4E" opacity="0.08" />
            <rect x="80" y="105" width="140" height="90" rx="4" fill="#FFFCF6" stroke="#3D1F4E" strokeWidth="1.5" />
            <line x1="150" y1="105" x2="150" y2="195" stroke="#3D1F4E" strokeWidth="1" opacity="0.3" />

            {/* Left page lines */}
            <rect x="92" y="118" width="46" height="3" rx="1" fill="#DFA23D" />
            <rect x="92" y="128" width="46" height="2" rx="1" fill="#3D1F4E" opacity="0.2" />
            <rect x="92" y="136" width="40" height="2" rx="1" fill="#3D1F4E" opacity="0.2" />
            <rect x="92" y="144" width="44" height="2" rx="1" fill="#3D1F4E" opacity="0.15" />
            <rect x="92" y="152" width="36" height="2" rx="1" fill="#3D1F4E" opacity="0.15" />
            <rect x="92" y="165" width="46" height="3" rx="1" fill="#C23B6B" />
            <rect x="92" y="175" width="42" height="2" rx="1" fill="#3D1F4E" opacity="0.2" />

            {/* Right page lines */}
            <rect x="162" y="118" width="46" height="3" rx="1" fill="#DFA23D" />
            <rect x="162" y="128" width="44" height="2" rx="1" fill="#3D1F4E" opacity="0.2" />
            <rect x="162" y="136" width="38" height="2" rx="1" fill="#3D1F4E" opacity="0.2" />
            <rect x="162" y="144" width="46" height="2" rx="1" fill="#3D1F4E" opacity="0.15" />
            <rect x="162" y="152" width="40" height="2" rx="1" fill="#3D1F4E" opacity="0.15" />
            <rect x="162" y="165" width="44" height="3" rx="1" fill="#C23B6B" />
            <rect x="162" y="175" width="38" height="2" rx="1" fill="#3D1F4E" opacity="0.2" />

            {/* Globe hint at top */}
            <circle cx="150" cy="60" r="20" stroke="#DFA23D" strokeWidth="1.5" fill="none" />
            <ellipse cx="150" cy="60" rx="10" ry="20" stroke="#DFA23D" strokeWidth="1" fill="none" opacity="0.5" />
            <line x1="130" y1="60" x2="170" y2="60" stroke="#DFA23D" strokeWidth="1" opacity="0.5" />

            {/* Decorative dots */}
            <circle cx="60" cy="240" r="4" fill="#C23B6B" opacity="0.4" />
            <circle cx="240" cy="240" r="4" fill="#DFA23D" opacity="0.4" />
            <circle cx="150" cy="250" r="3" fill="#3D1F4E" opacity="0.3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

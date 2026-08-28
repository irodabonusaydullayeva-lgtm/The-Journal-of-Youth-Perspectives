import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `transition-opacity duration-200 hover:opacity-100 ${
      isActive ? 'opacity-100 text-rose' : 'opacity-75'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-paper/88 backdrop-blur-md border-b border-line">
      <nav className="max-w-[1180px] mx-auto px-6 md:px-8 flex items-center justify-between h-[74px]">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline"
          aria-label="The Journal of Youth Perspectives — Home"
        >
          <svg
            viewBox="0 0 40 40"
            fill="none"
            className="w-7 h-7"
            aria-hidden="true"
          >
            <rect x="4" y="4" width="32" height="32" rx="4" fill="#3D1F4E" />
            <path d="M12 12h16v2H12z" fill="#DFA23D" />
            <path d="M12 17h16v2H12z" fill="#DFA23D" opacity="0.7" />
            <path d="M12 22h12v2H12z" fill="#F6F1E9" opacity="0.5" />
            <path d="M12 27h8v2H12z" fill="#C23B6B" />
          </svg>
          <span className="font-mono font-semibold text-[15px] tracking-wide text-plum-deep hidden sm:inline">
            JYP
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-[14.5px] font-medium">
          <NavLink to="/" className={linkClasses} end>
            Home
          </NavLink>
          <NavLink to="/articles" className={linkClasses}>
            Articles
          </NavLink>
          <NavLink
            to="/submit"
            className="bg-plum text-paper px-5 py-2.5 rounded font-mono font-semibold text-[13.5px] tracking-wide no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-plum/25"
          >
            Submit Article
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <svg
            className="w-6 h-6 text-plum-deep"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-paper/95 backdrop-blur-md">
          <div className="flex flex-col px-6 py-5 gap-4">
            <NavLink
              to="/"
              className={linkClasses}
              end
              onClick={() => setMobileOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/articles"
              className={linkClasses}
              onClick={() => setMobileOpen(false)}
            >
              Articles
            </NavLink>
            <NavLink
              to="/submit"
              className="bg-plum text-paper px-5 py-3 rounded font-mono font-semibold text-[13.5px] tracking-wide no-underline text-center transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Submit Article
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-plum-deep text-paper">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 pt-14 pb-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/15">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2.5 no-underline text-paper"
              aria-label="Home"
            >
              <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" aria-hidden="true">
                <rect x="4" y="4" width="32" height="32" rx="4" fill="#3D1F4E" />
                <path d="M12 12h16v2H12z" fill="#DFA23D" />
                <path d="M12 17h16v2H12z" fill="#DFA23D" opacity="0.7" />
                <path d="M12 22h12v2H12z" fill="#F6F1E9" opacity="0.5" />
                <path d="M12 27h8v2H12z" fill="#C23B6B" />
              </svg>
              <span className="font-mono font-semibold text-[15px] tracking-wide">
                The Journal of Youth Perspectives
              </span>
            </Link>
            <p className="mt-3 text-sm opacity-60 max-w-md">
              An international platform amplifying youth voices on the issues that
              shape our world.
            </p>
          </div>

          {/* Links */}
          <nav className="flex gap-6 text-[13.5px]" aria-label="Footer navigation">
            <Link to="/" className="no-underline opacity-70 hover:opacity-100 transition-opacity text-paper">
              Home
            </Link>
            <Link to="/articles" className="no-underline opacity-70 hover:opacity-100 transition-opacity text-paper">
              Articles
            </Link>
            <Link to="/submit" className="no-underline opacity-70 hover:opacity-100 transition-opacity text-paper">
              Submit
            </Link>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-center">
          <p className="font-mono text-xs opacity-50">
            © {currentYear} The Journal of Youth Perspectives. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

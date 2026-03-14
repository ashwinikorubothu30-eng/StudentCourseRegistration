import { Link, useLocation } from 'react-router-dom';
import { useCourses } from '@/context/CourseContext';
import { BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/register', label: 'Student Registration' },
  { to: '/courses', label: 'Course List' },
  { to: '/course-registration', label: 'Course Registration' },
  { to: '/registered', label: 'My Courses' },
];

export default function Navbar() {
  const location = useLocation();
  const { registeredCourses } = useCourses();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>EduPortal</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-sm px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.to
                  ? 'text-foreground bg-secondary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
              {link.to === '/registered' && registeredCourses.length > 0 && (
                <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground tabular-nums">
                  {registeredCourses.length}
                </span>
              )}
            </Link>
          ))}
          <Link
            to="/login"
            className="ml-2 rounded-sm bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
          >
            Login
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-sm px-3 py-2 text-sm font-medium ${
                location.pathname === link.to ? 'text-foreground bg-secondary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-sm bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

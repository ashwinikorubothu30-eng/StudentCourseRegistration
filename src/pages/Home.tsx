import { Link } from 'react-router-dom';
import { BookOpen, ClipboardList, UserPlus, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: UserPlus, title: 'Student Registration', desc: 'Create your student account to get started.', to: '/register' },
  { icon: BookOpen, title: 'Browse Courses', desc: 'Explore available courses for the semester.', to: '/courses' },
  { icon: ClipboardList, title: 'Register for Courses', desc: 'Select and manage your course enrollments.', to: '/course-registration' },
  { icon: LogIn, title: 'Student Login', desc: 'Access your dashboard and schedule.', to: '/login' },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Student Course Registration System
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Your academic portal for browsing, selecting, and managing course enrollments. Fast, reliable, and built for students.
        </p>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              to={f.to}
              className="card-elevated block p-5 transition-shadow"
            >
              <f.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

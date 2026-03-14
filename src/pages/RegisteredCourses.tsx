import { useCourses } from '@/context/CourseContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegisteredCourses() {
  const { registeredCourses, removeCourse } = useCourses();
  const totalCredits = registeredCourses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {registeredCourses.length} course{registeredCourses.length !== 1 ? 's' : ''} · {totalCredits} credits
            </p>
          </div>
        </div>

        {registeredCourses.length === 0 ? (
          <div className="card-elevated mt-6 flex flex-col items-center py-16 text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-4 text-sm text-muted-foreground">No courses registered yet.</p>
            <Link to="/courses" className="mt-4 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-150 hover:opacity-90">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="card-elevated mt-6 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="table-header-cell pl-5">Course Name</th>
                  <th className="table-header-cell">Instructor</th>
                  <th className="table-header-cell tabular-nums">Credits</th>
                  <th className="table-header-cell pr-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {registeredCourses.map((course, i) => (
                  <motion.tr
                    key={course.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 transition-colors duration-150 hover:bg-secondary/30"
                  >
                    <td className="table-body-cell pl-5 font-medium">{course.name}</td>
                    <td className="table-body-cell text-muted-foreground">{course.instructor}</td>
                    <td className="table-body-cell tabular-nums">{course.credits}</td>
                    <td className="table-body-cell pr-5 text-right">
                      <button
                        onClick={() => { removeCourse(course.id); toast.info(`Removed ${course.name}`); }}
                        className="rounded-sm border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive transition-colors duration-150 hover:bg-destructive/10"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}

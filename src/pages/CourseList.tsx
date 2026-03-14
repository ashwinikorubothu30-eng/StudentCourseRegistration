import { useCourses } from '@/context/CourseContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function CourseList() {
  const { availableCourses, registerCourse, isRegistered } = useCourses();

  const handleRegister = (id: string, name: string) => {
    const success = registerCourse(id);
    if (success) toast.success(`Registered for ${name}`);
    else toast.error('Already registered for this course');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Available Courses</h1>
        <p className="mt-1 text-sm text-muted-foreground">Select your curriculum for the Fall 2024 semester.</p>

        <div className="card-elevated mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="table-header-cell pl-5">ID</th>
                  <th className="table-header-cell">Course Name</th>
                  <th className="table-header-cell">Instructor</th>
                  <th className="table-header-cell tabular-nums">Credits</th>
                  <th className="table-header-cell pr-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {availableCourses.map((course, i) => (
                  <motion.tr
                    key={course.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 transition-colors duration-150 hover:bg-secondary/30"
                  >
                    <td className="table-body-cell pl-5 font-medium tabular-nums">{course.id}</td>
                    <td className="table-body-cell font-medium">{course.name}</td>
                    <td className="table-body-cell text-muted-foreground">{course.instructor}</td>
                    <td className="table-body-cell tabular-nums">{course.credits}</td>
                    <td className="table-body-cell pr-5 text-right">
                      {isRegistered(course.id) ? (
                        <span className="rounded-sm bg-success/10 px-3 py-1 text-xs font-medium text-success">Registered</span>
                      ) : (
                        <button
                          onClick={() => handleRegister(course.id, course.name)}
                          className="rounded-sm bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                        >
                          Register
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

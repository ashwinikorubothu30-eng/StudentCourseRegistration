import { useCourses } from '@/context/CourseContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useState } from 'react';

export default function CourseRegistration() {
  const { availableCourses, registeredCourses, registerCourse, removeCourse, isRegistered } = useCourses();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const registerSelected = () => {
    let count = 0;
    selected.forEach(id => { if (registerCourse(id)) count++; });
    if (count > 0) toast.success(`Registered for ${count} course(s)`);
    else toast.error('All selected courses already registered');
    setSelected([]);
  };

  const totalCredits = registeredCourses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Course Registration</h1>
        <p className="mt-1 text-sm text-muted-foreground">Select courses and manage your enrollment.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Course Selection */}
          <div className="lg:col-span-2">
            <div className="card-elevated overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Courses</span>
                {selected.length > 0 && (
                  <button onClick={registerSelected} className="rounded-sm bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98]">
                    Register {selected.length} Course{selected.length > 1 ? 's' : ''}
                  </button>
                )}
              </div>
              <div className="divide-y divide-border">
                {availableCourses.map(course => {
                  const registered = isRegistered(course.id);
                  const isSelected = selected.includes(course.id);
                  return (
                    <label
                      key={course.id}
                      className={`flex cursor-pointer items-center gap-4 px-5 py-3.5 transition-colors duration-150 ${registered ? 'opacity-50' : 'hover:bg-secondary/30'}`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={registered}
                        onChange={() => toggleSelect(course.id)}
                        className="h-4 w-4 rounded border-border text-primary accent-primary"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.instructor} · {course.credits} credits</p>
                      </div>
                      <span className="tabular-nums text-xs text-muted-foreground">{course.id}</span>
                      {registered && <span className="rounded-sm bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">Enrolled</span>}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="card-elevated p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Enrollment Summary</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Registered</span>
                  <span className="text-2xl font-bold tabular-nums text-foreground">{registeredCourses.length}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Total Credits</span>
                  <span className="text-2xl font-bold tabular-nums text-foreground">{totalCredits}</span>
                </div>
              </div>
              {registeredCourses.length > 0 && (
                <div className="mt-5 space-y-2 border-t border-border pt-4">
                  {registeredCourses.map(c => (
                    <div key={c.id} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{c.name}</span>
                      <button onClick={() => { removeCourse(c.id); toast.info(`Removed ${c.name}`); }} className="text-xs text-destructive hover:underline">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

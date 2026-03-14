import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Course {
  id: string;
  name: string;
  instructor: string;
  credits: number;
}

interface CourseContextType {
  availableCourses: Course[];
  registeredCourses: Course[];
  registerCourse: (courseId: string) => boolean;
  removeCourse: (courseId: string) => void;
  isRegistered: (courseId: string) => boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const AVAILABLE_COURSES: Course[] = [
  { id: 'CS101', name: 'Web Technologies', instructor: 'Dr. Aris', credits: 3 },
  { id: 'CS102', name: 'Data Structures', instructor: 'Prof. Miller', credits: 4 },
  { id: 'CS103', name: 'Java Programming', instructor: 'Dr. Singh', credits: 3 },
  { id: 'CS104', name: 'DBMS', instructor: 'Prof. Davis', credits: 4 },
  { id: 'CS105', name: 'Computer Networks', instructor: 'Dr. Lee', credits: 3 },
];

export function CourseProvider({ children }: { children: ReactNode }) {
  const [registeredCourses, setRegisteredCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('registeredCourses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('registeredCourses', JSON.stringify(registeredCourses));
  }, [registeredCourses]);

  const registerCourse = (courseId: string): boolean => {
    if (registeredCourses.find(c => c.id === courseId)) return false;
    const course = AVAILABLE_COURSES.find(c => c.id === courseId);
    if (!course) return false;
    setRegisteredCourses(prev => [...prev, course]);
    return true;
  };

  const removeCourse = (courseId: string) => {
    setRegisteredCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const isRegistered = (courseId: string) => !!registeredCourses.find(c => c.id === courseId);

  return (
    <CourseContext.Provider value={{ availableCourses: AVAILABLE_COURSES, registeredCourses, registerCourse, removeCourse, isRegistered }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) throw new Error('useCourses must be used within CourseProvider');
  return context;
}

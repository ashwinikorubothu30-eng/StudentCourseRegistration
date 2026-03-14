import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CourseProvider } from "@/context/CourseContext";
import Navbar from "@/components/Navbar";
import Home from "./pages/Home";
import StudentRegistration from "./pages/StudentRegistration";
import CourseList from "./pages/CourseList";
import CourseRegistration from "./pages/CourseRegistration";
import Login from "./pages/Login";
import RegisteredCourses from "./pages/RegisteredCourses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <CourseProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<StudentRegistration />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/course-registration" element={<CourseRegistration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registered" element={<RegisteredCourses />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CourseProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

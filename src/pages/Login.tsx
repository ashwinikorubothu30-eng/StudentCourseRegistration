import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email is required';
    if (password.length < 6) errs.password = 'Minimum 6 characters';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    toast.success('Login successful!');
    navigate('/courses');
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-sm border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-shadow duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary ${hasError ? 'border-destructive' : 'border-input'}`;

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Sign in to your student portal.</p>

        <form onSubmit={handleSubmit} className="card-elevated mt-6 space-y-4 p-6">
          <div className="form-field">
            <label className="text-xs font-medium text-foreground">Email</label>
            <input type="email" placeholder="you@university.edu" value={email} onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }} className={inputClass(!!errors.email)} />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="form-field">
            <label className="text-xs font-medium text-foreground">Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined })); }} className={inputClass(!!errors.password)} />
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full rounded-sm bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98]">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}

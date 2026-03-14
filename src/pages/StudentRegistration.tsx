import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface FormErrors {
  [key: string]: string;
}

export default function StudentRegistration() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState({
    name: '', rollNumber: '', email: '', phone: '', department: '', year: '', password: '', confirmPassword: '',
  });

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.rollNumber.trim()) e.rollNumber = 'Roll number is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = '10-digit phone number required';
    if (!form.department) e.department = 'Select a department';
    if (!form.year) e.year = 'Select a year';
    if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setErrors({});
    setSubmitted(true);
  };

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  if (submitted) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-elevated p-8 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-success" />
          <h2 className="mt-4 text-xl font-semibold text-foreground">Registration Successful!</h2>
          <p className="mt-2 text-sm text-muted-foreground">Your student account has been created. You can now log in.</p>
        </motion.div>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full rounded-sm border bg-card px-3 py-2 text-sm text-foreground outline-none transition-shadow duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors[field] ? 'border-destructive' : 'border-input'}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg">
        <h1 className="text-2xl font-bold text-foreground">Student Registration</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create your student account to begin course registration.</p>

        <form onSubmit={handleSubmit} className="card-elevated mt-6 space-y-4 p-6">
          {([
            { field: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
            { field: 'rollNumber', label: 'Roll Number', type: 'text', placeholder: 'CS2024001' },
            { field: 'email', label: 'Email Address', type: 'email', placeholder: 'john@university.edu' },
            { field: 'phone', label: 'Phone Number', type: 'tel', placeholder: '9876543210' },
          ] as const).map(({ field, label, type, placeholder }) => (
            <div key={field} className="form-field">
              <label className="text-xs font-medium text-foreground">{label}</label>
              <input type={type} placeholder={placeholder} value={form[field]} onChange={e => update(field, e.target.value)} className={inputClass(field)} />
              {errors[field] && <p className="text-xs text-destructive">{errors[field]}</p>}
            </div>
          ))}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="form-field">
              <label className="text-xs font-medium text-foreground">Department</label>
              <select value={form.department} onChange={e => update('department', e.target.value)} className={inputClass('department')}>
                <option value="">Select</option>
                {['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Information Technology'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
            </div>
            <div className="form-field">
              <label className="text-xs font-medium text-foreground">Year</label>
              <select value={form.year} onChange={e => update('year', e.target.value)} className={inputClass('year')}>
                <option value="">Select</option>
                {['1st Year', '2nd Year', '3rd Year', '4th Year'].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              {errors.year && <p className="text-xs text-destructive">{errors.year}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="form-field">
              <label className="text-xs font-medium text-foreground">Password</label>
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} className={inputClass('password')} />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="form-field">
              <label className="text-xs font-medium text-foreground">Confirm Password</label>
              <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} className={inputClass('confirmPassword')} />
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button type="submit" className="w-full rounded-sm bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98]">
            Create Account
          </button>
        </form>
      </motion.div>
    </div>
  );
}

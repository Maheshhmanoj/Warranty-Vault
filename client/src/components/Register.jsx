import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus, FaSpinner, FaExclamationTriangle, FaIdCard } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [uiState, setUiState] = useState({ isLoading: false, error: null });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (uiState.error) setUiState({ ...uiState, error: null }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/;
    if (!strongPasswordRegex.test(formData.password)) {
      setUiState({ 
        isLoading: false, 
        error: 'PASSWORD REJECTED: Must be 6+ chars, 1 Capital, 1 Special (!@#$&*).' 
      });
      return;
    }

    setUiState({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/auth/register`, formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      console.error("REGISTRATION ERROR:", err.response?.data?.msg || err.message);
      
      setUiState({
        isLoading: false,
        error: err.response?.data?.msg || "Registration Failed"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neo-bg px-4 font-sans py-10">
      
      <div className="w-full max-w-md bg-white border-4 border-neo-black shadow-[8px_8px_0px_0px_#121212] p-8 relative animate-fade-in">
        
        <div className="absolute top-0 left-0 bg-neo-pink w-8 h-8 border-b-4 border-r-4 border-neo-black"></div>

        <div className="text-center mb-8">
          <div className="inline-block bg-neo-black text-white p-3 mb-4 shadow-neo transform rotate-2">
            <FaIdCard size={30} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">
            Create_Account
          </h2>
          <p className="font-mono text-xs text-gray-500 bg-neo-blue/20 inline-block px-2 py-1">
            // JOIN_THE_NETWORK
          </p>
        </div>

        {uiState.error && (
          <div className="mb-6 bg-neo-pink border-2 border-neo-black p-3 flex items-center gap-3 shadow-neo">
            <FaExclamationTriangle className="text-black" />
            <span className="font-bold font-mono text-xs">{uiState.error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-mono text-xs font-bold uppercase mb-1">Full Name</label>
            <input 
              name="username" 
              type="text" 
              required 
              autoComplete="name"
              onChange={handleChange}
              className="neo-input w-full border-4 border-black p-3 outline-none focus:bg-yellow-50 font-bold"
              placeholder="JOHN_DOE"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase mb-1">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              autoComplete="email"
              onChange={handleChange}
              className="neo-input w-full border-4 border-black p-3 outline-none focus:bg-yellow-50 font-bold"
              placeholder="USER@EXAMPLE.COM"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              autoComplete="new-password"
              minLength={6}
              onChange={handleChange}
              className="neo-input w-full border-4 border-black p-3 outline-none focus:bg-yellow-50 font-bold"
              placeholder="••••••••"
            />
            <p className="text-[10px] font-mono text-gray-500 mt-1 text-right">MIN_LENGTH: 6_CHARS | 1_CAP | 1_SPECIAL</p>
          </div>

          <button 
            type="submit" 
            disabled={uiState.isLoading}
            className="neo-btn w-full bg-neo-black text-white hover:bg-neo-green hover:text-black flex justify-center items-center gap-2 mt-4 py-4 font-bold border-4 border-black transition-transform hover:-translate-y-1 shadow-neo"
          >
            {uiState.isLoading ? <FaSpinner className="animate-spin" /> : "EXECUTE_SIGNUP"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-neo-black text-center font-mono text-xs">
          <p className="mb-2">ALREADY_REGISTERED?</p>
          <Link to="/login" className="font-bold underline decoration-2 hover:bg-neo-blue hover:no-underline px-1 transition-colors">
            ACCESS_EXISTING_ACCOUNT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
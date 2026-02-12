import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSignInAlt, FaSpinner, FaExclamationTriangle, FaBoxOpen } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [uiState, setUiState] = useState({ isLoading: false, error: null });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUiState({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${API_URL}/auth/login`, formData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/dashboard'); 
    } catch (err) {
      setUiState({ 
        isLoading: false, 
        error: err.response?.data?.message || "ACCESS_DENIED: Invalid Credentials" 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neo-bg px-4 font-sans">
      
      <div className="w-full max-w-md bg-white border-4 border-neo-black shadow-[8px_8px_0px_0px_#121212] p-8 relative animate-fade-in">
        
        <div className="absolute top-0 right-0 bg-neo-yellow w-8 h-8 border-b-4 border-l-4 border-neo-black"></div>

        <div className="text-center mb-8">
          <div className="inline-block bg-neo-black text-white p-3 mb-4 shadow-neo">
            <FaBoxOpen size={30} />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-1">
            Welcome_Back
          </h2>
          <p className="font-mono text-xs text-gray-500 bg-neo-green/20 inline-block px-2 py-1">
            // AUTHENTICATION_REQUIRED
          </p>
        </div>

        {uiState.error && (
          <div className="mb-6 bg-neo-pink border-2 border-neo-black p-3 flex items-center gap-3 shadow-neo">
            <FaExclamationTriangle className="text-black" />
            <span className="font-bold font-mono text-xs">{uiState.error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-mono text-xs font-bold uppercase mb-1">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              onChange={handleChange}
              className="neo-input"
              placeholder="USER@EXAMPLE.COM"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              onChange={handleChange}
              className="neo-input"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={uiState.isLoading}
            className="neo-btn w-full bg-neo-black text-white hover:bg-neo-yellow hover:text-black flex justify-center items-center gap-2"
          >
            {uiState.isLoading ? <FaSpinner className="animate-spin" /> : "INITIATE_LOGIN"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-neo-black text-center font-mono text-xs">
          <p className="mb-2">NO_ACCESS_TOKEN?</p>
          <Link to="/register" className="font-bold underline decoration-2 hover:bg-neo-yellow hover:no-underline px-1">
            REGISTER_NEW_ACCOUNT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
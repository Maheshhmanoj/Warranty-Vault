import { Link, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    // Destroy the VIP token to log the user out
    localStorage.removeItem('token');
    // Send them back to the login/home screen
    navigate('/'); 
  };

  return (
    <nav className="bg-neo-green border-b-4 border-black p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <Link to="/dashboard" className="flex items-center gap-2 text-2xl font-black uppercase text-black">
        <FaBoxOpen size={32} />
        <span>Warranty_Vault</span>
      </Link>
      <button 
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-black py-2 px-4 border-4 border-black shadow-neo flex items-center gap-2 transition-transform hover:-translate-y-1"
      >
        <FaSignOutAlt /> LOGOUT
      </button>
    </nav>
  );
};

export default Navbar;
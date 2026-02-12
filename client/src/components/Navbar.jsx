import { useState } from 'react';
import { FaBoxOpen, FaSearch, FaPlus, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ onAddClick, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-neo-green border-b-2 border-neo-black p-4 mb-8 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 tracking-tighter">
          <div className="bg-neo-black text-white p-2 border-2 border-white shadow-[2px_2px_0px_0px_white]">
            <FaBoxOpen />
          </div>
          <span className="hidden md:inline">WARRANTY_VAULT</span>
          <span className="md:hidden">VAULT</span>
        </h1>

        <button 
          className="md:hidden neo-btn p-2 bg-neo-black text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4 mt-4 md:mt-0 flex-grow justify-end
        `}>
          
          <div className="relative w-full md:w-1/2 group">
            <FaSearch className="absolute left-3 top-3.5 text-neo-black" />
            <input 
              type="text" 
              placeholder="SEARCH_ITEMS..." 
              onChange={(e) => onSearch(e.target.value)}
              className="neo-input pl-10 rounded-none group-hover:bg-white w-full"
            />
          </div>

          <button 
            onClick={() => {
              setIsMenuOpen(false); 
              onAddClick();
            }} 
            className="neo-btn w-full md:w-auto flex justify-center items-center gap-2 bg-neo-yellow text-neo-black hover:bg-white"
          >
            <FaPlus size={12} /> ADD_ITEM
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
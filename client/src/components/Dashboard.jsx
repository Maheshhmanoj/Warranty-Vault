import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import AddItem from './AddItem';
import { fetchItems, deleteItem } from '../api';
import { FaTrash, FaCalendarAlt, FaPen, FaSortAmountDown, FaFilter } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); 

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetchItems();
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    else loadItems();
  }, [navigate]);

  useEffect(() => {
    let result = [...items];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.productName.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      );
    }

    if (filterCategory !== 'All') {
      result = result.filter(item => item.category === filterCategory);
    }

    if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'Oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'Expiring Soon') {
      result.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    }

    setFilteredItems(result);
  }, [items, searchQuery, filterCategory, sortBy]);


  const handleDelete = async (id) => {
    if (!window.confirm("CONFIRM_DELETION: This cannot be undone.")) return;
    try {
      setItems(prev => prev.filter(item => item._id !== id)); 
      await deleteItem(id);
    } catch (err) {
      loadItems(); 
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingItem(null); 
    setIsModalOpen(true);
  }

  const loadDashboardItems = async () => {
    try {
      const data = await fetchItems();
      console.log("SERVER GAVE US:", data); 
      
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]); 
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setItems([]); 
    }
  };

  useEffect(() => {
    loadDashboardItems();
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-neo-bg">
      <Navbar onAddClick={handleAddClick} onSearch={setSearchQuery} />
      
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4 border-b-2 border-neo-black pb-4">
          <div>
            <p className="font-mono text-sm text-gray-500 mb-1">OPERATOR: {user?.username?.toUpperCase()}</p>
            <h2 className="text-3xl font-black uppercase tracking-tight">System_Dashboard</h2>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            
            <div className="relative group w-1/2 md:w-auto">
              <FaFilter className="absolute left-3 top-3 text-gray-400" />
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="neo-input pl-8 h-[45px] cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Appliances">Appliances</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="relative group w-1/2 md:w-auto">
              <FaSortAmountDown className="absolute left-3 top-3 text-gray-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="neo-input pl-8 h-[45px] cursor-pointer"
              >
                <option value="Newest">Newest Added</option>
                <option value="Oldest">Oldest Added</option>
                <option value="Expiring Soon">Expiring Soon</option>
              </select>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <AddItem 
            onClose={() => setIsModalOpen(false)} 
            onRefresh={loadItems} 
            initialData={editingItem} 
          />
        )}

        {/* GRID */}
        {isLoading ? (
          <div className="text-center mt-20 font-mono"><div className="animate-spin text-4xl mb-4">◍</div>LOADING_DATA...</div>
        ) : filteredItems.length === 0 ? (
          <div className="neo-card p-10 text-center bg-neo-blue/20">
            <h3 className="text-2xl font-bold mb-2">NO_RESULTS_FOUND</h3>
            <p className="font-mono text-sm">Adjust filters or initialize a new item.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item._id} className="neo-card group relative hover:-translate-y-2 transition-transform duration-200">
                
                {/* Header Strip */}
                <div className="bg-neo-black text-white text-xs font-mono p-2 flex justify-between items-center">
                  <span>ID: {item._id.slice(-4).toUpperCase()}</span>
                  
                  <div className="flex gap-2">
                    {/* EDIT BUTTON */}
                    <button onClick={() => openEditModal(item)} className="hover:text-neo-yellow flex items-center gap-1">
                      <FaPen size={10} /> EDIT
                    </button>
                    {/* DELETE BUTTON */}
                    <button onClick={() => handleDelete(item._id)} className="hover:text-neo-pink flex items-center gap-1">
                      <FaTrash size={10} /> DEL
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="h-32 w-full border-2 border-neo-black mb-4 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                    {item.receiptImage ? (
                      <img src={item.receiptImage} alt={item.productName} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    ) : (
                      <span className="text-4xl">📦</span>
                    )}
                    <div className={`absolute top-2 right-2 border-2 border-neo-black px-2 py-1 text-xs font-bold shadow-sm ${
                      item.status === 'Active' ? 'bg-neo-green text-black' : 
                      item.status === 'Expiring Soon' ? 'bg-neo-yellow text-black' : 'bg-neo-pink text-black'
                    }`}>
                      {item.status.toUpperCase()}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold leading-none mb-1">{item.productName}</h3>
                  <p className="font-mono text-xs text-gray-500 mb-4">{item.category.toUpperCase()}</p>

                  <div className="border-t-2 border-neo-black pt-3 flex justify-between items-center font-mono text-xs">
                    <div>
                      <span className="block text-gray-400">PURCHASED</span>
                      <span className="font-bold">{new Date(item.purchaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-gray-400">EXPIRES</span>
                      <span className="font-bold">{new Date(item.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
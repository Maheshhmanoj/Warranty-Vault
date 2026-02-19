import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AddItem from './AddItem';
import { fetchItems, deleteItem } from '../api';
import { FaTrash, FaCalendarAlt, FaPen, FaSortAmountDown, FaFilter, FaPlus, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await fetchItems();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
    } catch (err) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl md:text-5xl font-black border-b-4 border-neo-yellow inline-block uppercase">
            My Vault
          </h2>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="bg-neo-yellow hover:bg-yellow-400 text-black font-black py-3 px-6 border-4 border-black shadow-neo flex items-center gap-2 transition-transform hover:-translate-y-1"
          >
            {showAdd ? <FaTimes /> : <FaPlus />} 
            {showAdd ? 'CLOSE' : 'ADD NEW ITEM'}
          </button>
        </div>

        {showAdd && (
          <div className="mb-12 border-4 border-black p-8 bg-white shadow-neo">
            <AddItem 
              onSuccess={() => {
                setShowAdd(false);
                loadItems();
              }}
              onCancel={() => setShowAdd(false)}
            />
          </div>
        )}

        {!showAdd && (
          <>
            <div className="mb-8 flex flex-col md:flex-row gap-4 bg-white p-4 border-4 border-black shadow-neo">
              <div className="flex-1 flex items-center gap-2 border-2 border-black p-2">
                <FaFilter className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search items or categories..." 
                  className="w-full outline-none font-bold"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-gray-200 border-2 border-black px-4 py-2 font-bold flex items-center gap-2 hover:bg-gray-300">
                <FaSortAmountDown /> SORT
              </button>
            </div>

            {loading ? (
              <div className="text-center font-black text-2xl py-12 border-4 border-black shadow-neo bg-white">
                LOADING YOUR VAULT...
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="neo-card p-12 text-center bg-white border-4 border-black shadow-neo">
                <p className="font-black text-2xl mb-4">NO ITEMS FOUND</p>
                <p className="font-bold">Your vault is empty or no items match your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <div key={item._id || Math.random()} className="bg-white border-4 border-black shadow-neo p-6 flex flex-col hover:-translate-y-2 transition-transform duration-200">
                    {item.image ? (
                      <div className="w-full h-56 border-4 border-black mb-4 overflow-hidden bg-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-56 border-4 border-black mb-4 bg-gray-100 flex items-center justify-center">
                        <span className="font-black text-gray-400">NO IMAGE</span>
                      </div>
                    )}
                    <h3 className="text-2xl font-black mb-2 uppercase truncate" title={item.name}>{item.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-neo-yellow px-3 py-1 border-2 border-black font-black text-sm uppercase">
                        {item.category}
                      </span>
                    </div>
                    <p className="font-bold mb-6 flex items-center gap-2 text-lg">
                      <FaCalendarAlt /> 
                      {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'No Expiry Date'}
                    </p>
                    
                    <div className="mt-auto flex justify-between gap-3">
                      <button 
                        className="flex-1 bg-white hover:bg-gray-100 text-black font-black py-2 px-4 border-2 border-black flex items-center justify-center gap-2 transition-colors"
                      >
                        <FaPen /> EDIT
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black py-2 px-4 border-2 border-black flex items-center justify-center gap-2 transition-colors"
                      >
                        <FaTrash /> DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
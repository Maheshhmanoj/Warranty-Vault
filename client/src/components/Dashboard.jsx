import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AddItem from './AddItem';
import { fetchItems, deleteItem } from '../api';
import { FaTrash, FaCalendarAlt, FaPen, FaSortAmountDown, FaFilter } from 'react-icons/fa';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-8 border-b-4 border-neo-yellow inline-block">
          MY VAULT
        </h2>

        {loading ? (
          <div className="text-center font-bold text-xl">Loading your items...</div>
        ) : !Array.isArray(items) || items.length === 0 ? (
          <div className="neo-card p-8 text-center">
            <p className="font-bold text-xl mb-4">No items in your vault yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item._id || Math.random()} className="neo-card p-6 flex flex-col">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover border-2 border-black mb-4 shadow-neo"
                  />
                )}
                <h3 className="text-2xl font-black mb-2 uppercase">{item.name}</h3>
                <p className="font-bold mb-2 flex items-center gap-2">
                  <span className="bg-neo-yellow px-2 py-1 border-2 border-black text-sm">
                    {item.category}
                  </span>
                </p>
                <p className="font-bold mb-4 flex items-center gap-2">
                  <FaCalendarAlt /> 
                  {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'No Date'}
                </p>
                
                <div className="mt-auto flex justify-between gap-2">
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border-2 border-black shadow-neo flex items-center gap-2 w-full justify-center transition-transform hover:-translate-y-1"
                  >
                    <FaTrash /> DELETE
                  </button>
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
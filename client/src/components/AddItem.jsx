import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../api';
import { FaCloudUploadAlt, FaSpinner, FaTimes } from 'react-icons/fa';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    expiryDate: '',
    image: '' 
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, category, expiryDate } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addItem(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Error adding item. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="neo-card p-8 relative">
          <button 
            onClick={() => navigate('/dashboard')}
            className="absolute top-4 right-4 text-neo-black hover:text-red-500"
          >
            <FaTimes size={24} />
          </button>

          <h2 className="text-3xl font-black mb-8 border-b-4 border-neo-yellow inline-block">
            ADD NEW ITEM
          </h2>

          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 mb-4 font-bold">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block font-bold mb-2">ITEM NAME</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                className="neo-input"
                placeholder="e.g. MacBook Pro M3"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">CATEGORY</label>
              <select
                name="category"
                value={category}
                onChange={onChange}
                className="neo-input"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home & Appliances</option>
                <option value="Fashion">Fashion</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2">WARRANTY EXPIRY</label>
              <input
                type="date"
                name="expiryDate"
                value={expiryDate}
                onChange={onChange}
                className="neo-input"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">UPLOAD RECEIPT / IMAGE</label>
              <div className="border-2 border-dashed border-neo-black p-8 text-center bg-gray-50 hover:bg-neo-yellow/10 transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {preview ? (
                  <div className="relative">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-48 mx-auto border-2 border-neo-black shadow-neo"
                    />
                    <p className="mt-2 font-bold text-sm">Click to change</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FaCloudUploadAlt size={48} className="mb-2" />
                    <span className="font-bold">Click to upload image</span>
                    <span className="text-sm mt-1">Max size: 5MB</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="neo-btn w-full flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : 'SAVE TO VAULT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
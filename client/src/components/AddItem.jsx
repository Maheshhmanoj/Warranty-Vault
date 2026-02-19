import { useState } from 'react';
import { addItem } from '../api';
import { FaCloudUploadAlt, FaSpinner, FaTimes } from 'react-icons/fa';

const AddItem = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    expiryDate: '',
    image: ''
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { name, category, expiryDate } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        setFormData(prev => ({ ...prev, image: compressedBase64 }));
      };
    };
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addItem(formData);
      setLoading(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.msg || 'Upload failed');
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {onCancel && (
        <button 
          type="button"
          onClick={onCancel}
          className="absolute top-0 right-0 text-black hover:text-red-500 transition-colors"
        >
          <FaTimes size={28} />
        </button>
      )}
      
      <h2 className="text-3xl font-black mb-8 border-b-4 border-neo-yellow inline-block uppercase">
        Add New Item
      </h2>

      {error && (
        <div className="bg-red-100 border-4 border-black text-red-700 p-3 mb-4 font-bold shadow-neo">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block font-black mb-2 uppercase">Item Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full border-4 border-black p-3 outline-none focus:bg-yellow-50 font-bold"
            required
          />
        </div>

        <div>
          <label className="block font-black mb-2 uppercase">Category</label>
          <select
            name="category"
            value={category}
            onChange={onChange}
            className="w-full border-4 border-black p-3 outline-none focus:bg-yellow-50 font-bold appearance-none bg-white"
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
          <label className="block font-black mb-2 uppercase">Warranty Expiry</label>
          <input
            type="date"
            name="expiryDate"
            value={expiryDate}
            onChange={onChange}
            className="w-full border-4 border-black p-3 outline-none focus:bg-yellow-50 font-bold"
            required
          />
        </div>

        <div>
          <label className="block font-black mb-2 uppercase">Upload Image</label>
          <div className="border-4 border-dashed border-black p-8 text-center bg-gray-50 hover:bg-yellow-50 relative transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {preview ? (
              <div>
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-48 mx-auto border-4 border-black shadow-neo object-contain bg-white" 
                />
                <p className="mt-4 font-black text-sm uppercase">Click to change</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FaCloudUploadAlt size={48} className="mb-2" />
                <span className="font-black uppercase">Click to upload</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-neo-yellow hover:bg-yellow-400 border-4 border-black text-black font-black py-4 flex justify-center items-center shadow-neo transition-transform hover:-translate-y-1 text-xl uppercase"
        >
          {loading ? <FaSpinner className="animate-spin" /> : 'Save To Vault'}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
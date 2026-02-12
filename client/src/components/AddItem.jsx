  import { useState, useEffect } from 'react';
  import { FaTimes, FaCloudUploadAlt, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
  import { addItem, updateItem } from '../api'; 
  import axios from 'axios';

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dajswketl/image/upload";
  const UPLOAD_PRESET = "warranty_vault"; 

  const AddItem = ({ onClose, onRefresh, initialData = null }) => {
    
    const [formData, setFormData] = useState({
      productName: '',
      category: 'Electronics',
      purchaseDate: '',
      warrantyMonths: 12,
      serialNumber: '',
      receiptImage: '',
    });

    const [uiState, setUiState] = useState({
      isLoading: false,
      isUploading: false,
      error: null,
    });

    const safeDate = (dateString) => {
      if (!dateString) return '';
      try {
        return new Date(dateString).toISOString().split('T')[0];
      } catch (e) {
        console.error("Date Error:", e);
        return ''; 
      }
    };

    useEffect(() => {
      if (initialData) {
        setFormData({
          productName: initialData.productName || '',
          category: initialData.category || 'Electronics',
          purchaseDate: safeDate(initialData.purchaseDate), 
          warrantyMonths: initialData.warrantyMonths || 12,
          serialNumber: initialData.serialNumber || '',
          receiptImage: initialData.receiptImage || '',
        });
      }
    }, [initialData]);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (uiState.error) setUiState({ ...uiState, error: null });
    };

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        setUiState({ ...uiState, error: "FILE_SIZE_ERROR: >5MB" });
        return;
      }

      setUiState({ ...uiState, isUploading: true, error: null });
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await axios.post(CLOUDINARY_URL, data);
        setFormData((prev) => ({ ...prev, receiptImage: res.data.secure_url }));
      } catch (err) {
        setUiState({ ...uiState, error: "UPLOAD_FAILED" });
      } finally {
        setUiState((prev) => ({ ...prev, isUploading: false }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUiState({ ...uiState, isLoading: true, error: null });

      try {
        if (initialData) {
          await updateItem(initialData._id, formData);
        } else {
          await addItem(formData);
        }
        onRefresh(); 
        onClose();
      } catch (err) {
        const msg = err.response?.data?.message || "SERVER_ERROR: Operation Failed";
        setUiState({ isLoading: false, isUploading: false, error: msg });
      }
    };

    return (
      <div className="fixed inset-0 bg-neo-black/90 backdrop-blur-sm flex justify-center items-center p-4 z-50">
        <div className="bg-neo-bg border-4 border-neo-black shadow-[8px_8px_0px_0px_#FFFFFF] w-full max-w-md relative animate-fade-in">
          
          <div className="bg-neo-black text-white p-3 flex justify-between items-center border-b-4 border-neo-black">
            <h2 className="text-xl font-black uppercase tracking-tighter font-sans">
              {initialData ? '// UPDATE_WARRANTY' : '// NEW_WARRANTY'}
            </h2>
            <button onClick={onClose} className="text-white hover:text-neo-pink font-bold">[CLOSE]</button>
          </div>

          <div className="p-6">
            {uiState.error && (
              <div className="mb-6 bg-neo-pink border-2 border-neo-black p-3 text-black text-xs font-mono font-bold flex items-center gap-2 shadow-neo">
                <FaExclamationTriangle /> {uiState.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">Product Name *</label>
                <input name="productName" value={formData.productName} required onChange={handleChange} className="neo-input" placeholder="E.G. TERMINAL_V1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="neo-input h-[46px]">
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Appliances</option>
                    <option>Clothing</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Months</label>
                  <input type="number" name="warrantyMonths" value={formData.warrantyMonths} min="1" onChange={handleChange} className="neo-input" />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">Purchase Date *</label>
                <input type="date" name="purchaseDate" value={formData.purchaseDate} required onChange={handleChange} className="neo-input" />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">Receipt Image</label>
                <div className="border-2 border-dashed border-neo-black bg-white p-4 text-center hover:bg-neo-blue/20 transition cursor-pointer relative group">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={uiState.isUploading} />
                  {uiState.isUploading ? (
                    <div className="flex flex-col items-center text-neo-black font-mono text-xs"><FaSpinner className="animate-spin mb-2" /> UPLOADING...</div>
                  ) : formData.receiptImage ? (
                    <div className="relative">
                      <p className="text-neo-green font-bold text-xs font-mono mb-2">✓ UPLOAD_COMPLETE</p>
                      <img src={formData.receiptImage} alt="Preview" className="h-20 mx-auto object-cover border-2 border-neo-black shadow-neo-hover" />
                    </div>
                  ) : (
                    <div className="text-gray-500 group-hover:text-neo-black transition-colors">
                      <FaCloudUploadAlt className="mx-auto mb-2" size={24} /> <p className="text-xs font-mono font-bold uppercase">Click_To_Upload</p>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" disabled={uiState.isLoading || uiState.isUploading} className="neo-btn w-full uppercase flex justify-center items-center gap-2 bg-neo-yellow text-black hover:bg-white">
                {uiState.isLoading ? <FaSpinner className="animate-spin" /> : (initialData ? "UPDATE_DATA" : "SAVE_TO_VAULT")}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default AddItem;
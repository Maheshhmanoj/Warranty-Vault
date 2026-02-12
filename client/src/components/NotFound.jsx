import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-neo-black flex flex-col items-center justify-center p-4 text-center font-sans">
      
      <h1 className="text-9xl font-black text-neo-yellow tracking-tighter mb-2 animate-pulse">
        404
      </h1>
      
      <div className="bg-neo-pink border-4 border-white p-4 shadow-[8px_8px_0px_0px_#FFFFFF] transform -rotate-2 mb-8">
        <h2 className="text-2xl font-bold font-mono uppercase flex items-center gap-2">
          <FaExclamationTriangle /> SYSTEM_FAILURE
        </h2>
      </div>

      <p className="text-white font-mono text-lg mb-12 max-w-md">
        // ERROR: The requested data sector does not exist. 
        It may have been deleted or never initialized.
      </p>

      <Link to="/" className="neo-btn bg-white text-black hover:bg-neo-green hover:text-black flex items-center gap-2 text-xl px-8 py-4">
        <FaHome /> RETURN_TO_BASE
      </Link>
    </div>
  );
};

export default NotFound;
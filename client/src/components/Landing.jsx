import { Link } from 'react-router-dom';
import { FaShieldAlt, FaClock, FaBoxOpen, FaArrowRight } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="min-h-screen bg-neo-bg text-neo-black font-sans selection:bg-neo-pink">
      
      <nav className="border-b-4 border-neo-black bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2 uppercase">
            <div className="bg-neo-black text-white p-2 shadow-neo">
              <FaBoxOpen /> 
            </div>
            Warranty_Vault
          </h1>
          <div className="flex gap-4">
            <Link to="/login" className="font-bold underline decoration-2 hover:bg-neo-yellow hover:no-underline px-2 transition">
              [LOGIN]
            </Link>
            <Link to="/register" className="bg-neo-black text-white px-6 py-2 font-bold border-2 border-neo-black shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all active:translate-y-0 active:shadow-neo">
              GET_STARTED
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-block bg-neo-green border-2 border-neo-black px-4 py-1 font-mono font-bold text-sm mb-6 shadow-neo transform -rotate-2">
          v1.0 // NOW_LIVE
        </div>
        
        <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-8 tracking-tighter">
          Don't Let Your <br/>
          <span className="bg-neo-yellow px-2 border-b-8 border-neo-black">Warranties</span> Die.
        </h2>
        
        <p className="text-xl md:text-2xl font-mono text-gray-700 max-w-3xl mx-auto mb-12 border-l-4 border-neo-pink pl-6 text-left md:text-center md:border-none md:pl-0">
          The digital locker for your physical life. Upload receipts. 
          Track expiry. Get notified before it's too late.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to="/register" className="w-full md:w-auto bg-neo-black text-white text-xl font-bold px-10 py-5 border-4 border-neo-black shadow-[8px_8px_0px_0px_#A3E635] hover:shadow-[12px_12px_0px_0px_#A3E635] hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
            CREATE_VAULT <FaArrowRight />
          </Link>
          <a href="#features" className="w-full md:w-auto bg-white text-neo-black text-xl font-bold px-10 py-5 border-4 border-neo-black shadow-neo hover:bg-neo-pink transition-colors">
            READ_DOCS
          </a>
        </div>
      </div>

      <div id="features" className="border-t-4 border-neo-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h3 className="text-4xl font-black uppercase mb-16 text-center underline decoration-neo-green decoration-8 underline-offset-4">
            System_Capabilities
          </h3>

          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<FaShieldAlt size={32} />}
              color="bg-neo-blue"
              title="Encrypted_Storage"
              desc="Bank-grade encryption for your receipts. Only you hold the keys to your data."
            />
            <FeatureCard 
              icon={<FaClock size={32} />}
              color="bg-neo-pink"
              title="Auto_Expiry"
              desc="We calculate dates automatically. The system warns you 30 days before expiration."
            />
            <FeatureCard 
              icon={<FaBoxOpen size={32} />}
              color="bg-neo-yellow"
              title="Instant_Search"
              desc="Stop digging through shoeboxes. Find that 2019 MacBook receipt in 0.4 seconds."
            />
          </div>
        </div>
      </div>

      <footer className="bg-neo-black text-white py-12 text-center font-mono border-t-4 border-neo-green">
        <p>© 2026 WARRANTY_VAULT // SYSTEM_SECURE</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="border-4 border-neo-black bg-white p-8 shadow-[8px_8px_0px_0px_#121212] hover:-translate-y-2 transition-transform">
    <div className={`w-16 h-16 ${color} border-2 border-neo-black flex items-center justify-center mb-6 shadow-neo`}>
      {icon}
    </div>
    <h4 className="text-2xl font-black uppercase mb-4">{title}</h4>
    <p className="font-mono text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
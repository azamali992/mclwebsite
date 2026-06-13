import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center px-4">
        <h1 className="text-9xl font-extrabold text-mclRed mb-4">404</h1>
        <h2 className="text-4xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let us help you get back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-slate-900 px-8 py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition-all inline-flex items-center gap-2 focus:ring-2 focus:ring-white focus:outline-none rounded"
          >
            <FaArrowLeft /> Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-mclRed text-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-red-800 transition-all inline-flex items-center gap-2 focus:ring-2 focus:ring-red-500 focus:outline-none rounded"
          >
            <FaHome /> Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

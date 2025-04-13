import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPackages } from '../utils/api';

function PackagesList() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const data = await getPackages();
        setPackages(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load packages');
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Travel Packages</h1>
        <Link to="/packages/create" className="btn btn-primary w-full sm:w-auto text-center">
          Add New Package
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center p-8">
          <p className="text-gray-600">Loading packages...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8">
          <p>{error}</p>
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <p className="text-gray-600 mb-4">No travel packages available yet.</p>
          <Link to="/packages/create" className="btn btn-primary">
            Create Your First Package
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
              <div className="h-48 sm:h-52 overflow-hidden">
                <img 
                  src={pkg.imageUrl} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{pkg.title}</h2>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Destination:</span> {pkg.destination}
                </p>
                <div className="flex justify-between items-center mb-4 mt-auto">
                  <span className="text-travel-blue font-bold text-lg">${pkg.price}</span>
                  <span className="text-gray-600">{pkg.duration} days</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                <div className="flex space-x-2 mt-auto">
                  <Link 
                    to={`/packages/${pkg._id}`}
                    className="btn btn-primary flex-1 text-center"
                  >
                    View Details
                  </Link>
                  <Link 
                    to={`/bookings/create/${pkg._id}`}
                    className="btn btn-success flex-1 text-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PackagesList;
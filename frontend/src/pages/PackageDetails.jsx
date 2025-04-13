import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPackageById } from '../utils/api';

function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setIsLoading(true);
        const data = await getPackageById(id);
        setPackageData(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load package details');
        setIsLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {isLoading ? (
        <div className="text-center p-8">
          <p className="text-gray-600">Loading package details...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8">
          <p>{error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 btn btn-primary"
          >
            Go Back
          </button>
        </div>
      ) : !packageData ? (
        <div className="text-center p-8">
          <p className="text-gray-600">Package not found</p>
          <Link to="/packages" className="mt-4 btn btn-primary">
            View All Packages
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto">
              <img 
                src={packageData.imageUrl} 
                alt={packageData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6 md:w-1/2">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">{packageData.title}</h1>
                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Destination:</span> {packageData.destination}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-travel-blue font-bold text-2xl">${packageData.price}</p>
                  <p className="text-gray-600">{packageData.duration} days</p>
                </div>
              </div>
              
              <div className="my-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{packageData.description}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-2">Package Highlights</h2>
                <ul className="list-disc pl-5 text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <li>All-inclusive {packageData.duration}-day trip</li>
                  <li>Professional tour guide</li>
                  <li>Accommodation included</li>
                  <li>Transportation within {packageData.destination}</li>
                  <li>24/7 customer support</li>
                  <li>All entrance fees included</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to={`/bookings/create/${packageData._id}`}
                  className="btn btn-success flex-1 text-center py-3"
                >
                  Book Now
                </Link>
                <Link 
                  to="/packages"
                  className="btn btn-primary flex-1 text-center py-3"
                >
                  Back to Packages
                </Link>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Day 1-2: Arrival</h3>
                <p className="text-gray-600 text-sm">Arrive at your destination and get settled. Meet your guide and enjoy a welcome dinner.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Day 3-{packageData.duration - 2}: Exploration</h3>
                <p className="text-gray-600 text-sm">Experience the best of {packageData.destination} with guided tours and activities.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Day {packageData.duration}: Departure</h3>
                <p className="text-gray-600 text-sm">Enjoy your final day before departing. Transfer to airport included.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PackageDetails;
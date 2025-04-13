import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPackages } from '../utils/api';

function Home() {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        setIsLoading(true);
        const packages = await getPackages();
        // Just get the first 3 packages for featured display
        setFeaturedPackages(packages.slice(0, 3));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load featured packages');
        setIsLoading(false);
      }
    };

    fetchFeaturedPackages();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-travel-blue to-blue-700 text-white py-12 sm:py-16 md:py-20 rounded-lg mb-10 sm:mb-12 w-full">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Discover Your Next Adventure</h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8">Explore exotic destinations with our premium travel packages</p>
          <Link to="/packages" className="btn bg-travel-yellow text-gray-900 hover:bg-yellow-400 px-6 sm:px-8 py-3 rounded-full text-lg font-semibold inline-block">
            Explore Packages
          </Link>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Featured Packages</h2>
        
        {isLoading ? (
          <div className="text-center p-8">
            <p className="text-gray-600">Loading packages...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8">
            <p>{error}</p>
          </div>
        ) : featuredPackages.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-lg shadow">
            <p className="text-gray-600">No packages available yet.</p>
            <Link to="/packages/create" className="btn btn-primary mt-4 inline-block">
              Create Your First Package
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredPackages.map((pkg) => (
              <div key={pkg._id} className="card h-full flex flex-col">
                <div className="h-48 sm:h-52 overflow-hidden">
                  <img 
                    src={pkg.imageUrl} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                  <p className="text-gray-700 mb-2">Destination: {pkg.destination}</p>
                  <div className="flex justify-between items-center mb-4 mt-auto">
                    <span className="text-travel-blue font-bold text-lg">${pkg.price}</span>
                    <span className="text-gray-600">{pkg.duration} days</span>
                  </div>
                  <Link 
                    to={`/packages/${pkg._id}`}
                    className="btn btn-primary w-full text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link to="/packages" className="btn btn-primary inline-block">
            View All Packages
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-10 sm:py-12 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Why Choose Us</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow">
              <div className="bg-travel-teal rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Prices</h3>
              <p className="text-gray-600">We offer the best value for your money with our carefully crafted packages.</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow">
              <div className="bg-travel-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety & Security</h3>
              <p className="text-gray-600">Your safety is our priority. All our tours follow strict safety protocols.</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow sm:col-span-2 lg:col-span-1">
              <div className="bg-travel-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Unforgettable Experiences</h3>
              <p className="text-gray-600">Create lasting memories with our carefully planned and unique travel experiences.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
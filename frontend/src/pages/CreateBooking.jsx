import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPackageById, createBooking } from '../utils/api';

function CreateBooking() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: 1
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setIsLoading(true);
        const data = await getPackageById(packageId);
        setPackageDetails(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load package details');
        setIsLoading(false);
      }
    };

    fetchPackage();
  }, [packageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'guests' ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Create booking with api
      await createBooking({
        ...formData,
        selectedPackage: packageId
      });
      
      // Redirect to bookings list
      navigate('/bookings');
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="text-center">
          <p className="text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error && !packageDetails) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => navigate('/packages')}
            className="mt-4 btn btn-primary"
          >
            View All Packages
          </button>
        </div>
      </div>
    );
  }

  if (!packageDetails) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="text-center">
          <p className="text-gray-600">Package not found</p>
          <button 
            onClick={() => navigate('/packages')}
            className="mt-4 btn btn-primary"
          >
            View All Packages
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = packageDetails.price * formData.guests;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="section-title">Book Your Travel Package</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div className="md:w-1/4 h-28 md:h-24 overflow-hidden rounded-md">
              <img 
                src={packageDetails.imageUrl} 
                alt={packageDetails.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 text-travel-dark">
                {packageDetails.title}
              </h2>
              <p className="card-text mb-2">
                <span className="font-medium">Destination:</span> {packageDetails.destination}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <p className="text-secondary">
                  <span className="font-medium">Duration:</span> {packageDetails.duration} days
                </p>
                <p className="text-secondary">
                  <span className="font-medium">Price:</span> ${packageDetails.price} per person
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <div className="grid gap-6">
          <div>
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="john@example.com"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label" htmlFor="date">
                Travel Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="form-label" htmlFor="guests">
                Number of Guests
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="input-field"
                required
                min="1"
                max="10"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mt-2">
            <h3 className="text-lg font-semibold mb-2 text-travel-dark">Booking Summary</h3>
            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <span className="text-gray-600">Package Price:</span>
              <span className="text-form-text">${packageDetails.price} × {formData.guests} guests</span>
            </div>
            <div className="flex justify-between font-bold text-lg sm:text-xl border-t pt-2 mt-2">
              <span className="text-travel-dark">Total Price:</span>
              <span className="text-travel-blue">${totalPrice}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={() => navigate(`/packages/${packageId}`)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateBooking;
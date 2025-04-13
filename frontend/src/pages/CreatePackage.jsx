import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPackage } from '../utils/api';

function CreatePackage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    price: '',
    duration: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'duration' ? 
        value === '' ? '' : Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Create the package with the API
      await createPackage(formData);
      
      // Redirect to packages list
      navigate('/packages');
    } catch (err) {
      setError('Failed to create package. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="section-title text-travel-dark">Create New Travel Package</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            required
            placeholder="e.g., Amazing Thailand Tour"
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label" htmlFor="destination">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="input-field"
            required
            placeholder="e.g., Bangkok, Thailand"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="form-label" htmlFor="price">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input-field"
              required
              min="0"
              step="0.01"
              placeholder="999.99"
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="duration">
              Duration (days)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="input-field"
              required
              min="1"
              placeholder="7"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            required
            rows="4"
            placeholder="Describe the travel package..."
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="form-label" htmlFor="imageUrl">
            Image URL (optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input-field"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-secondary text-sm mt-1">
            Leave empty to use a random travel image
          </p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/packages')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Package'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePackage;
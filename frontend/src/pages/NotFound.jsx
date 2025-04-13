import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center py-12">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-travel-blue mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
        <Link to="/packages" className="btn btn-success">
          Browse Packages
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
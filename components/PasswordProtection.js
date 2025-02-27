import { useState, useEffect } from 'react';

const PasswordProtection = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // The password to check against - in a real app, this would be stored securely
  const correctPassword = 'ise2023'; // You can change this to any password you want
  
  // Check if user is already authenticated via localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('iseAuthenticated');
    const authExpiry = localStorage.getItem('iseAuthExpiry');
    
    if (authStatus === 'true' && authExpiry && new Date().getTime() < parseInt(authExpiry)) {
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      // Set authentication in localStorage with 24-hour expiry
      const expiryTime = new Date().getTime() + (96 * 60 * 60 * 1000);
      localStorage.setItem('iseAuthenticated', 'true');
      localStorage.setItem('iseAuthExpiry', expiryTime.toString());
      
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-t-2 border-b-2 border-[#6ea8d8] rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <img 
              src="/images/ise.jpeg" 
              alt="ISE Sports Agency" 
              className="h-16 w-auto mx-auto rounded-md shadow-sm border-2 border-black" 
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">ISE Properties</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter the password to access this page
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#6ea8d8] focus:border-[#6ea8d8] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6ea8d8] hover:bg-[#5a96c8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6ea8d8]"
              >
                Access Properties
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  // If authenticated, render the children
  return children;
};

export default PasswordProtection; 
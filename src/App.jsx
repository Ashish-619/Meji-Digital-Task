import { useState, useEffect } from 'react';
import ContactCard from './components/ContactCard';
import UserDetails from './components/UserDetails';
import './index.css';

const ITEMS_PER_PAGE = 6;

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
      setSelectedUser(prevUser => (prevUser && prevUser.id === updatedUser.id ? updatedUser : prevUser));
      setSuccessMessage('User details updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto p-4">
      {selectedUser ? (
        <div>
          <button
            className="mb-4 p-2 bg-gray-300 text-black rounded"
            onClick={handleBackClick}
          >
            &lt; Back
          </button>
          {successMessage && (
            <div className="mb-4 p-2 bg-green-100 text-green-800 border border-green-300 rounded">
              {successMessage}
            </div>
          )}
          <UserDetails user={selectedUser} onUpdate={handleUpdateUser} />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedUsers.map(user => (
              <ContactCard key={user.id} user={user} onClick={() => handleUserClick(user)} />
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-4 items-center">
            <button
              className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              &lt;
            </button>
            <span className="my-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

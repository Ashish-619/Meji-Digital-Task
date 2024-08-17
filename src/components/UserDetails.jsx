import React, { useState, useEffect } from 'react';

const fetchUserPosts = async (userId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();
    return posts;
};

export const getAvatarUrl = (name) => {
    const names = name.split(' ');
    const initials = names.map(name => name[0].toUpperCase()).slice(0, 2).join('');
    return `https://placehold.co/60x60?text=${initials}`;
};

const UserDetails = ({ user, onUpdate }) => {
    const avatarUrl = getAvatarUrl(user.name);
    const [updatedUser, setUpdatedUser] = useState(user);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setUpdatedUser(user);

        const fetchPosts = async () => {
            const posts = await fetchUserPosts(user.id);
            setPosts(posts);
        };

        fetchPosts();
    }, [user]);



    //  If the 'address' field is updated, the input string is split into parts
    // (street, suite, city, zipcode, lat, lng) and the 'address' object in the
    // state is updated with these values.
    // if a company-related field (for example: 'company.name') is updated, the corresponding
    // field in the 'company' object is updated.
    // For all other fields, the state is updated directly with the input value.

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'address') {
            const [street, suite, city, zipcode, lat, lng] = value.split(',').map(part => part.trim());
            setUpdatedUser(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    street,
                    suite,
                    city,
                    zipcode,
                    geo: {
                        lat,
                        lng
                    }
                }
            }));
        } else if (name.startsWith('company.')) {
            const key = name.split('.')[1];
            setUpdatedUser(prev => ({
                ...prev,
                company: {
                    ...prev.company,
                    [key]: value
                }
            }));
        } else {
            setUpdatedUser(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(updatedUser);
    };

    return (
        <div className="flex flex-col lg:flex-row p-6 border rounded-lg shadow-md bg-white">
            <div className="flex-shrink-0 lg:w-48 lg:h-48 mb-4 lg:mb-0">
                <img
                    src={avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="flex-grow lg:ml-6">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={updatedUser.name}
                                onChange={handleChange}
                                className="p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Company</label>
                            <input
                                type="text"
                                name="company.name"
                                value={updatedUser.company.name}
                                onChange={handleChange}
                                className="p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={updatedUser.email}
                                onChange={handleChange}
                                className="p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Industry</label>
                            <input
                                type="text"
                                name="company.bs"
                                value={updatedUser.company.bs}
                                onChange={handleChange}
                                className="p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={updatedUser.username}
                                onChange={handleChange}
                                className="p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Catch Phrase</label>
                            <input
                                type="text"
                                name="company.catchPhrase"
                                value={updatedUser.company.catchPhrase}
                                onChange={handleChange}
                                className="p-2 border rounded w-full"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={[updatedUser.address.street, updatedUser.address.suite, updatedUser.address.city, updatedUser.address.zipcode, updatedUser.address.geo.lat, updatedUser.address.geo.lng].join(', ')}
                                onChange={handleChange}
                                className="p-2 border rounded w-full"
                            />
                        </div>
                        <button type="submit" className="self-start mt-6 p-2 bg-blue-500 text-white rounded-2xl">
                            UPDATE
                        </button>
                    </div>
                </form>
                <div className="mt-6 w-full">
                    <h3 className="text-lg font-semibold mb-2">Posts</h3>
                    {posts.length === 0 ? (
                        <p>No posts available.</p>
                    ) : (
                        <ul className="list-disc pl-5">
                            {posts.map(post => (
                                <li key={post.id} className="mb-4">
                                    <h4 className="font-semibold">{post.title}</h4>
                                    <p>{post.body}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;

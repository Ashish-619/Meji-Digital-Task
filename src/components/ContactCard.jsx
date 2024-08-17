import React from 'react';

export const getAvatarUrl = (name) => {
    const names = name.split(' ');
    const initials = names.map(name => name[0].toUpperCase()).slice(0, 2).join('');
    return `https://placehold.co/60x60?text=${initials}`;
};

const ContactCard = ({ user, onClick }) => {

    const avatarUrl = getAvatarUrl(user.name);

    return (
        <div className="p-4 border-b cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-between">
                <img
                    src={avatarUrl}
                    alt={user.name}
                    className="m-4 rounded-md"
                />
                <div className="flex-grow grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="font-semibold">
                            {user.name}
                            <span className='text-sm text-gray-500'> (@{user.username})</span>
                        </h2>
                        <p className="text-blue-600">{user.email}</p>
                        <p className="text-gray-500 mt-4">Company: {user.company.name}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-500">Phone: {user.phone}</p>
                        <p className="text-gray-500">Website: <span className='text-blue-500'>{`https://${user.website}`}</span></p>
                        <div className="mt-2 flex items-center">
                            <button
                                className="flex items-center p-2 px-4 border border-gray-300 text-gray-700 rounded-full bg-transparent hover:bg-gray-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClick();
                                }}
                            >
                                <span>Details</span>
                                <span className="ml-2 text-gray-600">&gt;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;

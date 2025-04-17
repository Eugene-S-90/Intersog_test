'use client';

import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import Link from 'next/link';
import { SearchBar } from '../components/SearchBar';

export default function HomePage() {
  const { users, loading, error, fetchUsers, searchBarInput } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchBarInput.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-300 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">User list</h1>

      <SearchBar />

      {loading && <p className="text-center text-blue-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded shadow-md p-4 flex flex-col justify-between transform transition-transform duration-200 hover:scale-102 hover:shadow-lg custom-fade-in"
          >
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <Link
              href={`/user/${user.id}`}
              className="mt-4 inline-block text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              More
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

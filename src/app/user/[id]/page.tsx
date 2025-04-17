import { User } from '@/types/user';
import Link from 'next/link';

interface UserPageProps {
    params: Promise<{ id: string }>
}
export default async function UserPage({ params }: UserPageProps) {
    const { id } = await params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!res.ok) {
        return (
            <div className="p-6 text-center text-red-600">
                Error while fetching user data.
            </div>
        );
    }

    const user: User = await res.json();
    console.log(user)
    return (
        <div className="min-h-screen bg-gray-100 p-6 custom-fade-in">
            <div className="mt-2 mb-2 relative flex items-center">
                <Link
                    href="/"
                    className="text-black hover:text-blue-800 text-sm flex items-center"
                >
                    <span className="text-xl mr-1 mt-[-3px]">←</span> Back
                </Link>
            </div>
            <div className="max-w-md mx-auto bg-white rounded shadow p-6">
                <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Adress:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
            </div>
        </div>
    );
}
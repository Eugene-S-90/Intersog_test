
import { SearchBar } from '../components/SearchBar';
import { UserList } from '../components/UserList';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-300 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">User list</h1>
      <SearchBar />
      <UserList />
    </main>
  );
}

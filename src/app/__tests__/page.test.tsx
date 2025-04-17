import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { useUserStore } from '../../store/userStore';


jest.mock('../../store/userStore');

const mockUseUserStore = useUserStore as jest.MockedFunction<typeof useUserStore>;

describe('HomePage', () => {
  beforeEach(() => {
    mockUseUserStore.mockReturnValue({
      users: [],
      loading: false,
      error: null,
      searchTerm: '',
      fetchUsers: jest.fn(),
      setSearchBarInput: jest.fn(),
    });
  });

  it('renders title and search input', () => {
    render(<HomePage />);
    expect(screen.getByText('User list')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type here to search...')).toBeInTheDocument();
  });
});
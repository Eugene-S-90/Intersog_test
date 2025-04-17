import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../SearchBar';
import { useUserStore } from '../../store/userStore';

jest.mock('../../store/userStore');

const mockUseUserStore = useUserStore as jest.MockedFunction<typeof useUserStore>;

describe('SearchBar', () => {
  const setSearchBarInput = jest.fn();

  beforeEach(() => {
    mockUseUserStore.mockReturnValue({
      searchBarInput: '',
      setSearchBarInput,
      users: [],
      loading: false,
      error: null,
      fetchUsers: jest.fn(),
    });
  });

  it('renders the input field with correct placeholder', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Type here to search...')).toBeInTheDocument();
  });

  it('calls setSearchTerm on input change', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Type here to search...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Jon' } });

    expect(setSearchBarInput).toHaveBeenCalledWith('Jon');
  });
});

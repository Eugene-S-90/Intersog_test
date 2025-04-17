import { useUserStore } from '../userStore';
import { act } from 'react';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, name: 'Jon', email: 'Jon@mail.com', phone: '123', address: { city: 'Kyiv', street: '', suite: '', zipcode: '' } },
    ]),
  })
) as jest.Mock;

describe('userStore - fetchUsers()', () => {
  beforeEach(() => {
    useUserStore.setState({
      users: [],
      loading: false,
      error: null,
      searchBarInput: '',
      fetchUsers: useUserStore.getState().fetchUsers,
      setSearchBarInput: useUserStore.getState().setSearchBarInput,
    });
  });

  it('fetches users and updates store', async () => {
    await act(async () => {
      await useUserStore.getState().fetchUsers();
    });

    const state = useUserStore.getState();
    expect(state.users).toHaveLength(1);
    expect(state.users[0].name).toBe('Jon');
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});

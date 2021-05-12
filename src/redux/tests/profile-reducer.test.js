import profileReducer, { addPost, delPost } from '../profile-reducer';

const initialState = {
  posts: [
    { id: 1, post: 'Hi, how are you?', likesCount: 38 },
    { id: 11, post: 'Ha-h!', likesCount: 38 },
    { id: 2, post: 'It\'s a nice day, isn\'t it?', likesCount: 12 },
    { id: 3, post: 'Wie gehts es dir?', likesCount: 58 },
    { id: 4, post: 'Wie heißt du?', likesCount: 15 },
    { id: 5, post: 'Number 5', likesCount: 8 },
  ],
};

describe('tests for profile-reducer ', () => {

   test('after action addPost quantity of the post increased', () => {
    const initialLength = initialState.posts.length;
    const action = addPost('new post from test');
    const newState = profileReducer(initialState, action);
    expect(newState.posts.length).toBe(initialLength + 1);
  });

  test('new post add with the specific text', () => {
    const action = addPost('new post from test');
    const newState = profileReducer(initialState, action);
    expect(newState.posts[newState.posts.length - 1].post).toBe('new post from test');
  });

  test('after action delPost quantity of the posts decreased', () => {
    const initialLength = initialState.posts.length;
    const action = delPost(1);
    const newState = profileReducer(initialState, action);
    expect(newState.posts.length).toBe(initialLength - 1);
  });
});




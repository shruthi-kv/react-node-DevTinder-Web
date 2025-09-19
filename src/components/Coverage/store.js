// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk'; // only if your real store uses thunk

// const middlewares = [thunk]; // or [] if no middleware
// const mockStore = configureMockStore(middlewares);

// export default mockStore;

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'; // only if your app uses thunk

const middlewares = [thunk]; // or [] if no middleware
const mockStore = configureMockStore(middlewares);

export default mockStore;
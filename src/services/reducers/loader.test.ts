import { loaderReducer } from './loader';
import { makeLoading, TLoginActions } from '../actions/login';

const initialState = {
  loading: true
};

describe('Loader reducer', () => {
  it('should return initial state', () => {
    expect(loaderReducer(initialState, {} as TLoginActions)).toEqual(
      initialState
    );
  });

  it('should make loading', () => {
    expect(loaderReducer(initialState, makeLoading(true))).toEqual({
      ...initialState,
      loading: true
    });
  });
});

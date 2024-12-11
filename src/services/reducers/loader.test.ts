import { initialStateOfLoader, loaderReducer } from './loader';
import { makeLoading, TLoginActions } from '../actions/login';

describe('Loader reducer', () => {
  it('should return initial state', () => {
    expect(loaderReducer(initialStateOfLoader, {} as TLoginActions)).toEqual(
      initialStateOfLoader
    );
  });

  it('should make loading', () => {
    expect(loaderReducer(initialStateOfLoader, makeLoading(true))).toEqual({
      ...initialStateOfLoader,
      loading: true
    });
  });
});

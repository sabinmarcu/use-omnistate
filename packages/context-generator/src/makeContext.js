// @flow

import {
  createContext as rc,
  type Context,
} from 'react';

export type ContextType<T> = {
  source: ?T,
  setSource?: T => void,
};

export type ContextRefType<T> = {
  current: ContextType<T>,
};

export const createContext = <T>(
  initValue: ?T,
): Context<ContextType<T>> => rc<ContextType<T>>({
  source: initValue,
});

export default createContext;

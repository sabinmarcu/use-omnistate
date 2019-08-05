// @flow

import React, {
  useMemo,
  useState,
  useContext,
  type Element,
  type ChildrenArray,
  type Context,
} from 'react';
import {
  createContext,
  type ContextType,
} from './makeContext';

export const useProvider = <T>(initData: ?T): ContextType<T> => {
  const [source, setSource] = useState(initData);
  return {
    source,
    setSource,
  };
};

export type ContextWrapperProps<T> = {
  children: ChildrenArray<any>,
  data?: T,
};

export const useConsumer = <T>(
  ContextInstance: Context<ContextType<T>>
): (() => ContextType<T>) => 
  (): ContextType<T> => {
    const context: ContextType<T> = useContext<ContextType<T>>(ContextInstance);
    return context;
  }
            
export const ContextWrapperFactory = <T>(
  ContextInstance: Context<ContextType<T>>
): (ContextWrapperProps<T> => Element<any>) => 
  (
    {
      children,
      data,
    }: ContextWrapperProps<T>,
  ): Element<any> => {
    const { source, setSource } = useProvider<T>(data);
    const context = useMemo<ContextType<T>>(
      () => ({ source, setSource }),
      [source, setSource],
    );
    return (
      <ContextInstance.Provider value={context}>
        {children}
      </ContextInstance.Provider>
    );
  };

export type ContextStateType<T> = {
  useConsumer: () => ContextType<T>,
  ContextWrapper: (ContextWrapperProps<T>) => Element<any>,
}
export const useContextState = <T>(initData: ?T): ContextStateType<T> => {
  const Context: Context<ContextType<T>> = createContext<T>(initData);
  return {
    useConsumer: useConsumer<T>(Context),
    ContextWrapper: ContextWrapperFactory<T>(Context),
  };
}

export default useProvider;

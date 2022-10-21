import {
  createContext,
  FC, ReactNode, useMemo,
  useRef,
} from 'react';
import { ComponentMapper, ComponentMapperType } from './types';

type BlocContextValue = {
  componentMappers: ComponentMapperType;
  addOrOverwriteComponent:(
    key: string,
    componentToAdd: ComponentMapper,
  ) => void;
};

export const BlocContext = createContext<BlocContextValue>({
} as BlocContextValue);

export const BlocProvider: FC<{
  componentMappers: ComponentMapperType;
  children: ReactNode;
}> = ({ componentMappers, children }) => {
  const componentMappersRef = useRef<ComponentMapperType>(componentMappers);

  const addOrOverwriteComponent = (
    key: string,
    componentToAdd: ComponentMapper,
  ): void => {
    if (componentMappersRef && componentMappersRef.current) {
      componentMappersRef.current[key] = componentToAdd;
    }
  };

  const value = useMemo(() => ({
    componentMappers: componentMappersRef.current,
    addOrOverwriteComponent,
  }), []);

  return (
    <BlocContext.Provider
      value={value}
    >
      {children}
    </BlocContext.Provider>
  );
};

export default BlocProvider;

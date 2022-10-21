import {
  createElement,
  useContext,
} from 'react';
import { BlocContext } from './BlocProvider';
import { ComponentMapperType } from './types';

export type BlocProps = {
  id: string;
  props?: unknown;
  componentMapperIdentifier: string;
  componentMappers?: ComponentMapperType;
};

export const BlocFn = ({
  id,
  props,
  componentMapperIdentifier,
  componentMappers = {},
}: BlocProps): JSX.Element => {
  if (typeof componentMappers[componentMapperIdentifier] === 'undefined') {
    return createElement(
      () => {
        // eslint-disable-next-line no-console
        console.error(
          `Component not added to component mapper ${componentMapperIdentifier}. Try adding it or creating it.`,
        );
        return null;
      },
      { key: id },
    );
  }
  const componentMapper = componentMappers[componentMapperIdentifier];
  const componentProps = !!props && !!componentMapper.mapper
    ? componentMapper.mapper(props)
    : props;
  componentMapper.component.displayName = `${componentMapperIdentifier
    .charAt(0)
    .toUpperCase()}${componentMapperIdentifier.slice(1)}`;
  const retval = createElement(componentMapper.component, {
    ...componentProps,
    key: id,
  });
  return retval;
};

export function Bloc({
  componentMappers,
  ...restOfProps
}: BlocProps): JSX.Element {
  const context = useContext(BlocContext);
  if (context && context.componentMappers) {
    const contextLevelComponentMappers = context.componentMappers;
    if (componentMappers) {
      Object.keys(componentMappers).forEach((key) => {
        contextLevelComponentMappers[key] = componentMappers[key];
      });
    }
    return BlocFn({
      componentMappers: contextLevelComponentMappers,
      ...restOfProps,
    });
  }
  return BlocFn({ componentMappers, ...restOfProps });
}

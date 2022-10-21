/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, ComponentClass } from 'react';

export type ComponentMapper = {
  component: FunctionComponent<any> | ComponentClass<any>;
  mapper?: (props: any) => any;
};

export type ComponentMapperType = {
  [key: string]: ComponentMapper;
};

import {
  Children,
  createElement,
  Fragment,
  FunctionComponentElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
} from 'react';

type Component = {
  props?: unknown;
  type?: () => { name?: string };
};
type CollectorType = {
  [keyof: string]: Array<ReactNode | ReactFragment | ReactPortal>;
};

type NamedSlot = {
  name?: string;
  children?: ReactNode;
};

export const useSlots = (
  slotChildren: ReactNode,
  namedSlots: string[],
): [
    ({
      name,
      children,
    }: NamedSlot) => FunctionComponentElement<{ children?: ReactNode } & never[]>,
    (slot: string) => boolean,
  ] => {
  const slots = Children.toArray(slotChildren).reduce(
    (collector: CollectorType, child) => {
      const component = child as Component;

      const slotName = component?.type?.name && namedSlots.includes(component.type.name)
        ? component.type.name
        : 'children';

      if (!(slotName in collector)) {
        // eslint-disable-next-line no-param-reassign
        collector[slotName] = [];
      }
      collector[slotName].push(child);
      return collector;
    },
    { children: [] },
  );

  return [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ name, children }: NamedSlot): FunctionComponentElement<any> => {
      if (!name) {
        return createElement(Fragment, null, slots.children);
      }
      const filteredChildren = name in slots ? slots[name] : children;
      return createElement(Fragment, null, filteredChildren);
    },
    (slot: string): boolean => slot in slots && !!slots[slot],
  ];
};

export default useSlots;

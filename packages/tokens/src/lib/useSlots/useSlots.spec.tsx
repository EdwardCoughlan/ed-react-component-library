import React, { FC, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { useSlots } from './useSlots';

const AComponentForSlotting: FC = () => <div>A component for slotting</div>;

const ExampleSlottedComponent: FC<PropsWithChildren> = ({ children }) => {
  const [Slots, hasSlots] = useSlots(children, [AComponentForSlotting.name]);

  return (
    <div>
      {hasSlots(AComponentForSlotting.name) && (
        <Slots name={AComponentForSlotting.name} />
      )}
      <Slots name="NotFoundButHasDefault">
        <div>I am a default value</div>
      </Slots>
      <div>
        <Slots />
      </div>
    </div>
  );
};

test('Basic', () => {
  const { container } = render(
    <ExampleSlottedComponent>
      <AComponentForSlotting />
      <div>default item</div>
      and some string
    </ExampleSlottedComponent>,
  );
  expect(container).toMatchSnapshot();
});

test('Inverted', () => {
  const { container } = render(
    <ExampleSlottedComponent>
      <div>default item</div>
      and some string
      <AComponentForSlotting />
    </ExampleSlottedComponent>,
  );
  expect(container).toMatchSnapshot();
});

test('equivelant', () => {
  const render1 = render(
    <ExampleSlottedComponent>
      <div>default item</div>
      and some string
      <AComponentForSlotting />
    </ExampleSlottedComponent>,
  );
  const render2 = render(
    <ExampleSlottedComponent>
      <AComponentForSlotting />
      <div>default item</div>
      and some string
    </ExampleSlottedComponent>,
  );
  expect(render1.container.innerHTML).toBe(render2.container.innerHTML);
});

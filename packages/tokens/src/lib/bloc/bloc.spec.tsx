import React, { FC, useContext } from 'react';
import { render } from '@testing-library/react';
import { Bloc } from './bloc';
import { BlocContext, BlocProvider } from './bloc-provider';
import { ComponentMapper } from './types';

const ComponentWithNoProps: React.FC = () => <div>Test with no props</div>;

type ComponentProps = {
  contents: string;
};
type ComponentProps2 = {
  alteredContents: string;
};
type ComponentProps2Altered = {
  alteredContents: string;
};

const ComponentWithProps = ({ contents }: ComponentProps): JSX.Element => (
  <div>{contents}</div>
);
const ComponentWithProps2: React.FC<ComponentProps2> = ({
  alteredContents,
}: ComponentProps2Altered) => <div>{alteredContents}</div>;
const ComponentWithProps3: React.FC<ComponentProps2> = ({
  alteredContents,
}: ComponentProps2Altered) => <div>{alteredContents}</div>;

const Mappers: Record<string, (props: ComponentProps) => ComponentProps2> = {
  componentWithProps2: (props): ComponentProps2 => ({
    alteredContents: `Altered ${(props as ComponentProps).contents}`,
  }),
  componentWithProps3: () => {
    throw new Error('Oh goodness gracious');
  },
};

const componentMappers: Record<string, ComponentMapper> = {
  componentWithNoProps: { component: ComponentWithNoProps },
  componentWithProps: { component: ComponentWithProps },
  componentWithProps2: {
    component: ComponentWithProps2,
    mapper: Mappers.componentWithProps2,
  },
  componentWithProps3: {
    component: ComponentWithProps3,
    mapper: Mappers.componentWithProps3,
  },
};

test('BLoc component without props', () => {
  const { container } = render(
    <Bloc
      id="1"
      componentMapperIdentifier="componentWithNoProps"
      componentMappers={componentMappers}
    />
  );

  expect(container).toMatchSnapshot();
});

test('Bloc component with props', () => {
  const test = "I am a component with props. That doesn't use a mapper";
  const { container } = render(
    <Bloc
      id="1"
      componentMapperIdentifier="componentWithProps"
      props={{
        contents: test,
      }}
      componentMappers={componentMappers}
    />
  );
  expect(container).toMatchSnapshot();
});

test("BLoc component doesn't exists", () => {
  const logSpy = jest.spyOn(console, 'error');
  render(
    <Bloc
      id="1"
      props={{
        content: "I am a component that doesn't exists",
      }}
      componentMapperIdentifier="componentThatDoesNotExists"
      componentMappers={componentMappers}
    />
  );
  expect(logSpy).toHaveBeenCalled();
});

test('Bloc component with props to be mapped', () => {
  const { container } = render(
    <Bloc
      id="1"
      componentMapperIdentifier="componentWithProps2"
      props={{
        contents: 'I am a component with props. That that will be mapped',
      }}
      componentMappers={componentMappers}
    />
  );
  expect(container).toMatchSnapshot();
});

test('Bloc component with props to be mapped error', () => {
  expect(() =>
    render(
      <Bloc
        id="1"
        componentMapperIdentifier="componentWithProps3"
        props={{
          contents:
            'I am a component with props. That that will be mapped but an error will happen',
        }}
        componentMappers={componentMappers}
      />
    )
  ).toThrowError();
});

test('Bloc with component coming from BlocContext', () => {
  type OldProps = { contents: string };
  type NewProps = { fromContext: string };
  const ContextComponent: React.FC<NewProps> = ({
    fromContext,
  }: {
    fromContext: string;
  }) => <div>{`context : ${fromContext}`}</div>;
  const { container } = render(
    <BlocProvider
      componentMappers={{
        componentFromContext: {
          component: ContextComponent,
          mapper: ({ contents }: OldProps): NewProps => ({
            fromContext: contents,
          }),
        },
      }}
    >
      <Bloc
        id="1"
        componentMapperIdentifier="componentFromContext"
        props={{
          contents: 'I am a component that is a part of the global context.',
        }}
        componentMappers={componentMappers}
      />
    </BlocProvider>
  );
  expect(container).toMatchSnapshot();
});

test('Bloc with BlocContext being overridden by inner value', () => {
  type OldProps = { contents: string };
  type NewProps = { fromContext: string };
  const ContextComponent: React.FC<NewProps> = ({
    fromContext,
  }: {
    fromContext: string;
  }) => <div>{`context : ${fromContext}`}</div>;
  const { container } = render(
    <BlocProvider
      componentMappers={{
        sameIdentifier: {
          component: ContextComponent,
          mapper: ({ contents }: OldProps): NewProps => ({
            fromContext: contents,
          }),
        },
      }}
    >
      <Bloc
        id="1"
        componentMapperIdentifier="sameIdentifier"
        props={{
          contents: 'I should have a prefix of override from bloc',
        }}
        componentMappers={{
          sameIdentifier: {
            component: ({ contents }: { contents: string }): JSX.Element => (
              <div>{`override from block: ${contents}`}</div>
            ),
          },
        }}
      />
    </BlocProvider>
  );
  expect(container).toMatchSnapshot();
});

test('No component mappers secified', () => {
  const logSpy = jest.spyOn(console, 'error');
  render(
    <Bloc
      id="1"
      componentMapperIdentifier="componentFromContext"
      props={{
        contents: 'I am a component that is a part of the global context.',
      }}
    />
  );

  expect(logSpy).toHaveBeenCalled();
});

test('complex prodvider setup', () => {
  const ComponentOne: FC = () => <div>I am Component One</div>;
  const BlocComponent: FC = () => (
    <div>
      <p>I am Bloc Component</p>
      <Bloc componentMapperIdentifier="ComponentOne" id="component-one" />
    </div>
  );
  const BlocComponentToAddComponents: FC = () => {
    const { addOrOverwriteComponent } = useContext(BlocContext);
    addOrOverwriteComponent('BlocComponent', { component: BlocComponent });
    return (
      <div>
        <p>I am the component that add another component to the context</p>
        <Bloc componentMapperIdentifier="BlocComponent" id="bloc-component" />
      </div>
    );
  };

  const { container } = render(
    <BlocProvider
      componentMappers={{
        BlocComponentToAddComponents: {
          component: BlocComponentToAddComponents,
        },
        ComponentOne: {
          component: ComponentOne,
        },
      }}
    >
      <Bloc
        componentMapperIdentifier="BlocComponentToAddComponents"
        id="bloc-component-to-add-components"
      />
    </BlocProvider>
  );
  expect(container).toMatchSnapshot();
});

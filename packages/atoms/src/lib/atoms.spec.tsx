import { render } from '@testing-library/react';

import { Atoms } from './atoms';

describe('Atoms', () => {
  it('should render successfully', () => {
    const { baseElement, container } = render(<Atoms />);
    expect(baseElement).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

import { render } from '@testing-library/react';

import { Tokens } from './tokens';

describe('Tokens', () => {
  it('should render successfully', () => {
    const { baseElement, container } = render(<Tokens />);
    expect(baseElement).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

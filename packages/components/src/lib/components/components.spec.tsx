import { render } from '@testing-library/react';

import { Components } from './components';

describe('Components', () => {
  it('should render successfully', () => {
    const { baseElement, container } = render(<Components />);
    expect(baseElement).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

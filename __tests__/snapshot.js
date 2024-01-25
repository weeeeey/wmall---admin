import { render } from '@testing-library/react';
import RootLayout from '../app/page';

it('renders homepage unchanged', () => {
    const { container } = render(<RootLayout />);
    expect(container).toMatchSnapshot();
});

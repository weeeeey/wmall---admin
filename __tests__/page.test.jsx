import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RootLayout from '../app/layout';

describe('Page', () => {
    it('renders a heading', () => {
        render(<RootLayout />);

        const heading = screen.getByRole('heading', { level: 1 });

        expect(heading).toBeInTheDocument();
    });
});

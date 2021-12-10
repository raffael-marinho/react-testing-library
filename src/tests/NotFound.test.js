import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './helpers/renderWithRouter';

const altImg = 'Pikachu crying because the page requested was not found';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const h2Testid = screen.getByText(/requested not found/i);
    expect(h2Testid).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.',
    () => {
      render(<NotFound />);
      const testeImg = screen.getByAltText(altImg);
      expect(testeImg.src).toMatch('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});

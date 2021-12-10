import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    test('O primeiro link deve possuir o texto Home.', () => {
      renderWithRouter(<App />);
      const home = screen.getByText('Home');
      expect(home).toBeInTheDocument();
    });

    test('O segundo link deve possuir o texto About.', () => {
      renderWithRouter(<App />);
      const home = screen.queryByText('About');
      expect(home).not.toBeNull();
    });

    test('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
      renderWithRouter(<App />);
      const home = screen.queryByText('Favorite Pokémons');
      expect(home).not.toBeNull();
    });

    test('Teste se ao clicar no link Home da barra de navegação.', () => {
      renderWithRouter(<App />);
      const buscaHome = screen.getByText('Home');
      expect(buscaHome).toHaveAttribute('href', '/');
    });

    test('Testa se na URL /about, ao clicar no link About da barra de navegação.', () => {
      renderWithRouter(<App />);
      const buscaAbout = screen.getByText('About');
      expect(buscaAbout).toHaveAttribute('href', '/about');
    });

    test('Teste se ao clicar no link Favorite Pokémons da barra de navegação.', () => {
      renderWithRouter(<App />);
      const findPoke = screen.getByText('Favorite Pokémons');
      expect(findPoke).toHaveAttribute('href', '/favorites');
    });

    test('deve testar um caminho não existente e a renderização do Not Found', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pagina/que-nao-existe/');
      const { location: { pathname } } = history;
      expect(pathname).toBe('/pagina/que-nao-existe/');
    });
  });

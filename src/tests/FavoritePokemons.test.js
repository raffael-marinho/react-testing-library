import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('favorites');
    const favoritoNotFound = screen.getByText('No favorite pokemon found');
    expect(favoritoNotFound).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toBeInTheDocument();

    userEvent.click(favoriteButton);

    expect(favoriteButton.checked).toBe(true);

    history.push('/favorites');

    const pokeName = screen.getByText('Pikachu');
    const pokeType = screen.getByText('Electric');
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    const starImage = screen.getByAltText('Pikachu is marked as favorite');

    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    expect(starImage.src).toMatch('/star-icon.svg');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import { PokemonDetails } from '../components';
import renderWithRouter from './helpers/renderWithRouter';
// import { pokemonType } from '../types';

const pikachu = '/pokemons/25';

describe('Teste o componente <Pokemon.js />', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();
  });

  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const pokeType = screen.getAllByTestId(/pokemon-type/i);
    // expect(pokeType[0]).toHaveTextContent(/Electric/i);
    expect(pokeType[0].innerHTML).toMatch('Electric');
  });

  test('O peso médio do pokémon deve ser exibido com um texto', () => {
    renderWithRouter(<App />);
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokeWeight).toBeInTheDocument();
  });

  test('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    const pikachuImg = screen.getByAltText('Pikachu sprite');
    expect(pikachuImg.src).toMatch(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    renderWithRouter(<App />);
    const buscaDetails = screen.getByText('More details');
    expect(buscaDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    const { history } = renderWithRouter(<App />);
    const confereDetails = screen.getByText(/More details/i);
    userEvent.click(confereDetails);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe(pikachu);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachu);

    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toBeInTheDocument();

    userEvent.click(favoriteButton);
    expect(favoriteButton.checked).toBe(true);

    history.push('/favorites');
    const starImage = screen.getByAltText('Pikachu is marked as favorite');
    expect(starImage.src).toMatch('/star-icon.svg');
    expect(starImage.alt).toMatch('Pikachu is marked as favorite');
  });
});

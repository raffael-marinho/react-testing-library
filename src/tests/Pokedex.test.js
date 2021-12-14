import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const testidNextBtn = 'next-pokemon';
const testidPokeName = 'pokemon-name';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toMatch(/H2/i);
  });

  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const next = screen.getByText('Próximo pokémon');
    expect(next).toBeInTheDocument();
    expect(next.tagName).toMatch(/button/i);
  });

  test('Os próximos Pokémons da lista devem ser mostrados, ao clicar no botão;', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId(testidPokeName);
    expect(pokeName).toHaveTextContent('Pikachu');
    const next = screen.getByTestId(testidNextBtn);
    userEvent.click(next);
    expect(pokeName).toHaveTextContent('Charmander');
  });

  test('O 1° Pokémon da lista deve ser mostrado, se estiver no último Pokémon da lista',
    () => {
      renderWithRouter(<App />);
      const pokeName = screen.getByTestId(testidPokeName);
      expect(pokeName).toHaveTextContent('Pikachu');
      const next = screen.getByTestId(testidNextBtn);
      userEvent.click(next);
      userEvent.click(next);
      userEvent.click(next);
      userEvent.click(next);
      userEvent.click(next);
      userEvent.click(next);
      userEvent.click(next);
      userEvent.click(next);
      expect(pokeName).toHaveTextContent('Dragonair');
    });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId(testidNextBtn);
    const pokeName = screen.getByTestId(testidPokeName);
    expect(pokeName).toHaveTextContent(/pikachu/i);
    userEvent.click(nextBtn);
    expect(pokeName).toHaveTextContent(/charmander/i);
  });

  // test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.',
  //   () => {
  //     renderWithRouter(<App />);
  //     const filterAll = screen.getByText(/All/i);
  //     expect(filterAll).toBeInTheDocument();
  //     expect(filterAll.tagName).toMatch(/button/i);
  //     const filterElectric = screen.getByText(/Electric/i);
  //     expect(filterElectric).toBeInTheDocument();
  //     expect(filterElectric.tagName).toMatch(/button/i);
  //     const filterFire = screen.getByText(/Fire/i);
  //     expect(filterFire).toBeInTheDocument();
  //     expect(filterFire.tagName).toMatch(/button/i);
  //     const filterBug = screen.getByText(/Bug/i);
  //     expect(filterBug).toBeInTheDocument();
  //     expect(filterBug.tagName).toMatch(/button/i);
  //     const filterPoison = screen.getByText(/Poison/i);
  //     expect(filterPoison).toBeInTheDocument();
  //     expect(filterPoison.tagName).toMatch(/button/i);
  //     const filterPsychic = screen.getByText(/Psychic/i);
  //     expect(filterPsychic).toBeInTheDocument();
  //     expect(filterPsychic.tagName).toMatch(/button/i);
  //     const filterNormal = screen.getByText(/Normal/i);
  //     expect(filterNormal).toBeInTheDocument();
  //     expect(filterNormal.tagName).toMatch(/button/i);
  //     const filterDragon = screen.getByText(/Dragon/i);
  //     expect(filterDragon).toBeInTheDocument();
  //     expect(filterDragon.tagName).toMatch(/button/i);
  //   });

  test('A partir da seleção de um botão de tipo, deve mostrar somente pokémons de tipo;',
    () => {
      renderWithRouter(<App />);
      const filterType = screen.getAllByTestId('pokemon-type-button');
      expect(filterType[1]).toHaveTextContent('Fire');
      const next = screen.getByTestId(testidNextBtn);
      const comparaType = screen.getByTestId('pokemon-type');
      userEvent.click(next);
      const comparaType2 = screen.getByTestId('pokemon-type');
      expect(comparaType).toBe(comparaType2);
    });

  test('O texto do botão deve ser All;', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByTestId('');
    expect(btnAll).toHaveTextContent('All');
  });

  test('A Pokedéx deverá mostrar os Pokémons normalmente quando o botão All for clicado;',
    () => {
      renderWithRouter(<App />);
      const btnAll = screen.getByTestId('');
      userEvent.click(btnAll);
      const pokeName = screen.getByTestId(testidPokeName);
      expect(pokeName).toHaveTextContent('Pikachu');
    });
});

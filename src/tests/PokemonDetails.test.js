import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const paragrafText = 'This intelligent Pokémon roasts hard berries with electricity '
+ 'to make them tender enough to eat.';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      userEvent.click(moreDetails);

      const titleDetails = screen.getByText(/Pikachu Details/i);
      expect(titleDetails).toBeInTheDocument();
    });

  test('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      userEvent.click(moreDetails);

      const titleSummary = screen.getByText(/Summary/i);
      expect(titleSummary).toBeInTheDocument();
      expect(titleSummary.tagName).not.toMatch(/href/i);

      const detailsName = screen.getByTestId(/pokemon-name/i);
      expect(detailsName).toHaveTextContent('Pikachu');
      expect(detailsName.tagName).not.toMatch(/href/i);

      const detailsType = screen.getByTestId(/pokemon-type/i);
      expect(detailsType).toHaveTextContent('Electric');
      expect(detailsType.tagName).not.toMatch(/href/i);

      const detailsWeight = screen.getByTestId(/pokemon-weight/i);
      expect(detailsWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
      expect(detailsWeight.tagName).not.toMatch(/href/i);
    });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary.',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      userEvent.click(moreDetails);

      const titleSummary = screen.getByText(/Summary/i);
      expect(titleSummary).toBeInTheDocument();
      expect(titleSummary.tagName).toMatch(/H2/i);
    });

  test('deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      userEvent.click(moreDetails);

      const detailsParagraf = screen.getByText(paragrafText);
      expect(detailsParagraf).toBeInTheDocument();
      expect(detailsParagraf.tagName).toMatch(/p/i);
    });

  test('Na seção de detalhes deverá ter um heading h2 com o Game Locations of <name>',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      userEvent.click(moreDetails);

      const titleMap = screen.getByText(/Game Locations of Pikachu/i);
      expect(titleMap).toBeInTheDocument();
      expect(titleMap.tagName).toMatch(/H2/i);
    });

  test('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      userEvent.click(moreDetails);

      const titleMap = screen.getByText(/Game Locations of Pikachu/i);
      expect(titleMap).toBeInTheDocument();
      expect(titleMap.tagName).toMatch(/H2/i);

      const gameMap1 = screen.getByText(/Kanto Viridian Forest/i);
      expect(gameMap1).toBeInTheDocument();
      // expect(gameMap1.tagName).toMatch(/p/i);

      const gameMap2 = screen.getByText(/Kanto Power Plant/i);
      expect(gameMap2).toBeInTheDocument();
      // expect(gameMap2.tagName).toMatch(/p/i);
    });

  test('A imagem da localização deve ter um atributo src com a URL da localização;',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      userEvent.click(moreDetails);

      const mapImg1 = screen.getAllByAltText(/Pikachu location/i);
      expect(mapImg1[0].src).toMatch('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      const mapImg2 = screen.getAllByAltText(/Pikachu location/i);
      expect(mapImg2[1].src).toMatch('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    });

  test('A imagem da localização deve ter um atributo alt',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      userEvent.click(moreDetails);

      const altImg = screen.getAllByAltText(/Pikachu location/i);
      expect(altImg[0].alt).toMatch(/Pikachu location/i);
      expect(altImg[1].alt).toMatch(/Pikachu location/i);
    });

  test('A página deve exibir um checkbox que permite favoritar o Pokémon;',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      userEvent.click(moreDetails);

      const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.tagName).toMatch(/input/i);
      expect(checkbox.type).toMatch(/checkbox/i);
    });
});

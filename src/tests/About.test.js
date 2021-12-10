import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../components';

const p = /This application simulates a Pokédex/i;
const p2 = 'One can filter Pokémons by type, and see more details for each one of them';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const heading = screen.getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toMatch(/H2/i);
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const paragrafo1 = screen.getByText(p);
    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo1.tagName).toMatch(/p/i);

    const paragrafo2 = screen.getByText(p2);
    expect(paragrafo2).toBeInTheDocument();
    expect(paragrafo2.tagName).toMatch(/p/i);
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);
    const descriçao = screen.getByAltText('Pokédex');
    expect(descriçao.src).toMatch(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});

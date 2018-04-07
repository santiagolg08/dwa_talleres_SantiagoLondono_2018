import { PokedexAngular5Page } from './app.po';

describe('pokedex-angular5 App', function() {
  let page: PokedexAngular5Page;

  beforeEach(() => {
    page = new PokedexAngular5Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

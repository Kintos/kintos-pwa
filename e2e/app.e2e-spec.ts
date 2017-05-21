import { KintosPwaPage } from './app.po';

describe('kintos-pwa App', () => {
  let page: KintosPwaPage;

  beforeEach(() => {
    page = new KintosPwaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

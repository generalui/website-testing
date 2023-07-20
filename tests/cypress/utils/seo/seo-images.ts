export const testImages = (options) => {
  const excludedSrcs = [
    ...[
      'pixel.quantserve.com',
      'fls.doubleclick.net',
      'sp.analytics.yahoo.com',
      'px.owneriq.net',
      'secure.adnxs.com',
    ],
    ...(options?.exclude || []),
  ];

  const excludedAlts = ['Ad Lightning'];

  context('Images', () => {
    it('has required attributes', () => {
      cy.get('img').each(($img) => {
        let src = $img[0].getAttribute('src');

        // Temporary until all images are switched to loading="lazy"
        if (!src) {
          src =
            $img[0].getAttribute('data-src') ||
            $img[0].getAttribute('data-original');
        }

        expect(src, 'Missing src: \n\n' + $img[0].outerHTML + '\n\n').not.to.be
          .empty;

        if (excludedSrcs.includes(src)) {
          return;
        }

        expect($img[0].alt, 'Missing alt. \n\n' + $img[0].outerHTML + '\n\n')
          .not.to.be.empty;

        if (!excludedAlts.includes($img[0].alt)) {
          expect(
            $img[0].getAttribute('width'),
            'Missing width. \n\n' + $img[0].outerHTML + '\n\n'
          ).not.to.be.empty;
          expect(
            $img[0].getAttribute('height'),
            'Missing height. \n\n' + $img[0].outerHTML + '\n\n'
          ).not.to.be.empty;
        }
      });
    });
  });
};

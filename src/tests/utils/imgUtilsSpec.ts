import { resizeImg } from '../../utils/imgUtils';

describe('Image transform function should resolve or reject ', () => {
  it('Expect transform to not throw error', async () => {
    await expectAsync(
      resizeImg('image_1', {
        size: { width: 200, height: 200 },
      })
    ).toBeResolved();
  });

  it('Expect transform to throw specific error: Image not found', async () => {
    await expectAsync(
      resizeImg('image99', {
        size: { width: 200, height: 200 },
      })
    ).toBeRejectedWith(new Error('Image not found!'));
  });

  it('Expect transform to throw specific error: Cannot resize image with input size (0, 200)', async () => {
    await expectAsync(
      resizeImg('image_1', {
        size: { width: 0, height: 200 },
      })
    ).toBeRejectedWith(new Error('Cannot resize image with input size'));
  });

  it('Expect transform to throw specific error: Cannot resize image with input size (200, 0)', async () => {
    await expectAsync(
      resizeImg('image_1', {
        size: { width: 200, height: 0 },
      })
    ).toBeRejectedWith(new Error('Cannot resize image with input size'));
  });
});

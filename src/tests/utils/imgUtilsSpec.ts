import { resizeImg } from '../../utils/imgUtils';

describe('Image transform function should resolve or reject ', () => {
    it('Expect transform to not throw error', async () => {
        await expectAsync(
            resizeImg('image_1', {
                size: {width: 200, height: 200},
            })
        ).toBeResolved();
    });
    it('Expect a specific error to be thrown by transform: Unable to resize the image with the given dimensions (0, 200)', async () => {
        await expectAsync(
            resizeImg('image_1', {
                size: {width: 0, height: 200},
            })
        ).toBeRejectedWith(new Error('Unable to resize the image with the given dimensions'));
    });
    it('Expect a specific error to be thrown by transform: Unable to resize the image with the given dimensions (200, 0)', async () => {
        await expectAsync(
            resizeImg('image_1', {
                size: {width: 200, height: 0},
            })
        ).toBeRejectedWith(new Error('Unable to resize the image with the given dimensions'));
    });
    it('Expect a specific error to be thrown by transform: Image was not found', async () => {
        await expectAsync(
            resizeImg('image99', {
                size: { width: 200, height: 200 },
            })
        ).toBeRejectedWith(new Error('Image was not found!'));
    });
});

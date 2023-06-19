import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint response ', () => {
    it('Get the API/Image endpoint successfully', async () => {
        const response = await request.get(
            '/api/images?filename=image_1&width=400&height=400'
        );
        expect(response.status).toBe(200);
    });

    it('Get the API/Image endpoint 400', async () => {
        const response = await request.get(
            '/api/images?filename=image99&width=400&height=400'
        );
        expect(response.status).toBe(400);
    });
});

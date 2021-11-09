const request = require('supertest');
const app = require('./app');

const postMetric = (metric = 0) => {
    return request(app).post(`/${metric}`);
};

const getMetric = (metric = 0) => {
    return request(app).get(`/${metric}/median`);
};

const deleteMetric = (metric = 0) => {
    return request(app).delete(`/${metric}`);
};

describe('metric-logging analytic', () => {
    it('should return an empty object when metric is recorded successfully', async () => {
        const response = await postMetric(4);
        expect(response.body).toEqual({});
    });

    it('should return 201 created when metric is recorded successfully', async () => {
        const response = await postMetric(2);
        expect(response.status).toBe(201);
    });

    it('should record metric successfully if a non integer value is sent as value of metric', async () => {
        const response = await postMetric('small');
        expect(response.status).toBe(201);
    });

    it('should return a value when median is fetched', async () => {
        const response = await getMetric();
        expect(response.body.median).toBeDefined();
    });
    
    it('should return success when average values are deleted', async () => {
        const response = await deleteMetric();
        expect(response.status).toBe(204);
    });
})

// Write your tests here

const request = require('supertest');
const server = require('./server');

test('sanity', () => {
  expect(true).toBe(true);
});
describe('check login status', () => {
  it('should return a 200 status', async () => {
    const expectedStatus = 200;

    const response = await request(server).post('/api/auth/login');
    expect(response.status).toEqual(expectedStatus);
  });
});

describe('check login status', () => {
  it('should return a 200 status', async () => {
    const expectedStatus = 200;

    const response = await request(server).post('/api/auth/register');
    expect(response.status).toEqual(expectedStatus);
  });
});

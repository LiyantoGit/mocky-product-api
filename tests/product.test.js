const request = require('supertest')
const app = require('../src/app')

test('Should filter without params from products', async () => {
    let response = await request(app)
        .get('/filter')
        .send()
        .expect(200)
    expect(response).not.toBeNull()
    expect(response.body).toHaveProperty('content') 
})

test('Should filter with params from products', async () => {
    const response = await request(app)
        .get('/filter')
        .query({
            maxprice: '20',
            size: 'medium,large',
            highlight: 'green,blue'
        })
        .expect(200)

    expect(response).not.toBeNull()
    expect(response.body.price).toStrictEqual({
        min: 10, max: 20
    })
})

test('Error path - with invalid keys', async () => {
    await request(app)
        .get('/filter')
        .query({ abcd: 'abcd' })
        .expect(400)
})


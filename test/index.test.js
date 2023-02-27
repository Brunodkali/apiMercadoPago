const request = require("supertest");
const server = require('../index.js');

describe('Teste para API de pagamentos com MP', () => {
    it('Efetivar pagamento', async () => {
        jest.setTimeout(30000);
        const response = await request(server)
        .post('/pagamento')
        .send({
            quantity: 10,
            description: "Frango de borracha",
            price: 50.00,
        });
        
        console.log("ID do produto:", response.body.id);
        expect(response.status).toBe(200);
    });
});
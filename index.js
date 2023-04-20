const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path')
const cors = require("cors");
const mercadopago = require ('mercadopago');
require('dotenv').config();

const PORT = process.env.PORT

app.use(express.static("client/"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/index.html'))
});

mercadopago.configure({
  	access_token: "TEST-2453313229452572-092911-e2a5b87ac71ba0c577c887a3ee599639-1160953381",
	integrator_id: "dev_24c65fb163bf11ea96500242ac130004"
});

app.post("/pagamento", (req, res) => {
    var pagamento = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
				description: "Tenis da Abibas",
			}
		],
		payer: {
            name: "APRO Lalo",
            surname: "Landa",
            email: "test_user_33467020@testuser.com",
            phone: {
                area_code: "11",
                number: 11111111
            },
            identification: {
                type: "DNI",
                number: "7777777"
            },
            address: {
                street_name: "Street Groover",
                street_number: 321,
                zip_code: "0101"
            }
        },
		back_urls: {
			"success": "https://https-mp-brunoduarteapi-com.onrender.com/feedback",
			"failure": "https://https-mp-brunoduarteapi-com.onrender.com/feedback",
			"pending": "https://https-mp-brunoduarteapi-com.onrender.com/feedback"
		},
		notification_url: "https://https-mp-brunoduarteapi-com.onrender.com/feedback",
		auto_return: "approved",
	};

	mercadopago.preferences.create(pagamento)
	.then((response) => {
		console.log(response.body);
		res.status(201).redirect(response.body.init_point)
	})
    .catch((err) => {
		console.log(err);
		res.status(500).send("Erro ao criar pagamento");
	});
});

app.get('/feedback', function (req, res) {
	console.log(req.query, req.body, req.params)
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

const server = app.listen(PORT || 3000, ()=>{
    console.log('Servidor rodando!');
});

module.exports = server;
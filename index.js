require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const cors = require("cors");
const mercadopago = require ('mercadopago');

const PORT = process.env.PORT

app.use(express.static("client/"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/index.html'))
});

mercadopago.configure({
  	access_token: "APP_USR-2453313229452572-092911-2df2d24eb035a4c0852f3455a89d1459-1160953381",
	integrator_id: "dev_24c65fb163bf11ea96500242ac130004"
});

app.post("/pagamento", (req, res) => {
    var pagamento = {
		external_reference: "duartesinformaticaltda@gmail.com",
		items: [
			{	
				id: 4531,
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
				description: "Dispositivo de loja de comércio eletrônico móvel",
				picture_url: 'https://img.quizur.com/f/img5f8e5b745bd285.10956982.jpg?lastEdited=1603165046'
			}
		],
		payer: {
            name: "Lalo",
            surname: "Landa",
            email: "test_user_33467020@testuser.com",
            phone: {
                area_code: "27",
                number: 995026576
            },
            identification: {
                type: "CPF",
                number: "17268062788"
            },
            address: {
                street_name: "Rua Falsa",
                street_number: 123,
                zip_code: "29060020"
            }
        },
		back_urls: {
			"success": "https://mpbrunoduarte.onrender.com/feedback",
			"failure": "https://mpbrunoduarte.onrender.com/feedback",
			"pending": "https://mpbrunoduarte.onrender.com/feedback"
		},
		notification_url: "https://mpbrunoduarte.onrender.com/feedback",
		auto_return: "approved",
		payment_methods: {
            excluded_payment_methods: [
                {
                    id: "visa"
                }
            ],
            installments: 6
        }
	};

	mercadopago.preferences.create(pagamento)
	.then((response) => {
		console.log(response.body);
		res.json({ link: response.body.init_point })
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
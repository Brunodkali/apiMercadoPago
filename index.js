const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path')
const cors = require("cors");
const mercadopago = require ('mercadopago');

app.use(express.static("client/"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/index.html'))
});

mercadopago.configure({
  access_token: 'TEST-7625347247694570-022714-bf7987981577a69b8ce6f3f59614c59e-1056961298'
});

app.post("/pagamento", (req, res) => {
    var pagamento = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "#",
			"failure": "#",
			"pending": "#"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(pagamento)
	.then((response) => {
		res.status(200).json({
			id: response.body.id,
		});
	})
    .catch((err) => {
		console.log(err);
		res.status(500).send("Erro ao criar pagamento");
	});
});

const server = app.listen(3000, ()=>{
    console.log('Servidor rodando!');
});

module.exports = server;
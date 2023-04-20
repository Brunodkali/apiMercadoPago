const mercadopago = new MercadoPago('APP_USR-5c4239f9-0e8a-42ba-8eb1-920b1183d7f7', { locale: 'pt-BR' });
const btnCheck = document.getElementById("checkout");
const btnQuant = document.getElementById("quantity");
  
btnCheck.addEventListener("click", ()=> {
  const dadosPagamento = {
    quantity: document.getElementById("quantity").value,
    description: document.getElementById("product-description").innerHTML,
    price: document.getElementById("unit-price").innerHTML
  };

  fetch("/pagamento", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosPagamento),
  })
  .then((response) => {
    return response.json();
  })
  .then((pagamento) => {
    createCheckoutButton(pagamento.id);
    document.getElementById('sumario').style.display = 'none';
  })
  .catch((err) => {
    alert(`Ocorreu um erro inesperado!, ${err}`);
  });
});
  
function createCheckoutButton(pagamentoId) {
  mercadopago.checkout({
    preference: {
      id: pagamentoId
    },
    render: {
      container: '#button-checkout', 
    }
  });
}
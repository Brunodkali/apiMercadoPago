const mercadopago = new MercadoPago('TEST-f77977b8-7bb1-4d1f-8b88-89c7fedbe11a', { locale: 'pt-BR' });
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
    console.log(pagamento)
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
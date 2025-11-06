function voltarAoTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CLIENTE
function validarCliente() {
  const nome = document.getElementById("nome");
  const cpf = document.getElementById("cpf");
  let valido = true;

  nome.classList.remove("erro");
  cpf.classList.remove("erro");

  if (nome.value.trim() === "") {
    nome.classList.add("erro");
    valido = false;
  }

  if (!/^\d{11}$/.test(cpf.value)) {
    cpf.classList.add("erro");
    valido = false;
  }

  if (!valido) {
    alert("Preencha corretamente os campos.");
    return false;
  }

  const data = {
    nome: nome.value,
    cpf: cpf.value
  };

  fetch("/api/clientes", {
    method: "POST",
  headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.ok ? alert("Cliente salvo com sucesso!") : alert("Erro ao salvar cliente."))
    .catch(err => alert("Erro de conexão: " + err.message));

  return false;
}

// FUNCIONÁRIO
function validarFuncionario() {
  const nome = document.getElementById("nomeFunc");
  const login = document.getElementById("login");
  let valido = true;

  nome.classList.remove("erro");
  login.classList.remove("erro");

  if (nome.value.trim() === "") {
    nome.classList.add("erro");
    valido = false;
  }

  if (login.value.trim() === "") {
    login.classList.add("erro");
    valido = false;
  }

  if (!valido) {
    alert("Preencha corretamente os campos.");
    return false;
  }

  const data = {
    nome: nome.value,
    login: login.value
  };

  fetch("/api/funcionarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.ok ? alert("Funcionário salvo com sucesso!") : alert("Erro ao salvar funcionário."))
    .catch(err => alert("Erro de conexão: " + err.message));

  return false;
}

// PRODUTO
function validarProduto() {
  const nome = document.getElementById("nomeProduto");
  const preco = document.getElementById("preco");
  const quantidade = document.getElementById("quantidade");
  let valido = true;

  nome.classList.remove("erro");
  preco.classList.remove("erro");
  quantidade.classList.remove("erro");

  if (nome.value.trim() === "") {
    nome.classList.add("erro");
    valido = false;
  }

  if (parseFloat(preco.value) <= 0 || isNaN(preco.value)) {
    preco.classList.add("erro");
    valido = false;
  }

  if (parseInt(quantidade.value) <= 0 || isNaN(quantidade.value)) {
    quantidade.classList.add("erro");
    valido = false;
  }


if (!valido) {
    alert("Preencha corretamente os campos.");
    return false;
  }

  const data = {
    nome: nome.value,
    preco: parseFloat(preco.value),
    quantidade_disponivel: parseInt(quantidade.value)
  };

  fetch("/api/produtos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.ok ? alert("Produto salvo com sucesso!") : alert("Erro ao salvar produto."))
    .catch(err => alert("Erro de conexão: " + err.message));

  return false;
}

// VENDA
function registrarVenda() {
  const funcionario_id = document.getElementById("funcionario_id").value;
  const clientes_id = document.getElementById("clientes_id").value;
  const dataVenda = document.getElementById("data").value;
  const produtoNome = document.getElementById("produto").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const qtd = parseInt(document.getElementById("qtd").value);
  const total = valor * qtd;

  if (!produtoNome || isNaN(valor) || isNaN(qtd) || qtd <= 0 || valor <= 0) {
    alert("Preencha corretamente os campos.");
    return false;
  }

  document.getElementById("total").innerText = total.toFixed(2);
  document.getElementById("valor_total").value = total.toFixed(2);

  const data = {
    funcionario_id: parseInt(funcionario_id),
    clientes_id: parseInt(clientes_id),
    data: dataVenda,
    produtoNome: produtoNome,
    valor_total: total
  };

  fetch("/api/vendas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.ok ? alert("Venda registrada com sucesso!") : alert("Erro ao registrar venda."))
    .catch(err => alert("Erro de conexão: " + err.message));

  return false;
}

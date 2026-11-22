const locais = [
  { nome: "Lago Paranoá", regiao: "Brasília - DF", descricao: "Lago artificial que fica no centro de Brasília." },
  { nome: "Represa do Descoberto", regiao: "Oeste do DF", descricao: "Represa no Rio Descoberto, na divisa entre o DF e Goiás." },
  { nome: "Lago Corumbá IV", regiao: "Luziânia - GO (entorno do DF)", descricao: "Grande reservatório no entorno do Distrito Federal." }
];

const btnLocais = document.getElementById("btnLocais");
const listaLocais = document.getElementById("listaLocais");
const selectLocal = document.getElementById("local");
const btnReservar = document.getElementById("btnReservar");
const mensagem = document.getElementById("mensagem");
const ultima = document.getElementById("ultima");

function montarLocais() {
  for (let i = 0; i < locais.length; i++) {
    const l = locais[i];

    const cartao = document.createElement("div");
    cartao.className = "cartao";
    cartao.innerHTML = "<strong>" + l.nome + "</strong><br>" + l.regiao + "<br>" + l.descricao;
    listaLocais.appendChild(cartao);

    const opcao = document.createElement("option");
    opcao.value = l.nome;
    opcao.textContent = l.nome;
    selectLocal.appendChild(opcao);
  }
}

btnLocais.addEventListener("click", function () {
  if (listaLocais.classList.contains("escondido")) {
    listaLocais.classList.remove("escondido");
    btnLocais.textContent = "Esconder locais";
  } else {
    listaLocais.classList.add("escondido");
    btnLocais.textContent = "Mostrar locais";
  }
});

btnReservar.addEventListener("click", function () {
  const nome = document.getElementById("nome").value.trim();
  const pessoasTexto = document.getElementById("pessoas").value.trim();
  const local = selectLocal.value;
  const pessoas = Number(pessoasTexto);

  mensagem.className = "erro";

  if (nome === "") {
    mensagem.textContent = "Digite seu nome.";
  } else if (pessoasTexto === "") {
    mensagem.textContent = "Digite o número de pessoas.";
  } else if (isNaN(pessoas)) {
    mensagem.textContent = "O número de pessoas precisa ser um número, não letras.";
  } else if (pessoas < 1 || pessoas > 10 || !Number.isInteger(pessoas)) {
    mensagem.textContent = "Use um número inteiro de 1 a 10.";
  } else {
    const reserva = nome + " reservou " + local + " para " + pessoas + " pessoa(s).";
    mensagem.className = "sucesso";
    mensagem.textContent = "Reserva feita! " + reserva;
    localStorage.setItem("ultimaReserva", reserva);
    ultima.textContent = reserva;
  }
});

montarLocais();
const salva = localStorage.getItem("ultimaReserva");
if (salva !== null) {
  ultima.textContent = salva;
}

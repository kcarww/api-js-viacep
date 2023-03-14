const end = document.querySelector("#endereco");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");
const cep = document.querySelector("#cep");

function limparFormulario() {
  end.value = "";
  bairro.value = "";
  cidade.value = "";
  estado.value = "";
}

function preencherFormulario(endereco) {
  end.value = endereco.logradouro;
  bairro.value = endereco.bairro;
  cidade.value = endereco.localidade;
  estado.value = endereco.uf;
}

function eNumero(numero) {
  return /^[0-9]+$/.test(numero);
}

function cepValido(cep) {
  return cep.length == 8 && eNumero(cep);
}

async function pesquisarCep() {
  limparFormulario();

  const cep = document.querySelector("#cep").value.replace("-", "");
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty("erro")) {
      end.value = "CEP não encontrado!";
    } else {
      preencherFormulario(endereco);
    }
  } else {
    end.value = "CEP incorreto!";
  }
}

cep.addEventListener("blur", pesquisarCep);

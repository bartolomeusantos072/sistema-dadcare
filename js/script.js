// -----------------------------
// FUNÇÕES DE CARDÁPIO
// -----------------------------




// -----------------------------
// EVENTOS
// -----------------------------
// Renderiza a tabela com refeição e lanche
function renderTabelaCardapios(cardapios) {
  const tabela = document.querySelector("table");
  tabela.innerHTML = `
    <tr>
      <th>Turno</th>
      <th>Data</th>
      <th>Refeição</th>
      <th>Lanche</th>
      <th>Editar</th>
      <th>Excluir</th>
    </tr>
  `;

  cardapios.forEach(cardapio => {
    const tr = document.createElement("tr");
    const dataFormatada = new Date(cardapio.data).toLocaleDateString("pt-BR");

    // Refeição principal
    const refeicaoItens = cardapio.refeicao?.itens?.join(", ") || "-";
    const refeicaoBebidas = cardapio.refeicao?.bebida?.join(", ") || "-";
    const refeicaoImgs = (cardapio.refeicao?.img || []).map(url => `<img src="${url}" alt="img" width="50">`).join(" ");

    // Lanche (opcional)
    let lancheConteudo = "-";
    if (cardapio.lanche) {
      const lancheItens = cardapio.lanche.itens.join(", ");
      const lancheBebidas = cardapio.lanche.bebida.join(", ");
      const lancheImgs = (cardapio.lanche.img || []).map(url => `<img src="${url}" alt="img" width="50">`).join(" ");
      lancheConteudo = `<b>${cardapio.lanche.titulo} (${cardapio.lanche.horario})</b><br>Itens: ${lancheItens}<br>Bebidas: ${lancheBebidas}<br>${lancheImgs}`;
    }

    tr.innerHTML = `
      <td>${cardapio.turno}</td>
      <td>${dataFormatada}</td>
      <td><b>${cardapio.refeicao.titulo}</b><br>Itens: ${refeicaoItens}<br>Bebidas: ${refeicaoBebidas}<br>${refeicaoImgs}</td>
      <td>${lancheConteudo}</td>
      <td><button onclick="editarCardapio(${cardapio.id})">✏️</button></td>
      <td><button onclick="excluirCardapio(${cardapio.id})">🗑️</button></td>
    `;
    tabela.appendChild(tr);
  });
}


// Carregar cardápios ao iniciar a página
window.addEventListener("DOMContentLoaded", () => {
  listarCardapios();
});


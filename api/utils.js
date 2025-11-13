// utils.js — Funções utilitárias compartilhadas

/**
 * Exibe uma msg temporária na tela
 * @param {string} msg - Texto da msg
 * @param {string} cor - Cor do texto (ex: 'red' ou 'green')
 * @param {number} duracao - Tempo até desaparecer (ms)
 */
export function mostrarMensagem(msg, cor = 'black', duracao = 5000) {
    // Remove mensagens antigas (opcional)
    const msgAntigas = document.querySelectorAll('.msg-sistema');
    msgAntigas.forEach(m => m.remove());

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg-sistema');
    msgDiv.textContent = msg;
    msgDiv.style.color = cor;
    msgDiv.style.padding = '10px';
    msgDiv.style.borderRadius = '5px';
    msgDiv.style.textAlign = 'center';
    msgDiv.style.marginTop = '15px';
    msgDiv.style.fontWeight = 'bold';
    msgDiv.style.backgroundColor = cor === 'red' ? '#ffe0e0' : '#e0ffe0';
    msgDiv.style.transition = 'opacity 0.3s ease';
    msgDiv.style.opacity = '1';

    document.body.appendChild(msgDiv);

    // Remove a msg após alguns segundos
    setTimeout(() => {
        msgDiv.style.opacity = '0';
        setTimeout(() => msgDiv.remove(), 300);
    }, duracao);
}

// --- Função utilitária para tratar respostas de erro ---
export async function tratarErroResponse(res, msgPadrao) {
  const textErro = await res.text();
  let msgErro;

  try {
    const errorData = JSON.parse(textErro);
    msgErro =
      errorData.msg ||
      errorData.error ||
      errorData.message ||
      textErro;
  } catch {
    msgErro = textErro;
  }

  return {
    sucesso: false,
    msg: msgErro || msgPadrao || "Erro desconhecido na API",
  };
}

// --- Função utilitária para montar query strings ---
export function buildQuery(params) {
  if (!params) return "";
  if (typeof params === "string") return `?q=${encodeURIComponent(params)}`;

  if (typeof params === "object") {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");
    return queryString ? `?${queryString}` : "";
  }

  return "";
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
}
import {  getAuthHeaders, tratarErroResponse, buildQuery } from "./utils.js";

// URL base da sua API (exemplo JSON Server ou backend real)
const API_USUARIOS = "https://api-medicare-storage.onrender.com";

// --- Função utilitária para tratar respostas de erro ---
async function tratarErroResponse(res, msgPadrao) {
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

// --- LOGIN ---
export async function loginUsuario(email, senha) {
  try {
    const res = await fetch(API_USUARIOS + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok) return await tratarErroResponse(res, "Erro ao acessar a API");

    const data = await res.json();

    if (data.usuario) {
      localStorage.setItem("usuarioId", data.usuario.id);
      localStorage.setItem("usuarioNome", data.usuario.nome);
      localStorage.setItem("token", data.token);
      return { sucesso: true, user: data.usuario };
    } else {
      return { sucesso: false, msg: "Usuário ou senha incorretos" };
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- CADASTRAR ---
export async function cadastrarUsuario(nome, email, senha, categoria) {
  try {
    const res = await fetch(API_USUARIOS + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, categoria }),
    });

    if (!res.ok) return await tratarErroResponse(res, "Erro ao cadastrar usuário");

    const data = await res.json();
    
    return { sucesso: true, user: data.usuario || null };

  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- RECUPERAR SENHA ---
export async function recuperarSenha(email) {
  try {
    const res = await fetch(API_USUARIOS + "/recovery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao recuperar senha");

    const data = await res.json();
    
    return { sucesso: true,msg:data.msg ||"Instruções de recuperação de senha enviadas para o seu e-mail.", };

  } catch (error) {
    console.error("Erro ao recuperar senha:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}


export async function listarCardapios() {
  try {
    const res = await fetch(API_CARDAPIOS);
    const cardapios = await res.json();
    renderTabelaCardapios(cardapios);
  } catch (error) {
    console.error("Erro ao listar cardápios:", error);
    alert("Ocorreu um erro ao carregar o cardápio.");
  }
}

// Função para cadastrar nova refeição
export async function cadastrarCardapio(cardapio) {
  try {
    cardapio.usuarioId = Number(localStorage.getItem("usuarioId"));
    const res = await fetch(API_CARDAPIOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardapio)
    });
    if (res.ok) {
      alert("Refeição cadastrada com sucesso!");
      listarCardapios();
    } else {
      alert("Erro ao cadastrar refeição!");
    }
  } catch (error) {
    console.error("Erro ao cadastrar cardápio:", error);
    alert("Ocorreu um erro ao cadastrar a refeição.");
  }
}

// Função para buscar cardápio para edição
export async function editarCardapio(id) {
  try {
    const res = await fetch(`${API_CARDAPIOS}/${id}`);
    const cardapio = await res.json();

    document.querySelector("#date").value = cardapio.data.split("T")[0];
    document.querySelector("select#turnos").value = cardapio.turno;
    document.querySelector("input[name='refeição']").value = cardapio.refeicao.titulo;
    document.querySelector("textarea[name='itens']").value = cardapio.refeicao.itens.join(", ");
    document.querySelector("input[name='bebida']").value = cardapio.refeicao.bebida.join(", ");

    // Para lanche, caso exista, você pode abrir campos extras se quiser
    if (cardapio.lanche) {
      // Exemplo: preencher campos extras de lanche
    }

    // Após edição, chamar atualizarCardapio(id, cardapioAtualizado)
  } catch (error) {
    console.error("Erro ao buscar cardápio para edição:", error);
    alert("Erro ao buscar cardápio para edição:")
  }
}

// Atualizar cardápio existente
export async function atualizarCardapio(id, cardapioAtualizado) {
  try {
    const res = await fetch(`${API_CARDAPIOS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardapioAtualizado)
    });
    if (res.ok) {
      alert("Refeição atualizada com sucesso!");
      listarCardapios();
    } else {
      alert("Erro ao atualizar refeição!");
    }
  } catch (error) {
    console.error("Erro ao atualizar cardápio:", error);
    alert("Ocorreu um erro ao atualizar a refeição.");
  }
}

// Excluir cardápio
export async function excluirCardapio(id) {
  if (!confirm("Deseja realmente excluir esta refeição?")) return;
  try {
    const res = await fetch(`${API_CARDAPIOS}/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Refeição excluída com sucesso!");
      listarCardapios();
    } else {
      alert("Erro ao excluir refeição!");
    }
  } catch (error) {
    console.error("Erro ao excluir cardápio:", error);
    alert("Ocorreu um erro ao excluir a refeição.");
  }
}

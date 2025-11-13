import { getAuthHeaders, tratarErroResponse } from "./utils.js";

const API_USUARIOS = "https://dadcare-backend.onrender.com/usuarios";

// --- LOGIN ---
export async function loginUsuario(email, senha) {
  try {
    const res = await fetch(API_USUARIOS + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao efetuar login");

    const data = await res.json();

    if (data.usuario && data.token) {
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

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao cadastrar usuário");

    const data = await res.json();
    return { sucesso: true, user: data.usuario || null };
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
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
    return {
      sucesso: true,
      msg: data.msg || "Instruções enviadas para o e-mail.",
    };
  } catch (error) {
    console.error("Erro ao recuperar senha:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- LISTAR USUÁRIOS ---
export async function listarUsuarios() {
  try {
    const res = await fetch(API_USUARIOS, {
      headers: getAuthHeaders(),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao listar usuários");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- BUSCAR USUÁRIO POR ID ---
export async function buscarUsuario(id) {
  if (!id) return { sucesso: false, msg: "ID não informado" };

  try {
    const res = await fetch(`${API_USUARIOS}/${encodeURIComponent(id)}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao buscar usuário");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- ALTERAR USUÁRIO ---
export async function alterarUsuario(id, dados, { method = "PATCH" } = {}) {
  if (!id) return { sucesso: false, msg: "ID não informado" };

  try {
    const res = await fetch(`${API_USUARIOS}/${encodeURIComponent(id)}`, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(dados),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao alterar usuário");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao alterar usuário:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- EXCLUIR USUÁRIO ---
export async function excluirUsuario(id) {
  if (!id) return { sucesso: false, msg: "ID não informado" };

  try {
    const res = await fetch(`${API_USUARIOS}/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao excluir usuário");

    return { sucesso: true, msg: "Usuário excluído com sucesso" };
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

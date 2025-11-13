import {  getAuthHeaders, tratarErroResponse, buildQuery } from "./utils";

// URL base da API de Consultas
const API_CONSULTAS = "https://api-medicare-storage.onrender.com/consultas";


// --- LISTAR todas as consultas ---
export async function listarConsultas() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(API_CONSULTAS, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao listar consultas");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao listar consultas:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- BUSCAR consultas por parâmetros ---
export async function buscarConsultas(params) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(API_CONSULTAS + buildQuery(params), {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao buscar consultas");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- ADICIONAR nova consulta ---
export async function adicionarConsulta(consulta) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(API_CONSULTAS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      body: JSON.stringify(consulta),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao adicionar consulta");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao adicionar consulta:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- ALTERAR uma consulta ---
export async function alterarConsulta(id, dados, { method = "PATCH" } = {}) {
  if (!id) {
    return { sucesso: false, msg: "ID da consulta não informado" };
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_CONSULTAS}/${encodeURIComponent(id)}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      body: JSON.stringify(dados),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao alterar consulta");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao alterar consulta:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- EXCLUIR uma consulta ---
export async function excluirConsulta(id) {
  if (!id) {
    return { sucesso: false, msg: "ID da consulta não informado" };
  }

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_CONSULTAS}/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao excluir consulta");

    return { sucesso: true, msg: "Consulta excluída com sucesso" };
  } catch (error) {
    console.error("Erro ao excluir consulta:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

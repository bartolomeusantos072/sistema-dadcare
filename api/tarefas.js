import {  getAuthHeaders, tratarErroResponse, buildQuery } from "./utils.js";

const API_TAREFAS = "https://api-medicare-storage.onrender.com/tarefas";

// --- LISTAR todas as tarefas ---
export async function listarTarefas() {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API_TAREFAS, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao listar tarefas");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- BUSCAR tarefas (por tipo, data, status, etc.) ---
export async function buscarTarefas(params) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API_TAREFAS + buildQuery(params), {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao buscar tarefas");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- ADICIONAR nova tarefa ---
export async function adicionarTarefa(tarefa) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API_TAREFAS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      body: JSON.stringify(tarefa),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao adicionar tarefa");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- ALTERAR tarefa ---
export async function alterarTarefa(id, dados, { method = "PATCH" } = {}) {
  if (!id) {
    return { sucesso: false, msg: "ID da tarefa não informado" };
  }

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_TAREFAS}/${encodeURIComponent(id)}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      body: JSON.stringify(dados),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao alterar tarefa");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao alterar tarefa:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- EXCLUIR tarefa ---
export async function excluirTarefa(id) {
  if (!id) {
    return { sucesso: false, msg: "ID da tarefa não informado" };
  }

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_TAREFAS}/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao excluir tarefa");

    return { sucesso: true, msg: "Tarefa excluída com sucesso" };
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

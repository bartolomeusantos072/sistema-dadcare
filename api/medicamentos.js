import {  getAuthHeaders, tratarErroResponse, buildQuery } from "./utils.js";

// URL base
const API_MEDICAMENTOS = "https://api-medicare-storage.onrender.com/medicamentos";



export async function listarMedicamentos() {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API_MEDICAMENTOS, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao listar medicamentos");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao listar medicamentos:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}



// --- BUSCAR COM FILTRO ---
export async function buscarMedicamentos(params) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API_MEDICAMENTOS + buildQuery(params), {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao buscar medicamentos");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao buscar medicamentos:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}


// --- ADICIONAR ---
export async function adicionarMedicamento(dados) {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API_MEDICAMENTOS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      body: JSON.stringify(dados),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao adicionar medicamento");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao adicionar medicamento:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- ALTERAR ---
export async function alterarMedicamento(id, dados, { method = "PATCH" } = {}) {
  if (!id) return { sucesso: false, msg: "ID do medicamento não informado" };

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_MEDICAMENTOS}/${encodeURIComponent(id)}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      body: JSON.stringify(dados),
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao alterar medicamento");

    const data = await res.json();
    return { sucesso: true, data };
  } catch (error) {
    console.error("Erro ao alterar medicamento:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}

// --- EXCLUIR ---
export async function excluirMedicamento(id) {
  if (!id) return { sucesso: false, msg: "ID do medicamento não informado" };

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_MEDICAMENTOS}/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (!res.ok)
      return await tratarErroResponse(res, "Erro ao excluir medicamento");

    return { sucesso: true, msg: "Medicamento excluído com sucesso" };
  } catch (error) {
    console.error("Erro ao excluir medicamento:", error);
    return { sucesso: false, msg: "Erro de conexão com a API" };
  }
}
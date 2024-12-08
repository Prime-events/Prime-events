import axios from 'axios';
const API_URL_EVENTOS = 'http://localhost:3001/eventos';
const API_URL_EVENTOS_NOME = 'http://localhost:3001/eventos';

export const listarEventosUsuario = async (idUsuario) => {
  try {
    const response = await fetch(`${API_URL_EVENTOS}/usuario/${idUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};
export const listarEvento = async (idEvento) => {
  try {
    const response = await fetch(`${API_URL_EVENTOS}/${idEvento}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar Evento");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};


export const listarEventoPorNome = async (nomeEvento) => {
  try {
    const response = await fetch(`${API_URL_EVENTOS_NOME}/nome/${encodeURIComponent(nomeEvento)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar Evento");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};


export const buscarEventosPorPeriodo = async (dataInicial, dataFinal) => {
  try {
    const response = await axios.get('/api/eventos/filtro', {
      params: {
        dataInicial,
        dataFinal
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro na busca de eventos:', error);
    throw error;
  }
};
const API_URL_EVENTOS = 'http://localhost:3001/eventos';

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

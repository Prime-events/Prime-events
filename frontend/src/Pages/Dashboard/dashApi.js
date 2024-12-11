const API_URL_EVENTOSPENDENTES = 'http://localhost:3001/eventos/pendentes';
const API_URL_atualizaStatusConcluido = 'http://localhost:3001/eventos/updateStatus';

export const listarEventosPendentes = async (idUsuario) => {
    try {
      const response = await fetch(`${API_URL_EVENTOSPENDENTES}/${idUsuario}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar eventos");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro na API:", error);
      throw error;
    }
  };
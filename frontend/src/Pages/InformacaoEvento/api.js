const API_URL_CONVIDADO = 'http://localhost:3001/convidados';

export const createConvidado = async (convidado) => {
    await fetch(API_URL_CONVIDADO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(convidado),
    });
};

export const listarConvidadosEvento = async (idEvento) => {
    try {
      const response = await fetch(`${API_URL_CONVIDADO}/${idEvento}`, {
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
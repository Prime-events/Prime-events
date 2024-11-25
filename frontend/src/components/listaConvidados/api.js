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

  export const atualizarConvidado = async (convidado) => {
    try {
      const response = await fetch(`${API_URL_CONVIDADO}/${convidado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convidado)
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar Convidado");
      }
    } catch (error) {
      console.error("Erro na atualização do convidado", error);
      throw error;
    }
  };

  export const excluirConvidado = async (idConvidado) => {
    try {
      const response = await fetch(`${API_URL_CONVIDADO}/${idConvidado}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir Convidado");
      }
    } catch (error) {
      console.error("Erro na exclusão do convidado", error);
      throw error;
    }
  };
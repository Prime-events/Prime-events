const API_URL_EVENTO = 'http://localhost:3001/eventos';

export const createEvento = async (evento) => {
    await fetch(API_URL_EVENTO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evento),
    });
};
export const atualizarEvento = async (evento) => {
  	try {
		await fetch(`${API_URL_EVENTO}/${evento.id_evento}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(evento),
		});
  	}  	catch (error) {
			console.error("Erro na API:", error);
			throw error;
		} 
};
export const excluirEvento = async (idEvento) => {
    try {
      const response = await fetch(`${API_URL_EVENTO}/${idEvento}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir Evento");
      }
    } catch (error) {
      console.error("Erro na exclusão do Evento", error);
      throw error;
    }
  };
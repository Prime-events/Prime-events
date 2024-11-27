const API_URL = 'http://localhost:3001/programacaoEvento';

export const createTarefa = async (tarefa) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_evento: tarefa.id_evento,
                horario: tarefa.horario,
                descricao: tarefa.descricao,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Resposta do servidor:", data);
        return data;
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        throw error; // Lança o erro para ser tratado pelo chamador
    }
};

export const buscarTarefas = async (idEvento) => {
    try {
      const response = await fetch(`${API_URL}/${idEvento}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar Tarefas");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro na API:", error);
      throw error;
    }
  };
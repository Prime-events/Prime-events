const API_URL = 'http://localhost:3001/CriarCategoria';

export const createCategoria = async (evento) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(evento),
        });

        if (!response.ok) {
            // Lança um erro com o status da resposta
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Resposta do servidor:", data);
        return data;
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        throw error; // Lança o erro para ser tratado pelo chamador
    }
};

const API_URL_GETCATEGORIAS = 'http://localhost:3001/getAllCategorias';

export const getAllCategorias = async () => {
    try {
        const response = await fetch(`${API_URL_GETCATEGORIAS}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao obter categorias:', error);
        throw error;
    }
};

const API_URL_CRIARGASTO = 'http://localhost:3001/CriarGasto';

export const createGasto = async (evento) => {
    try {
        const response = await fetch(API_URL_CRIARGASTO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome_item: evento.nome_item,
                valor_item: evento.valor_item,
                quantidade_item: evento.quantidade_item,
                id_evento: evento.id_evento,
                id_categoria: evento.id_categoria
            }),
        });
        console.log("As info do gasto dentro da API são: " + JSON.stringify(evento, null, 2));


        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro no servidor:', errorData);
        }

        const data = await response.json();
        console.log("Resposta do servidor:", data);
        return data;
    } catch (error) {
        console.error('Erro ao criar gasto:', error);
        throw error;
    }
};


const API_URL_GETESTIMATIVAGATO = 'http://localhost:3001/getEstimativaGastos';

export const getAllEstimativaGastos = async (id_evento) => {
    try {
        console.log(`Fetching estimativa for evento ID: ${id_evento}`); // Log para verificar o ID do evento
        const response = await fetch(`${API_URL_GETESTIMATIVAGATO}/${encodeURIComponent(id_evento)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro na API:", errorData); // Log detalhado do erro
            throw new Error(`HTTP error! status: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log("Dados recebidos da API:", data); // Log dos dados recebidos
        return data;
    } catch (error) {
        console.error("Erro na API:", error.message);
        throw error;
    }
};


const API_URL_ATUALIZARGASTO = 'http://localhost:3001/atualizarGasto'; // Certifique-se que está em minúsculas

export const updateGasto = async (id, updatedGasto) => {
    const response = await fetch(`${API_URL_ATUALIZARGASTO}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedGasto)
    });

    if (!response.ok) {
        const errorMessage = await response.text(); // Captura a mensagem de erro do servidor
        throw new Error(errorMessage);
    }

    return await response.json();
};

const API_URL_DELETARGASTO = 'http://localhost:3001/deletarGasto';

export const deletarGasto = async (id) => {
    try {
        const response = await fetch(`${API_URL_DELETARGASTO}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Erro ao excluir Gasto");
        }
    } catch (error) {
        console.error("Erro na exclusão do Gasto", error);
        throw error;
    }
};

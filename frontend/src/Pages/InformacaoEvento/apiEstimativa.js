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

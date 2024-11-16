const API_URL = 'http://localhost:3001/api/updateUser';
const updateEmail_URL = 'http://localhost:3001/api/updateEmail';
const updateSenha_URL = 'http://localhost:3001/api/updateSenha';

export const updateUser = async (email, updates) => {
    try {
        const response = await fetch(`${API_URL}/${encodeURIComponent(email)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates), // Enviando os dados a serem atualizados
        });

        if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro na API:", error);
        throw error;
    }
};
export const updateUserEmail = async (email, atualizacoes) => {
    try {
        const response = await fetch(`${updateEmail_URL}/${encodeURIComponent(email)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(atualizacoes), // Enviando os dados a serem atualizados
        });

        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || 'Erro ao atualizar email');
            error.response = response;  // Anexa a resposta ao erro para acessarmos depois
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error("Erro na API:", error);
        throw error;
    }
};

export const updateUserSenha = async (email, atualizacoes) => {
    try {
        const response = await fetch(`${updateSenha_URL}/${encodeURIComponent(email)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(atualizacoes), // Enviando os dados a serem atualizados
        });

        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || 'Erro ao atualizar email');
            error.response = response;  // Anexa a resposta ao erro para acessarmos depois
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error("Erro na API:", error);
        throw error;
    }
};



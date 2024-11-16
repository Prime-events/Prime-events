const API_URL = 'http://localhost:3001/api/updateUser';

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

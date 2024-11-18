const API_URL_LOGIN = 'http://localhost:3001/api/Login';

export const loginUser = async (user) => {
    try {
        const response = await fetch(API_URL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || 'Erro ao fazer login');
            error.response = response;  // Anexa a resposta ao erro para acessarmos depois
            throw error;
        }
        return response;
    } catch (error) {
        console.error("Erro na API:", error);
        throw error;
    }

};


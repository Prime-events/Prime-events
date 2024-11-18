const API_URL = 'http://localhost:3001/api/Cadastrar';


export const createUser = async (user) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || 'Erro ao criar conta');
        error.response = response;  // Anexa a resposta ao erro para acessarmos depois
        throw error;
    }
    return await response.json();

    } catch (error) {
      console.error("Erro na API:", error);
      throw error;
    }  
    
  };

  


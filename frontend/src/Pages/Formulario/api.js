const API_URL = 'http://localhost:3001/Cadastrar';

export const createUser = async (user) => {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };
  
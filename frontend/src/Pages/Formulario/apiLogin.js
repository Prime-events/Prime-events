const API_URL_LOGIN = 'http://localhost:3001/api/Login';

export const loginUser = async (user) => {
    const response = await fetch(API_URL_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response;
  };
  

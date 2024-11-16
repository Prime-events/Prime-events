const API_URL = 'http://localhost:3001/api/getUser';

export const getUser = async (email) => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};

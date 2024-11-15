const API_URL = 'http://localhost:3001/eventos';


export const createEvento = async (evento) => {
    await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evento),
      
    });
    console.log("Enviado");
  };
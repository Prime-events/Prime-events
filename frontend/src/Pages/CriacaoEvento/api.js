const API_URL_EVENTO = 'http://localhost:3001/eventos';

export const createEvento = async (evento) => {
    await fetch(API_URL_EVENTO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evento),
    });
    console.log("Enviado");
};

export const ImgurUpload = async (formData) => {

    // Substitua pelo seu token de acesso Bearer
    const accessToken = '242d4213ac32eebabbfef88ec0aa568348756718';


    try {
      console.log('Enviando imagem para Imgur...');
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
        redirect: 'follow',
      });
      // Log dos headers e status para depuração
      console.log('Status:', response.status);
      console.log('Headers:', response.headers);

      const data = await response.json();

      // Log completo da resposta para inspecionar detalhes
      console.log('Resposta da API:', data);
      console.log('link: ', data.data.link);

        return data.data.link;

    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
      alert('Erro ao enviar a imagem. Veja os logs para mais detalhes.');

  };
}

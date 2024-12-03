const eventoAPI_URl = 'http://localhost:3001/eventos'; 
const programacaoAPI_URL = 'http://localhost:3001/programacaoEvento';  

export const listarEventosUsuario = async (idUsuario) => {     
    try {       
        const response = await fetch(`${eventoAPI_URl}/usuario/${idUsuario}`, {         
            method: "GET",         
            headers: {           
                "Content-Type": "application/json",         
            },       
        });       
        if (!response.ok) {         
            throw new Error("Erro ao buscar eventos");       
        }       
        return await response.json();     
    } catch (error) {       
        console.error("Erro na API:", error);       
        throw error;     
    }   
};    

export const buscarTarefas = async (idEvento) => {     
    try {       
        const response = await fetch(`${programacaoAPI_URL}/${idEvento}`, {         
            method: "GET",         
            headers: {           
                "Content-Type": "application/json",         
            },       
        });       
        if (!response.ok) {         
            throw new Error("Erro ao buscar Tarefas");       
        }       
        const tarefas = await response.json();
        console.log("Tarefas recebidas:", tarefas);
        return tarefas;     
    } catch (error) {       
        console.error("Erro na API:", error);       
        throw error;     
    }   
};
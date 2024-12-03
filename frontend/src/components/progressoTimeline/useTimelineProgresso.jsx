import { useState, useEffect } from "react";

export const useTimelineProgresso = (listaTarefas) => {
  const [tarefaAtual, setTarefaAtual] = useState(0);

  useEffect(() => {
    if (listaTarefas.length === 0) return;

    const calcularTarefaAtual = () => {
      const horaAtual = new Date();
      const horariosTarefas = listaTarefas.map((tarefa) => {
        const [horas, minutos] = tarefa.horario.split(":").map(Number);
        const dataTarefa = new Date();
        dataTarefa.setHours(horas, minutos, 0, 0);
        return dataTarefa;
      });

      const indiceTarefaProxima = horariosTarefas.findIndex(
        (horario) => horario > horaAtual
      );

      // Se todas as tarefas já passaram
      if (indiceTarefaProxima === -1) {
        setTarefaAtual(listaTarefas.length);
        return;
      }

      // Se estamos antes da primeira tarefa
      if (indiceTarefaProxima === 0) {
        setTarefaAtual(0);
        return;
      }

      // Define a tarefa atual como a última tarefa que já passou
      setTarefaAtual(indiceTarefaProxima - 1);
    };

    const intervalId = setInterval(calcularTarefaAtual, 60000); // Atualiza a cada minuto
    calcularTarefaAtual(); // Primeira chamada imediata

    return () => clearInterval(intervalId);
  }, [listaTarefas]);

  return { tarefaAtual };
};
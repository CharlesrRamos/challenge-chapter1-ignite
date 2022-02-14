import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EdiTaskArgs = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const foundTitle = tasks.find((item) => item.title === newTaskTitle);

    if (foundTitle) {
      return Alert.alert(
        "Tarefa já cadastrada",
        "Você não pode cadastrar a mesma tarefa"
      );
    } else {
      setTasks((oldTasks) => [...oldTasks, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newTask = { ...task, done: !task.done };
        return newTask;
      }

      return task;
    });
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          style: "cancel",
          text: "Não",
        },
        {
          style: "destructive",
          text: "Sim",
          onPress: () =>
            setTasks((oldTaks) => oldTaks.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: EdiTaskArgs) {
    const editTask = tasks.map((task) => {
      if (task.id === taskId) {
        const newTask = { ...task, title: taskNewTitle };
        return newTask;
      }
      return task;
    });
    setTasks(editTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});

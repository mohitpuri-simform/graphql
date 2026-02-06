import { useState } from "react";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Task } from "../types/task";

export default function useDragAndDrop() {
  const [taskList1, setTaskList1] = useState<Task[]>([]);
  const [taskList2, setTaskList2] = useState<Task[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which list the active item is in
    const activeInList1 = taskList1.some((task) => task.id === activeId);
    const activeInList2 = taskList2.some((task) => task.id === activeId);

    // Find which list we're over (checking for task or container)
    const overInList1 =
      taskList1.some((task) => task.id === overId) || overId === "list1";
    const overInList2 =
      taskList2.some((task) => task.id === overId) || overId === "list2";

    // Only handle reordering within the same list during drag over
    if (
      activeInList1 &&
      overInList1 &&
      activeId !== overId &&
      overId !== "list1"
    ) {
      setTaskList1((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === activeId);
        const newIndex = tasks.findIndex((task) => task.id === overId);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    } else if (
      activeInList2 &&
      overInList2 &&
      activeId !== overId &&
      overId !== "list2"
    ) {
      setTaskList2((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === activeId);
        const newIndex = tasks.findIndex((task) => task.id === overId);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which list the active item is in
    const activeInList1 = taskList1.some((task) => task.id === activeId);
    const activeInList2 = taskList2.some((task) => task.id === activeId);

    // Find which list we're dropping into
    const overInList1 =
      taskList1.some((task) => task.id === overId) || overId === "list1";
    const overInList2 =
      taskList2.some((task) => task.id === overId) || overId === "list2";

    // Moving from list1 to list2
    if (activeInList1 && overInList2) {
      const taskToMove = taskList1.find((task) => task.id === activeId);
      if (taskToMove && !taskList2.some((task) => task.id === activeId)) {
        setTaskList1((tasks) => tasks.filter((task) => task.id !== activeId));
        setTaskList2((tasks) => [...tasks, taskToMove]);
      }
    }
    // Moving from list2 to list1
    else if (activeInList2 && overInList1) {
      const taskToMove = taskList2.find((task) => task.id === activeId);
      if (taskToMove && !taskList1.some((task) => task.id === activeId)) {
        setTaskList2((tasks) => tasks.filter((task) => task.id !== activeId));
        setTaskList1((tasks) => [...tasks, taskToMove]);
      }
    }
  };

  const activeTask =
    taskList1.find((task) => task.id === activeId) ||
    taskList2.find((task) => task.id === activeId);

  return {
    taskList1,
    taskList2,
    activeId,
    activeTask,
    setTaskList1,
    setTaskList2,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}

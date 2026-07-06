import { useRef } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DroppableList from "./DroppableList";
import useDragAndDrop from "../hooks/useDragAndDrop";
import type { Task } from "../types/task";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DragAndDrop() {
  const taskList1Ref = useRef<HTMLInputElement>(null!);
  const taskList2Ref = useRef<HTMLInputElement>(null!);

  const {
    taskList1,
    taskList2,
    activeTask,
    setTaskList1,
    setTaskList2,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleToTaskList1 = () => {
    const value = taskList1Ref.current?.value || "";
    if (value.trim() !== "") {
      const newTask: Task = {
        id: `list1-${Date.now()}`,
        content: value,
      };
      setTaskList1((prev) => [...prev, newTask]);
    }
    if (taskList1Ref.current) {
      taskList1Ref.current.value = "";
    }
  };

  const handleToTaskList2 = () => {
    const value = taskList2Ref.current?.value || "";
    if (value.trim() !== "") {
      const newTask: Task = {
        id: `list2-${Date.now()}`,
        content: value,
      };
      setTaskList2((prev) => [...prev, newTask]);
    }
    if (taskList2Ref.current) {
      taskList2Ref.current.value = "";
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Card>
        <CardHeader>
          <CardTitle>Task board</CardTitle>
          <CardDescription>
            Drag and drop tasks between the two lists.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <DroppableList
              id="list1"
              title="List 1"
              tasks={taskList1}
              onAddTask={handleToTaskList1}
              inputRef={taskList1Ref}
            />
            <DroppableList
              id="list2"
              title="List 2"
              tasks={taskList2}
              onAddTask={handleToTaskList2}
              inputRef={taskList2Ref}
            />
          </div>
        </CardContent>
      </Card>

      <DragOverlay>
        {activeTask ? (
          <div className="cursor-grabbing rounded-md border bg-card px-4 py-3 text-sm shadow-lg">
            {activeTask.content}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

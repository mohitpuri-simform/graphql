import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import type { Task } from "../types/task";

interface DroppableListProps {
  id: string;
  title: string;
  tasks: Task[];
  onAddTask: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function DroppableList({
  id,
  title,
  tasks,
  onAddTask,
  inputRef,
}: DroppableListProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      style={{
        flex: 1,
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: isOver ? "#e8f5e9" : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >
      <h3>{title}</h3>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter task"
          ref={inputRef}
          style={{ marginRight: "5px" }}
        />
        <button onClick={onAddTask}>Add</button>
      </div>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul
          ref={setNodeRef}
          style={{
            listStyle: "none",
            padding: "15px",
            minHeight: "300px",
            backgroundColor: "#fafafa",
            border: `3px solid ${isOver ? "#4CAF50" : "#ddd"}`,
            borderRadius: "8px",
            transition: "all 0.2s ease",
            boxShadow: isOver ? "0 0 15px rgba(76, 175, 80, 0.3)" : "none",
          }}
        >
          {tasks.length === 0 && (
            <li
              style={{
                color: "#999",
                textAlign: "center",
                padding: "40px 20px",
                fontSize: "14px",
              }}
            >
              {isOver ? "Drop here!" : "Drag items here"}
            </li>
          )}
          {tasks.map((task) => (
            <SortableItem key={task.id} id={task.id} content={task.content} />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
}

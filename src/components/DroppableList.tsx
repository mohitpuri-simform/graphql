import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import type { Task } from "../types/task";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      className={cn(
        "rounded-lg p-3 transition-colors",
        isOver && "bg-accent"
      )}
    >
      <h3 className="mb-3 text-sm font-medium">{title}</h3>
      <div className="mb-3 flex gap-2">
        <Input type="text" placeholder="Enter task" ref={inputRef} />
        <Button onClick={onAddTask}>Add</Button>
      </div>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul
          ref={setNodeRef}
          className={cn(
            "min-h-[300px] list-none rounded-lg border-2 border-dashed bg-muted/30 p-4 transition-colors",
            isOver && "border-primary bg-primary/5"
          )}
        >
          {tasks.length === 0 && (
            <li className="py-10 text-center text-sm text-muted-foreground">
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

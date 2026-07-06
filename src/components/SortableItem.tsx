import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface SortableItemProps {
  id: string;
  content: string;
}

export default function SortableItem({ id, content }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "my-2 cursor-grab rounded-md border bg-card px-3 py-2.5 text-sm shadow-sm",
        isDragging && "opacity-50 shadow-md"
      )}
    >
      {content}
    </li>
  );
}

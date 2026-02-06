import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
    padding: "12px 15px",
    margin: "8px 0",
    backgroundColor: isDragging ? "#f5f5f5" : "#fff",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging
      ? "0 2px 8px rgba(0,0,0,0.15)"
      : "0 1px 3px rgba(0,0,0,0.1)",
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </li>
  );
}

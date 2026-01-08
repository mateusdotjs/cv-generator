import type { DragHandleProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

type SectionSortableProps = {
  id: string;
  children: (dragHandleProps: DragHandleProps) => ReactNode;
};

function SectionSortable({ id, children }: SectionSortableProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const dragHandleProps: DragHandleProps = {
    attributes,
    listeners,
    setNodeRef,
    style,
  };

  return children(dragHandleProps);
}

export default SectionSortable;

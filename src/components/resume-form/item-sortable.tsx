import type { HandleProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

type ItemSortableProps = {
  id: string;
  children: (handleProps: HandleProps) => ReactNode;
};

function ItemSortable({ id, children }: ItemSortableProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleProps = {
    listeners,
    attributes,
    setNodeRef,
    style,
  };

  return children(handleProps);
}

export default ItemSortable;

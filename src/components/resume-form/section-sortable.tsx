import type { HandleProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

function SectionSortable({
  id,
  children,
}: {
  id: string;
  children: (handleProps: HandleProps) => ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleProps: HandleProps = {
    attributes,
    listeners,
    setNodeRef,
    style,
  };

  return children(handleProps);
}

export default SectionSortable;

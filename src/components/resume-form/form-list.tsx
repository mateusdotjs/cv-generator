import type { ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown, GripVertical, PlusCircle, Trash } from "lucide-react";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import ItemSortable from "./item-sortable";

type FormListProps<T> = {
  items: T[];
  getTitle: (item: T) => string;
  getId: (item: T) => string;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onReorder: (newItems: T[]) => void;
  renderItem: (item: T, i: number) => ReactNode;
};

function FormList<T>({
  items,
  getTitle,
  getId,
  onAdd,
  onRemove,
  onReorder,
  renderItem,
}: FormListProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor));

  const ids = items.map(getId);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const from = ids.indexOf(active.id as string);
    const to = ids.indexOf(over.id as string);

    if (from !== to) {
      const newOrder = arrayMove(items, from, to);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids}>
        <div className="flex flex-col gap-2">
          {items &&
            items.length > 0 &&
            items.map((item, i) => {
              return (
                <ItemSortable key={getId(item)} id={getId(item)}>
                  {(handleProps) => (
                    <div ref={handleProps.setNodeRef} style={handleProps.style}>
                      <Collapsible
                        className="min-h-12 border rounded-sm p-4 pl-7 relative"
                        key={i}
                      >
                        <GripVertical
                          {...handleProps?.attributes}
                          {...handleProps?.listeners}
                          className="absolute left-1 top-5 cursor-grab"
                        />
                        <div className="flex items-center justify-between relative">
                          <span>{getTitle(item)}</span>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => onRemove(getId(item))}
                            >
                              <Trash />
                              <span className="sr-only">Remove</span>
                            </Button>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                              >
                                <ChevronDown />
                                <span className="sr-only">Toggle</span>
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                        </div>
                        <CollapsibleContent className="mt-4">
                          {renderItem(item, i)}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )}
                </ItemSortable>
              );
            })}
          <Button variant="outline" onClick={onAdd} className="mt-4">
            Adicionar novo item
            <PlusCircle />
          </Button>
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default FormList;

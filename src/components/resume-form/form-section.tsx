import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronDown, Edit, GripVertical, Trash } from "lucide-react";
import { CollapsibleContent } from "../ui/collapsible";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { DragHandleProps } from "@/types";

type FormSectionProps = {
  title: string;
  description?: string;
  className?: string;
  onTitleChange: (title: string) => void;
  showRemove: boolean;
  onRemove: () => void;
  dragHandleProps: DragHandleProps | undefined;
  children: ReactNode;
};

function FormSection({
  title,
  description,
  className,
  onTitleChange,
  showRemove,
  onRemove,
  dragHandleProps,
  children,
}: FormSectionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Collapsible>
      <Card className={cn("p-2 pl-8", className)}>
        <div className="flex items-center justify-between relative group">
          {dragHandleProps && (
            <GripVertical
              {...dragHandleProps.attributes}
              {...dragHandleProps.listeners}
              className="absolute -left-6 cursor-grab"
            />
          )}
          <div className="flex gap-2 items-center ">
            <CardTitle>
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                  className="border-b border-b-transparent focus:border-b-foreground outline-none bg-transparent"
                />
              ) : (
                title
              )}
            </CardTitle>
            {!isEditing && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8 opacity-0 group-hover:opacity-100"
                onClick={() => setIsEditing(true)}
              >
                <Edit />
              </Button>
            )}
          </div>
          <div className={`${showRemove ? "grid grid-cols-2 gap-2" : ""}`}>
            {showRemove && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={onRemove}
              >
                <Trash />
                <span className="sr-only">Remove</span>
              </Button>
            )}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CardDescription className="-mt-4">{description}</CardDescription>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export default FormSection;

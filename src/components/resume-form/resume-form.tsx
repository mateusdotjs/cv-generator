import { SortableContext } from "@dnd-kit/sortable";
import FormSection from "./form-section";
import SectionRenderer from "./section-renderer";
import SectionSortable from "./section-sortable";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useCvStore } from "@/stores/cv-store";
import { useTranslation } from "react-i18next";

function ResumeForm({ resumeId }: { resumeId: string }) {
  const {
    sectionsOrder,
    sectionsMeta,
    moveSection,
    updateSectionTitle,
    removeSection,
  } = useCvStore();
  const { t } = useTranslation();
  const order = sectionsOrder[resumeId] ?? [];
  const metaById = sectionsMeta[resumeId] ?? {};

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const from = order.indexOf(active.id.toString());
    const to = order.indexOf(over.id.toString());

    if (from !== to) moveSection(resumeId, from, to);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={order}>
        <div className="w-full flex flex-col gap-1">
          {order.map((sectionId) => {
            const meta = metaById[sectionId];
            
            const translatedTitle = t(meta.title, meta.title);
            const translatedDescription = meta.description ? t(meta.description, meta.description) : undefined;

            return (
              <SectionSortable key={sectionId} id={sectionId}>
                {(dragHandleProps) => (
                  <div ref={dragHandleProps.setNodeRef} style={dragHandleProps.style}>
                    <FormSection
                      key={sectionId}
                      title={translatedTitle}
                      description={translatedDescription}
                      onTitleChange={(title: string) =>
                        updateSectionTitle(resumeId, sectionId, title)
                      }
                      showRemove={meta.removable}
                      onRemove={() => removeSection(resumeId, sectionId)}
                      dragHandleProps={meta.movable ? dragHandleProps : undefined}
                    >
                      <SectionRenderer id={sectionId} resumeId={resumeId} />
                    </FormSection>
                  </div>
                )}
              </SectionSortable>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default ResumeForm;

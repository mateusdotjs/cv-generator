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

function ResumeForm() {
  const {
    sectionsOrder,
    sectionsMeta,
    moveSection,
    updateSectionTitle,
    removeSection,
  } = useCvStore();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const from = sectionsOrder.indexOf(active.id.toString());
    const to = sectionsOrder.indexOf(over.id.toString());

    if (from !== to) moveSection(from, to);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sectionsOrder}>
        <div className="w-full flex flex-col gap-1">
          {sectionsOrder.map((sectionId) => {
            const meta = sectionsMeta[sectionId];

            return (
              <SectionSortable key={sectionId} id={sectionId}>
                {(handleProps) => (
                  <div ref={handleProps.setNodeRef} style={handleProps.style}>
                    <FormSection
                      key={sectionId}
                      title={meta.title}
                      description={meta.description}
                      onTitleChange={(title: string) =>
                        updateSectionTitle(sectionId, title)
                      }
                      showRemove={meta.removable}
                      onRemove={() => removeSection(sectionId)}
                      handleProps={meta.movable ? handleProps : undefined}
                    >
                      <SectionRenderer id={sectionId} />
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

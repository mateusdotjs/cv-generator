import { useCvStore } from "@/stores/cv-store";
import FormList from "../form-list";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import RichTextEditor from "../rich-text-editor";

function ProjectsForm({ resumeId }: { resumeId: string }) {
  const { projects, addProject, updateProject, removeProject, reorderProject } =
    useCvStore();

  const items = projects[resumeId] ?? [];

  return (
    <FormList
      items={items}
      getTitle={(proj) => proj.title}
      getId={(proj) => proj.id}
      onAdd={() => {
        addProject(resumeId, {
          id: crypto.randomUUID(),
          title: `Projeto ${items.length + 1}`,
          description: "",
        });
      }}
      onRemove={(id) => removeProject(resumeId, id)}
      onReorder={(newList) => reorderProject(resumeId, newList)}
      renderItem={(proj, i) => {
        return (
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor={`projectDescription-${i}`}>
                  Título
                </FieldLabel>
                <Input
                  id={`projectDescription-${i}`}
                  value={proj.title}
                  onChange={(e) =>
                    updateProject(resumeId, proj.id, {
                      title: e.target.value,
                    })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Descrição</FieldLabel>
                <RichTextEditor
                  value={proj.description}
                  onChange={(html) => {
                    updateProject(resumeId, proj.id, {
                      description: html,
                    });
                  }}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        );
      }}
    />
  );
}

export default ProjectsForm;

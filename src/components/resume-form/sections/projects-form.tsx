import { useCvStore } from "@/stores/cv-store";
import FormList from "../form-list";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import RichTextEditor from "../rich-text-editor";

function ProjectsForm() {
  const { projects, addProject, updateProject, removeProject, reorderProject } =
    useCvStore();

  return (
    <FormList
      items={projects}
      getTitle={(proj) => proj.title}
      getId={(proj) => proj.id}
      onAdd={() => {
        addProject({
          id: crypto.randomUUID(),
          title: `Projeto ${projects.length + 1}`,
          description: "",
        });
      }}
      onRemove={(id) => removeProject(id)}
      onReorder={(newList) => reorderProject(newList)}
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
                    updateProject(proj.id, { ...proj, title: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>Descrição</FieldLabel>
                <RichTextEditor
                  value={proj.description}
                  onChange={(html) => {
                    updateProject(proj.id, { ...proj, description: html });
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

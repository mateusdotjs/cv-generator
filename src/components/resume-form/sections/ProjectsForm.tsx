import { useCvStore } from "@/stores/cvStore";
import FormList from "../FormList";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import RichTextEditor from "../RichTextEditor";
import { useTranslation } from "react-i18next";

function ProjectsForm({ resumeId }: { resumeId: string }) {
  const { t } = useTranslation();
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
                  {t("resume.fields.title")}
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
                <FieldLabel>{t("resume.fields.description")}</FieldLabel>
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

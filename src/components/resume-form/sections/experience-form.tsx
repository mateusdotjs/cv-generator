import { useCvStore } from "@/stores/cv-store";
import { DatePicker } from "../../ui/date-picker";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import FormList from "../form-list";
import RichTextEditor from "../rich-text-editor";
import { useTranslation } from "react-i18next";

function ExperienceForm({ resumeId }: { resumeId: string }) {
  const { t } = useTranslation();
  const {
    experiences,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperiences,
  } = useCvStore();

  const items = experiences[resumeId] ?? [];

  return (
    <FormList
      items={items}
      getTitle={(exp) =>
        `${exp.company} ${exp.jobTitle && exp.company && "-"} ${exp.jobTitle}`
      }
      getId={(exp) => exp.id}
      onAdd={() =>
        addExperience(resumeId, {
          id: crypto.randomUUID(),
          jobTitle: `Experiência ${items.length + 1}`,
          company: `Empresa ${items.length + 1}`,
          startDate: new Date(),
          endDate: undefined,
          description: "",
        })
      }
      onRemove={(id) => removeExperience(resumeId, id)}
      onReorder={(newList) => reorderExperiences(resumeId, newList)}
      renderItem={(exp, i) => {
        return (
          <FieldSet>
            <FieldGroup>
              <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
                <Field>
                  <FieldLabel htmlFor={`company-${i}`}>{t("resume.fields.company")}</FieldLabel>
                  <Input
                    id={`company-${i}`}
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(resumeId, exp.id, {
                        company: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`experienceJobTitle-${i}`}>
                    {t("resume.fields.jobTitle")}
                  </FieldLabel>
                  <Input
                    id={`experienceJobTitle-${i}`}
                    value={exp.jobTitle}
                    onChange={(e) =>
                      updateExperience(resumeId, exp.id, {
                        jobTitle: e.target.value,
                      })
                    }
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor={`experienceStartDate-${i}`}>
                      {t("resume.fields.startDate")}
                    </FieldLabel>
                    <DatePicker
                      id={`experienceStartDate-${i}`}
                      value={exp.startDate}
                      onChange={(date) =>
                        updateExperience(resumeId, exp.id, {
                          startDate: date,
                        })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`experienceEndDate-${i}`}>
                      {t("resume.fields.endDate")}
                    </FieldLabel>
                    <DatePicker
                      id={`experienceEndDate-${i}`}
                      value={exp.endDate}
                      onChange={(date) =>
                        updateExperience(resumeId, exp.id, {
                          endDate: date,
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
              <Field>
                <FieldLabel>{t("resume.fields.description")}</FieldLabel>
                <RichTextEditor
                  value={exp.description}
                  onChange={(html) => {
                    updateExperience(resumeId, exp.id, {
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

export default ExperienceForm;

import { useCvStore } from "@/stores/cvStore";
import { DatePicker } from "../../ui/DatePicker";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import FormList from "../FormList";
import RichTextEditor from "../RichTextEditor";
import { useTranslation } from "react-i18next";

function EducationForm({ resumeId }: { resumeId: string }) {
  const { t } = useTranslation();
  const {
    education,
    addEducation,
    updateEducation,
    removeEducation,
    reorderEducation,
  } = useCvStore();

  const items = education[resumeId] ?? [];

  return (
    <FormList
      items={items}
      getTitle={(ed) =>
        `${ed.degree} ${ed.degree && ed.school && "-"} ${ed.school}`
      }
      getId={(ed) => ed.id}
      onAdd={() =>
        addEducation(resumeId, {
          id: crypto.randomUUID(),
          degree: `Formação ${items.length + 1}`,
          school: `Universidade ${items.length + 1}`,
          startDate: new Date(),
          endDate: undefined,
          description: "",
        })
      }
      onRemove={(id) => removeEducation(resumeId, id)}
      onReorder={(newList) => reorderEducation(resumeId, newList)}
      renderItem={(ed, i) => {
        return (
          <FieldSet>
            <FieldGroup>
              <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
                <Field>
                  <FieldLabel htmlFor={`school-${i}`}>{t("resume.fields.school")}</FieldLabel>
                  <Input
                    id={`school-${i}`}
                    value={ed.school}
                    onChange={(e) =>
                      updateEducation(resumeId, ed.id, {
                        school: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`degree-${i}`}>{t("resume.fields.degree")}</FieldLabel>
                  <Input
                    id={`degree-${i}`}
                    value={ed.degree}
                    onChange={(e) =>
                      updateEducation(resumeId, ed.id, {
                        degree: e.target.value,
                      })
                    }
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor={`educationStartDate-${i}`}>
                      {t("resume.fields.startDate")}
                    </FieldLabel>
                    <DatePicker
                      id={`educationStartDate-${i}`}
                      value={ed.startDate}
                      onChange={(date) =>
                        updateEducation(resumeId, ed.id, {
                          startDate: date,
                        })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`educationEndDate-${i}`}>
                      {t("resume.fields.endDate")}
                    </FieldLabel>
                    <DatePicker
                      id={`educationEndDate-${i}`}
                      value={ed.endDate}
                      onChange={(date) =>
                        updateEducation(resumeId, ed.id, {
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
                  value={ed.description}
                  onChange={(html) =>
                    updateEducation(resumeId, ed.id, {
                      description: html,
                    })
                  }
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        );
      }}
    />
  );
}

export default EducationForm;

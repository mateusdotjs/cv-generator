import { useCvStore } from "@/stores/cv-store";
import { DatePicker } from "../../ui/date-picker";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import FormList from "../form-list";
import RichTextEditor from "../rich-text-editor";

function ExperienceForm() {
  const {
    experiences,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperiences,
  } = useCvStore();

  return (
    <FormList
      items={experiences}
      getTitle={(exp) =>
        `${exp.company} ${exp.jobTitle && exp.company && "-"} ${exp.jobTitle}`
      }
      getId={(exp) => exp.id}
      onAdd={() =>
        addExperience({
          id: crypto.randomUUID(),
          jobTitle: `Experiência ${experiences.length + 1}`,
          company: `Empresa ${experiences.length + 1}`,
          startDate: new Date(),
          endDate: undefined,
          description: "",
        })
      }
      onRemove={(id) => removeExperience(id)}
      onReorder={(newList) => reorderExperiences(newList)}
      renderItem={(exp, i) => {
        return (
          <FieldSet>
            <FieldGroup>
              <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
                <Field>
                  <FieldLabel htmlFor={`company-${i}`}>Empresa</FieldLabel>
                  <Input
                    id={`company-${i}`}
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, {
                        ...exp,
                        company: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`experienceJobTitle-${i}`}>
                    Cargo
                  </FieldLabel>
                  <Input
                    id={`experienceJobTitle-${i}`}
                    value={exp.jobTitle}
                    onChange={(e) =>
                      updateExperience(exp.id, {
                        ...exp,
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
                      De
                    </FieldLabel>
                    <DatePicker
                      id={`experienceStartDate-${i}`}
                      value={exp.startDate}
                      onChange={(date) =>
                        updateExperience(exp.id, {
                          ...exp,
                          startDate: date,
                        })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`experienceEndDate-${i}`}>
                      Até
                    </FieldLabel>
                    <DatePicker
                      id={`experienceEndDate-${i}`}
                      value={exp.endDate}
                      onChange={(date) =>
                        updateExperience(exp.id, {
                          ...exp,
                          endDate: date,
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
              <Field>
                <FieldLabel>Descrição</FieldLabel>
                <RichTextEditor
                  value={exp.description}
                  onChange={(html) => {
                    updateExperience(exp.id, { ...exp, description: html });
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

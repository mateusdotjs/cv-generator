import { useCvStore } from "@/stores/cv-store";
import { DatePicker } from "../../ui/date-picker";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import FormList from "../form-list";
import RichTextEditor from "../rich-text-editor";

function EducationForm() {
  const {
    education,
    addEducation,
    updateEducation,
    removeEducation,
    reorderEducation,
  } = useCvStore();

  return (
    <FormList
      items={education}
      getTitle={(ed) =>
        `${ed.degree} ${ed.degree && ed.school && "-"} ${ed.school}`
      }
      getId={(ed) => ed.id}
      onAdd={() =>
        addEducation({
          id: crypto.randomUUID(),
          degree: `Formação ${education.length + 1}`,
          school: `Universidade ${education.length + 1}`,
          startDate: new Date(),
          endDate: undefined,
          description: "",
        })
      }
      onRemove={(id) => removeEducation(id)}
      onReorder={(newList) => reorderEducation(newList)}
      renderItem={(ed, i) => {
        return (
          <FieldSet>
            <FieldGroup>
              <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
                <Field>
                  <FieldLabel htmlFor={`school-${i}`}>Instituição</FieldLabel>
                  <Input
                    id={`school-${i}`}
                    value={ed.school}
                    onChange={(e) =>
                      updateEducation(ed.id, { ...ed, school: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`degree-${i}`}>Curso</FieldLabel>
                  <Input
                    id={`degree-${i}`}
                    value={ed.degree}
                    onChange={(e) =>
                      updateEducation(ed.id, { ...ed, degree: e.target.value })
                    }
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor={`educationStartDate-${i}`}>
                      De
                    </FieldLabel>
                    <DatePicker
                      id={`educationStartDate-${i}`}
                      value={ed.startDate}
                      onChange={(date) =>
                        updateEducation(ed.id, {
                          ...ed,
                          startDate: date,
                        })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`educationEndDate-${i}`}>
                      Até
                    </FieldLabel>
                    <DatePicker
                      id={`educationEndDate-${i}`}
                      value={ed.endDate}
                      onChange={(date) =>
                        updateEducation(ed.id, {
                          ...ed,
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
                  value={ed.description}
                  onChange={(html) =>
                    updateEducation(ed.id, {
                      ...ed,
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

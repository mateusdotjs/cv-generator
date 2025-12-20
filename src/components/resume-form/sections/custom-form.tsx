import { useCvStore } from "@/stores/cv-store";
import FormList from "../form-list";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import { DatePicker } from "../../ui/date-picker";
import RichTextEditor from "../rich-text-editor";

function CustomForm({ sectionId }: { sectionId: string }) {
  const {
    customItems,
    addCustomItem,
    updateCustomItem,
    reorderCustomItem,
    removeCustomItem,
  } = useCvStore();

  const items = customItems[sectionId] || [];

  return (
    <FormList
      items={items}
      getTitle={(item) => item.title}
      getId={(item) => item.id}
      onAdd={() =>
        addCustomItem(sectionId, {
          id: crypto.randomUUID(),
          title: `Item Personalizado ${items.length + 1}`,
          institution: `Instituição ${items.length + 1}`,
          startDate: undefined,
          endDate: undefined,
          description: "",
        })
      }
      onReorder={(newList) => reorderCustomItem(sectionId, newList)}
      onRemove={(itemId) => {
        removeCustomItem(sectionId, itemId);
      }}
      renderItem={(item, i) => {
        return (
          <FieldSet>
            <FieldGroup>
              <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
                <Field>
                  <FieldLabel htmlFor={`customItemTitle-${i}-${sectionId}`}>
                    Taabalho, curso ou atividade
                  </FieldLabel>
                  <Input
                    id={`customItemTitle-${i}-${sectionId}`}
                    value={item.title}
                    onChange={(e) =>
                      updateCustomItem(sectionId, item.id, {
                        ...item,
                        title: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel
                    htmlFor={`customItemInstitution-${i}-${sectionId}`}
                    className="line-clamp-1"
                  >
                    Universidade, empresa ou Instituição
                  </FieldLabel>
                  <Input
                    id={`customItemInstitution-${i}-${sectionId}`}
                    value={item.institution}
                    onChange={(e) =>
                      updateCustomItem(sectionId, item.id, {
                        ...item,
                        institution: e.target.value,
                      })
                    }
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
                  <Field>
                    <FieldLabel
                      htmlFor={`customItemStartDate-${i}-${sectionId}`}
                    >
                      De
                    </FieldLabel>
                    <DatePicker
                      id={`customItemStartDate-${i}-${sectionId}`}
                      value={item.startDate}
                      onChange={(date) =>
                        updateCustomItem(sectionId, item.id, {
                          ...item,
                          startDate: date,
                        })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`customItemEndDate-${i}-${sectionId}`}>
                      Até
                    </FieldLabel>
                    <DatePicker
                      id={`customItemEndDate-${i}-${sectionId}`}
                      value={item.endDate}
                      onChange={(date) =>
                        updateCustomItem(sectionId, item.id, {
                          ...item,
                          endDate: date,
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
              <Field>
                <FieldLabel htmlFor="description">Descrição</FieldLabel>
                <RichTextEditor
                  value={item.description}
                  onChange={(html) => {
                    updateCustomItem(sectionId, item.id, {
                      ...item,
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

export default CustomForm;

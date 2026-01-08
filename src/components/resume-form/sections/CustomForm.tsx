import { useCvStore } from "@/stores/cvStore";
import FormList from "../FormList";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import { DatePicker } from "../../ui/DatePicker";
import RichTextEditor from "../RichTextEditor";
import { useTranslation } from "react-i18next";

function CustomForm({ resumeId, sectionId }: { resumeId: string; sectionId: string }) {
  const { t } = useTranslation();
  const {
    customItems,
    addCustomItem,
    updateCustomItem,
    reorderCustomItem,
    removeCustomItem,
  } = useCvStore();

  const items = customItems[resumeId]?.[sectionId] || [];

  return (
    <FormList
      items={items}
      getTitle={(item) => item.title}
      getId={(item) => item.id}
      onAdd={() =>
        addCustomItem(resumeId, sectionId, {
          id: crypto.randomUUID(),
          title: `Item Personalizado ${items.length + 1}`,
          institution: `Instituição ${items.length + 1}`,
          startDate: undefined,
          endDate: undefined,
          description: "",
        })
      }
      onReorder={(newList) =>
        reorderCustomItem(resumeId, sectionId, newList)
      }
      onRemove={(itemId) => {
        removeCustomItem(resumeId, sectionId, itemId);
      }}
      renderItem={(item, i) => {
        return (
          <FieldSet>
            <FieldGroup>
              <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
                <Field>
                  <FieldLabel htmlFor={`customItemTitle-${i}-${sectionId}`}>
                    {t("resume.fields.customTitle")}
                  </FieldLabel>
                  <Input
                    id={`customItemTitle-${i}-${sectionId}`}
                    value={item.title}
                    onChange={(e) =>
                      updateCustomItem(resumeId, sectionId, item.id, {
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
                    {t("resume.fields.institution")}
                  </FieldLabel>
                  <Input
                    id={`customItemInstitution-${i}-${sectionId}`}
                    value={item.institution}
                    onChange={(e) =>
                      updateCustomItem(resumeId, sectionId, item.id, {
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
                      {t("resume.fields.startDate")}
                    </FieldLabel>
                    <DatePicker
                      id={`customItemStartDate-${i}-${sectionId}`}
                      value={item.startDate}
                      onChange={(date) =>
                        updateCustomItem(resumeId, sectionId, item.id, {
                          startDate: date,
                        })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`customItemEndDate-${i}-${sectionId}`}>
                      {t("resume.fields.endDate")}
                    </FieldLabel>
                    <DatePicker
                      id={`customItemEndDate-${i}-${sectionId}`}
                      value={item.endDate}
                      onChange={(date) =>
                        updateCustomItem(resumeId, sectionId, item.id, {
                          endDate: date,
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
              <Field>
                <FieldLabel htmlFor="description">{t("resume.fields.description")}</FieldLabel>
                <RichTextEditor
                  value={item.description}
                  onChange={(html) => {
                    updateCustomItem(resumeId, sectionId, item.id, {
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

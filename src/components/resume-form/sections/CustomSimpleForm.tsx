import { useCvStore } from "@/stores/cvStore";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import RichTextEditor from "../RichTextEditor";
import { useTranslation } from "react-i18next";

function CustomSimpleForm({ resumeId, sectionId }: { resumeId: string; sectionId: string }) {
  const { t } = useTranslation();
  const { customSimple, updateCustomSimple } = useCvStore();

  const value = customSimple[resumeId]?.[sectionId]?.description ?? "";

  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="description">{t("resume.fields.description")}</FieldLabel>
          <RichTextEditor
            value={value}
            onChange={(html) => {
              updateCustomSimple(resumeId, sectionId, html);
            }}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

export default CustomSimpleForm;

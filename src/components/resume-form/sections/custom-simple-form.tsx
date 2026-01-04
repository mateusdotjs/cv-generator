import { useCvStore } from "@/stores/cv-store";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import RichTextEditor from "../rich-text-editor";

function CustomSimpleForm({ resumeId, sectionId }: { resumeId: string; sectionId: string }) {
  const { customSimple, updateCustomSimple } = useCvStore();

  const value = customSimple[resumeId]?.[sectionId]?.description ?? "";

  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="description">Descrição</FieldLabel>
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

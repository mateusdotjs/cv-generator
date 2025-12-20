import { useCvStore } from "@/stores/cv-store";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import RichTextEditor from "../rich-text-editor";

function CustomSimpleForm({ sectionId }: { sectionId: string }) {
  const { customSimple, updateCustomSimple } = useCvStore();

  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="description">Descrição</FieldLabel>
          <RichTextEditor
            value={customSimple[sectionId].description}
            onChange={(html) => {
              updateCustomSimple(sectionId, html);
            }}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

export default CustomSimpleForm;

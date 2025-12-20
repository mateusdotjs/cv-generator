import { useCvStore } from "@/stores/cv-store";
import RichTextEditor from "../rich-text-editor";

function SummaryForm() {
  const { summary, setSummary } = useCvStore();

  return (
    <RichTextEditor
      value={summary}
      onChange={(html) => {
        setSummary(html);
      }}
    />
  );
}
export default SummaryForm;

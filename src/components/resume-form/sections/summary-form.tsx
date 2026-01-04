import { useCvStore } from "@/stores/cv-store";
import RichTextEditor from "../rich-text-editor";

function SummaryForm({ resumeId }: { resumeId: string }) {
  const { summary, setSummary } = useCvStore();

  return (
    <RichTextEditor
      value={summary[resumeId] ?? ""}
      onChange={(html) => {
        setSummary(resumeId, html);
      }}
    />
  );
}
export default SummaryForm;

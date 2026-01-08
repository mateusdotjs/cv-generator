import { useCvStore } from "@/stores/cvStore";
import RichTextEditor from "../RichTextEditor";

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

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
import { Bold, Italic, List } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm",
      },
    },
  });

  if (!editor) return null;

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
      };
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 mb-2">
        <Button
          size="icon"
          variant="secondary"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "size-6",
            editorState.isBold ? "bg-white text-black" : ""
          )}
        >
          <Bold />
        </Button>

        <Button
          size="icon"
          variant="secondary"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "size-6",
            editorState.isItalic ? "bg-white text-black" : ""
          )}
        >
          <Italic />
        </Button>

        <Button
          size="icon"
          variant="secondary"
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "size-6",
            editorState.isBulletList ? "bg-white text-black" : ""
          )}
        >
          <List />
        </Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

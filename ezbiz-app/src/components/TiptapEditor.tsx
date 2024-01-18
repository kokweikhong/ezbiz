"use client";

import { ContentValues } from "@/interfaces/content";
import { cn } from "@/lib/utils";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Code2Icon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PaintbrushIcon,
  PilcrowIcon,
  RedoIcon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  UndoIcon,
  XCircleIcon,
} from "lucide-react";
import React, { MouseEventHandler } from "react";
import { ControllerRenderProps } from "react-hook-form";

type MenuButtonProps = {
  icon: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  isActive?: boolean;
};

const MenuButton: React.FC<MenuButtonProps> = ({
  icon,
  onClick,
  disabled,
  className,
  isActive,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled && disabled}
      className={cn(
        "border p-2 hover:bg-gray-100 transition-all duration-300",
        isActive && "bg-gray-200",
        className
      )}
    >
      {icon}
    </button>
  );
};

const MenuBar = ({
  editor,
  themeColor,
}: {
  editor: Editor | null;
  themeColor?: string;
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center">
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        icon={<BoldIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        icon={<ItalicIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        icon={<StrikethroughIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        icon={<CodeIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        icon={<RemoveFormattingIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().clearNodes().run()}
        icon={<XCircleIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        isActive={editor.isActive("paragraph")}
        icon={<PilcrowIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        icon={<Heading1Icon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        icon={<Heading2Icon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        icon={<Heading3Icon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        isActive={editor.isActive("heading", { level: 4 })}
        icon={<Heading4Icon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        isActive={editor.isActive("heading", { level: 5 })}
        icon={<Heading5Icon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        isActive={editor.isActive("heading", { level: 6 })}
        icon={<Heading6Icon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        icon={<ListIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        icon={<ListOrderedIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        icon={<Code2Icon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        icon={<TextQuoteIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        icon={<MinusIcon />}
      />

      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        icon={<AlignLeftIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        icon={<AlignCenterIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        icon={<AlignRightIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        icon={<AlignJustifyIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        icon={<UndoIcon />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        icon={<RedoIcon />}
      />
      {themeColor && (
        <MenuButton
          onClick={() => editor.chain().focus().setColor(themeColor).run()}
          isActive={editor.isActive("textStyle", { color: themeColor })}
          icon={<PaintbrushIcon />}
        />
      )}
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

type TiptapEditorProps = {
  field?: ControllerRenderProps<ContentValues, any>;
};

const TiptapEditor: React.FC<TiptapEditorProps> = ({ field }) => {
  const editor = useEditor({
    extensions,
    content: field?.value || "",
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      if (!field) {
        return;
      }
      field.onChange(editor.getHTML());
    },
  });
  return (
    <div className="w-full">
      <MenuBar editor={editor} />
      <article className="prose lg:prose-xl">
        {/* <EditorProvider
          slotBefore={<MenuBar />}
          extensions={extensions}
          content={content}
          onUpdate={(e) => {
            console.log(e);
          }}
          children
        ></EditorProvider> */}
        <EditorContent editor={editor} />
      </article>
    </div>
  );
};

export default TiptapEditor;

"use client";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

type PageContentProps = {
  themeColor?: string;
  content: any;
};

const About: React.FC<PageContentProps> = ({ content, themeColor }) => {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit, Document, Paragraph, Text],
    content: `${content}`,
  });

  return (
    <>
      <h2
        style={{ color: themeColor }}
        className="text-3xl font-semibold mb-[20px]"
      >
        About
      </h2>
      <EditorContent
        className="prose lg:prose-xl text-[#808080] tiptap-content"
        editor={editor}
      />
    </>
  );
};

export default About;

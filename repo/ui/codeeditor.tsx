"use client"

import  { useRef } from "react";

import Editor from "@monaco-editor/react"

interface CodeEditorProps {
  lang: string;
  mode: string;
  width: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}



const CodeEditor:React.FC<CodeEditorProps> = ({lang,mode,width,code,setCode})=> {
  const editorRef = useRef(null);
//@ts-ignore
  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

  return (
    <Editor
      height="90vh"
      defaultLanguage="c++"
      defaultValue=""
      language={lang}
      onMount={handleEditorDidMount}
      theme={mode}
      width={width}
      value={code}
      onChange={(val) => setCode(val || "")}
    />
  );
}

export default CodeEditor;
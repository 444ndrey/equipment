import { Button, ButtonGroup, Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { IEquipmentJson } from "../IEquipment";
import Editor, { OnMount } from "@monaco-editor/react";
import monaco, { editor } from "monaco-editor";
import { loader } from "@monaco-editor/react";
import LogBox from "../components/LogBox";
import { CgFormatLeft } from "react-icons/cg";
import { IoIosCodeWorking } from "react-icons/io";
import { MdOutlineContentCopy } from "react-icons/md";

type CodeEditorProps = {
  equipment: IEquipmentJson[];
  editorTheme: "dark" | "light";
  onSetupFormClick: (code: string) => void;
  onCopyClick: (code: string) => void;
};

export default function CodeEditor({
  equipment,
  editorTheme,
  onSetupFormClick,
  onCopyClick,
}: CodeEditorProps) {
  const [markers, setMarkers] = useState<editor.IMarker[]>([]);
  loader.config({ "vs/nls": { availableLanguages: { "*": "ru" } } });

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    setCode(JSON.stringify(equipment));
  }, [equipment]);
  function handleEditorValidation(markers_: editor.IMarker[]) {
    markers_.forEach((marker) =>
      console.log(
        "onValidate:",
        marker.message,
        `on ${marker.startLineNumber} line`
      )
    );
    setMarkers(markers_);
  }
  const [code, setCode] = useState(JSON.stringify(equipment));
  function handleChange(str: string) {
    setCode(str);
  }
  function handleClick() {
    onSetupFormClick(code || "");
  }
  function handleCopyClick() {
    onCopyClick(code);
  }
  function handleFormatCode() {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        editorRef.current.getAction("editor.action.formatDocument")?.run();
      }
    }
  }
  function handleMinimizeCode() {
    if (editorRef.current) {
      const unformattedCode = editorRef.current.getValue();
      const minifiedCode = unformattedCode.replace(/\s+/g, " ").trim();
      editorRef.current.setValue(minifiedCode);
    }
  }

  return (
    <>
      <Flex
        width={"100%"}
        height={"100%"}
        px={10}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <ButtonGroup mb={"10px"} isDisabled={markers.length > 0} size={"xs"}>
          <Button onClick={handleClick}>Заполнить форму</Button>
          <IconButton
            onClick={handleCopyClick}
            aria-label="Copy"
            icon={<MdOutlineContentCopy />}
          />
          <IconButton
            onClick={handleFormatCode}
            aria-label="Formate"
            icon={<CgFormatLeft />}
          />
          <IconButton
            onClick={handleMinimizeCode}
            aria-label="Minimize"
            icon={<IoIosCodeWorking />}
          />
        </ButtonGroup>
        <Editor
          defaultLanguage="json"
          value={JSON.stringify(equipment, null, 4)}
          defaultValue={JSON.stringify(equipment, null, 4)}
          theme={editorTheme == "light" ? "light" : "vs-dark"}
          onValidate={handleEditorValidation}
          onChange={(str) => handleChange(str || "")}
          onMount={handleEditorDidMount}
        ></Editor>
        <LogBox
          jsonErros={[...markers].map((m) => ({
            line: m.startLineNumber,
            message: m.message,
          }))}
        ></LogBox>
      </Flex>
    </>
  );
}

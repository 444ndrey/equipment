import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IEquipmentJson } from "../IEquipment";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { loader } from "@monaco-editor/react";
import LogBox from "../components/LogBox";
// import AJV from "ajv";
// import ajvErrors from "ajv-errors";

// const ajv = new AJV({
//   allErrors: true,
//   messages: true,
// });
// ajvErrors(ajv);

// const schema = {
//   type: "array",
//   items: {
//     type: "object",
//     properties: {
//       name: {
//         type: "string",
//         minLength: 1,
//       },
//       type: {
//         type: "string",
//         minLength: 1,
//       },
//       description: {
//         type: "string",
//         minLength: 1,
//       },
//       mandatory: {
//         type: "string",
//       },
//       rent: {
//         type: "object",
//         properties: {
//           price: {
//             type: "string",
//             minLength: 1,
//           },
//           description: {
//             type: "string",
//             minLength: 1,
//           },
//         },
//         required: ["price"],
//       },
//       sale: {
//         type: "object",
//         properties: {
//           price: {
//             type: "string",
//             minLength: 1,
//           },
//           description: {
//             type: "string",
//             minLength: 1,
//           },
//         },
//         required: ["price"],
//       },
//       credit: {
//         type: "array",
//         items: {
//           type: "object",
//           properties: {
//             price: {
//               type: "string",
//               minLength: 1,
//             },
//             time: {
//               type: "string",
//               minLength: 1,
//             },
//             fp: {
//               type: "string",
//               minLength: 1,
//             },
//           },
//           required: ["price", "time"],
//         },
//       },
//     },
//     required: ["name", "type"],
//     additionalProperties: false,
//   },
//   errorMessage: {
//     type: ": JSON должен быть массивом, указан в []",
//   },
// };
// const validate = ajv.compile(schema);

type CodeEditorProps = {
  equipment: IEquipmentJson[];
  editorTheme: "dark" | "light";
  onSetupFormClick: (code: string) => void;
  onCopyClick: (code: string) => void;
  //onChange: (str: string) => void;
};

export default function CodeEditor({
  equipment,
  editorTheme,
  onSetupFormClick,
  onCopyClick,
}: //onChange,
CodeEditorProps) {
  const [markers, setMarkers] = useState<editor.IMarker[]>([]);
  loader.config({ "vs/nls": { availableLanguages: { "*": "ru" } } });
  //   function handleEditorChange(value: string | undefined) {
  //     const obj = JSON.parse(value || "[]");
  //     if (!validate(obj)) {
  //       //localize(validate.errors);
  //       console.log(ajv.errorsText(validate.errors));
  //     } else {
  //       console.log("no errors");
  //     }
  //   }

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

  return (
    <>
      <Flex
        width={"100%"}
        height={"100%"}
        px={10}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Editor
          defaultLanguage="json"
          value={JSON.stringify(equipment, null, 4)}
          defaultValue={JSON.stringify(equipment, null, 4)}
          theme={editorTheme == "light" ? "light" : "vs-dark"}
          onValidate={handleEditorValidation}
          onChange={(str) => handleChange(str || "")}
        ></Editor>
        <ButtonGroup mt={"10px"} isDisabled={markers.length > 0}>
          <Button size={"xs"} onClick={handleClick}>
            Заполнить форму
          </Button>
          <Button size={"xs"} onClick={handleCopyClick}>
            Копировать
          </Button>
        </ButtonGroup>
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

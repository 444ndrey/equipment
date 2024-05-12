import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

interface IObject {
  name: string;
  type: string;
}

type CodeEditorProps = {
  json: IObject[];
};

export default function CodeEditor({ json }: CodeEditorProps) {
  return (
    <>
      <JsonView src={json || []} theme="atom" />
    </>
  );
}

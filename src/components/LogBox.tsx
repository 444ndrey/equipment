import { VStack } from "@chakra-ui/react";
import LogMessage from "./LogMessage";

type LogMessagesBoxProp = {
  jsonErros: {
    message: string;
    line: number;
  }[];
};
export default function LogMessages(props: LogMessagesBoxProp) {
  return (
    <>
      <VStack
        height={"200px"}
        width={"100%"}
        overflowY={"auto"}
        borderRadius={"xl"}
        p={"5px"}
      >
        {props.jsonErros.map((log, index) => (
          <LogMessage log={log} key={index}></LogMessage>
        ))}
      </VStack>
    </>
  );
}

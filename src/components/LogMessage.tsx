import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

type LogMessagesProp = {
  log: {
    message: string;
    line: number | undefined;
  };
};
export default function LogMessage(props: LogMessagesProp) {
  return (
    <>
      <Alert
        status="error"
        variant={"subtle"}
        borderRadius={"5px"}
        fontSize={"xs"}
      >
        <AlertIcon />
        <AlertTitle>Error on line {props.log.line}:</AlertTitle>
        <AlertDescription>{props.log.message}</AlertDescription>
      </Alert>
    </>
  );
}

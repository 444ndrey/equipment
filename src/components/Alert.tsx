import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

type AlertProps = {
  text: string;
  isShown: boolean;
  onClose: () => void;
};

export default function Alert({ text, isShown, onClose }: AlertProps) {
  const cancelRef = React.useRef(null);
  return (
    <>
      <AlertDialog
        isOpen={isShown}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Ошибка
            </AlertDialogHeader>

            <AlertDialogBody>{text}</AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                ОК
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

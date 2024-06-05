import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import getMarkDown from "../getMarkDown";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalInfo({ isOpen, onClose }: ModalProps) {
  const { colorMode } = useColorMode();
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Как заполняется JSON</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MarkdownPreview
              source={getMarkDown()}
              wrapperElement={{ "data-color-mode": colorMode }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

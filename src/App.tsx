import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  VStack,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { useState } from "react";
import EquipmentForm from "./components/EquipmentForm";
import { IEquipment, IEquipmentJson } from "./IEquipment";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { IoReturnUpBack } from "react-icons/io5";
import jsonParse from "./jsonParse";
import Alert from "./components/Alert";
import ModalInfo from "./components/ModalInfo";

const changeStory: Array<IEquipment[]> = [];
function App() {
  const jsonTemplate = {
    key: 0,
    type: "Роутер",
    name: "D-Link DIR-842/SMTS",
    description: "",
    sale: {
      price: "",
      comment: "",
    },
    rent: { price: "99", comment: "" },
    mandatory: false,
    credit: [],
  };
  const [jsonObject, setJson] = useState<IEquipment[]>([{ ...jsonTemplate }]);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState("Ошибка");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCodeValid, setisCodeValid] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  function filterJson(equips: IEquipment[]): IEquipmentJson[] {
    const objs = equips.map((el: IEquipmentJson) => {
      const { key, ...rest } = el;
      el = rest;
      if (el.description === "" || el.description === undefined) {
        const { description, ...rest } = el;
        el = rest;
      }
      if (el.rent?.price === "" || el.rent?.price === undefined) {
        const { rent, ...rest } = el;
        el = rest;
      } else {
        if (el.rent.comment === "") {
          el.rent = { price: el.rent.price };
        }
      }
      if (el.sale?.price === "" || el.sale?.price === undefined) {
        const { sale, ...rest } = el;
        el = rest;
      } else {
        if (el.sale.comment === "") {
          el.sale = { price: el.sale.price };
        }
      }
      if (el.mandatory === false) {
        const { mandatory, ...rest } = el;
        el = rest;
      } else {
        el.mandatory = "1";
      }
      if (el.credit?.length === 0 || el.credit === undefined) {
        const { credit, ...rest } = el;
        el = rest;
      } else {
        el.credit = el.credit?.map((el) => {
          return el.fp !== ""
            ? {
                price: el.price,
                time: el.time,
                fp: el.fp,
              }
            : {
                price: el.price,
                time: el.time,
              };
        });
      }
      return el;
    }) as IEquipmentJson[];
    return objs;
  }

  function handlePast() {
    saveChanges();
    navigator.clipboard
      .readText()
      .then((text) => {
        const json = jsonParse(text);
        if (json) {
          setJson(json);
        }
      })
      .catch((err) => {
        console.error("Ошибка при чтении из буфера обмена:", err);
        showErrorAlert(`${err}`);
      });
  }

  function handleEditorChange(json: string) {
    saveChanges();
    try {
      const equipment = jsonParse(json);
      setisCodeValid(true);
      if (equipment) {
        setJson(equipment);
      }
    } catch (error) {
      showErrorAlert(`Ошибка при попытке заполнить форму: ${error}`);
      console.error(error);
    }
  }
  function showErrorAlert(text: string) {
    setAlertErrorMessage(text);
    setIsAlertErrorOpen(true);
  }
  function handleFormChange(equips: IEquipment[]) {
    saveChanges();
    setJson([...equips]);
    setIsAlertErrorOpen(false);
  }
  function handleAdd() {
    saveChanges();
    jsonTemplate.key =
      jsonObject.length > 0 ? jsonObject[jsonObject.length - 1].key + 1 : 0;
    const temp = [...jsonObject, jsonTemplate];
    setJson(temp);
  }
  function handelDel(key: number) {
    saveChanges();
    const temp = jsonObject.filter((item) => item.key !== key);
    setJson(temp);
  }
  async function copyJson(str: string) {
    saveChanges();
    navigator.clipboard
      .writeText(str)
      .then(() => {
        console.log("JSON успешно скопирован в буфер обмена");
      })
      .catch((err) => {
        console.error("Не удалось скопировать JSON в буфер обмена: ", err);
      });
  }
  function handleCopyJson() {
    const string = JSON.stringify(filterJson(jsonObject), null, 0);
    copyJson(string).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 700);
    });
  }

  function saveChanges() {
    const jsonCopy = JSON.parse(JSON.stringify(jsonObject));
    changeStory.unshift(jsonCopy);
    if (changeStory.length > 30) {
      changeStory.pop();
    }
  }
  function restoreChanges() {
    if (changeStory.length > 0) {
      setisCodeValid(true);
      setJson(changeStory[0]);
      changeStory.shift();
    }
  }
  function handleCopyEditorCode(str: string) {
    try {
      const obj = JSON.parse(str);
      const string = JSON.stringify(obj, null, 0);
      copyJson(string);
    } catch (error) {
      showErrorAlert(
        `Не удалось скопировать JSON из редактора в буфер обмена: ${error}`
      );
    }
  }

  return (
    <>
      <Alert
        isShown={isAlertErrorOpen}
        text={alertErrorMessage}
        onClose={() => setIsAlertErrorOpen(false)}
      ></Alert>
      <ModalInfo
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></ModalInfo>
      <VStack
        height={"100vh"}
        width={"100%"}
        px={"10px"}
        pb={"10px"}
        overflowY={"hidden"}
      >
        <ButtonGroup ml={"auto"} size={"xs"} padding={"5px"}>
          <Button onClick={handlePast}>Распарсить скопированный JSON</Button>
          <Button
            onClick={() => {
              saveChanges();
              setJson([]);
            }}
          >
            Очистить JSON
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>Гайд</Button>
          <IconButton
            size={"xs"}
            variant={"outline"}
            aria-label={colorMode == "light" ? "light" : "dark"}
            onClick={toggleColorMode}
            icon={colorMode != "light" ? <BsFillSunFill /> : <FaMoon />}
          />
        </ButtonGroup>
        <Flex
          flex={1}
          justifyContent={"space-between"}
          h={"100%"}
          w={"80%"}
          overflowY={"scroll"}
          gap={"50px"}
        >
          <VStack flex={1}>
            <ButtonGroup size={"xs"} mb={"10x"} ml={"auto"}>
              <IconButton
                variant={"outline"}
                aria-label={colorMode == "light" ? "light" : "dark"}
                onClick={restoreChanges}
                icon={<IoReturnUpBack />}
                isDisabled={changeStory.length < 1}
              />
            </ButtonGroup>
            <Box width={"100%"}>
              {isCodeValid ? (
                <EquipmentForm
                  equips={jsonObject}
                  onChange={handleFormChange}
                  onAdd={handleAdd}
                  onDel={handelDel}
                ></EquipmentForm>
              ) : (
                <Text color={"red"}>
                  Ошибка в коде JSON. Невозможно заполнить форму. Нужно
                  исправить ошибку вручную.
                </Text>
              )}
            </Box>
          </VStack>
          <Box flex={1} height={"100%"}>
            <CodeEditor
              equipment={filterJson(jsonObject)}
              editorTheme={colorMode}
              // onSetupFormClick={(str) => handleSetupFormClick(str)}
              onSetupFormClick={(str) => handleEditorChange(str)}
              onCopyClick={handleCopyEditorCode}
            ></CodeEditor>
          </Box>
        </Flex>
        <Button
          colorScheme="green"
          transition={"ease-in-out .3s"}
          variant={isCopied ? "solid" : "outline"}
          onClick={handleCopyJson}
          w={"30%"}
          mb={"20px"}
        >
          {isCopied ? "✓" : "Скопировать JSON из формы"}
        </Button>
      </VStack>
    </>
  );
}

export default App;

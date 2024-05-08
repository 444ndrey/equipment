import "./App.css";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { useEffect, useState } from "react";
import EquipmentForm from "./components/EquipmentForm";
import { IEquipment, IEquipmentJson } from "./IEquipment";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { IoReturnUpBack } from "react-icons/io5";
import jsonParse from "./jsonParse";

const changeStory: Array<IEquipment[]> = [];
function App() {
  const jsonTemplate = {
    key: 0,
    type: "Роутер",
    name: "D-Link DIR-842/SMTS",
    description: "",
    sale: {
      price: "",
      description: "",
    },
    rent: { price: "99", description: "" },
    mandatory: false,
    credit: [],
  };
  const [jsonObject, setJson] = useState<IEquipment[]>([{ ...jsonTemplate }]);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    document.addEventListener("keydown", handelUndo);

    function handelUndo(event: KeyboardEvent) {
      if (event.ctrlKey && event.key == "z") {
        restoreChanges();
      }
    }
    return () => {
      document.removeEventListener("keydown", handelUndo);
    };
  }, []);

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
        if (el.rent.description === "") {
          el.rent = { price: el.rent.price };
        }
      }
      if (el.sale?.price === "" || el.sale?.price === undefined) {
        const { sale, ...rest } = el;
        el = rest;
      } else {
        if (el.sale.description === "") {
          el.sale = { price: el.sale.price };
        }
      }
      if (el.mandatory === false) {
        const { mandatory, ...rest } = el;
        console.log(rest);
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

  function onPast() {
    saveChanges();
    navigator.clipboard
      .readText()
      .then((text) => {
        const json = jsonParse(text);
        setJson(json);
      })
      .catch((err) => {
        console.error("Ошибка при чтении из буфера обмена:", err);
      });
  }

  function handleFormChange(equips: IEquipment[]) {
    saveChanges();
    setJson([...equips]);
  }
  function onCopyJson() {
    saveChanges();
    const string = JSON.stringify(filterJson(jsonObject), null, 0);
    navigator.clipboard
      .writeText(string)
      .then(() => {
        console.log("JSON успешно скопирован в буфер обмена");
      })
      .catch((err) => {
        console.error("Не удалось скопировать JSON в буфер обмена: ", err);
      });
  }
  function handleAdd() {
    saveChanges();
    jsonTemplate.key =
      jsonObject.length > 0 ? jsonObject[jsonObject.length - 1].key + 1 : 0;
    const temp = [...jsonObject, jsonTemplate];
    setJson(temp);
  }
  function handelDel(key: number) {
    const temp = jsonObject.filter((item) => item.key !== key);
    setJson(temp);
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
      console.log("restored");
      setJson(changeStory[0]);
      changeStory.shift();
    }
  }
  return (
    <>
      <VStack height={"100vh"} width={"100%"} px={1}>
        <ButtonGroup ml={"auto"} size={"xs"} padding={"5px"}>
          <IconButton
            size={"xs"}
            variant={"outline"}
            aria-label={colorMode == "light" ? "light" : "dark"}
            onClick={restoreChanges}
            icon={<IoReturnUpBack />}
            isDisabled={changeStory.length < 1}
          />
          <Button onClick={onPast}>Распарсить скопированный JSON</Button>
          <Button
            onClick={() => {
              saveChanges();
              setJson([]);
            }}
          >
            Очистить JSON
          </Button>
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
          w={"70%"}
          overflowY={"auto"}
          gap={"50px"}
        >
          <Box flex={1}>
            <EquipmentForm
              equips={jsonObject}
              onChange={handleFormChange}
              onAdd={handleAdd}
              onDel={handelDel}
            ></EquipmentForm>
          </Box>
          <Box flex={1}>
            <CodeEditor json={filterJson(jsonObject)}></CodeEditor>
          </Box>
        </Flex>
        <Button
          colorScheme="green"
          variant={"outline"}
          onClick={onCopyJson}
          ml={"auto"}
          w={"100%"}
          mb={"30px"}
        >
          Скопировать JSON
        </Button>
        <Box bg={"orange"}></Box>
      </VStack>
    </>
  );
}

export default App;

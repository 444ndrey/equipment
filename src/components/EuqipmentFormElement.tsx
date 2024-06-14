import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Checkbox,
  Button,
  HStack,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
// import { useState } from "react";
import { IEquipment } from "../IEquipment";
import EquipmentCreditItem from "./EquipmentCreditItem";
import { IEquipmentCreditOption } from "../IEquipment";
import { useState } from "react";
import "./EquipmentFormElement.css";
import { FaArrowUp } from "react-icons/fa";

type EquipmentFormElementProps = {
  equipment: IEquipment;
  onChange: (equip: IEquipment) => void;
  onDel: () => void;
  onMoveUp: () => void;
  index: number;
};

export default function EquipmentFormElement({
  equipment,
  onChange,
  onDel,
  onMoveUp,
  index,
}: EquipmentFormElementProps) {
  // const [equipment, setEquipment] = useState<IEquipment>({ ...equip });
  const [isDanger, setIsDanger] = useState(false);
  const [isRemovingAnimation, setIsRemovingAnimation] = useState(false);
  const [isMovedAnimation, setIsMovedAnimation] = useState(false);
  function handleChange(name: string, value: string | undefined) {
    const updateValue = {
      ...equipment,
      [name]: value,
    };
    console.log(updateValue);
    // setEquipment(updateValue);
    onChange(updateValue);
  }
  function handleRentChange(value: string) {
    const updateValue = {
      ...equipment,
      rent: { price: value, comment: equipment.rent.comment },
    };
    //setEquipment(updateValue);
    onChange(updateValue);
  }
  function handleRentDescriptionChange(value: string) {
    const updateValue = {
      ...equipment,
      rent: { price: equipment.rent.price, comment: value },
    };
    //setEquipment(updateValue);
    onChange(updateValue);
  }
  function handelChangeSale(value: string) {
    const updateValue = {
      ...equipment,
      sale: { price: value, comment: equipment.sale.comment },
    };
    //setEquipment(updateValue);
    onChange(updateValue);
  }
  function handelChangeSaleDescription(value: string) {
    const updateValue = {
      ...equipment,
      sale: { price: equipment.sale.price, comment: value },
    };
    //setEquipment(updateValue);
    onChange(updateValue);
  }
  function handleMandatoryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updateValue = {
      ...equipment,
      mandatory: e.target.checked,
    };
    //setEquipment(updateValue);
    onChange(updateValue);
  }

  async function addRemoveAnimation() {
    setIsRemovingAnimation(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        setIsRemovingAnimation(false);
        resolve(null);
      }, 300);
    });
  }

  async function addMoveUpAnimation() {
    setIsMovedAnimation(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        setIsMovedAnimation(false);
        resolve(null);
      }, 300);
    });
  }

  function handleMoveUp() {
    addMoveUpAnimation().then(() => onMoveUp());
  }
  function handleDel() {
    addRemoveAnimation().then(() => onDel());
  }
  const equipmentTypes = [
    {
      label: equipment.type,
      value: equipment.type,
    },
    {
      label: "Роутер",
      value: "Роутер",
    },
    {
      label: "ТВ-приставка",
      value: "ТВ-приставка",
    },
    {
      label: "IPTV-приставка",
      value: "IPTV-приставка",
    },
    {
      label: "ONT-модем",
      value: "ONT-модем",
    },
    {
      label: "Mesh-система",
      value: "Mesh-система",
    },
    {
      label: "ADSL-модем",
      value: "ADSL-модем",
    },
    {
      label: "CAM-модуль",
      value: "CAM-модуль",
    },
  ];
  function handleAddCreditOption() {
    const credit = [...(equipment.credit || [])];
    credit.push({
      time: "",
      price: "",
      fp: "",
      key: credit.length > 0 ? credit[credit.length - 1].key + 1 : 0,
    });
    const updateValue = {
      ...equipment,
      credit: credit,
    };
    onChange(updateValue);
  }
  function handelChangeCredit(item: IEquipmentCreditOption) {
    const copyList = [...equipment.credit];
    const editableItem = equipment.credit.find((el) => item.key === el.key);
    if (editableItem) {
      editableItem.price = item.price;
      editableItem.time = item.time;
      editableItem.fp = item.fp;
      const updateValue = {
        ...equipment,
        credit: copyList,
      };
      onChange(updateValue);
    }
  }
  function handelDelCredit(key: number) {
    const creditList = [...equipment.credit].filter((item) => item.key !== key);
    const updateValue = {
      ...equipment,
      credit: creditList,
    };
    onChange(updateValue);
  }
  function getColor(key: number): string {
    const colors: string[] = [
      "#3a3b3c", // Дефолтный
      "#FFC8B4", // Красный
      "#AEEEEE", // Циан
      "#DFFFBF", // Жёлто-зелёный
      "#FFEC8B", // Золотой
      "#D8BFD8", // Фиолетовый
      "#FFDAB9", // Розовый
      "#98FB98", // Весенне-зелёный
      "#FFDAB9", // Оранжевый
      "#AFEEEE", // Турецкий
      "#FFD700", // Огненно-красный
      "#B0C4DE", // Королевский синий
      "#F5DEB3", // Тыквенный
      "#0000FF", // Синий
      "#800080", // Пурпурный
      "#008080", // Тёмно-зелёный
      "#DC143C", // Карминный
      "#FF1493", // Глициния
    ];
    return colors[key + 1] || colors[0];
  }

  return (
    <Box
      display={"flex"}
      className={`${
        isRemovingAnimation == true ? "animation-transition-out" : ""
      } ${isMovedAnimation == true ? "animation-moved-up" : ""} `}
    >
      <IconButton
        aria-label="up"
        variant={"link"}
        size={"sm"}
        icon={<FaArrowUp />}
        onClick={handleMoveUp}
        isDisabled={index === 0}
      ></IconButton>
      <Box
        flex={1}
        p={"7px"}
        boxShadow={
          isDanger == true
            ? "-1px -60px 107px -37px rgba(222,105,105,0.8) inset"
            : ""
        }
        transition={"ease-in-out .3s"}
        border={`1px solid ${getColor(equipment.key)}`}
        borderRadius={"5px"}
      >
        <FormControl variant="floating" gap={"40px"}>
          <FormLabel fontSize={"x-small"} size={"2xs"}>
            Тип оборудования
          </FormLabel>
          <CreatableSelect
            options={equipmentTypes}
            placeholder="Тип обордования"
            size={"sm"}
            formatCreateLabel={(val) => "Добавить " + val}
            defaultValue={equipmentTypes[0]}
            value={{ label: equipment.type, value: equipment.type }}
            selectedOptionStyle="check"
            onChange={(v) => handleChange("type", v?.value)}
          ></CreatableSelect>
        </FormControl>
        <FormLabel fontSize={"x-small"} size={"2xs"}>
          Название
        </FormLabel>
        <Input
          size={"xs"}
          placeholder="Название"
          value={equipment.name}
          onChange={(v) => handleChange("name", v.target.value)}
        ></Input>
        <HStack mt={"10px"}>
          <FormLabel htmlFor="mandatory" fontSize={"x-small"} size={"2xs"}>
            Обязательный:
          </FormLabel>
          <Checkbox
            onChange={handleMandatoryChange}
            id="mandatory"
            mb={"10px"}
            isChecked={equipment.mandatory}
          ></Checkbox>
        </HStack>
        <FormLabel fontSize={"x-small"} size={"2xs"}>
          Описание:
        </FormLabel>
        <Textarea
          size={"xs"}
          placeholder="Описание"
          value={equipment.description}
          onChange={(v) => handleChange("description", v.target.value)}
          resize={"none"}
          rows={3}
        ></Textarea>
        <FormLabel htmlFor="rent-price" size={"2xs"} fontSize={"x-small"}>
          Аренда:
        </FormLabel>
        <HStack>
          <InputGroup size={"xs"}>
            <InputLeftElement pointerEvents="none" color="gray.300">
              ₽
            </InputLeftElement>
            <Input
              id="rent-price"
              value={equipment.rent.price}
              placeholder="Стоимость аренды"
              onChange={(e) => handleRentChange(e.target.value)}
            />
          </InputGroup>
          <Textarea
            placeholder="Комментарий"
            value={equipment.rent.comment}
            resize={"none"}
            size={"xs"}
            onChange={(e) => handleRentDescriptionChange(e.target.value)}
            rows={2}
          ></Textarea>
        </HStack>
        <FormLabel size={"2xs"} fontSize={"x-small"}>
          Покупка:
        </FormLabel>
        <HStack>
          <InputGroup size={"xs"}>
            <InputLeftElement pointerEvents="none" color="gray.300">
              ₽
            </InputLeftElement>
            <Input
              value={equipment.sale.price}
              onChange={(e) => handelChangeSale(e.target.value)}
              placeholder="Стоимость выкупа"
            />
          </InputGroup>
          <Textarea
            placeholder="Комментарий"
            value={equipment.sale.comment}
            resize={"none"}
            size={"xs"}
            onChange={(e) => handelChangeSaleDescription(e.target.value)}
            rows={2}
          ></Textarea>
        </HStack>
        <FormLabel size={"2xs"} fontSize={"x-small"}>
          Рассрочка:
        </FormLabel>
        <div>
          {equipment.credit.map((el) => (
            <EquipmentCreditItem
              key={el.key}
              equipmentCreditItem={el}
              onChange={(item) => handelChangeCredit(item)}
              onDel={() => handelDelCredit(el.key)}
            ></EquipmentCreditItem>
          ))}
          <Button size={"xs"} mt="5px" onClick={handleAddCreditOption}>
            Добавить рассрочку
          </Button>
        </div>
        <Button
          colorScheme="red"
          size={"xs"}
          mt={"10px"}
          variant={"ghost"}
          onClick={handleDel}
          width={"100%"}
          onMouseEnter={() => setIsDanger(true)}
          onMouseLeave={() => setIsDanger(false)}
        >
          Удалить
        </Button>
      </Box>
    </Box>
  );
}

/* <EquipmentCreditList
          onChange={handelChangeCredit}
          equipmentCredit={
            equipment.credit?.map((item, index) => ({ ...item, key: index })) ||
            []
          }
        ></EquipmentCreditList> */

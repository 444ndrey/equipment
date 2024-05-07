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
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
// import { useState } from "react";
import { IEquipment } from "../IEquipment";
import EquipmentCreditItem from "./EquipmentCreditItem";
import { IEquipmentCreditOption } from "../IEquipment";

type EquipmentFormElementProps = {
  equipment: IEquipment;
  onChange: (equip: IEquipment) => void;
  onDel: () => void;
};

export default function EquipmentFormElement({
  equipment,
  onChange,
  onDel,
}: EquipmentFormElementProps) {
  // const [equipment, setEquipment] = useState<IEquipment>({ ...equip });
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
      rent: { price: value, description: equipment.rent.description },
    };
    //setEquipment(updateValue);
    onChange(updateValue);
  }
  function handleRentDescriptionChange(value: string) {
    const updateValue = {
      ...equipment,
      rent: { price: equipment.rent.price, description: value },
    };
    //setEquipment(updateValue);
    onChange(updateValue);
  }
  function handelChangeSale(value: string) {
    const updateValue = {
      ...equipment,
      sale: { price: value, description: equipment.rent.description },
    };
    //setEquipment(updateValue);
    onChange(updateValue);
  }
  function handelChangeSaleDescription(value: string) {
    const updateValue = {
      ...equipment,
      sale: { price: equipment.sale.price, description: value },
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
  const equipmentTypes = [
    {
      label: equipment.type,
      value: equipment.type,
      variant: "solid",
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

  // function onNumberChange(e: ChangeEvent<HTMLInputElement>) {
  //   const re = /^[0-9\b]+$/;
  //   if (e.target.value === "" || re.test(e.target.value)) {
  //     console.log(e.target.value);
  //     setEquipment({ ...equipment, rent: { price: e.target.value } });
  //   }
  // }
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
    //setEquipment(updateValue);
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
      //setEquipment(updateValue);
      onChange(updateValue);
    }
  }
  function handelDelCredit(key: number) {
    const creditList = [...equipment.credit].filter((item) => item.key !== key);
    const updateValue = {
      ...equipment,
      credit: creditList,
    };
    //setEquipment(updateValue);
    onChange(updateValue);
  }

  return (
    <>
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
          selectedOptionStyle="check"
          onChange={(v) => handleChange("type", v?.value)}
        ></CreatableSelect>
      </FormControl>
      <FormLabel fontSize={"x-small"} size={"2xs"}>
        Название
      </FormLabel>
      <Input
        size={"sm"}
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
        ></Checkbox>
      </HStack>
      <FormLabel fontSize={"x-small"} size={"2xs"}>
        Описание:
      </FormLabel>
      <Textarea
        size={"sm"}
        placeholder="Описание"
        value={equipment.description}
        onChange={(v) => handleChange("description", v.target.value)}
        resize={"none"}
      ></Textarea>
      <FormLabel htmlFor="rent-price" size={"2xs"} fontSize={"x-small"}>
        Аренда:
      </FormLabel>
      <HStack>
        <InputGroup size={"sm"}>
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
          resize={"none"}
          size={"xs"}
          onChange={(e) => handleRentDescriptionChange(e.target.value)}
        ></Textarea>
      </HStack>
      <FormLabel size={"2xs"} fontSize={"x-small"}>
        Покупка:
      </FormLabel>
      <HStack>
        <InputGroup size={"sm"}>
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
          resize={"none"}
          size={"xs"}
          onChange={(e) => handelChangeSaleDescription(e.target.value)}
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
        onClick={onDel}
      >
        Удалить
      </Button>
    </>
  );
}

/* <EquipmentCreditList
          onChange={handelChangeCredit}
          equipmentCredit={
            equipment.credit?.map((item, index) => ({ ...item, key: index })) ||
            []
          }
        ></EquipmentCreditList> */

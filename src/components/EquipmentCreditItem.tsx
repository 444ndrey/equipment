import {
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { IEquipmentCreditOption } from "../IEquipment";

type EquipmentCreditItemProps = {
  equipmentCreditItem: IEquipmentCreditOption;
  onDel: () => void;
  onChange: (val: IEquipmentCreditOption) => void;
};

export default function EquipmentCreditItem({
  equipmentCreditItem,
  onDel,
  onChange,
}: EquipmentCreditItemProps) {
  const [item, setItem] = useState(equipmentCreditItem);

  function handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedItem: IEquipmentCreditOption = {
      ...item,
      price: e.target.value,
    };
    setItem(updatedItem);
    onChange(updatedItem);
  }
  function handleChangeTime(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedItem = {
      ...item,
      time: e.target.value,
    };
    setItem(updatedItem);
    onChange(updatedItem);
  }
  function handleChangeFP(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedItem = {
      ...item,
      fp: e.target.value,
    };
    setItem(updatedItem);
    onChange(updatedItem);
  }
  return (
    <>
      <Flex flexDirection={"column"} ml={3} mb={"10px"}>
        <HStack>
          <InputGroup size="xs">
            <Input
              placeholder="Цена"
              value={item.price}
              onChange={handleChangePrice}
            ></Input>
            <InputRightAddon> руб</InputRightAddon>
          </InputGroup>
          <p>на</p>
          <InputGroup size="xs">
            <Input
              placeholder="Месяцев"
              value={item.time}
              onChange={handleChangeTime}
            ></Input>
            <InputRightAddon> мес</InputRightAddon>
          </InputGroup>
          <InputGroup size="xs">
            <Input
              placeholder="Единоразовый платеж"
              value={item.fp}
              onChange={handleChangeFP}
            ></Input>
            <InputRightAddon> единоразово</InputRightAddon>
          </InputGroup>
          <IconButton
            aria-label="удл"
            variant={""}
            size={"xs"}
            icon={<CloseIcon />}
            onClick={onDel}
          ></IconButton>
        </HStack>
      </Flex>
    </>
  );
}

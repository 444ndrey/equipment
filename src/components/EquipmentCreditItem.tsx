import {
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";
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
  function handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedItem: IEquipmentCreditOption = {
      ...equipmentCreditItem,
      price: e.target.value,
    };
    onChange(updatedItem);
  }
  function handleChangeTime(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedItem = {
      ...equipmentCreditItem,
      time: e.target.value,
    };
    onChange(updatedItem);
  }
  function handleChangeFP(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedItem = {
      ...equipmentCreditItem,
      fp: e.target.value,
    };
    onChange(updatedItem);
  }
  return (
    <>
      <Flex flexDirection={"column"} ml={3} mb={"10px"}>
        <HStack>
          <InputGroup size="xs">
            <Input
              placeholder="Цена"
              value={equipmentCreditItem.price}
              onChange={handleChangePrice}
            ></Input>
            <InputRightAddon> руб</InputRightAddon>
          </InputGroup>
          <p>на</p>
          <InputGroup size="xs">
            <Input
              placeholder="Месяцев"
              value={equipmentCreditItem.time}
              onChange={handleChangeTime}
            ></Input>
            <InputRightAddon> мес</InputRightAddon>
          </InputGroup>
          <InputGroup size="xs">
            <Input
              placeholder="Единоразовый платеж"
              value={equipmentCreditItem.fp}
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

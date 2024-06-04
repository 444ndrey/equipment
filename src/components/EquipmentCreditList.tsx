import { Flex } from "@chakra-ui/react";

import EquipmentCreditItem from "./EquipmentCreditItem";

type equipmentCreditElement = {
  price: string;
  time: string;
  key: number;
  fp: string;
};
type EquipmentCreditListProps = {
  equipmentCredit: equipmentCreditElement[] | [];
  onChange: (item: equipmentCreditElement[]) => void;
};

export default function EquipmentCreditList({
  equipmentCredit,
  onChange,
}: EquipmentCreditListProps) {
  function handleChange(item: equipmentCreditElement) {
    const list = [...equipmentCredit];
    let editableItem = list.find((el) => el.key === item.key);

    if (editableItem) {
      editableItem = item;
      onChange(list);
    }
  }
  function handleDel(key: number) {
    const list = [...equipmentCredit].filter((el) => el.key != key);
    onChange(list);
  }

  return (
    <>
      <Flex flexDirection={"column"} ml={"10px"}>
        {equipmentCredit.map((item) => (
          <EquipmentCreditItem
            key={item.key}
            onDel={() => handleDel(item.key)}
            equipmentCreditItem={item}
            onChange={(val) => handleChange(val)}
          ></EquipmentCreditItem>
        ))}
      </Flex>
    </>
  );
}

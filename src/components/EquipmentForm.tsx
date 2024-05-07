import { Button, Stack, StackDivider } from "@chakra-ui/react";
import { IEquipment } from "../IEquipment";
import EquipmentFormElement from "./EuqipmentFormElement";

type EquipmentFormProps = {
  equips: IEquipment[];
  onChange: (equip: IEquipment[]) => void;
  onAdd: () => void;
  onDel: (key: number) => void;
};

export default function EquipmentForm({
  equips,
  onChange,
  onAdd,
  onDel,
}: EquipmentFormProps) {
  function handleChange(eq: IEquipment, key: number) {
    const updatedList = equips.map((item) => {
      if (item.key === key) {
        return { ...eq };
      }
      return item;
    });
    onChange(updatedList);
  }

  return (
    <>
      <Stack divider={<StackDivider borderColor="gray.700" />}>
        {equips.map((eq) => (
          <EquipmentFormElement
            onChange={(eq) => handleChange(eq, eq.key)}
            key={eq.key}
            equip={eq}
            onDel={() => onDel(eq.key)}
          />
        ))}
      </Stack>
      <Button
        w={"100%"}
        mt={"20px"}
        size={"sm"}
        colorScheme="blue"
        onClick={onAdd}
      >
        Добавить
      </Button>
    </>
  );
}

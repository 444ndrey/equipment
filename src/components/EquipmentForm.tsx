import { Box, Button, Stack } from "@chakra-ui/react";
import { IEquipment } from "../IEquipment";
import EquipmentFormElement from "./EuqipmentFormElement";

type EquipmentFormProps = {
  equips: IEquipment[];
  onChange: (equip: IEquipment[]) => void;
  onAdd: () => void;
  onDel: (key: number) => void;
  onMoveUp: (index: number) => void;
};

export default function EquipmentForm({
  equips,
  onChange,
  onAdd,
  onDel,
  onMoveUp,
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
      <Stack gap={"15px"}>
        {equips.map((eq, index) => (
          <Box key={eq.key}>
            <EquipmentFormElement
              onChange={(eq) => handleChange(eq, eq.key)}
              equipment={eq}
              onDel={() => onDel(eq.key)}
              onMoveUp={() => onMoveUp(index)}
              index={index}
            />
          </Box>
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

import { IEquipment, IEquipmentJson } from "./IEquipment";

export default function jsonParse(json: string): IEquipment[] {
  try {
    const object: [] = JSON.parse(json);
    if (!Array.isArray(object)) {
      throw new Error();
    }
    const equipments: IEquipment[] = object.map((el: IEquipmentJson, index) => {
      return {
        key: index,
        type: el.type || "",
        name: el.name || "",
        description: el.description || "",
        mandatory: el.mandatory == "1" ? true : false,
        rent: {
          price: el.rent?.price || "",
          description: el.rent?.description || "",
        },
        sale: {
          price: el.sale?.price || "",
          description: el.sale?.description || "",
        },
        credit:
          el.credit?.map((cr, index) => ({
            price: cr.price || "",
            time: cr.time || "",
            fp: cr.fp || "",
            key: index,
          })) || [],
      };
    });
    return equipments;
  } catch (error) {
    throw new Error("Не удалось распарсить строку, неверный json формат");
  }
}

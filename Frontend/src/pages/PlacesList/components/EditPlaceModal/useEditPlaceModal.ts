import { useEffect, useState } from "react";
import { Place } from "../../../../hooks/usePlaceAPI";

const useEditPlaceModal = (
  onClose: () => void,
  onPlaceSave: (user: Place) => void,
  isOpen: boolean,
  placeData: Place | null,
) => {
  const initialState = [
    {
      label: "Descrição",
      placeholder: "Nome do local",
      type: "text",
      initialValueKey: "description",
      value: "",
    },
    {
      label: "Nível de Acesso",
      placeholder: "Nível de Acesso",
      type: "number",
      initialValueKey: "acessLevel",
      value: "1",
      max: 5,
      min: 1,
    },
  ];

  const [fields, setFields] = useState(initialState);

  useEffect(() => {
    setFields([
      {
        ...fields[0],
        value: placeData?.description || "",
      },
      {
        ...fields[1],
        value: placeData?.acessLevel || "",
      },
    ]);
  }, [isOpen]);

  const handleChange = (key: string, value: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.initialValueKey === key ? { ...field, value } : field,
      ),
    );
  };

  const handleSave = () => {
    const newPlace: Place = {
      id: placeData?.id || "",
      description: fields[0].value,
      acessLevel: fields[1].value,
    };
    onPlaceSave(newPlace);
    setFields(initialState);
    onClose();
  };

  return {
    fields,
    handleChange,
    handleSave,
  };
};

export default useEditPlaceModal;

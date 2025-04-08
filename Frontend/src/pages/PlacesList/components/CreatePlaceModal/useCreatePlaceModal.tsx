import { useEffect, useState } from "react";
import { PlaceNoId } from "../../../hooks/usePlaceAPI";

const useCreatePlaceModal = (
  onClose: () => void,
  onCreatePlace: (user: PlaceNoId) => void,
  isOpen: boolean,
) => {
  const initialState = [
    {
      label: "Descrição",
      placeholder: "Nome do local",
      type: "text",
      initialValueKey: "name",
      value: "",
    },
    {
      label: "Nível de Acesso",
      placeholder: "Nível de Acesso",
      type: "number",
      initialValueKey: "level",
      value: "1",
      max: 5,
      min: 1,
    },
  ];

  const [fields, setFields] = useState(initialState);

  useEffect(() => {
    setFields(initialState);
  }, [isOpen]);

  const handleChange = (key: string, value: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.initialValueKey === key ? { ...field, value } : field,
      ),
    );
  };

  const handleSave = () => {
    const newPlace: PlaceNoId = {
      description: fields[0].value,
      acessLevel: fields[1].value,
    };
    onCreatePlace(newPlace);
    setFields(initialState);
    onClose();
  };

  return {
    fields,
    handleChange,
    handleSave,
  };
};

export default useCreatePlaceModal;

import { FiTrash2 } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { Place } from "../../../hooks/usePlaceAPI";

export interface PlacesTableProps {
  data: Place[];
  onEdit: (place: Place) => void;
  onDelete: (id: string) => void;
}

const PlacesTable: React.FC<PlacesTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <div className="sticky top-0 text-center flex justify-between items-center py-2 px-10 bg-gray-100 border-y border-gray-200">
        <h1 className="text-left font-normal text-lg w-full text-gray-500">
          NOME
        </h1>
        <h1 className="font-normal text-lg w-full text-gray-500">
          NÍVEL DE ACESSO
        </h1>
        <span className="flex">
          <MdOutlineModeEdit className="text-transparent text-2xl mx-2" />
          <FiTrash2 className="text-transparent text-2xl mx-2" />
        </span>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className="text-center pt-6 pb-14 flex justify-between items-center py-2 px-10 border-b border-gray-200"
        >
          <h1 className="text-left font-normal text-md w-full text-gray-500">
            {item.description}
          </h1>
          <h1 className="font-normal text-md w-full text-gray-500">
            {item.acessLevel}
          </h1>
          <span className="flex">
            <MdOutlineModeEdit
              onClick={() => onEdit(item)}
              className="text-primary text-2xl mx-2 hover:cursor-pointer"
            />
            <FiTrash2
              onClick={() => onDelete(item.id)}
              className="text-red-500 text-2xl mx-2 hover:cursor-pointer"
            />
          </span>
        </div>
      ))}
    </>
  );
};

export default PlacesTable;

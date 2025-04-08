export interface PlaceListHeaderProps {
  onCreatePlace: (value: boolean) => void;
}
const PlaceListHeader: React.FC<PlaceListHeaderProps> = ({ onCreatePlace }) => {
  return (
    <div className="flex justify-between items-center my-7 mx-10">
      <h1 className="font-semibold text-2xl ">Locais</h1>
      <div className="flex gap-4">
        <button
          onClick={() => onCreatePlace(true)}
          className="btn btn-sm btn-primary text-white rounded-full "
        >
          Adicionar Local
        </button>
      </div>
    </div>
  );
};

export default PlaceListHeader;

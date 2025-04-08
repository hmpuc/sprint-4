import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { Scanner } from "@yudiel/react-qr-scanner";
import usePlaceAPI, { Place } from "../../hooks/usePlaceAPI";
import { User } from "../UserList/UserList";
import defaultUserImage from "../../assets/defaultUser.jpeg";
import useUserAPI from "../../hooks/useUserAPI";

type AcessStatus = "Acesso Permitido" | "Acesso Negado" | "Análise";

const AllowAcess = () => {
  const { getPlaces } = usePlaceAPI();
  const { getUserById } = useUserAPI();

  const acessColors = {
    "Acesso Permitido": "bg-green-400 ",
    "Acesso Negado": "bg-red-400",
    Análise: "bg-gray-300",
  };

  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [acessStatus, setAcessStatus] = useState<AcessStatus>("Análise");
  const [user, setUser] = useState<User | null>(null);
  const [scanID, setScanID] = useState("1");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlaces();
      setPlaces(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPlace) {
      setUser(null);
      setAcessStatus("Análise");
      setScanID("");
    }
  }, [selectedPlace]);

  useEffect(() => {
    const fetchData = async () => {
      if (scanID) {
        const data = await getUserById(scanID);
        setUser(data);
        if (data && selectedPlace) {
          if (data.level >= selectedPlace?.acessLevel) {
            setAcessStatus("Acesso Permitido");
          } else {
            setAcessStatus("Acesso Negado");
          }
        } else {
          setAcessStatus("Acesso Negado");
        }
      }
    };
    fetchData();
  }, [scanID]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = places.find(
      (place) => place.description === e.target.value,
    );
    setSelectedPlace(selected || null);
  };

  console.log(selectedPlace);
  return (
    <PageWrapper>
      <div className="flex justify-between items-center my-7 mx-10">
        <h1 className="font-semibold text-2xl ">
          Validar Acesso | {"Nível " + (selectedPlace?.acessLevel || "")}
        </h1>
        <div className="flex gap-4">
          <select
            onChange={handleSelectChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Selecionar Local
            </option>
            {places.map((place) => (
              <option key={place.id}>{place.description}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full">
        <div className="w-fit mx-10 mt-8 flex flex-row h-full gap-8">
          <div className="flex flex-col text-center w-fit gap-8">
            <div className="w-full h-full max-w-96 max-h-96 rounded-2xl overflow-hidden">
              <Scanner
                formats={["qr_code"]}
                scanDelay={500}
                allowMultiple
                onScan={(result) => setScanID(result[0].rawValue)}
              />
            </div>
            <h1
              className={
                ` p-2 rounded-lg font-bold text-2xl
              text-white ` + acessColors[acessStatus]
              }
            >
              {acessStatus}
            </h1>
          </div>
          <div className="rounded-full border-2 border-gray-100 h-4/5" />
          <div className="flex flex-col items-center gap-4">
            <img
              className="w-full h-full max-w-80 max-h-80 rounded-3xl"
              src={user?.profile_img ? user?.profile_img : defaultUserImage}
              alt="Default User"
            />
            <h4 className="text-3xl">
              <span className="font-bold">Nome:</span>{" "}
              {user?.name || "xxxxxxxxxxxx"}
            </h4>
            <h4 className="text-xl">
              <span className="font-bold">Email:</span>{" "}
              {user?.email || "xxxxxxxxxxxx"}
            </h4>
            <h4 className="text-xl">
              <span className="font-bold">Nível:</span>{" "}
              {user?.level || "xxxxxxxxxxxx"}
            </h4>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AllowAcess;

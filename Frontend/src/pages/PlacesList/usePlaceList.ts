import { useEffect, useState } from "react";
import usePlaceAPI, { Place, PlaceNoId } from "../../hooks/usePlaceAPI";

const usePlaceList = () => {
  const { createPlace, getPlaces, deletePlace, editPlace } = usePlaceAPI();

  const [isCreatePlaceModalOpen, setIsCreatePlaceModalOpen] = useState(false);
  const [placesData, setPlacesData] = useState<Place[] | null>(null);
  const [editPlaceData, setEditPlaceData] = useState<Place | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlaces();
      setPlacesData(data);
    };

    fetchData();
  }, []);

  const handleCreateClick = () => {
    setIsCreatePlaceModalOpen(true);
  };

  const handleCreatePlace = async (user: PlaceNoId) => {
    await createPlace(user);
    setIsCreatePlaceModalOpen(false);
    const data = await getPlaces();
    setPlacesData(data);
  };

  const handleDeletePlace = async (id: string) => {
    await deletePlace(id);
    const data = await getPlaces();
    setPlacesData(data);
  };

  const handleEditPlace = async (place: Place) => {
    await editPlace(place);
    setEditPlaceData(null);
    const data = await getPlaces();
    setPlacesData(data);
  };

  const handleEditClick = (place: Place) => {
    setEditPlaceData(place);
  };

  const handleCloseEditModal = () => {
    setEditPlaceData(null);
  };

  const handleCloseCreateModal = () => {
    setIsCreatePlaceModalOpen(false);
  };

  return {
    isCreatePlaceModalOpen,
    placesData,
    editPlaceData,
    handleCreateClick,
    handleCreatePlace,
    handleDeletePlace,
    handleEditPlace,
    setIsCreatePlaceModalOpen,
    setEditPlaceData,
    handleEditClick,
    handleCloseEditModal,
    handleCloseCreateModal,
  };
};

export default usePlaceList;

import PageWrapper from "../../components/PageWrapper";
import PlaceListHeader from "./components/PlaceListHeader";
import PlacesTable from "./components/PlacesTable";
import CreatePlaceModal from "./components/CreatePlaceModal/CreatePlaceModal";
import EditPlaceModal from "./components/EditPlaceModal/EditPlaceModal";
import usePlaceList from "./usePlaceList";


/**
 * Page to list all the places in the application.
 * it includes all the components to create, 
 * edit and delete places.
 */
const PlaceList = () => {
  const {
    isCreatePlaceModalOpen,
    placesData,
    editPlaceData,
    handleCreateClick,
    handleCreatePlace,
    handleDeletePlace,
    handleEditPlace,
    handleEditClick,
    handleCloseEditModal,
    handleCloseCreateModal,
  } = usePlaceList();
  return (
    <PageWrapper>
      <PlaceListHeader onCreatePlace={handleCreateClick} />
      <PlacesTable
        data={placesData || []}
        onDelete={handleDeletePlace}
        onEdit={handleEditClick}
      />
      <CreatePlaceModal
        isOpen={isCreatePlaceModalOpen}
        onClose={handleCloseCreateModal}
        onCreatePlace={handleCreatePlace}
      />
      <EditPlaceModal
        onClose={handleCloseEditModal}
        placeData={editPlaceData}
        onPlaceSave={handleEditPlace}
      />
    </PageWrapper>
  );
};

export default PlaceList;

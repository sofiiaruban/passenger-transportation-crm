import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import UpdateOrAddButton from "./UpdateOrAddButton";
import DeleteButton from "./DeleteButton";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import CloseButton from "react-bootstrap/CloseButton";
const TripCard = ({ editMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    plateNumber: "",
    passengerVolume: "",
  });
  const setTripFormData = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addTripDataToFirestore = async (e) => {
    try {
      e.preventDefault();
      if (!editMode) {
        const docRef = await addDoc(collection(db, "trips"), formData);
      }
      if (editMode) {
        const docRef = doc(db, "trips", id);
        await setDoc(docRef, formData);
      }
      navigate("/userprofile");
    } catch (error) {
      console.error("Error handling submit: ", error);
    }
  };
  const deleteTripDataFromFirestore = async () => {
    try {
      const docRef = doc(db, "trips", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
    navigate("/userprofile");
  };

  const getTripDataFirestore = async () => {
    try {
      const docRef = doc(db, "trips", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        console.error("No such document exists.");
      }
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  };
  useEffect(() => {
    if (editMode) {
      getTripDataFirestore();
    }
  }, []);
  return (
    <Card style={{ width: "30rem" }} className="shadow mx-auto mt-5 p-3">
      <Stack direction="horizontal" className="d-flex flex-row-reverse">
        <CloseButton onClick={() => navigate("/userprofile")} />
      </Stack>
      <Form onSubmit={addTripDataToFirestore}>
        <Form.Group className="mb-3 p-2">
          <Form.Label className="fw-bold">From:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter from"
            name="from"
            value={formData.from || ""}
            onChange={setTripFormData}
          />
        </Form.Group>
        <Form.Group className="mb-3 p-2">
          <Form.Label className="fw-bold">To:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter to"
            name="to"
            value={formData.to || ""}
            onChange={setTripFormData}
          />
        </Form.Group>
        <Form.Group className="mb-3 p-2">
          <Form.Label className="fw-bold">Plate number:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter plate number"
            name="plateNumber"
            value={formData.plateNumber || ""}
            onChange={setTripFormData}
          />
        </Form.Group>
        <Form.Group className="mb-3 p-2">
          <Form.Label className="fw-bold">Passenger volume:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter passenger volume"
            name="passengerVolume"
            value={formData.passengerVolume || ""}
            onChange={setTripFormData}
          />
        </Form.Group>
        <Stack direction="horizontal">
          <UpdateOrAddButton editMode={editMode} />
          {editMode && (
            <DeleteButton clickHandler={deleteTripDataFromFirestore} />
          )}
        </Stack>
      </Form>
    </Card>
  );
};
export default TripCard;

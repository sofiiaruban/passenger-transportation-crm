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
    <Form onSubmit={addTripDataToFirestore}>
      <Form.Group className="mb-3 p-2" controlId="formBasicFrom">
        <Form.Label>From:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter from"
          name="from"
          value={formData.from || ""}
          onChange={setTripFormData}
        />
      </Form.Group>
      <Form.Group className="mb-3 p-2" controlId="formBasicSurname">
        <Form.Label>To:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter to"
          name="to"
          value={formData.to || ""}
          onChange={setTripFormData}
        />
      </Form.Group>
      <Form.Group className="mb-3 p-2" controlId="formBasicPlateNum">
        <Form.Label>Plate number:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter plate number"
          name="plateNumber"
          value={formData.plateNumber || ""}
          onChange={setTripFormData}
        />
      </Form.Group>
      <Form.Group className="mb-3 p-2" controlId="formBasicPassengerVolume">
        <Form.Label>Passenger volume:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter passenger volume"
          name="passengerVolume"
          value={formData.passengerVolume || ""}
          onChange={setTripFormData}
        />
      </Form.Group>
      <UpdateOrAddButton editMode={editMode} />
      <DeleteButton clickHandler={deleteTripDataFromFirestore} />
    </Form>
  );
};
export default TripCard;

import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
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

const UserCard = ({ editMode }) => {
  const roles = ["Driver", "Passenger", "Manager"];
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    role: "",
  });

  const setUserFormData = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addUserDataToFirestore = async (e) => {
    try {
      e.preventDefault();
      if (!editMode) {
        const docRef = await addDoc(collection(db, "users"), formData);
      }
      if (editMode) {
        const docRef = doc(db, "users", id);
        await setDoc(docRef, formData);
      }
      navigate("/userprofile");
    } catch (error) {
      console.error("Error handling submit: ", error);
    }
  };

  const deleteUserDataFromFirestore = async () => {
    try {
      const docRef = doc(db, "users", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
    navigate("/userprofile");
  };

  const getUserDataFirestore = async () => {
    try {
      const docRef = doc(db, "users", id);
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
      getUserDataFirestore();
    }
  }, []);

  return (
    <Card style={{ width: "40rem" }}>
      <Form onSubmit={addUserDataToFirestore}>
        <Form.Group className="mb-3 p-2" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            value={formData.name || ""}
            onChange={setUserFormData}
          />
        </Form.Group>
        <Form.Group className="mb-3 p-2" controlId="formBasicSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            placeholder="Enter surname"
            value={formData.surname || ""}
            onChange={setUserFormData}
          />
        </Form.Group>

        <Col className="p-1">
          <Form.Label>Choose role:</Form.Label>
          {roles.map((role) => (
            <Form.Check
              type="radio"
              name="role"
              key={role}
              value={role}
              label={role}
              checked={formData.role == role}
              onChange={setUserFormData}
            />
          ))}
          <UpdateOrAddButton editMode={editMode} />
          <DeleteButton clickHandler={deleteUserDataFromFirestore} />
        </Col>
      </Form>
    </Card>
  );
};
export default UserCard;

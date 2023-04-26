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
import Stack from "react-bootstrap/Stack";
import CloseButton from "react-bootstrap/CloseButton";

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
    <Card style={{ width: "30rem" }} className=" shadow mx-auto mt-5 p-3">
      <Stack direction="horizontal" className="d-flex flex-row-reverse">
        <CloseButton onClick={() => navigate("/userprofile")} />
      </Stack>
      <Form onSubmit={addUserDataToFirestore}>
        <Form.Group className="mb-3  p-2 pt-0">
          <Form.Label className="fw-bold">Name:</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            value={formData.name || ""}
            onChange={setUserFormData}
          />
        </Form.Group>
        <Form.Group className="mb-3 p-2">
          <Form.Label className="fw-bold">Surname:</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            placeholder="Enter surname"
            value={formData.surname || ""}
            onChange={setUserFormData}
          />
        </Form.Group>

        <Col className="p-1">
          <Form.Label className="fw-bold">Choose role:</Form.Label>
          {roles.map((role) => (
            <Form.Check
              className="m-1"
              type="radio"
              name="role"
              key={role}
              value={role}
              label={role}
              checked={formData.role == role}
              onChange={setUserFormData}
            />
          ))}
          <Stack direction="horizontal">
            <UpdateOrAddButton editMode={editMode} />
            {editMode && (
              <DeleteButton clickHandler={deleteUserDataFromFirestore} />
            )}
          </Stack>
        </Col>
      </Form>
    </Card>
  );
};
export default UserCard;

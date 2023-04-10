import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
//import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const UserCard = ({ editMode }) => {
  //const [name, setName] = useState("");
  //const [surname, setSurname] = useState("");
  //const [role, setRole] = useState("");
  const roles = ["Driver", "Passenger", "Manager"];
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    role: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
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

  const getData = async () => {
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
      getData();
    }
  }, []);

  return (
    <Card style={{ width: "40rem" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 p-2" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 p-2" controlId="formBasicSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            placeholder="Enter surname"
            value={formData.surname || ""}
            onChange={handleChange}
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
              onChange={handleChange}
            />
          ))}
          <Button variant="primary" type="submit" className="mb-3 mt-3">
            {editMode ? "Update" : "Add user"}
          </Button>
          <Button variant="primary" className="mb-3 p-2" onClick={() => {}}>
            Delete
          </Button>
        </Col>
      </Form>
    </Card>
  );
};
export default UserCard;

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Stack from "react-bootstrap/Stack";

const FormComponent = ({ num }) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handlerSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/userprofile");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <Form onSubmit={handlerSubmit} className="mx-auto p-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email {num}</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Form.Text className="text-muted">Wrong email or passwords</Form.Text>
        )}
      </Form.Group>
      <Stack direction="horizontal" className="d-flex flex-row-reverse">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </Form>
  );
};
export default FormComponent;

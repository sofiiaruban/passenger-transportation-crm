import Form from "react-bootstrap/Form";
import { Button, Card } from "react-bootstrap";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const FormComponent = ({ num }) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("ok");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <Form onSubmit={handlerSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address {num}</Form.Label>
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
          <Form.Text className="text-muted">Wrong email or password.</Form.Text>
        )}
      </Form.Group>
      <Button variant="primary" type="submit" className="mb-3">
        Submit
      </Button>
    </Form>
  );
};
export default FormComponent;

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const FormComponent = ({ num }) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  const handlerFormSubmit = (e) => {
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
  const handlerClick = () => {};
  return (
    <Form onSubmit={handlerFormSubmit} className="mx-auto p-3">
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
          <Form.Text className="text-danger pt-3">
            Wrong email or passwords
          </Form.Text>
        )}
      </Form.Group>
      <Button variant="primary" type="submit" style={{ width: "100%" }}>
        Submit
      </Button>
      <p className="text-center py-2 mb-0">OR</p>
      <Button
        variant="success"
        onClick={handlerClick}
        style={{ width: "100%" }}
      >
        Log in with google
      </Button>
    </Form>
  );
};
export default FormComponent;

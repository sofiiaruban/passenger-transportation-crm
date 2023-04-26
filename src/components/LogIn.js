import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
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

  const handlerClick = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        const userRef = collection(db, "users");
        const result = getDocs(query(userRef, where("uid", "==", user.uid)));
        if (result.empty) {
          addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
          });
        }
        dispatch({ type: "LOGIN", payload: user });
        navigate("/userprofile");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Form onSubmit={handlerFormSubmit} className="mx-auto p-3">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
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
          placeholder="Enter password"
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

      <p className="text-center py-2 mb-0">Or</p>

      <Button
        variant="success"
        onClick={handlerClick}
        style={{ width: "100%" }}
      >
        Log In With Google
      </Button>
    </Form>
  );
};

export default LogIn;

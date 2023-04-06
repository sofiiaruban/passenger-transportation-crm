import "./App.css";
import { Button, Card } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FormComponent from "./components/FormComponent";

const App = () => {
  return (
    <Card style={{ width: "40rem" }}>
      <Tabs
        defaultActiveKey="logIn"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="logIn" title="Log In">
          <FormComponent num="1" />
        </Tab>
        <Tab eventKey="singIn" title="Sing In">
          <FormComponent num="2" />
        </Tab>
      </Tabs>
    </Card>
  );
};

export default App;

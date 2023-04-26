import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LogIn from "./LogIn";
import Card from "react-bootstrap/Card";
import SingIn from "./SingIn";

const CardComponent = () => {
  return (
    <Card style={{ width: "30rem" }} className="shadow">
      <Tabs
        defaultActiveKey="logIn"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="logIn" title="Log In">
          <LogIn />
        </Tab>
        <Tab eventKey="singIn" title="Sing In">
          <SingIn />
        </Tab>
      </Tabs>
    </Card>
  );
};
export default CardComponent;

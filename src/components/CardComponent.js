import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FormComponent from "./FormComponent";
import Card from "react-bootstrap/Card";

const CardComponent = () => {
  return (
    <Card
      style={{ width: "30rem" }}
      className="d-flex justify-content-center mx-auto mb-auto mt-auto"
    >
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
export default CardComponent;

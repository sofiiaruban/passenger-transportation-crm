import Button from "react-bootstrap/Button";

const DeleteButton = ({ clickHandler }) => {
  return (
    <Button variant="primary" className="mb-3 mt-3" onClick={clickHandler}>
      Delete
    </Button>
  );
};
export default DeleteButton;

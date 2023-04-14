import Button from "react-bootstrap/Button";

const DeleteButton = ({ clickHandler }) => {
  return (
    <Button variant="primary" className="mt-2 px-3" onClick={clickHandler}>
      Delete
    </Button>
  );
};
export default DeleteButton;

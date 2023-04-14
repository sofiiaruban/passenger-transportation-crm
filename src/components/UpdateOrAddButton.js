import Button from "react-bootstrap/Button";

const UpdateOrAddButton = ({ editMode }) => {
  return (
    <Button variant="primary" type="submit" className="mt-2 ms-auto me-3  px-3">
      {editMode ? "Update" : "Add new"}
    </Button>
  );
};
export default UpdateOrAddButton;

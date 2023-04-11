import Button from "react-bootstrap/Button";

const UpdateOrAddButton = ({ editMode }) => {
  return (
    <Button variant="primary" type="submit" className="mb-3 mt-3">
      {editMode ? "Update" : "Add new"}
    </Button>
  );
};
export default UpdateOrAddButton;

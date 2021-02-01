import React from "react"
import useInputState from "../hooks/useInputState";
// import TextField from "@material-ui/core/TextField";
// import { DispatchContext } from "../contexts/activities.context";

function EditActivityForm({ id, task, toggleEditForm }) {
  // const dispatch = useContext(DispatchContext);
  const [value, handleChange, reset] = useInputState(task);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        // dispatch({ type: "EDIT", id: id, newTask: value });
        reset();
        toggleEditForm();
      }}
      style={{ marginLeft: "1rem", width: "50%" }}
    >
      <input
        margin='normal'
        value={value}
        onChange={handleChange}
        fullWidth
        autoFocus
      />
    </form>
  );
}

export default EditActivityForm;

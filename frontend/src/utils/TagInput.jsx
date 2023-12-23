/* eslint-disable react/prop-types */
import { TagsInput } from "react-tag-input-component";

const TagInput = ({ value, onChange, name, placeholder }) => {
  return (
    <>
      <TagsInput
        value={value}
        onChange={onChange}
        name={name}
        placeHolder={placeholder}
      />
      <em>press enter or comma to add new tag</em>
    </>
  );
};

export default TagInput;

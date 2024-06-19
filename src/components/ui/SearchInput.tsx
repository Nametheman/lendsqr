import classes from "./SearchInput.module.scss";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  return (
    <div className={classes.searchInputContainer}>
      <input
        type={"text"}
        name="text"
        id="text"
        placeholder="Search for anything"
      />
      <button onClick={() => {}} type="button">
        <IoSearchOutline size={18} />
      </button>
    </div>
  );
};

export default SearchInput;

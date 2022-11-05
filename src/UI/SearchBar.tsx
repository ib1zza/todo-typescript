import React from "react";
import s from "../css/SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={s.searchBar}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        className={s.searchBar_input}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default SearchBar;

import "./Searchbar.css";
import React from "react";

export const Searchbar = ({ value, onChange }) => {
  return (
    <div className="Searchbar">
      <input
        className="input"
        placeholder="Type to Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="filters"/> 
    </div>
  );
};

export default Searchbar;
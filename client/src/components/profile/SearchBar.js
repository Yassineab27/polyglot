import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { searchPal } from "../../actions";

const SearchBar = props => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.searchPal(search);
  }, [search]);
  return (
    <div className="form form-group" style={{ marginBottom: "2.5rem" }}>
      <input
        type="text"
        placeholder="Search for Pals.."
        name="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
};

export default connect(
  null,
  { searchPal }
)(SearchBar);

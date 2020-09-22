import React, { useState } from "react";

import "./Filters.scss";

const Filters = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (event) => {
    const { value } = event.target || "";
    setSearchValue(value);
    props.onSearch(value);
  };

  return (
    <div className="container">
      <section className="filters">
        <div className="filters__search">
          <input
            type="text"
            value={searchValue || ""}
            className="filters__search__input"
            placeholder="Pesquisar"
            onChange={(event) => handleKeyDown(event)}
          />

          <button className="filters__search__icon">
            <i className="fa fa-search" />
          </button>
        </div>

        <button
          className={`filters__item ${
            props.selectedFilter === "name" && "is-selected"
          }`}
          onClick={() => props.toggleSort("name")}
        >
          Nome <i className="fas fa-sort-down" />
        </button>

        <button
          className={`filters__item ${
            props.selectedFilter === "country" && "is-selected"
          }`}
          onClick={() => props.toggleSort("country")}
        >
          País <i className="fas fa-sort-down" />
        </button>

        <button
          className={`filters__item ${
            props.selectedFilter === "company" && "is-selected"
          }`}
          onClick={() => props.toggleSort("company")}
        >
          Empresa <i className="fas fa-sort-down" />
        </button>

        <button
          className={`filters__item ${
            props.selectedFilter === "department" && "is-selected"
          }`}
          onClick={() => props.toggleSort("department")}
        >
          Departamento <i className="fas fa-sort-down" />
        </button>

        <button
          className={`filters__item ${
            props.selectedFilter === "admissionDate" && "is-selected"
          }`}
          onClick={() => props.toggleSort("admissionDate")}
        >
          Data de admissão <i className="fas fa-sort-down" />
        </button>
      </section>
    </div>
  );
};

export default Filters;

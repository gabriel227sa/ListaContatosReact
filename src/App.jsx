import React, { useEffect, useState } from "react";
import Topbar from "./components/Topbar";
import Filters from "./components/Filters";
import Contacts from "./components/Contacts";
import Contact from "./components/Contact";
import Loading from "./components/Loading";

import { convertToLowercase } from "./utils";
import { URL } from "./constants";
import Popup from "./components/Popup";

import "./App.scss";
import "./components/Popup.scss";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [hasSearchFilter, setHasSearchFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortedContacts, setSortedContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState("");

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);

  const handleSearchFilter = (value) => {
    if (value.length > 0) {
      let filteredContacts;

      switch (sortBy) {
        case "country":
          filteredContacts = contacts.filter((contact) =>
            convertToLowercase(contact.country).includes(
              convertToLowercase(value)
            )
          );
          break;
        case "company":
          filteredContacts = contacts.filter((contact) =>
            convertToLowercase(contact.company).includes(
              convertToLowercase(value)
            )
          );
          break;
        case "department":
          filteredContacts = contacts.filter((contact) =>
            convertToLowercase(contact.department).includes(
              convertToLowercase(value)
            )
          );
          break;
        case "admissionDate":
          filteredContacts = contacts.filter((contact) =>
            convertToLowercase(contact.admissionDate).includes(
              convertToLowercase(value)
            )
          );
          break;
        default:
          filteredContacts = contacts.filter((contact) =>
            convertToLowercase(contact.name).includes(convertToLowercase(value))
          );
          break;
      }

      setHasSearchFilter(true);
      setSearchFilter(filteredContacts);
    } else {
      setHasSearchFilter(false);
      setSearchFilter([]);
    }
  };

  const toggleSortByValue = (value) => {
    const compareValues = (key, order = "asc") => {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    };

    let sortValue;
    let sortedContacts;

    if (value === sortBy) {
      sortValue = "";
      sortedContacts = [...contacts];
    } else {
      sortValue = value;
      sortedContacts = contacts.sort(compareValues(value));
    }

    setHasSearchFilter(false);
    setSearchFilter([]);
    setSortBy(sortValue);
    setSortedContacts(sortedContacts);
  };

  const togglePopup = (contact) => {
    setIsOpen(!isOpen);
    setPopupData(contact);
  };

  let outputContacts;

  if (!hasSearchFilter) {
    if (contacts.length > 0 && sortedContacts.length > 0) {
      outputContacts = sortedContacts.map((contact) => (
        <Contact
          key={contact.id}
          data={contact}
          showData={togglePopup}
          isOpen={isOpen}
          popData={popupData}
        />
      ));
    } else if (contacts.length > 0 && sortedContacts.length === 0) {
      outputContacts = contacts
        .slice(0, 30)
        .map((contact) => (
          <Contact
            key={contact.id}
            data={contact}
            showData={togglePopup}
            isOpen={isOpen}
            popData={popupData}
          />
        ));
    } else {
      outputContacts = <Loading />;
    }
  } else {
    outputContacts = searchFilter.map((contact) => (
      <Contact
        key={contact.id}
        data={contact}
        showData={togglePopup}
        isOpen={isOpen}
        popData={popupData}
      />
    ));
  }

  return (
    <div className="app">
      <Topbar />
      <Filters
        onSearch={handleSearchFilter}
        toggleSort={toggleSortByValue}
        selectedFilter={sortBy}
      />
      <Contacts>{outputContacts}</Contacts>
    </div>
  );
};

export default App;

import dayjs from "dayjs";
import React from "react";
import Popup from "./Popup";

import "./Contact.scss";

const Contact = (props) => {
  return (
    <article className="contact">
      <span className="contact__avatar">
        <img src={props.data.avatar} alt={props.data.name} />
      </span>
      <span className="contact__data">{props.data.name}</span>
      <span className="contact__data">{props.data.phone}</span>
      <span className="contact__data">{props.data.country}</span>
      <span className="contact__data">
        {dayjs(props.data.admissionDate).format("DD/MM/YYYY")}
      </span>
      <span className="contact__data">{props.data.company}</span>
      <span className="contact__data">{props.data.department}</span>
      <span className="contact__data">
        <button
          className={`contact__item button  ${
            props.data.country === "Borders" && "disabled"
          }`}
          disabled={props.data.country === "Borders" ? true : false}
          onClick={() => props.showData(props.data)}
        >
          Escolher
        </button>
        {props.isOpen && (
          <Popup
            content={props.popData}
            handleClose={() => props.showData("")}
          />
        )}
      </span>
    </article>
  );
};

export default Contact;

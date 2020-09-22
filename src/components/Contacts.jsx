import React from "react";
import "./Contacts.scss";

const Contacts = (props) => {
  return (
      <div className="container">
        <section className="contacts">
          <article className="contact">
            <span className="contact__avatar" />
            <span className="contact__data">Nome</span>
            <span className="contact__data">Telefone</span>
            <span className="contact__data">País</span>
            <span className="contact__data">Admissão</span>
            <span className="contact__data">Empresa</span>
            <span className="contact__data">Departamento</span>
            <span className="contact__data"></span>
          </article>
          {props.children}
        </section>
      </div>
  );
};

export default Contacts;

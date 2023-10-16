import React, { useState, useEffect } from "react";
import { ReactComponent as Close } from "shared/assets/img/svg/close.svg";
import cl from "./Modal.module.scss";

const Modal = ({ children, type, img, title = "", close }) => {
  const [show, setShow] = useState("");

  const handleClose = (event) => {
    if (event.target.className === `${cl.Modal} ${cl[type]}`) {
      setShow("");
      setTimeout(() => {
        close(false);
      }, 200);
    }
  };

  useEffect(() => {
    setShow("show");
  }, []);

  return (
    <div
      className={`${cl.Modal} ${cl[type]}`}
      onClick={(event) => handleClose(event)}
    >
      <div className={`${cl[type]} ${cl[show]}`}>
        {title && (
          <div className={cl.modalHeader}>
            <div className={cl.title}>{title}</div>
            <Close
              className={cl.close}
              onClick={() => {
                setShow("");
                setTimeout(() => {
                  close(false);
                }, 200);
              }}
            />
          </div>
        )}
        {img && (
          <div className={cl.modalHeaderLogo}>
            <img src={img} alt="logo" className={cl.headerLogo} />
            <Close
              className={cl.closeLogo}
              onClick={() => {
                setShow("");
                setTimeout(() => {
                  close(false);
                }, 200);
              }}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export { Modal };

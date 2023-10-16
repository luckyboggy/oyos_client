import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ToVk } from "shared/assets/img/svg/linkVk.svg";
import { ReactComponent as ToTg } from "shared/assets/img/svg/linkTg.svg";
import { ReactComponent as ToEmail } from "shared/assets/img/svg/linkEmail.svg";
import cls from "./Footer.module.scss";

const Footer = ({ theme }) => {
  const year = new Date().getFullYear();

  return (
    <footer className={`${cls.footer} ${cls[theme]}`}>
      <div className={cls.wrapper}>
        {/* <hr /> */}
        <div className={cls.menu}>
          <div className={cls.items}>
            <div className={cls.subMenu}>
              <Link to="about" className={cls.item}>
                О бренде
              </Link>
              <Link to="#" className={cls.item}>
                Про уход
              </Link>
            </div>
            <div className={cls.subMenu}>
              <Link to="#" className={cls.item}>
                Контакты
              </Link>
              <Link to="delivery" className={cls.item}>
                Доставка и оплата
              </Link>
              <Link to="#" className={cls.item}>
                Гарантия и возврат
              </Link>
            </div>
          </div>
        </div>
        {/* <hr /> */}
        <div className={cls.section}>
          <div className={cls.links}>
            <Link to="#">
              <ToVk className={cls.link} />
            </Link>
            <Link to="#">
              <ToTg className={cls.link} />
            </Link>
            <Link to="#">
              <ToEmail className={cls.link} />
            </Link>
          </div>
        </div>
        {/* <hr /> */}
        <div className={cls.copyright}>© {year} luckyboggy</div>
      </div>
    </footer>
  );
};

export { Footer };

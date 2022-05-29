import React from "react";

import { Link, useLocation } from "react-router-dom";
import redLogo from "./../../assets/redLogo.svg";
import { BiLogOut } from "react-icons/bi";
import { RiAddCircleLine } from "react-icons/ri";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { AiOutlineSetting } from "react-icons/ai";
import styles from "./menu.module.css";
export const Menu = () => {
    const currentLocation = useLocation();

    // Get current url
    const { pathname } = currentLocation;

    const links = [
        {
            icon: <VscLibrary className={styles.icon} />,
            text: "Librería",
            path: "/",
        },
        {
            icon: <RiAddCircleLine className={styles.icon} />,
            text: "Añadir ítem",
            path: "/library/add-item",
        },
        {
            icon: <BsFileEarmarkBarGraph className={styles.icon} />,
            text: "Dashboard",
            path: "/dashboard",
        },
        {
            icon: <AiOutlineSetting className={styles.icon} />,
            text: "Ajustes",
            path: "/settings",
        },
        {
            icon: <BiLogOut className={styles.icon} />,
            text: "Salir",
            path: "/log",
        },
    ];

    const linksResponsive = [
        {
            icon: <BiLogOut className={styles.icon} />,
            text: "Salir",
            path: "/log",
        },
        {
            icon: <RiAddCircleLine className={styles.icon} />,
            text: "Añadir ítem",
            path: "/library/add-item",
        },
        {
            icon: <VscLibrary className={styles.icon} />,
            text: "Librería",
            path: "/",
        },
        {
            icon: <BsFileEarmarkBarGraph className={styles.icon} />,
            text: "Dashboard",
            path: "/dashboard",
        },
        {
            icon: <AiOutlineSetting className={styles.icon} />,
            text: "Ajustes",
            path: "/settings",
        },
    ];
    return (
        <>
            <div className={styles.menu}>
                <div className={styles.menu__img}>
                    <img src={redLogo} alt="Logo" />
                </div>
                <nav className={styles.nav}>
                    {links.map((item, index) => (
                        <Link
                            to={item.path}
                            key={index}
                            className={
                                pathname === item.path
                                    ? `${styles.link_active} ${styles.link}`
                                    : ` ${styles.link}`
                            }
                        >
                            <p className={styles.link__container}>
                                {item.icon}
                                <span className={styles.nav_text}>
                                    {" "}
                                    {item.text}
                                </span>
                            </p>
                        </Link>
                    ))}
                </nav>

                <footer className={styles.footer}>Lian 2022</footer>
            </div>
            <nav className={styles.nav_responsive}>
                {linksResponsive.map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        className={
                            pathname === item.path
                                ? `${styles.link_active} ${styles.link}`
                                : ` ${styles.link}`
                        }
                    >
                        {item.icon}
                    </Link>
                ))}
            </nav>
        </>
    );
};

import React from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "../../components/menu/Menu";

import styles from "./layout.module.css";

export const Layout = () => {
    return (
        <div className={styles.container}>
            <div className={`${styles.menu_responsive} ${styles.menu}`}>
                <Menu />
            </div>
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};

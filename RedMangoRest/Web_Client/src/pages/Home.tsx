import React from "react";
import { MenuItemList } from "../components/Page/MenuItems/index";

type Props = {};

export default function Home({}: Props) {
    return (
        <div>
            <div className=" container p-2">
                <MenuItemList />
            </div>
        </div>
    );
}

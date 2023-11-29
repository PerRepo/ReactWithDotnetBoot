import React, { useEffect, useState } from "react";
import { ApiResponse, menuItemModel } from "../../../types";
import { MenuItemCard } from ".";
import { useGetMenuItemQuery } from "../../../Api/menuItemApi";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../common";

type Props = {};

export default function MenuItemList({}: Props) {
    // const [menuItems, setMenuItems] = useState<menuItemModel[]>(
    //     [] as menuItemModel[]
    // );

    const dispatch = useDispatch();
    const { data, isLoading } = useGetMenuItemQuery(null);

    useEffect(() => {
        if (!isLoading) {
            dispatch(setMenuItem(data as ApiResponse<menuItemModel[]>));
        }
    }, [isLoading]);

    if (isLoading) return <MainLoader />;

    return (
        <div className=" container row">
            {data!.result.map((item: menuItemModel) => (
                <MenuItemCard key={item.id} menuItem={item} />
            ))}
        </div>
    );
}

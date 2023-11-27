import React, { useEffect, useState } from "react";
import { ApiResponse, menuItemModel } from "../../../types";
import { MenuItemCard } from ".";

type Props = {};

export default function MenuItemList({}: Props) {
    const [menuItems, setMenuItems] = useState<menuItemModel[]>(
        [] as menuItemModel[]
    );
    const [loading, setLoading] = useState<boolean>(false);

    const controller = new AbortController();

    const token: string =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6InBlciIsImlkIjoiNGM4NWVmODMtMzk2Ny00MmU4LTljM2MtNDZlYmVjOGMzMmYyIiwiZW1haWwiOiJwZXJAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE3MDEwNTk1NjQsImV4cCI6MTcwMTE0NTk2NCwiaWF0IjoxNzAxMDU5NTY0fQ.U5BqBqMX0upDM8uVsylyrUTQhUv4f_FjhC6dWymEcS0";

    useEffect(() => {
        setTimeout(() => {
            fetch("https://redmengorestapi.azurewebsites.net/api/MenuItem", {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            }).then((response) => {
                response.json().then((data: ApiResponse<menuItemModel>) => {
                    console.log(data.result);
                    setMenuItems(data.result);
                });
            });
        }, 2000);
        return () => controller.abort();
    }, []);
    return (
        <div className=" container row">
            {menuItems.length < 1 ? (
                <div className=" text-center text-black">Loading...</div>
            ) : (
                menuItems.map((item: menuItemModel) => (
                    <MenuItemCard key={item.id} menuItem={item} />
                ))
            )}
        </div>
    );
}

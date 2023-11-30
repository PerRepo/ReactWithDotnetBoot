import React, { useState } from "react";
import {
    ApiResponse,
    cartItemModel,
    menuItemModel,
    userModel,
} from "../../../types";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateShoppoingCartMutation } from "../../../Api/shoppingCartApi";
import { MiniLoader, MyImage } from "../common";
import { toastNotify } from "../../../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";

type Props = {
    menuItem: menuItemModel;
};

export default function MenuItemCard({ menuItem }: Props) {
    const navigate = useNavigate();
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const [updateShoppingCart] = useUpdateShoppoingCartMutation();
    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    const handleAddToCart = async (menuItemId: number) => {
        if (!userData.id) {
            navigate("/login");
            return;
        }

        setIsAddingToCart(true);
        const response = await updateShoppingCart({
            userId: userData.id,
            menuItemId: menuItemId,
            updateQuantityBy: 1,
        }).unwrap();

        if (response && response.isSuccess) {
            toastNotify("Add Item successfully!");
        }
        setIsAddingToCart(false);
    };
    return (
        <div className="col-md-4 col-12 p-4">
            <div
                className="card"
                style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}>
                <div className="card-body pt-2">
                    <div className="row col-10 offset-1 p-4">
                        <Link to={`/menuItemDetails/${menuItem.id}`}>
                            <MyImage
                                src={menuItem.image}
                                style={{ borderRadius: "50%" }}
                                className="w-100 mt-5 image-box"
                            />
                        </Link>
                    </div>
                    {menuItem.specialTag && menuItem.specialTag.length > 0 && (
                        <i
                            className="bi bi-star btn btn-success"
                            style={{
                                position: "absolute",
                                top: "15px",
                                left: "15px",
                                padding: "5px 10px",
                                borderRadius: "3px",
                                outline: "none !important",
                                cursor: "pointer",
                            }}>
                            &nbsp; {menuItem.specialTag}
                        </i>
                    )}

                    {isAddingToCart ? (
                        <div
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                            }}>
                            <MiniLoader size={80} type="danger" />
                        </div>
                    ) : (
                        <i
                            className="bi bi-cart-plus btn btn-outline-danger"
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                padding: "5px 10px",
                                borderRadius: "3px",
                                outline: "none !important",
                                cursor: "pointer",
                            }}
                            onClick={() => handleAddToCart(menuItem.id)}></i>
                    )}

                    <div className="text-center">
                        <p className="card-title m-0 text-success fs-3">
                            <Link
                                to={`/menuItemDetails/${menuItem.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "green",
                                }}>
                                {menuItem.name}
                            </Link>
                        </p>
                        <p
                            className="badge bg-secondary"
                            style={{ fontSize: "12px" }}>
                            {menuItem.category}
                        </p>
                    </div>
                    <p
                        className="card-text"
                        style={{
                            textAlign: "center",
                            fontWeight: "light",
                            fontSize: "14px",
                        }}>
                        {menuItem.description}
                    </p>
                    <div className="row text-center">
                        <h4>${menuItem.price}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

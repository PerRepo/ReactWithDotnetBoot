import React from "react";
import { cartItemModel } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { MyImage } from "../common";
import {
    removeFromCart,
    updateQuantity,
} from "../../../Storage/Redux/shoppingCartSlice";
import { useUpdateShoppoingCartMutation } from "../../../Api/shoppingCartApi";

type Props = {};

export default function CartSummary({}: Props) {
    const dispatch = useDispatch();
    const [updateShoppingCart] = useUpdateShoppoingCartMutation();

    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
    );

    const userData = useSelector((state: RootState) => state.userAuthStore);

    const handleQuantity = (
        updateQuantityBy: number,
        cartItem: cartItemModel
    ) => {
        const isRemoveItem =
            (updateQuantityBy == -1 && cartItem.quantity == 1) ||
            updateQuantityBy == 0;
        if (isRemoveItem) {
            // remove item from cart
            updateShoppingCart({
                userId: userData.id!,
                menuItemId: cartItem.menuItemId!,
                updateQuantityBy: 0,
            });
            dispatch(removeFromCart({ cartItem, quantity: 0 }));
        } else {
            // update quantity
            updateShoppingCart({
                userId: userData.id!,
                menuItemId: cartItem.menuItemId!,
                updateQuantityBy: updateQuantityBy,
            });
            dispatch(
                updateQuantity({
                    cartItem,
                    quantity: cartItem.quantity! + updateQuantityBy,
                })
            );
        }
    };

    if (!shoppingCartFromStore) {
        return <div>Shopping Cart Empty</div>;
    }

    return (
        <div className="p-4 m-2" style={{ height: "75%" }}>
            <h4 className="text-center text-success">Cart Summary</h4>
            <div className="overflow-auto" style={{ height: "90%" }}>
                {shoppingCartFromStore.map(
                    (cartItem: cartItemModel, idx: number) => (
                        <div
                            key={idx}
                            className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
                            style={{ background: "ghostwhite" }}>
                            <div className="p-3">
                                <MyImage
                                    src={cartItem.menuItem?.image!}
                                    width="120px"
                                    className="rounded-circle"
                                />
                            </div>

                            <div className="p-2 mx-3" style={{ width: "100%" }}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 style={{ fontWeight: 300 }}>
                                        {cartItem.menuItem?.name!}
                                    </h4>
                                    <h4>
                                        $
                                        {(
                                            cartItem.menuItem?.price! *
                                            cartItem.quantity!
                                        ).toFixed(2)}
                                    </h4>
                                </div>
                                <div className="flex-fill">
                                    <h4 className="text-danger">
                                        ${cartItem.menuItem?.price!}
                                    </h4>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div
                                        className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
                                        style={{
                                            width: "100px",
                                            height: "43px",
                                        }}>
                                        <span
                                            style={{
                                                color: "rgba(22,22,22,.7)",
                                            }}
                                            role="button"
                                            onClick={() =>
                                                handleQuantity(-1, cartItem)
                                            }>
                                            <i className="bi bi-dash-circle-fill"></i>
                                        </span>
                                        <span>
                                            <b>{cartItem.quantity!}</b>
                                        </span>
                                        <span
                                            style={{
                                                color: "rgba(22,22,22,.7)",
                                            }}
                                            role="button"
                                            onClick={() =>
                                                handleQuantity(1, cartItem)
                                            }>
                                            <i className="bi bi-plus-circle-fill"></i>
                                        </span>
                                    </div>

                                    <button
                                        className="btn btn-danger mx-1"
                                        onClick={() =>
                                            handleQuantity(0, cartItem)
                                        }>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

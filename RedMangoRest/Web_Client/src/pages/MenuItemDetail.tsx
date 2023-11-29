import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../Api/menuItemApi";
import { useUpdateShoppoingCartMutation } from "../Api/shoppingCartApi";
import { MainLoader, MiniLoader } from "../components/Page/common";

type Props = {};

type ParamTypes = {
    menuItemId: string;
};

export default function MenuItemDetail({}: Props) {
    const { menuItemId } = useParams<ParamTypes>();
    const navigate = useNavigate();
    const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);

    const [quantity, setQuantity] = useState<number>(1);
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const [updateShoppingCart] = useUpdateShoppoingCartMutation();

    const handleQuantityChange = (counter: number) => {
        let newQuantity = quantity + counter;
        if (newQuantity < 1) {
            newQuantity = 1;
        }
        setQuantity(newQuantity);
    };

    const handleAddToCart = async (menuItemId: number) => {
        setIsAddingToCart(true);

        const response = await updateShoppingCart({
            userId: "4c85ef83-3967-42e8-9c3c-46ebec8c32f2",
            menuItemId: menuItemId,
            updateQuantityBy: quantity,
        });

        console.log(response);

        setIsAddingToCart(false);
    };

    return (
        <div className="container pt-4 pt-md-5">
            {!isLoading ? (
                <div className="row">
                    <div className="col-7">
                        <h2 className="text-success">{data?.result.name}</h2>
                        <span>
                            <span
                                className="badge text-bg-dark pt-2"
                                style={{ height: "40px", fontSize: "20px" }}>
                                {data?.result.category}
                            </span>
                        </span>
                        <span>
                            <span
                                className="badge text-bg-light pt-2"
                                style={{ height: "40px", fontSize: "20px" }}>
                                {data?.result.specialTag}
                            </span>
                        </span>
                        <p style={{ fontSize: "20px" }} className="pt-2">
                            {data?.result.description}
                        </p>
                        <span className="h3">${data?.result.price}</span>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <span
                            className="pb-2  p-3"
                            style={{
                                border: "1px solid #333",
                                borderRadius: "30px",
                            }}>
                            {quantity > 1 && (
                                <i
                                    onClick={() => handleQuantityChange(-1)}
                                    className="bi bi-dash p-1"
                                    style={{
                                        fontSize: "25px",
                                        cursor: "pointer",
                                    }}></i>
                            )}
                            <span className="h3 mt-3 px-3">{quantity}</span>
                            <i
                                onClick={() => handleQuantityChange(1)}
                                className="bi bi-plus p-1"
                                style={{
                                    fontSize: "25px",
                                    cursor: "pointer",
                                }}></i>
                        </span>
                        <div className="row pt-4">
                            <div className="col-5">
                                <button
                                    className="btn btn-success form-control"
                                    onClick={() =>
                                        handleAddToCart(data?.result.id!)
                                    }>
                                    {isAddingToCart ? (
                                        <MiniLoader size={30} />
                                    ) : (
                                        <>Add to Cart</>
                                    )}
                                </button>
                            </div>

                            <div className="col-5 ">
                                <button
                                    className="btn btn-secondary form-control"
                                    onClick={() => navigate(-1)}>
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <img
                            src={data?.result.image}
                            onError={(current: any) => {
                                current.onerror = null;
                                current.target.src =
                                    "https://via.placeholder.com/150";
                            }}
                            width="100%"
                            style={{ borderRadius: "50%" }}
                            alt="No content"></img>
                    </div>
                </div>
            ) : (
                <MainLoader />
            )}
        </div>
    );
}

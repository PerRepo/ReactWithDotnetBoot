import { Route, Routes, useNavigate } from "react-router-dom";
import { Header, Footer } from "../components/layout/index";
import {
    Home,
    Login,
    MenuItemDetail,
    NotFound,
    Register,
    ShoppinCart,
} from "../pages/index";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../Api/shoppingCartApi";
import { useEffect } from "react";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import Cookies from "js-cookie";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { userModel } from "../types";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../Utility/Cookies";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, isLoading } = useGetShoppingCartQuery(
        "4c85ef83-3967-42e8-9c3c-46ebec8c32f2"
    );

    useEffect(() => {
        if (!Cookies.get("usr")) {
            navigate("/login");
        } else {
            const token = getToken("usr")!;
            const { fullName, id, email, role }: userModel = jwtDecode(token);
            dispatch(setLoggedInUser({ fullName, id, email, role }));
        }
    }, []);

    useEffect(() => {
        if (!isLoading) {
            console.log(data!);
            dispatch(setShoppingCart(data?.result.cartItems!));
        }
    }, [data]);

    return (
        <div>
            <Header />
            <div className=" pb-5">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/menuItemDetails/:menuItemId"
                        element={<MenuItemDetail />}
                    />
                    <Route path="/shoppingCart" element={<ShoppinCart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;

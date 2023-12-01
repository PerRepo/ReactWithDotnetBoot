import { Route, Routes, useNavigate } from "react-router-dom";
import { Header, Footer } from "../components/layout/index";
import {
    Home,
    Login,
    MenuItemDetail,
    NotFound,
    Payment,
    Register,
    ShoppinCart,
} from "../pages/index";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Api/shoppingCartApi";
import { useEffect } from "react";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import Cookies from "js-cookie";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { userModel } from "../types";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../Utility/Cookies";
import { RootState } from "../Storage/Redux/store";

function App() {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.userAuthStore);
    const { data, isLoading } = useGetShoppingCartQuery(userData.id);

    useEffect(() => {
        const token = getToken("usr")!;
        if (token) {
            const { fullName, id, email, role }: userModel = jwtDecode(token);
            dispatch(setLoggedInUser({ fullName, id, email, role }));
        }
    }, []);

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(setShoppingCart(data.result?.cartItems!));
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
                    <Route path="/payment" element={<Payment />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;

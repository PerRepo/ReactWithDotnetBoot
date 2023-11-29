import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "../components/layout/index";
import { Home, MenuItemDetail, NotFound, ShoppinCart } from "../pages/index";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../Api/shoppingCartApi";
import { useEffect } from "react";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";

function App() {
    const dispatch = useDispatch();

    const { data, isLoading } = useGetShoppingCartQuery(
        "4c85ef83-3967-42e8-9c3c-46ebec8c32f2"
    );

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
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;

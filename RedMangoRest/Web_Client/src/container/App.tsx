import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "../components/layout/index";
import { Home, MenuItemDetail, NotFound } from "../pages/index";

function App() {
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
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;

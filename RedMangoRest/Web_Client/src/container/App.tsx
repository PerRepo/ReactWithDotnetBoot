import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { PrivateRoutes, PublicRoutes } from "../router/router";

function App() {
    const router = createBrowserRouter([
        false ? PrivateRoutes() : {},
        ...PublicRoutes(),
    ]);
    return <RouterProvider router={router} />;
}

export default App;

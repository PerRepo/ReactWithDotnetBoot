import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/mango.png";
import { cartItemModel } from "../../types";
import { RootState } from "../../Storage/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
    setLoggedInUser,
    initialState,
} from "../../Storage/Redux/userAuthSlice";

type Props = {};

export default function Header({}: Props) {
    const navigate = useNavigate();
    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
    );

    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.userAuthStore);

    function handleLogout(): void {
        Cookies.remove("usr");
        dispatch(setLoggedInUser({ ...initialState }));
        navigate("/login", { replace: true });
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="nav-link" aria-current="page" to="/">
                        <img
                            src={logo}
                            style={{ height: "40px" }}
                            className="m-1"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    aria-current="page"
                                    to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item bg-dark-subtle rounded-5">
                                <Link
                                    className="nav-link"
                                    aria-current="page"
                                    to="/shoppingCart">
                                    <i className="bi bi-cart me-1 text-black"></i>
                                    <span className=" text-lg-center text-black">
                                        {userData.id &&
                                            `${shoppingCartFromStore.length}`}
                                    </span>
                                </Link>
                            </li>
                            {/* {userData.role == SD_Roles.ADMIN ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin Panel
                  </a>
                  <ul className="dropdown-menu">
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("menuItem/menuitemlist")}
                    >
                      Menu Item
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("order/myorders")}
                    >
                      My Orders
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("order/allOrders")}
                    >
                      All Orders
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    href="/order/myorders"
                  >
                    Orders
                  </NavLink>
                </li>
              )}

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/shoppingCart"
                >
                  <i className="bi bi-cart"></i>{" "}
                  {userData.id && `(${shoppingCartFromStore.length})`}
                </NavLink>
              </li>
              <div className="d-flex" style={{ marginLeft: "auto" }}>
                {userData.id && (
                  <>
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0,
                        }}
                      >
                        Welcome, {userData.fullName}
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                {!userData.id && (
                  <>
                    <li className="nav-item text-white">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item text-white">
                      <NavLink
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div> */}
                            <div
                                className="d-flex"
                                style={{ marginLeft: "auto" }}>
                                {userData.id && (
                                    <>
                                        <li className="nav-item">
                                            <button
                                                className="nav-link active"
                                                style={{
                                                    cursor: "pointer",
                                                    background: "transparent",
                                                    border: 0,
                                                }}>
                                                Welcome, {userData.fullName}
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                                                style={{
                                                    border: "none",
                                                    height: "40px",
                                                    width: "100px",
                                                }}
                                                onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                )}

                                {!userData.id && (
                                    <>
                                        <li className="nav-item text-white">
                                            <Link
                                                className="nav-link"
                                                to="/register">
                                                Register
                                            </Link>
                                        </li>
                                        <li className="nav-item text-white">
                                            <Link
                                                className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                                                style={{
                                                    border: "none",
                                                    height: "40px",
                                                    width: "100px",
                                                }}
                                                to="/login">
                                                Login
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
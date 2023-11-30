import Cookies from "js-cookie";

export const getToken = (key:string) => Cookies.get(key);
export const setToke = (key:string, value:string, exr:number) => {
    Cookies.set(key, value, {expires: exr})
}
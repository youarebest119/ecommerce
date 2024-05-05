export const ROUTES = {
    BASE: "/",
    HOMEPAGE: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    PRODUCT_PAGE: "/products/:id",
    PROFILE_PAGE: "/profile",
    SETTINGS: "/profile/settings",
    CART: "/profile/cart",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password/:token",
};

export const API = {
    PRODUCTS: "/products", //get
    CATEGORIES: "/products/categories", //get
    PRODUCT: "/products/:id", //get
    REGISTER: "/user/register", // post
    LOGIN: "/user/login", // post
    LOGOUT: "/user/logout", // get
    FORGOT_PASSWORD: "/user/password/forgot", // post
    RESET_PASSWORD: "/user/password/reset/:token", // put
    UPDATE_PROFILE: "/user", // put
    GET_USER_DETAILS: "/user", // get
    DELETE_USER: "/user", // delete
    UPDATE_PASSWORD: "/user/password/update", // put
}
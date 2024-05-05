import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES } from './utils/constants'
import Loader from './components/common/Loader/Loader'
import AuthGaurd from './gaurds/AuthGaurd';
import NoGaurd from './gaurds/NoGaurd';
const ForgotPassword = lazy(() => import('./components/pages/ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/pages/ResetPassword/ResetPassword'));
const Settings = lazy(() => import('./components/pages/Profile/Settings/Settings'));
const Cart = lazy(() => import('./components/pages/Profile/Cart/Cart'));
const Profile = lazy(() => import('./components/pages/Profile/Profile'));
const Homelayout = lazy(() => import('./components/layouts/Homelayout/Homelayout'));
const Homepage = lazy(() => import('./components/pages/Homepage/Homepage'));
const ProductPage = lazy(() => import('./components/pages/ProductPage/ProductPage'));
const Login = lazy(() => import('./components/pages/Login/Login'));
const Onboardlayout = lazy(() => import('./components/layouts/Onboardlayout/Onboardlayout'));
const Register = lazy(() => import('./components/pages/Register/Register'));
const Errorpage = lazy(() => import('./components/pages/ErrorPage/Errorpage'));
const PageNotFound = lazy(() => import('./components/pages/PageNotFound/PageNotFound'));

const Application = () => {
    const Router = createBrowserRouter([
        {
            path: ROUTES.BASE,
            element: <Homelayout />,
            ErrorBoundary: Errorpage,
            children: [
                {
                    index: true,
                    element: <Homepage />,
                },
                {
                    path: ROUTES.PRODUCT_PAGE,
                    element: <ProductPage />,
                },
                {
                    path: ROUTES.PROFILE_PAGE,
                    element: <AuthGaurd><Profile /></AuthGaurd>,
                    children: [
                        {
                            path: ROUTES.SETTINGS,
                            element: <Settings />,
                        },
                        {
                            path: ROUTES.CART,
                            element: <Cart />,
                        },
                    ]
                },
            ],
        },
        {
            path: ROUTES.BASE,
            element: <NoGaurd><Onboardlayout /></NoGaurd>,
            ErrorBoundary: Errorpage,
            children: [
                {
                    path: ROUTES.LOGIN,
                    element: <Login />,
                },
                {
                    path: ROUTES.REGISTER,
                    element: <Register />,
                },
                {
                    path: ROUTES.FORGOT_PASSWORD,
                    element: <ForgotPassword />,
                },
                {
                    path: ROUTES.RESET_PASSWORD,
                    element: <ResetPassword />,
                },
            ]
        },
        {
            path: "*",
            element: <PageNotFound />
        }
    ])
    return (
        <>
            <Suspense fallback={<Loader />}>
                <RouterProvider router={Router} />
            </Suspense>
        </>
    )
}

export default Application

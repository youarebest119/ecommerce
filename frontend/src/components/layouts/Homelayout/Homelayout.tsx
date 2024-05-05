import { Outlet } from "react-router-dom"
import Header from "../../common/Header/Header"

const Homelayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Homelayout

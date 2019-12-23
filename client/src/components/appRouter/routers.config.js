

import SignIn from "components/pages/signIn";
import SignUp from "components/pages/signUp";
import Home from "components/pages/home"
import Flights from "components/pages/flights"


export const routes = [
    { exact: true, isVisible: true, title: "Sign In", path: "/signIn", component: SignIn },
    { exact: true, isVisible: true, title: "Sign Up", path: "/signUp", component: SignUp },
    { exact: true, isVisible: true, title: "Home", path: "/home", component: Home },
    { exact: true, isVisible: true, title: "Flights", path: "/flights", component: Flights }
]
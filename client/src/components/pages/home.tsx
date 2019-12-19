import React, { useState, useEffect } from "react";
import mainAxios from "../../axios/mainAxios"
import { Redirect } from "react-router-dom"
interface IProps {
    [key: string]: any
}
export default function Home(props: IProps) {

    const [flights, setFlights] = useState({})
    const [status, setLoadingStatus] = useState("loading")

    const callServer = async () => {
        try {
            console.log("request sent to server");
            const result = await mainAxios.get("/flights")
            const { data } = result
            setFlights(data)
        } catch (ex) {
            props.history.push("/signIn")
        }
    }
    const callServerFlights = async () => {
        try {
            console.log("request sent to server");
            const result = await mainAxios.get("/flights")
            const { data } = result
            return data
        } catch (ex) {
            return [];
        }
    }

    useEffect(() => {
        const initReq = async () => {
            console.log("request start 1")
            const verify = await mainAxios.get("/auth/verify");
            const { data } = verify;
            const { status: serverStatus } = data;
            if (!serverStatus) {
                props.history.push("/signIn")
                return;
            }

            setLoadingStatus(serverStatus)
            const result = await callServerFlights()
            setFlights(result)
            console.log("request 1")
        }
        initReq()
    }, [])


    if (status === 'loading') return <div className="loader"></div>
    return <div>
        {isAuthClient()}
        <h1> Home Page </h1>
        <button onClick={callServer}>  Call server </button>
        <div> {JSON.stringify(flights)}</div>
    </div>
}

function isAuthClient() {
    if (!localStorage.getItem("token")) return <Redirect to="/signIn" />
}


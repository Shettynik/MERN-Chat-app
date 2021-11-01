import React, { useEffect } from 'react'

const Index = ({history}) => {
    useEffect(() => {
        const token = localStorage.getItem("CC_token");
        if(!token){
            history.push("/login")
        }else{
            history.push("/dashboard")
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            Index
        </div>
    )
}

export default Index

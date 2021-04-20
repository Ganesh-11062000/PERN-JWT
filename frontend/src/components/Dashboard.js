import React,{ useState,useEffect } from 'react'

function Dashboard({setAuth}) {
    const [name,setName] = useState('');

    const getName = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard",{
                method:"GET",
                headers: {"token":localStorage.token}
            });

            const parseRes = await response.json();
            // console.log(parseRes);
            setName(parseRes.user_name)

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getName();
    },[]);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
    }

    return (
        <div className="container">
            <h1>Dashboard</h1>
            {name.length !== 0? <h3>Hello, {name}!</h3>:null}
            <button className="btn btn-sm btn-primary" onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard

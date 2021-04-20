import React, { useState } from 'react'

function Register({setAuth}) {
    const [inputs,setInputs] = useState({
        'name':'',
        'email':'',
        'password':''
    });

    const {name,email,password} = inputs;

    const handleChange = (e) => {
        setInputs({...inputs,[e.target.name]:e.target.value});
    }

    const handleSubmit = async e => { 
        e.preventDefault();
        const body = {name,email,password};

        try {
            const response = await fetch("http://localhost:5000/auth/register",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            });
            const parseRes = await response.json();
            localStorage.setItem('token',parseRes.token);
            setAuth(true);

        } catch (err) {
            console.error(err.message);
        }   
    }

    return (
        <div className="container">
            <h1 className="text-center m-5">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={name} className="form-control" onChange={handleChange}/>    
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} className="form-control" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} className="form-control" onChange={handleChange}/>
                </div>
                <div className="mt-2">
                    <input type="submit" className="btn btn-primary" value="Register"/>
                </div>
            </form>
        </div>
    )
}

export default Register

import React, {  useEffect, useState } from 'react';
import "./style.css";
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = (props) => {

    const [cred, setCred] = useState({
        id: '',
        password: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            props.signin();
            navigate("/", {replace: true});
        }

        //eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${process.env.REACT_APP_USER_ENDPOINT}/user_login`, {
            employee_id: cred.id,
            user_password: cred.password
        });


        if(response.status === 200) {
            
            localStorage.setItem("authToken", response.data.data.token);
            props.signin();
            navigate("/", {replace: true});
        }else{
            alert("Something went wrong");
        }
    }


  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Employee id</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter employee id"
              onChange={e => setCred({...cred, id: e.target.value})}
              value={cred.id}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={e => setCred({...cred, password: e.target.value})}
              value={cred.password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn addBtn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login;
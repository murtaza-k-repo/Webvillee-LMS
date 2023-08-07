import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [quote, setQuote] = useState("");
  const [counts, setCounts] = useState({
    departments: 0,
    roles: 0,
    courses: 0,
    users: 0
  });

  const getQuote = async () => {
    try {
      let response = await axios.get(
        "https://api.api-ninjas.com/v1/quotes?category=inspirational",
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_QUOTE_API_KEY,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        setQuote(response.data[0]);
      }
    } catch (err) {
      console.log("Something went wrong!");
    }
  };

  const getAllDepartments = async () => {
      try{
        let response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/getAllDepartments`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRiZmExZjEzODIwY2UyZTIyNzc4YjNiIiwidXNlcl9lbXBpZCI6Ind2MTAwMiIsInVzZXJfZW1haWwiOiJhcnVuQG1vdGlvbnZpbGxlZS5jb20iLCJ1c2VyX3JvbGUiOiJTdXBlckFkbWluIiwidXNlcl9uYW1lIjoiYXJ1biBhY2hhcnlhIiwiaWF0IjoxNjkxMTM3MjkwLCJleHAiOjE2OTExNTUyOTB9.3K3raXiveRmkHDHAJGCVUpltV-W6Y8bg5EQ4VyVIBjA`
          }
        });
        if(response.sucess){
          setCounts({...counts, departments: response.data.length});
        }
      }catch(err){
        console.log("Something went wrong!");
      }
  }

  useEffect(() => {
    getQuote();
    getAllDepartments();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 ">
          <Card className="quotes-card">
            <Card.Body>
              {quote ? (
                <em className="quote-width center-div">
                  <h6>{quote?.quote} </h6>{" "}
                  <p className="text-center">- {quote?.author}</p>
                </em>
              ) : (
                <p className="center-div">Loading...</p>
              )}
            </Card.Body>
          </Card>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <Calendar />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-md-3">
          <Link to="/department" className="text-decoration-none">

          <Card className="tab-card mb-3">
            <Card.Body className="d-flex justify-content-center align-items-center">
              {" "}
              <div className="text-center">
                <p>Department</p>
                <p>{counts.departments}</p>
              </div>{" "}
            </Card.Body>
          </Card>
          </Link>
        </div>
        <div className="col-12 col-md-3">
        <Link to="/roles" className="text-decoration-none">
          <Card className="tab-card mb-3">
            <Card.Body className="d-flex justify-content-center align-items-center">
              {" "}
              <div className="text-center" style={{fontWeight: "700", fontSize: "18px"}}>
                <p>Roles</p>
                <p>{counts.roles}</p>
              </div>{" "}
            </Card.Body>
          </Card>
          </Link>
        </div>
        <div className="col-12 col-md-3">
        <Link to="/courses" className="text-decoration-none">
          <Card className="tab-card mb-3">
            <Card.Body className="d-flex justify-content-center align-items-center">
              {" "}
              <div className="text-center" style={{fontWeight: "700", fontSize: "18px"}}>
                <p>Courses</p>
                <p>{counts.courses}</p>
              </div>{" "}
            </Card.Body>
          </Card>
          </Link>
        </div>
        <div className="col-12 col-md-3">
        <Link to="/users" className="text-decoration-none">
          <Card className="tab-card mb-3">
            <Card.Body className="d-flex justify-content-center align-items-center">
              {" "}
              <div className="text-center" style={{fontWeight: "700", fontSize: "18px"}}>
                <p>Users</p>
                <p>{counts.users}</p>
              </div>{" "}
            </Card.Body>
          </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

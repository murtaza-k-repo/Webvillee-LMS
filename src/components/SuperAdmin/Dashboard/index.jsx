import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [quote, setQuote] = useState("");

  const getQuote = async () => {
    try {
      let response = await axios.get(
        "https://api.api-ninjas.com/v1/quotes?category=inspirational",
        {
          headers: {
            "X-Api-Key": "ZoQoyoFW+bDqoobsRJHY4A==36B4D6SVn1X9CYlG",
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

  useEffect(() => {
    getQuote();
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
                <p>0</p>
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
                <p>0</p>
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
                <p>0</p>
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
                <p>0</p>
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

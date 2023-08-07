import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";

import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Button, Form, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "./style.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const originalRows = [
  {
    sno: 1,
    role_name: "HR",
    role_description: "Human Resources Manager",
    department_name: "Human Resources",
  },
  {
    sno: 2,
    role_name: "ReactJs Developer",
    role_description: "Frontend technologies developer",
    department_name: "Development",
  },
  {
    sno: 3,
    role_name: "NodeJS Developer",
    role_description: "Bachend technologies developer",
    department_name: "Development",
  },
  {
    sno: 4,
    role_name: "Motion Artist",
    role_description: "Create and design animations",
    department_name: "Animation",
  },
];

const Roles = () => {
  const [rows, setRows] = useState(originalRows);
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
  const [searched, setSearched] = useState("");
  const classes = useStyles();

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShow(false);
    console.log(event.target[0].value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    setShowUpdateModal(false);
    console.log(event.target[0].value);
  };

  return (
    <>
      <Paper className="mt-4">
        <div className="d-flex">
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            style={{ width: "80%" }}
          />
          <Button
            className={"addBtn"}
            style={{ width: "20%" }}
            onClick={() => setShow(true)}
            variant="primary"
          >
            <FaPlus size={20} />
          </Button>{" "}
        </div>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.sno}>
                  <TableCell component="th" scope="row">
                    {row.sno}
                  </TableCell>
                  <TableCell>{row.role_name}</TableCell>
                  <TableCell>{row.role_description}</TableCell>
                  <TableCell>{row.department_name}</TableCell>
                  <TableCell>
                    <>
                      <Button
                        className="text-success"
                        variant="outlined"
                        onClick={() => { setShowUpdateModal(true); setUpdateValue(row.name); }}
                      >
                        <BiSolidPencil size={22} />
                      </Button>
                      <Button className="text-danger" variant="outlined">
                        <MdDelete size={22} />
                      </Button>
                    </>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
          <div class="form-group">
            <select class="form-control mb-2" id="exampleFormControlSelect1" required>
              <option disabled selected>Select department</option>
              <option>HR</option>
              <option>Development</option>
              <option>SalesForce</option>
              <option>Animation</option>
              <option>Sales</option>
            </select>
          </div>
            <div class="form-group mb-2">
              <input
                type="text"
                class="form-control"
                id="role"
                aria-describedby="role"
                placeholder="Enter role"
                required
              />
            </div>
            <div class="form-group mb-2">
              <textarea
                rows={2}
                class="form-control"
                id="description"
                aria-describedby="description"
                placeholder="Enter description"
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button type="submit" className="addBtn" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showUpdateModal}>
        <Modal.Header>
          <Modal.Title>Update Department</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdate}>
          <Modal.Body>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="department"
                aria-describedby="department"
                placeholder="Enter department"
                value={updateValue}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowUpdateModal(false)}
            >
              Close
            </Button>
            <Button type="submit" className="addBtn" variant="primary">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Roles;

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
    name: "Development",
  },
  {
    sno: 2,
    name: "Animation",
  },
  {
    sno: 3,
    name: "Salesforce",
  },
];

const Department = () => {
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
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.sno}>
                  <TableCell component="th" scope="row">
                    {row.sno}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
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
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="department"
                aria-describedby="department"
                placeholder="Enter department"
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

export default Department;

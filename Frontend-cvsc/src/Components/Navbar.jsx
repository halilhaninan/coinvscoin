import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Navbarr = () => {
  const navigate = useNavigate();
  const kullanici = JSON.parse(localStorage.getItem("user"));
  const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

  const logout = () => {
    JSON.parse(localStorage.removeItem("user"));
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          Coin
          <img
            src="https://img.icons8.com/emoji/48/000000/vs-button-emoji.png"
            alt="test"
          />
          Coin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 300, backgroundColor: "white", borderRadius: 10 }}
              renderInput={(params) => (
                <TextField {...params} label="Coin name or Contract" />
              )}
            /> */}
            {!kullanici ? (
              <>
                <Nav.Link href="#deets">
                  <a href="/register">
                    <button className="btn btn-outline-info ">Register</button>
                  </a>
                  <a href="/login">
                    <button className="btn btn-outline-info mx-5 ">
                      Login
                    </button>
                  </a>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="#deets">
                  <a href="/register">
                    <button onClick={logout} className="btn btn-outline-info">
                      Log out
                    </button>
                  </a>
                </Nav.Link>
              </>
            )}

            <Nav.Link href="#deets">
              <a href="https://twitter.com/coinvscoinio" target="_blank">
                <img
                  src="https://img.icons8.com/color/30/000000/twitter--v1.png"
                  alt="test"
                />
              </a>
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              <img
                src="https://img.icons8.com/color/30/000000/telegram-app--v1.png"
                alt="test
              "
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;

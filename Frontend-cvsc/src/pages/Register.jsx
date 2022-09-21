import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbarr from "../Components/Navbar";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function Register() {
  const kullanici = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    kullaniciAd: "",
    email: "",
    parola: "",
    parolaKontrol: "",
  });

  const { kullaniciAd, email, parola, parolaKontrol } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    if (parola !== parolaKontrol) {
      toast.error("pw did not match");
    } else {
      const userData = {
        kullaniciAd,
        email,
        parola,
      };
      console.log(userData);
      axios
        .post(`https://backend-cvsc.vercel.app/api/kullanicilar/`, userData)
        .then((response) => {
          console.log(response);
          toast.success("Success!!");

          localStorage.setItem("user", JSON.stringify(response.data));
          setTimeout(() => {
            navigate("/");
          }, 2500);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (kullanici) {
    navigate("/");
  }

  useEffect(() => {
    if (kullanici) {
      navigate("/");
    }
  }, [kullanici, navigate]);

  return (
    <div className=" register">
      <Navbarr />

      <div className="container-fluid col-md-12 row">
        <div className="col-md-6 mt-5 p-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="img-fluid"
            alt="Phone image2"
          />
        </div>
        <div className="col-md-6  d-flex align-content-around row">
          <form className=" row" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                classname="form-control"
                id="kullaniciAd"
                name="kullaniciAd"
                value={kullaniciAd}
                placeholder="user name"
                onChange={onChange}></input>
            </div>
            <div className="form-group">
              <input
                type="email"
                classname="form-control mt-5"
                id="email"
                name="email"
                value={email}
                placeholder="email"
                onChange={onChange}></input>
            </div>
            <div className="form-group">
              <input
                type="password"
                classname="form-control mt-5"
                id="parola"
                name="parola"
                value={parola}
                placeholder="password"
                onChange={onChange}></input>
            </div>
            <div className="form-group">
              <input
                type="password"
                classname="form-control"
                id="parolaKontrol"
                name="parolaKontrol"
                value={parolaKontrol}
                placeholder="verify password"
                onChange={onChange}></input>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-info mt-5 login-register"
                style={{ width: 175 }}>
                Register
              </button>
            </div>
          </form>
          <div className="pt-5">
            <MDBBtn
              disabled={true}
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#3b5998" }}>
              <MDBIcon fab icon="facebook-f" className="mx-2" />
              Continue with Facebook
            </MDBBtn>
            <MDBBtn
              disabled={true}
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#EA4335" }}>
              <MDBIcon fab icon="facebook-f" className="mx-2" />
              Continue with Google
            </MDBBtn>
            <MDBBtn
              disabled={true}
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#55acee" }}>
              <MDBIcon fab icon="twitter" className="mx-2" />
              Continue with Twitter
            </MDBBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpComponent.css";

export default function SignUp() {
  useEffect(() => {
    getGenders();
    getroles();
    getStates();
  }, []);

  const navigate = useNavigate();

  // all locatins
  const [locations, setLocations] = useState([]);

  // all genders
  const [genders, setGenders] = useState([]);

  // all roles
  const [roles, setRoles] = useState([]);

  // all states
  const [states, setStates] = useState([]);

  // all Cities
  const [cities, setCities] = useState([]);

  // to get form data
  const fname = useRef();
  const mname = useRef();
  const lname = useRef();
  const mnumber = useRef();
  const email = useRef();
  const bdate = useRef();
  const uname = useRef();
  const pass = useRef();
  const address = useRef();
  const gend = useRef();
  const rol = useRef();
  const locat = useRef();
  const state = useRef();
  const city = useRef();
  const img = useRef();

  function SignUp() {
    let first_name = fname.current.value;
    let middle_name = mname.current.value;
    let last_name = lname.current.value;
    let mobile_number = mnumber.current.value;
    let email_address = email.current.value;
    let birth_date = bdate.current.value;
    let user_name = uname.current.value;
    let password = pass.current.value;
    let local_address = address.current.value;
    let gender = gend.current.value;
    let role = rol.current.value;
    let location = locat.current.value;
    let image = img.current.files[0];
    if (image === undefined) {
      image="null"
    }
    let data = new FormData();
    const obj = {
      first_name,
      middle_name,
      last_name,
      local_address,
      birth_date,
      joining_date: new Date().toLocaleDateString(),
      mobile_number,
      email_address,
      user_name,
      password,
      gender: { gender_id: gender },
      location: { location_id: location },
      role: { role_id: role },
    };
    let stringobj = JSON.stringify(obj);
    // console.log(stringobj);
    data.append("img", image);
    data.append("data", stringobj);
    axios
      .post("http://localhost:9090/api/users", data)
      .then((resp) => {
        if (resp.data === "User added") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // to get locati0ns
  function getLocations() {
    console.log("hello");
    axios({
      url: "http://localhost:9090/api/location/city/" + city.current.value,
      method: "get",
      contentType: "application/json",
    }).then((resp) => {
      setLocations(resp.data);
      console.log(resp.data);
    });
  }

  // to get genders
  function getGenders() {
    axios({
      url: "http://localhost:9090/api/gender",
      method: "get",
      contentType: "application/json",
    }).then((resp) => {
      setGenders(resp.data);
    });
  }

  // to get all stat
  function getStates() {
    city.current.value = "Select city";
    locat.current.value = "Select location";
    axios({
      url: "http://localhost:9090/api/states",
      method: "get",
      contentType: "application/json",
    }).then((resp) => {
      setStates(resp.data);
    });
  }

  function getCities() {
    axios({
      url: "http://localhost:9090/api/cities/state/" + state.current.value,
      method: "get",
      contentType: "application/json",
    }).then((resp) => {
      setCities(resp.data);
    });
  }
  function getroles() {
    axios({
      url: "http://localhost:9090/api/role",
      method: "get",
      contentType: "application/json",
    }).then((resp) => {
      setRoles(resp.data);
    });
  }

  return (
    <>
      <div className="signup-container">
        <h2>Create account</h2>
        <form>
          <div className="signup-form">
            <div className="signup-form-group">
              <input type="text" placeholder="First name" ref={fname} />
              <span></span>
            </div>
            <div className="signup-form-group">
              <input type="text" placeholder="Middle name" ref={mname} />
              <span></span>
            </div>
            <div className="signup-form-group">
              <input type="text" placeholder="Last name" ref={lname} />
              <span></span>
            </div>
            <div className="signup-form-group">
              <input type="text" placeholder="Email" ref={email} />
              <span></span>
            </div>
            <div className="signup-form-group">
              <input type="text" placeholder="Mobile number" ref={mnumber} />
              <span></span>
            </div>
            <div className="signup-form-group">
              <input type="date" placeholder="Birth date" ref={bdate} />
              <span></span>
            </div>
            <div className="signup-form-group">
              <select
                defaultValue="Select state"
                onChange={getCities}
                ref={state}
              >
                <option disabled>Select state</option>
                {states.map((d, k) => {
                  return (
                    <option key={k} value={d.state_id}>
                      {d.state_name}
                    </option>
                  );
                })}
              </select>
              <span></span>
            </div>
            <div className="signup-form-group">
              <select
                defaultValue="Select city"
                ref={city}
                onChange={getLocations}
              >
                <option disabled>Select city</option>
                {cities.map((d, k) => {
                  return (
                    <option key={k} value={d.city_id}>
                      {d.city_name}
                    </option>
                  );
                })}
              </select>
              <span></span>
            </div>
            <div className="signup-form-group">
              <select defaultValue="Select location" ref={locat}>
                <option disabled>Select location</option>
                {locations.map((d) => {
                  return (
                    <option key={d.location_id} value={d.location_id}>
                      {d.location_name}
                    </option>
                  );
                })}
              </select>
              <span></span>
            </div>
            <div className="signup-form-group">
              <input type="text" placeholder="Local address" ref={address} />
              <span></span>
            </div>
            <div className="signup-form-group">
              <select defaultValue="Select gender" ref={gend}>
                <option disabled>Select gender</option>
                {genders.map((d) => {
                  return (
                    <option key={d.gender_id} value={d.gender_id}>
                      {d.gender}
                    </option>
                  );
                })}
              </select>
              <span></span>
            </div>
            <div className="signup-form-group">
              <select defaultValue="Select role" ref={rol}>
                <option disabled>Select role</option>
                {roles.map((d) => {
                  return (
                    <option key={d.role_id} value={d.role_id}>
                      {d.role}
                    </option>
                  );
                })}
              </select>
              <span></span>
            </div>
            <div className="signup-form-group">
              <input type="text" placeholder="Username" ref={uname} />
              <span></span>
            </div>
            <div className="signup-form-group">
              <input type="text" placeholder="Password" ref={pass} />
              <span></span>
            </div>
            <div className="signup-form-group">
              <input type="text" placeholder="Retype password" />
              <span></span>
            </div>
            <div className="signup-form-group">
              <input type="file" placeholder="jkjnmnm" ref={img} />
              <span></span>
            </div>
          </div>
          <div>
            <input type="button" value="Create account" onClick={SignUp} />
          </div>
        </form>
        <div>
          <p className="have-account">
            have an account
            <span onClick={() => navigate("/")}> log in</span>
          </p>
        </div>
      </div>
    </>
  );
}

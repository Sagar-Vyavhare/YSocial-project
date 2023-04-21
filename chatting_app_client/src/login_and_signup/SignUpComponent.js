import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignUpComponent() {
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [locations, setLocations] = useState([]);
  const [roles, setRoles] = useState([]);
  const [gender, setGender] = useState();
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const [ishidden, setIshidden] = useState(true);

  useEffect(() => {
    getStates();
    getRoles();
  }, []);

  const getRoles = () => {
    axios({
      url: "http://localhost:9090/api/role",
      method: "get",
      contentType: "application/json",
    })
      .then((resp) => {
        setRoles(resp.data);
      })
      .catch((reson) => {
        message(reson.message, "bg-danger rounded-bottom");
      });
  };

  const getStates = () => {
    axios({
      url: "http://localhost:9090/api/states",
      method: "get",
      contentType: "application/json",
    })
      .then((resp) => {
        setStates(resp.data);
      })
      .catch((reson) => {
        message(reson.message, "bg-danger rounded-bottom");
      });
  };

  const txtstate = useRef();
  const txtcity = useRef();
  const txtlocation = useRef();

  const getCity = () => {
    txtcity.current.value = "Select city";
    txtlocation.current.value = "Select location";

    axios({
      url: "http://localhost:9090/api/cities/state/" + txtstate.current.value,
      method: "get",
      contentType: "application/json",
    })
      .then((resp) => {
        setCity(resp.data);
      })
      .catch((reson) => {
        message(reson.message, "bg-danger rounded-bottom");
      });
  };

  const getLocations = () => {
    txtlocation.current.value = "Select location";
    axios({
      url: "http://localhost:9090/api/location/city/" + txtcity.current.value,
      method: "get",
      contentType: "application/json",
    })
      .then((resp) => {
        setLocations(resp.data);
      })
      .catch((reson) => {
        message(reson.message, "bg-danger rounded-bottom");
      });
  };

  const txtfirst = useRef();
  const txtmiddle = useRef();
  const txtlast = useRef();
  const txtadress = useRef();
  const txtemail = useRef();
  const txtmobile = useRef();
  const txtbirth = useRef();
  const txtfile = useRef();
  const txtusername = useRef();
  const txtpass = useRef();
  const txtrepass = useRef();
  const txtrole = useRef();

  const signUp = () => {
    let password = txtpass.current.value;
    console.log(password);
    if (txtrepass.current.value === password) {
      console.log(password);
      let obj = {
        first_name: txtfirst.current.value,
        middle_name: txtmiddle.current.value,
        last_name: txtlast.current.value,
        local_address: txtadress.current.value,
        birth_date: txtbirth.current.value,
        joining_date: new Date().toLocaleDateString(),
        user_photo: txtfile.current.value,
        mobile_number: txtmobile.current.value,
        email_address: txtemail.current.value,
        user_name: txtusername.current.value,
        password: password,
        gender: { gender_id: gender },
        location: { location_id: txtlocation.current.value },
        role: { role_id: txtrole.current.value },
      };
      axios({
        url: "http://localhost:9090/api/users",
        method: "post",
        data: obj,
        contentType: "application/json",
      })
        .then((resp) => {
          message(resp.data, "bg-success rounded-bottom");
          if (resp.data === "User added ") {
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        })
        .catch((reson) => {
          message(reson.message, "bg-danger rounded-bottom");
        });
    }
  };
  const message = (msg, type) => {
    setMsg(msg);
    setMsgType(type);
    setIshidden(false);
  };

  const getGender = (gender) => {
    setGender(gender);
  };
  const navigate = useNavigate();

  // form validation



  let [rePassword, setRepassBorder] = useState("border-none");
  let [Password, setpassBorder] = useState("border-none");
  let [uname, setUname] = useState("border-none");
  let [vRole, SetVRole] = useState("border-none");
  let [vGender, SetVGender] = useState("border-none");
  let [vAddress, SetVAddress] = useState("border-none");
  let [vLocation, SetVLocation] = useState("border-none");
  let [vCity, SetVCity] = useState("border-none");
  let [vState, SetVState] = useState("border-none");
  let [vBirth, SetVBirth] = useState("border-none");
  let [vmobile, SetVmobile] = useState("border-none");
  let [vEmail, SetVEmail] = useState("border-none");
  let [vLastName, SetVLastName] = useState("border-none");
  let [vMiddle, SetVMiddle] = useState("border-none");
  let [vFirst, SetVFirst] = useState("border-none");

  const validateForm = () => {
    let returnValue = true;

    let mail = txtemail.current.value.match(
      /^[a-z0-9]{3,15}[@][a-z]{3,9}(\.)[a-z]{2,5}$/
    );

    let mobile = txtmobile.current.value.match(/^[0-9]{10}$/);

    let pass = txtpass.current.value.match(
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%&*!^])[\w@#$%&*!^]{8,15}$/
    );

    if (pass) {
      setpassBorder("border-none");

    } else {

      setpassBorder("border-danger");
      returnValue = true && false;
    }

    if (txtrole.current.value !== "Select role") {
      SetVRole("border-none");
    } else {
      SetVRole("border-danger");
      returnValue = true && false;
    }

    if (gender !== "") {
      SetVGender("border-none");
    } else {
      SetVGender("border-danger");
      returnValue = true && false;
    }

    if (txtadress.current.value !== "") {
      SetVAddress("border-none");
    } else {
      SetVAddress("border-danger");
      returnValue = true && false;
    }

    if (txtlocation.current.value !== "Select location") {
      SetVLocation("border-none");
    } else {
      SetVLocation("border-danger");
      returnValue = true && false;
    }

    if (txtcity.current.value !== "Select city") {
      SetVCity("border-none");
    } else {
      SetVCity("border-danger");
      returnValue = true && false;
    }

    if (txtstate.current.value !== "Select state") {
      SetVState("border-none");
    } else {
      SetVState("border-danger");
      returnValue = true && false;
    }

    if (txtbirth.current.value !== "") {
      SetVBirth("border-none");
    } else {
      SetVBirth("border-danger");
      returnValue = true && false;
    }

    if (mobile) {
      SetVmobile("border-none");
    } else {
      SetVmobile("border-danger");
      returnValue = true && false;
    }

    if (mail) {
      SetVEmail("border-none");
    } else {
      SetVEmail("border-danger");
      returnValue = true && false;
    }

    if (txtfirst.current.value.match(/^[a-zA-Z]{3,11}$/)) {
      SetVFirst("border-none");
    } else {
      SetVFirst("border-danger");
      returnValue = true && false;
    }

    if (txtmiddle.current.value.match(/^[a-zA-Z]{3,11}$/)) {
      SetVMiddle("border-none");
    } else {
      SetVMiddle("border-danger");
      returnValue = true && false;
    }

    if (txtlast.current.value.match(/^[a-zA-Z]{3,11}$/)) {
      SetVLastName("border-none");
    } else {
      SetVLastName("border-danger");
      returnValue = true && false;
    }
    console.log(returnValue);;
    return returnValue;
  };

  const usernameExist = () => {
    let userName = txtusername.current.value;

    let isUserNameCorrect = userName.match(/^[\w-]{4,15}$/);

    if (isUserNameCorrect) {
      if (isUserNameCorrect) {
        axios({
          url: "http://localhost:9090/api/users/username/" + userName,
          method: "get",
          contentType: "application/json",
        }).then((resp) => {
          console.log(resp.data);
          if (resp.data) {
            setUname("border-danger outline-none");
          } else {
            setUname("border-none");
            return true;
          }
        });
      }
      setUname("border-none");
    } else {
      setUname("border-danger");
    }
  };
  const chechEqual = () => {
    let repass = txtrepass.current.value;

    if (txtpass.current.value === repass) {
      setRepassBorder("border-none");
    } else {
      setRepassBorder("border-danger");
    }
  };

  return (
    <>
      <div
        className="position-relative "
        style={{ zIndex: "1", width: "60vw" }}
      >
        <Toast
          className="position-absolute top-0 end-0"
          onClose={() => setIshidden(true)}
          hidden={ishidden}
        >
          <Toast.Header>
            <strong>Message</strong>
          </Toast.Header>
          <Toast.Body className={msgType}>
            <h3 className="text-light">{msg}</h3>
          </Toast.Body>
        </Toast>
      </div>
      <div>
        <Card className="mx-auto my-3 shadow" style={{ width: "43vw" }}>
          <Card.Header className="text-bg-success">
            <h1 className="text-center">Create a new account</h1>
          </Card.Header>
          <Form>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      className={vFirst}
                      onClick={() => SetVFirst("border_none")}
                      ref={txtfirst}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Middle name"
                      className={vMiddle}
                      onClick={() => SetVMiddle("border-none")}
                      ref={txtmiddle}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      className={vLastName}
                      onClick={() => SetVLastName("border-none")}
                      ref={txtlast}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email address"
                      ref={txtemail}
                      onClick={() => SetVEmail("border-none")}
                      className={vEmail}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Mobile number"
                      ref={txtmobile}
                      className={vmobile}
                      onClick={() => SetVmobile("border-none")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Birth date"
                      ref={txtbirth}
                      className={vBirth}
                      onClick={() => SetVBirth("border-none")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Select
                      onChange={() => getCity()}
                      ref={txtstate}
                      className={vState}
                      defaultValue="Select state"
                      onClick={() => SetVState("border-none")}
                    >
                      <option disabled>Select state</option>
                      {states.map((d, k) => {
                        return (
                          <option key={k} value={d.state_id}>
                            {d.state_name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Select
                      onChange={() => getLocations()}
                      ref={txtcity}
                      className={vCity}
                      defaultValue="Select city"
                      onClick={() => SetVCity("border-none")}
                    >
                      <option disabled>Select city</option>
                      {city.map((d, k) => {
                        return (
                          <option key={k} value={d.city_id}>
                            {d.city_name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={5}>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Select
                      ref={txtlocation}
                      className={vLocation}
                      defaultValue="Select location"
                      onClick={() => SetVLocation("border-none")}
                    >
                      <option disabled>Select location</option>
                      {locations.map((d, k) => {
                        return (
                          <option key={k} value={d.location_id}>
                            {d.location_name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Local address"
                      ref={txtadress}
                      className={vAddress}
                      onClick={() => SetVAddress("border-none")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <Form.Group className="d-flex mt-4 mb-0">
                    <Form.Label className="pe-1" for="Male">
                      Male
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      name="gender"
                      id="Male"
                      onClick={() => getGender(1)}
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Group className="d-flex mt-4 mb-0">
                    <Form.Label className="pe-1" for="Female">
                      Female
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      name="gender"
                      id="Female"
                      onClick={() => getGender(2)}
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Group className="d-flex mt-4 mb-0">
                    <Form.Label className="pe-1" for="custom">
                      Custom
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      id="custom"
                      name="gender"
                      className="d-inline"
                      onClick={() => getGender(3)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Select
                      ref={txtrole}
                      className={vRole}
                      defaultValue="Select role"
                      onClick={() => SetVRole("border-none")}
                    >
                      <option disabled>Select role</option>
                      {roles.map((d, k) => {
                        return (
                          <option key={k} value={d.role_id}>
                            {d.role}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="User name"
                      className={uname}
                      ref={txtusername}
                      onKeyUp={usernameExist}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control size="sm" type="file" ref={txtfile} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className={Password}
                      ref={txtpass}
                      onClick={()=>setpassBorder("border-none")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Retype password"
                      className={rePassword}
                      ref={txtrepass}
                      onBlur={chechEqual}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col>
                  <Button
                    onClick={() =>
                      validateForm()
                        ? signUp()
                        : false
                    }
                  >
                    Sign Up
                  </Button>
                  <span className="ms-4 h6">
                    Allredy have an account{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/")}
                    >
                      Sign In
                    </span>
                  </span>
                </Col>
              </Row>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    </>
  );
}

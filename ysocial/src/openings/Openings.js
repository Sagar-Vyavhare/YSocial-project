import React, { useEffect, useState } from "react";
import "./Openings.css";
import axios from "axios";
import Demo from "./demo";
export default function Openings() {
  // to store all openings
  const [openings_Data, set_Openings_Data] = useState([]);

  // to call before the coponent render
  useEffect(() => {
    getAllJobOpenings();
  }, []);

  // to get all the openings
  const getAllJobOpenings = async () => {
    await axios
      .get("http://localhost:9090/api/job_openings")
      .then((resp) => set_Openings_Data(resp.data));
  };

  return (
    <>
      {openings_Data.map((data, k) => {
        return <Demo User_data={data} key={k} />;
      })}
    </>
  );
}

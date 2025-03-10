"use client";
import React, { useState } from "react";
import "./BPMN_Prover.css";
import ProofHandler from "./proofhandler";

const BPMN = () => {
  const [expectedFile, setExpectedFile] = useState(null);
  const [actualFile, setActualFile] = useState(null);
  const [booleanResult, setBooleanResult] = useState(null);
  const [selectExp, setSelectExp] = useState("scf");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, type) => {
    if (e.target.files) {
      if (type === "expected") {
        setExpectedFile(e.target.files[0]);
      }
      if (type === "actual") {
        setActualFile(e.target.files[0]);
      }
      setBooleanResult(null); // Reset result to ensure reprocessing
    }
  };

  const handleProcessFiles = async () => {
    if (expectedFile && actualFile) {
      console.log("Expected File: ", expectedFile);
      console.log("Actual File: ", actualFile); // This should print the updated files
      try {
        const formData1 = new FormData();
        setLoading(true);
        console.log("loading:", loading);
        formData1.append("file", expectedFile);
        const formData2 = new FormData();
        formData2.append("file", actualFile);

        // Send both files to the backend
        //localhost replaced with vercel app link
        const expResult = await fetch(
          "https://bpmn-python-backend.onrender.com/upload/",
          {
            method: "POST",
            body: formData1,
          }
        );

        const exp = await expResult.json();
        console.log("Expected Result:", exp.expression);
        const actResult = await fetch(
          "https://bpmn-python-backend.onrender.com/upload/",
          {
            method: "POST",
            body: formData2,
          }
        );
        const act = await actResult.json();
        console.log("Actual Result:", act.expression);

        console.log("Expected Path Chosen:", selectExp);

        // const resultResponse = await fetch('http:localhost:4000/api/verify-bpmn');
        // const resultData = await resultResponse.json();
        // setBooleanResult(resultData.isVerified);

        const resultResponse = await fetch(
          "https://bpmn-node-backend.onrender.com/api/verify-bpmn",
          {
            method: "POST", // Use POST or another appropriate method
            headers: {
              "Content-Type": "application/json", // Specify content type
            },
            body: JSON.stringify({
              expectedPath: selectExp,
              actualPath: act.expression,
            }), // Convert your JSON object to a string
          }
        );
        const resultData = await resultResponse.json();
        resultData.isVerified
          ? setBooleanResult(resultData.isVerified)
          : setBooleanResult(null);
      } catch (error) {
        console.error("Error processing files:", error);
        alert("An error occurred while processing the files.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please upload both files to proceed.");
    }
  };

  const handleSendTXN = async () => {
    if (expectedFile && actualFile) {
      console.log("Expected File: ", expectedFile);
      console.log("Actual File: ", actualFile); // This should print the updated files
      try {
        const formData1 = new FormData();
        setLoading(true);
        console.log("loading:", loading);
        formData1.append("file", expectedFile);
        const formData2 = new FormData();
        formData2.append("file", actualFile);

        // Send both files to the backend
        //localhost replaced with vercel app link
        const expResult = await fetch(
          "https://bpmn-python-backend.onrender.com/upload/",
          {
            method: "POST",
            body: formData1,
          }
        );

        const exp = await expResult.json();
        console.log("Expected Result:", exp.expression);
        const actResult = await fetch(
          "https://bpmn-python-backend.onrender.com/upload/",
          {
            method: "POST",
            body: formData2,
          }
        );
        const act = await actResult.json();
        console.log("Actual Result:", act.expression);

        // const resultResponse = await fetch('http:localhost:4000/api/verify-bpmn');
        // const resultData = await resultResponse.json();
        // setBooleanResult(resultData.isVerified);

        const resultRes = await fetch(
          "https://bpmn-node-backend.onrender.com/api/getTxn",
          {
            method: "POST", // Use POST or another appropriate method
            headers: {
              "Content-Type": "application/json", // Specify content type
            },
            body: JSON.stringify({
              expectedPath: exp.expression,
              actualPath: act.expression,
            }), // Convert your JSON object to a string
          }
        );
        const resultData = await resultRes.json();
        console.log(resultData);
        // resultData.isVerified ? setBooleanResult(resultData.isVerified) : setBooleanResult(null);
      } catch (error) {
        console.error("Error processing files:", error);
        alert("An error occurred while processing the files.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please upload both files to proceed.");
    }
  };

  return (
    <div className="container">
      <ProofHandler />
      <footer className="footer">
        <div className="actions">
          <button
            onClick={handleSendTXN}
            className="action-button"
            onClick={() => alert("Proof generated")}
          >
            SEND TXN (GEN & VERIFY PROOF)
          </button>
          <button
            className="action-button"
            onClick={() => alert("Verification completed")}
          >
            GET TXN
          </button>
        </div>
        <p className="evaluation">
          EXPECTED VS ACTUAL EVALUATION IS:{" "}
          <b>
            {booleanResult !== null ? booleanResult.toString() : "PASS/FAIL"}
          </b>
        </p>
      </footer>
    </div>
  );
};

export default BPMN;

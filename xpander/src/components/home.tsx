"use client";
import React from "react";
import "./BPMN_Prover.css";
import ProofHandler from "./proofhandler";

const HomePage = () => {
   return (
      <div className="container">
         <ProofHandler />
         <footer className="footer">
            <div className="actions">
               <button className="action-button">
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
                  {/* {booleanResult !== null ? booleanResult.toString() : "PASS/FAIL"} */}
               </b>
            </p>
         </footer>
      </div>
   );
};

export default HomePage;

"use client";
import React from "react";
import "./BPMN_Prover.css";
import ProofHandler from "./proofhandler";
import ComplianceSearch from "./complianceSearch";

const Homepage = () => {

   return (
      <div className="container">
         <ComplianceSearch />
         <ProofHandler />
         <footer className="footer">
            <div className="actions">
               <button
                  className="action-button"
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

         </footer >
      </div >
   );
};

export default Homepage;

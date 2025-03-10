// components/ProofHandler.tsx
'use client';

import { useState } from 'react';

export default function ProofHandler() {
   const [witness, setWitness] = useState<ArrayBuffer>();
   const [proof, setProof] = useState<ArrayBuffer>();
   const [status, setStatus] = useState<string>();

   const handleWitnessUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const buffer = await file.arrayBuffer();
         setWitness(buffer);
      }
   };

   const generateProof = async () => {
      if (!witness) return;

      try {
         const response = await fetch('/api/prove', {
            method: 'POST',
            body: witness
         });

         if (!response.ok) throw new Error('Proof generation failed');
         const proofBuffer = await response.arrayBuffer();
         setProof(proofBuffer);
         setStatus('Proof generated successfully');
      } catch {
         setStatus('Proof generation failed');
      }
   };

   const verifyProof = async () => {
      if (!witness || !proof) return;

      try {
         // Prepare verification input
         // const witnessView = new DataView(witness);
         // const proofView = new DataView(proof);

         const verifierInput = new Uint8Array(
            witness.byteLength + proof.byteLength + 16
         );

         // Write lengths (little-endian)
         new DataView(verifierInput.buffer).setBigUint64(0, BigInt(witness.byteLength), true);
         new DataView(verifierInput.buffer).setBigUint64(8, BigInt(proof.byteLength), true);

         // Add witness and proof data
         verifierInput.set(new Uint8Array(witness), 16);
         verifierInput.set(new Uint8Array(proof), 16 + witness.byteLength);

         const response = await fetch('/api/verify', {
            method: 'POST',
            body: verifierInput
         });

         const result = await response.text();
         setStatus(result === 'success'
            ? 'Proof verified successfully'
            : 'Proof verification failed');
      } catch {
         setStatus('Verification error');
      }
   };

   return (
      <div className="flex flex-col gap-4 p-4 w-[80vw]  items-center">
         <div className="process-section">
            <h3 className="section-title">Witness</h3>

            <div className="button-container text-sm">
               <input
                  type="file"
                  id="upload-expected"
                  className="file-input w-full"
                  accept='.txt'
                  onChange={handleWitnessUpload}
               />
            </div>

         </div>
         {/* <input
            type="file"
            onChange={handleWitnessUpload}
            accept=".txt"
         /> */}

         <button
            onClick={generateProof}
            className="bg-blue-500 text-white p-2 rounded"
         >
            Generate Proof
         </button>

         {proof && (
            <button
               onClick={verifyProof}
               className="bg-green-500 text-white p-2 rounded"
            >
               Verify Proof
            </button>
         )}

         {status && <p className="mt-4">{status}</p>}
      </div>
   );
}

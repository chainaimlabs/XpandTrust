// components/ComplianceSearch.tsx
'use client';

import { useState } from 'react';
import WitnessGenerator from './generateWitness';

interface ComplianceData {
   corporateRegistry: any;
   eximDetails: any;
   gleifInfo: any;
}

export default function ComplianceSearch() {
   const [query, setQuery] = useState('');
   const [data, setData] = useState<ComplianceData | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleSearch = async () => {
      if (!query.trim()) return;

      setLoading(true);
      setError(null);
      console.log(data)

      try {
         const response = await fetch(`/api/compliance?companyName=${encodeURIComponent(query)}`);

         if (!response.ok) {
            throw new Error('Company not found');
         }

         const result = await response.json();
         setData(result);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to fetch data');
         setData(null);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="max-w-4xl mx-auto p-6">
         <div className="flex gap-4 mb-8">
            <input
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Enter company name..."
               className="flex-1 p-2 border rounded"
            />
            <button
               onClick={handleSearch}
               disabled={loading}
               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
               {loading ? 'Searching...' : 'Search'}
            </button>
         </div>

         {error && (
            <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
               {error}
            </div>
         )}

         {data && (
            <div className="space-y-6">
               {/* Corporate Registry Section */}
               <div className="p-6 bg-white rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">Corporate Registry Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                     <DataItem label="CIN" value={data.corporateRegistry.CIN} />
                     <DataItem label="Company Name" value={data.corporateRegistry['Company Name']} />
                     <DataItem label="Registration Number" value={data.corporateRegistry['Registration Number']} />
                     <DataItem label="Incorporation Date" value={data.corporateRegistry['Incorporation Date']} />
                     <DataItem label="Company Type" value={data.corporateRegistry['Company Type']} />
                     <DataItem label="Authorized Capital" value={data.corporateRegistry['Authorized Capital']} />
                  </div>
               </div>

               {/* EXIM Details Section */}
               <div className="p-6 bg-white rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">EXIM Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                     <DataItem label="IEC Status" value={data.eximDetails.iecStatus} />
                     <DataItem label="DGFT ID" value={data.eximDetails['DGFT ID']} />
                     <DataItem label="Compliance Status" value={data.eximDetails.activeComplianceStatusCode === 1 ? 'Compliant' : 'Non-Compliant'} />
                  </div>
               </div>

               {/* GLEIF Information Section */}
               <div className="p-6 bg-white rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">GLEIF Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                     <DataItem label="GLEIF ID" value={data.gleifInfo['GLEIF ID']} />
                     <DataItem label="Compliance Level" value={`Level ${data.gleifInfo.level}`} />
                  </div>
               </div>
               <WitnessGenerator active={data.corporateRegistry.activeComplianceStatusCode} b={1} c={1} />
            </div>
         )}
      </div>
   );
}

function DataItem({ label, value }: { label: string; value: string | number }) {
   return (
      <div className="border-b pb-2">
         <dt className="text-sm font-medium text-gray-500">{label}</dt>
         <dd className="mt-1 text-sm text-gray-900">{value}</dd>
      </div>
   );
}

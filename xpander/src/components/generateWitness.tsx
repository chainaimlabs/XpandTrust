'use client';

export default function WitnessGenerator({ active, b, c }: { active: number; b: number; c: number }) {
   const generateWitness = async () => {
      try {
         const response = await fetch('/api/witness', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               a: active,
               b,
               target: c,
            }),
         });

         if (!response.ok) throw new Error('Generation failed');

         const blob = await response.blob();
         const url = window.URL.createObjectURL(blob);

         // Create download link
         const a = document.createElement('a');
         a.href = url;
         a.download = 'witness.txt';
         document.body.appendChild(a);
         a.click();
         window.URL.revokeObjectURL(url);
      } catch (error) {
         console.error('Error generating witness:', error);
      }
   };

   return (
      <button
         onClick={generateWitness}
         className="bg-blue-500 text-white px-4 py-2 rounded"
      >
         Generate Witness
      </button>
   );
}

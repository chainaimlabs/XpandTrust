// app/api/generate-witness/route.ts
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
   try {
      const { a, b, target } = await request.json();

      if (!a || !b || !target) {
         return NextResponse.json(
            { error: 'Missing parameters' },
            { status: 400 }
         );
      }
      const response = await fetch('http://localhost:3031/generate-witness', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            a,
            b,
            target // Assuming 'c' is the target value
         })
      });

      if (!response.ok) {
         throw new Error('Generation failed');
      }

      const witnessData = await response.arrayBuffer();
      console.log(witnessData)

      return new Response(witnessData, {
         headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename="witness.txt"'
         }
      });
   } catch (error) {
      console.error('Error generating witness:', error);
      return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
      );
   }
}

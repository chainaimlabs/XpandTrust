// app/api/prove/route.ts
export async function POST(request: Request) {
   try {
      const buffer = await request.arrayBuffer();

      // Forward to proof generation service
      const proveResponse = await fetch('http://127.0.0.1:3030/prove', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': buffer.byteLength.toString()
         },
         body: new Uint8Array(buffer)
      });

      if (!proveResponse.ok) {
         return new Response('Proof generation failed', { status: 400 });
      }

      const proof = await proveResponse.arrayBuffer();
      console.log(proof)
      return new Response(proof, {
         headers: {
            'Content-Type': 'application/octet-stream'
         }
      });
   } catch {
      return new Response('Internal server error', { status: 500 });
   }
}

// app/api/verify/route.ts

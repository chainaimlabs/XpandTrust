export async function POST(request: Request) {
   try {
      const buffer = await request.arrayBuffer();

      // Forward to verification service
      const verifyResponse = await fetch('http://127.0.0.1:3030/verify', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': buffer.byteLength.toString()
         },
         body: new Uint8Array(buffer)
      });

      const result = await verifyResponse.text();
      console.log(result)
      const state = result == "success" ? "true" : "false"
      const oracleRes = await fetch('http://localhost:3000/api/oracle', {
         method: 'POST',
         body: JSON.stringify({
            state: state
         })
      });
      console.log(oracleRes.ok)
      return new Response(result, {
         status: verifyResponse.ok ? 200 : 400
      });
   } catch {
      return new Response('Internal server error', { status: 500 });
   }
}

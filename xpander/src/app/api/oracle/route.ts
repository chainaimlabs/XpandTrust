// app/api/update-boolean/route.ts
import { NextResponse } from 'next/server';
// import { AptosClient, AptosAccount, TxnBuilderTypes } from 'aptos';
import { Aptos, AptosConfig, Ed25519PrivateKey, InputViewFunctionData, Network } from "@aptos-labs/ts-sdk";

const network = Network.LOCAL;
const config = new AptosConfig({ network });
export const client = new Aptos(config);
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const pk = PrivateKey.formatPrivateKey(PRIVATE_KEY as string, "ed25519" as any)

export const getSigner = async () => {
   const privateKey = new Ed25519PrivateKey(PRIVATE_KEY as string);
   const signer = await client.deriveAccountFromPrivateKey({ privateKey });
   console.log(signer)
   return signer
}


//
const acc = "3f0a8db44ee7b773f4a6b7d08a7ffbcd12d791152bae4c0246fd4c4a53505deb"
const modle = "boolean_data_oracle"

const writeAsyncModuleFunction = async (state: string) => {
   const signer = await getSigner();
   const txn = await client.transaction.build.simple({
      sender: signer.accountAddress,
      data: {
         function: `${acc}::${modle}::update_boolean_data`,
         typeArguments: [],
         functionArguments: [state]
      }
   })
   const commitedTxn = await client.signAndSubmitTransaction({
      signer: signer,
      transaction: txn
   })
   await client.waitForTransaction({ transactionHash: commitedTxn.hash })
   console.log(`Commited Transaction: ${commitedTxn.hash
      }`)
   return commitedTxn.hash
}

const viewBooleanFunction = async () => {
   const payload: InputViewFunctionData = {
      function: `${acc}::${modle}::get_boolean_data`,
      typeArguments: [],
      functionArguments: [`0x${acc}`]
   }
   const output = (await client.view({ payload }))
   console.log(output)
   return output
}


export async function GET() {
   try {
      // Validate environment setup
      if (!PRIVATE_KEY) {
         return NextResponse.json(
            { error: 'APTOS_PRIVATE_KEY not configured' },
            { status: 500 }
         );
      }
      // const txHash = await writeAsyncModuleFunction("false");
      const result = await viewBooleanFunction()

      return NextResponse.json({
         success: true,
         message: 'Boolean data updated successfully',
         data: result
      });

   } catch (error) {
      console.error('Error in update process:', error);
      return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
      );
   }
}
export async function POST(req: Request) {
   try {
      const { state } = await req.json()
      // Validate environment setup
      if (!PRIVATE_KEY) {
         return NextResponse.json(
            { error: 'APTOS_PRIVATE_KEY not configured' },
            { status: 500 }
         );
      }
      const txHash = await writeAsyncModuleFunction(String(state));

      return NextResponse.json({
         success: true,
         message: 'Boolean data updated successfully',
         transactionHash: txHash
      });

   } catch (error) {
      console.error('Error in update process:', error);
      return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
      );
   }
}

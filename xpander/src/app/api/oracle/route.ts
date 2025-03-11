// app/api/update-boolean/route.ts
import { NextResponse } from 'next/server';
import { AptosClient, AptosAccount, TxnBuilderTypes } from 'aptos';
import axios from 'axios';

// Initialize Aptos client from environment variables
const NODE_URL = process.env.APTOS_NODE_URL || 'http://127.0.0.1:8080';
const PRIVATE_KEY = process.env.APTOS_PRIVATE_KEY;

const client = new AptosClient(NODE_URL);
const account = new AptosAccount(Buffer.from(PRIVATE_KEY!, 'hex'));

async function fetchBooleanData(): Promise<boolean | null> {
   try {
      const response = await axios.get('http://localhost:3000/api/boolean-data');
      return response.data.value;
   } catch (error) {
      console.error('Error fetching boolean data:', error);
      return null;
   }
}

async function submitBooleanData(newValue: boolean): Promise<string> {
   try {
      const payload = {
         type: 'entry_function_payload',
         function: '0x1::boolean_data_oracle::update_boolean_data',
         arguments: [newValue],
         type_arguments: [],
      };

      const txnRequest = await client.generateTransaction(account.address(), payload);
      const signedTxn = await client.signTransaction(account, txnRequest);
      const transactionRes = await client.submitTransaction(signedTxn);

      return transactionRes.hash;
   } catch (error) {
      console.error('Error submitting transaction:', error);
      throw new Error('Transaction submission failed');
   }
}

export async function POST() {
   try {
      // Validate environment setup
      if (!PRIVATE_KEY) {
         return NextResponse.json(
            { error: 'APTOS_PRIVATE_KEY not configured' },
            { status: 500 }
         );
      }

      // Fetch and validate boolean data
      const booleanData = await fetchBooleanData();
      if (booleanData === null) {
         return NextResponse.json(
            { error: 'Failed to fetch boolean data' },
            { status: 500 }
         );
      }

      // Submit transaction to Aptos
      const txHash = await submitBooleanData(booleanData);

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

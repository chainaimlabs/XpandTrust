"use client"
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

const aptos = new Aptos(new AptosConfig({ network: Network.CUSTOM })); // Configure your network here
// const keylessAccount = await aptos.deriveKeylessAccount({
//    jwt,
//    ephemeralKeyPair,
// });
export { aptos }
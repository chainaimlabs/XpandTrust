"use client"
import { GOOGLE_CLIENT_ID } from "../core/constants";
import useEphemeralKeyPair from "../core/useEphemeralKeyPair";
import GoogleLogo from "../GoogleLogo";
import { aptos } from "../core/aptos";
import { Account } from "@aptos-labs/ts-sdk";


function LoginPage() {
   const ephemeralKeyPair = useEphemeralKeyPair();

   const redirectUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

   const searchParams = new URLSearchParams({
      /**
       * Replace with your own client ID
       */
      client_id: GOOGLE_CLIENT_ID,
      /**
       * The redirect_uri must be registered in the Google Developer Console. This callback page
       * parses the id_token from the URL fragment and combines it with the ephemeral key pair to
       * derive the keyless account.
       *
       * window.location.origin == http://localhost:5173
       */
      redirect_uri: `${window?.location.origin}/callback`,
      /**
       * This uses the OpenID Connect implicit flow to return an id_token. This is recommended
       * for SPAs as it does not require a backend server.
       */
      response_type: "id_token",
      scope: "openid email profile",
      nonce: ephemeralKeyPair.nonce,
   });
   redirectUrl.search = searchParams.toString();
   const eph = useEphemeralKeyPair()
   console.log(eph)
   console.log(ephemeralKeyPair)
   const parseJWTFromURL = (url: string): string | null => {
      const urlObject = new URL(url);
      const fragment = urlObject.hash.substring(1);
      const params = new URLSearchParams(fragment);
      return params.get('id_token');
   };

   // window.location.href = https://.../login/google/callback#id_token=...
   const jwt = parseJWTFromURL(window.location.href)

   const executeTransaction = async () => {
      const keylessAccount = await aptos.deriveKeylessAccount({
         jwt,
         ephemeralKeyPair,
      });

      const bob = Account.generate();
      const transaction = await aptos.transferCoinTransaction({
         sender: keylessAccount.accountAddress,
         recipient: bob.accountAddress,
         amount: 100,
      });
      console.log(transaction)
   }
   executeTransaction()

   return (
      // <div className="flex items-center justify-center h-screen w-screen px-4">
      <div>
         {/* <h1 className="text-4xl font-bold mb-2">Welcome to Aptos</h1>
         <p className="text-lg mb-8">
            Sign in with your Google account to continue
         </p> */}
         <a
            href={redirectUrl.toString()}
            className="flex justify-center items-center border rounded-lg px-8 py-2 hover:bg-gray-100 hover:shadow-sm active:bg-gray-50 active:scale-95 transition-all"
         >
            <GoogleLogo />
            Sign in with Google
         </a>
      </div>
      // </div>
   );
}

export default LoginPage;

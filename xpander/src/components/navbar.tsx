"use client"
import React from 'react'
import LoginPage from './pages/LoginPage'
import { useKeylessAccounts } from './core/useKeylessAccounts';
import { collapseAddress } from './core/utils';
import GoogleLogo from './GoogleLogo';

const Navbar = () => {
   const { activeAccount, disconnectKeylessAccount } = useKeylessAccounts();
   return (
      <div className="w-full flex justify-between bg-white/10 border-b-1 border-solid border-black backdrop-blur-2xl px-10 py-4">
         <h1 className="text-xl">XpanderTrust</h1>
         {/* <button className="link-button" onClick={() => { }}>
            SIGNIN
         </button> */}
         {activeAccount ?
            <div className="grid gap-2">
               <div className="flex justify-center items-center border rounded-lg px-8 py-2 shadow-sm cursor-not-allowed">
                  <GoogleLogo />
                  {collapseAddress(activeAccount?.accountAddress.toString())}
               </div>
               <button
                  className="flex justify-center bg-red-50 items-center border border-red-200 rounded-lg px-8 py-2 shadow-sm shadow-red-300 hover:bg-red-100 active:scale-95 transition-all"
                  onClick={disconnectKeylessAccount}
               >
                  Logout
               </button>
            </div> :
            <LoginPage />
         }
      </div>
   )
}

export default Navbar
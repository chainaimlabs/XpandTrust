import BPMN from "@/components/BPMN_Prover"

export default function Home() {
   return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
         <div
            className="w-full bg-white h-10 p-10 rounded-full">hi</div>
         <BPMN />
      </div>
   );
}

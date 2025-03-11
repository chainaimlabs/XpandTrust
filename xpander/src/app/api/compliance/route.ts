// app/api/compliance/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { getCorpRegData, getEXIMData, getGLEIFData } from '@/lib/complianceData';

export async function GET(request: NextRequest) {
   const searchParams = request.nextUrl.searchParams;
   const companyName = searchParams.get('companyName');

   if (!companyName) {
      return NextResponse.json(
         { error: 'Company name is required' },
         { status: 400 }
      );
   }

   try {
      const [corpReg, eximData, gleifData] = await Promise.all([
         getCorpRegData(companyName),
         getEXIMData(companyName),
         getGLEIFData(companyName)
      ]);

      if (!corpReg || !eximData || !gleifData) {
         return NextResponse.json(
            { error: 'Company not found' },
            { status: 404 }
         );
      }

      return NextResponse.json({
         corporateRegistry: corpReg,
         eximDetails: eximData,
         gleifInfo: gleifData
      });

   } catch {
      return NextResponse.json(
         { error: 'Failed to fetch compliance data' },
         { status: 500 }
      );
   }
}

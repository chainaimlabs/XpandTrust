import axios from 'axios';

export class CorpRegData {
   CIN: string;
   companyName: string;
   registrationNumber: number;
   incorporationDate: string;
   companyType: string;
   authorizedCapital: number;
   paidUpCapital: number;
   activeCompliance: string;
   companyActivity: string;
   mcaID: number;
   level: number;
}


async function getCorpRegData(companyName: string): Promise<any> {

   if (companyName == 'Zenova') {

      return {
         CIN: 'U24321MH2018PTC123456',
         'Company Name': 'Zenova',
         'Registration Number': 987654,
         'Incorporation Date': '12/09/2018',
         'Company Type': 'Private company',
         'Authorized Capital': 5000000,
         'Paid-up Capital': 3000000,
         activeComplianceStatusCode: 1,
         'Company Activity': 'IT Services',
         'MCA ID': 105,
         'level': 1,
      }

   }
   else if (companyName == 'Vernon') {

      return {
         CIN: 'U17215MH2018PTC234567',
         'Company Name': 'Vernon',
         'Registration Number': 876543,
         'Incorporation Date': '12/09/2016',
         'Company Type': 'Private company',
         'Authorized Capital': 4000000,
         'Paid-up Capital': 2000000,
         activeComplianceStatusCode: 1,
         'Company Activity': 'Agri',
         'MCA ID': 122,
         'level': 1,
      }
   }
   else {

      return null;
   }


}


async function getEXIMData(companyName: string): Promise<any> {

   if (companyName == 'Zenova') {

      return {
         companyName: 'Zenova',
         iecStatus: 0,
         activeComplianceStatusCode: 1,
         'DGFT ID': 1005,
         'level': 2,
      }

   }
   else if (companyName == 'Vernon') {

      return {
         companyName: 'Vernon',
         iecStatus: 9,
         activeComplianceStatusCode: 0,
         'DGFT ID': 1022,
         'level': 2,
      }
   }
   else {

      return null;
   }

}


async function getGLEIFData(companyName: string): Promise<any> {

   if (companyName == 'Zenova') {
      return {
         companyName: 'Zenova',
         activeComplianceStatusCode: 1,
         'GLEIF ID': 2005,
         'level': 3,
      }


   }
   else if (companyName == 'Vernon') {
      return {
         companyName: 'Vernon',
         activeComplianceStatusCode: 1,
         'GLEIF ID': 2022,
         'level': 3,
      }

   }
   else {

      return null;
   }

}

//async function fetchAPIData(fileName: string): Promise<string> {
async function fetchCorpRegData(companyName: string): Promise<CorpRegComplianceData> {

   console.log("Fetching compliance data...");
   const compUrl = 'https://0f4aef00-9db0-4057-949e-df6937e3449b.mock.pstmn.io/' + companyName + '_mca';

   console.log('compUrl ', compUrl)
   const response = await axios.get(compUrl);
   //const response = await axios.get('https://0f4aef00-9db0-4057-949e-df6937e3449b.mock.pstmn.io/vernon_mca');
   const data = response.data;

   console.log(data);

   const retData = new CorpRegComplianceData({
      companyID: data.companyID,
      companyName: data.companyName,
      roc: data.roc,
      registrationNumber: data.registrationNumber,
      incorporationDate: data.incorporationDate,
      email: data.email,
      corporateAddress: data.corporateAddress,
      listed: data.listed,
      companyType: data.companyType,
      companyCategory: data.companyCategory,
      companySubcategory: data.companySubcategory,
      companyStatus: data.companyStatus,
      authorizedCapital: data.authorizedCapital,
      paidUpCapital: data.paidUpCapital,
      lastAGMDate: data.lastAGMDate,
      balanceSheetDate: data.balanceSheetDate,
      activeCompliance: data.activeCompliance,
      companyActivity: data.companyActivity,
      jurisdiction: data.jurisdiction,
      regionalDirector: data.regionalDirector,
      mcaID: data.mcaID,
      //activeComplianceCode: 1,

   });

   return retData;
}


export class CorpRegComplianceData {
   companyID: string;
   companyName: string;
   roc: string;
   registrationNumber: number;
   incorporationDate: string;
   email: string;
   corporateAddress: string;
   listed: number;
   companyType: string;
   companyCategory: string;
   companySubcategory: string;
   companyStatus: string;
   authorizedCapital: number;
   paidUpCapital: number;
   lastAGMDate: string;
   balanceSheetDate: string;
   activeCompliance: string;
   companyActivity: string;
   jurisdiction: string;
   regionalDirector: string;
   mcaID: number;
   activeCompliancecode: number;

   constructor(data: {
      companyID?: string,
      companyName?: string,
      roc?: string,
      registrationNumber?: number,
      incorporationDate?: string,
      email?: string,
      corporateAddress?: string,
      listed?: number,
      companyType?: string,
      companyCategory?: string,
      companySubcategory?: string,
      companyStatus?: string,
      authorizedCapital?: number,
      paidUpCapital?: number,
      lastAGMDate?: string,
      balanceSheetDate?: string,
      activeCompliance?: string,
      companyActivity?: string,
      jurisdiction?: string,
      regionalDirector?: string,
      mcaID?: number,
      //activeComplianceCode?: number,
   }) {
      this.companyID = data.companyID || '';
      this.companyName = data.companyName || '';
      this.roc = data.roc || '';
      this.registrationNumber = data.registrationNumber ?? 0;
      this.incorporationDate = data.incorporationDate || '';
      this.email = data.email || '';
      this.corporateAddress = data.corporateAddress || '';
      this.listed = data.listed ?? 0;
      this.companyType = data.companyType || '';
      this.companyCategory = data.companyCategory || '';
      this.companySubcategory = data.companySubcategory || '';
      this.companyStatus = data.companyStatus || '';
      this.authorizedCapital = data.authorizedCapital ?? 0;
      this.paidUpCapital = data.paidUpCapital ?? 0;
      this.lastAGMDate = data.lastAGMDate || '';
      this.balanceSheetDate = data.balanceSheetDate || '';
      this.activeCompliance = data.activeCompliance || '';
      this.companyActivity = data.companyActivity || '';
      this.jurisdiction = data.jurisdiction || '';
      this.regionalDirector = data.regionalDirector || '';
      this.mcaID = data.mcaID ?? 0;
      //this.activeComplianceCode = 1;

   }
}

async function main() {

   console.log(' in CorpRegCompliance main ........ .. ')

   //const corpRegData = await fetchCorpRegData('zenova');

   const corpRegDataZenova = await getCorpRegData('Zenova');
   const eximDataZenova = await getEXIMData('Zenova');
   const gleifDataZenova = await getGLEIFData('Zenova');

   const corpRegDataVernon = await getCorpRegData('Vernon');
   const eximDataVernon = await getEXIMData('Vernon');
   const gleifDataVernon = await getGLEIFData('Vernon');


   console.log('CorpReg Zenova:', corpRegDataZenova);
   console.log('EXIM Zenova:', eximDataZenova);
   console.log('GLEIF Zenova:', gleifDataZenova);


   console.log('CorpReg Vernon:', corpRegDataVernon);
   console.log('EXIM Vernon:', eximDataVernon);
   console.log('GLEIF Vernon:', gleifDataVernon);
}

main().catch(err => {

   console.error('Error:', err);
});

export { getCorpRegData, getEXIMData, getGLEIFData }

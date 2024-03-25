import { google } from "googleapis";


export default async function handler(req, res){
 const body = req.body
 if( req.method !== 'POST'){
  return res.status(405).send({message: "ONLY POST REQUESTS ARE ALLOWED"})
 }
 
 try {
  //providing auth
  const auth = new google.auth.GoogleAuth({
   credentials: {
    client_email:process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n')
   },
   scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
   ]
  })

  const sheets = google.sheets({
   auth,
   version: 'v4'
  })

  const response = await sheets.spreadsheets.values.append({
   spreadsheetId:process.env.GOOGLE_SHEET_ID,
   range: 'A1:B1',
   valueInputOption: 'USER_ENTERED',
   requestBody: {
    values: [
     [body.firstname, body.lastname, body.username, body.email, body.track, body.participation, body.expectations, body.gain]
    ]
   }
  })

  return res.status(200).json({
   data: response
  })

  
 } catch (e){
  return res.status(500).send({message: e.message ?? "something went wrong"})
 }
} 
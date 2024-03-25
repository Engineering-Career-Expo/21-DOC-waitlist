import '@/styles/globals.css'
import { Inter, Varela_Round } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' ,
})
const varela= Varela_Round({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-varela',

})

export default function App({ Component, pageProps }) {
  return <div className={`${inter.variable} ${varela.variable} font-sans `}><Component {...pageProps} /></div>
}

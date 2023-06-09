
import GuessingGame from './components/juegos/juego'
import Navbar from './components/navBar'
import './globals.css'


export const metadata = {
  title: 'Paises',
  description: 'Progra',
}

export default function RootLayout({children}:any){

  return (
    <html lang="en">
      <body> 
        <Navbar/>
        {children}
       
      </body>
    </html>
  )
}

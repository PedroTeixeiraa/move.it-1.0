import '../styles/global.css'

import Login from './login'
import { useSession } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  const [session] = useSession()

  return (
    <>
      {!session ? <Login /> : <Component {...pageProps} session={session} />}
    </>
  )
}

export default MyApp

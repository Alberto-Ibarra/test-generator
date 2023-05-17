import '@/styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function App({ Component, pageProps }) {
  const getSideBar = Component.getSideBar || ((page)=> page)
  return <UserProvider>
    {getSideBar(
      <Component {...pageProps} /> , pageProps
      )}
    </UserProvider>
}

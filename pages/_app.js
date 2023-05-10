import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const getSideBar = Component.getSideBar || ((page)=> page)
  return getSideBar(<Component {...pageProps} />, pageProps)
}

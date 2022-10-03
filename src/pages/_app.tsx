import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/globalStyles'
import { Container, Header } from '../styles/pages/app'
import Image from 'next/future/image'
import logo from '../assets/Logo.svg'


globalStyles()
function MyApp({ Component, pageProps }: AppProps) {
  return <Container>
    <Header>
      <Image src={logo} alt='' />
    </Header>
    <Component {...pageProps} />
  </Container>
}

export default MyApp

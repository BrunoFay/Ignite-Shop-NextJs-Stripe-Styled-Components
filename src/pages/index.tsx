import type { NextPage } from 'next'
import Image from 'next/future/image'
import { HomeContainer, Product } from '../styles/pages/home'
import shirtOne from '../assets/shirts/1.png'
import shirtTwo from '../assets/shirts/2.png'


const Home: NextPage = () => {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirtOne} alt='' width={520} height={480}/>
        <footer>
          <strong>Camiseta Beyond the Limits</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={shirtTwo} alt='' width={520} height={480}/>
        <footer>
          <strong>Camiseta Beyond the Limits</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

export default Home

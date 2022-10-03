import React from 'react'
import { Product } from '../styles/pages/home'
import Image from 'next/future/image'


export default function ProductComponent() {
  return (
    <Product className='keen-slider__slide'>
      <Image src={shirtTwo} alt='' width={520} height={480} />
      <footer>
        <strong>Camiseta Beyond the Limits</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>
  )
}

import React from 'react'
import { Product } from '../styles/pages/home'
import Image from 'next/future/image'


interface ProductProps{
  name: string
  price: number
  imageURL: string
}
export default function ProductComponent({name,price,imageURL}:ProductProps) {
  return (
    <Product className='keen-slider__slide'>
      <Image src={imageURL} alt='' width={520} height={480} />
      <footer>
        <strong>{name}</strong>
        <span>R$ {price}</span>
      </footer>
    </Product>
  )
}

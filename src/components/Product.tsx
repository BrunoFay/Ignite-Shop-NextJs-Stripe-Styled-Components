import React from 'react'
import { Product } from '../styles/pages/home'
import Image from 'next/future/image'
import Link from 'next/link'


interface ProductProps {
  id: any
  name: string
  price: number
  imageURL: string
}
export default function ProductComponent({ name, price, imageURL, id }: ProductProps) {
  return (
    <Link href={`/product/${id}`}>
      <Product className='keen-slider__slide'>
        <Image src={imageURL} alt='' width={520} height={480} />
        <footer>
          <strong>{name}</strong>
          <span>{price}</span>
        </footer>
      </Product>
    </Link>
  )
}

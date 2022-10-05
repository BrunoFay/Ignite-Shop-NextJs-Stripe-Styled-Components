import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/future/image'
import { HomeContainer, Product } from '../styles/pages/home'
import shirtOne from '../assets/shirts/1.png'
import shirtTwo from '../assets/shirts/2.png'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { Arrow } from '../components/ArrowCarousel'
import { useState } from 'react'
import { NavigationCarousel } from '../styles/components/arrowCarousel'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import ProductComponent from '../components/Product'

interface HomeProps {
  products: {
    id: string
    name: string
    imageURL: string
    price: number
  }[]
}
const Home = ({ products }:HomeProps) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 2.5, spacing: 48 },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  return (
    <NavigationCarousel className='navigation-wrapper'>
      <HomeContainer ref={sliderRef} className='keen-slider'>

        {products.map(product =>(<ProductComponent key={product.id} {...product}/>))}

      </HomeContainer>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </>
      )}
    </NavigationCarousel>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async () => {
  const apiResponse = await stripe.products.list({
    /* serve para linkar o preco do produto com o array de produtos */
    expand: ['data.default_price']
  })
  const products = apiResponse.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageURL: product.images[0],
      price: price.unit_amount
    }
  })
  return {
    props: {
      products
    }
  }
}
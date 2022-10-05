import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import type { GetStaticProps } from 'next'
import { useState } from 'react'
import Stripe from 'stripe'
import { Arrow } from '../components/ArrowCarousel'
import ProductComponent from '../components/Product'
import { stripe } from '../lib/stripe'
import { NavigationCarousel } from '../styles/components/arrowCarousel'
import { HomeContainer } from '../styles/pages/home'

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


export const getStaticProps: GetStaticProps = async () => {
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
    },
    revalidate: 60 * 60 /* a pagina se atualiza a cada 1 hora */
  }
}
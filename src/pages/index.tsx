import type { NextPage } from 'next'
import Image from 'next/future/image'
import { HomeContainer, Product } from '../styles/pages/home'
import shirtOne from '../assets/shirts/1.png'
import shirtTwo from '../assets/shirts/2.png'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { Arrow } from '../components/ArrowCarousel'
import { useState } from 'react'
import { NavigationCarousel } from '../styles/components/arrowCarousel'


const Home: NextPage = () => {
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
        <Product className='keen-slider__slide'>
          <Image src={shirtOne} alt='' width={520} height={480} />
          <footer>
            <strong>Camiseta Beyond the Limits</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
        <Product className='keen-slider__slide'>
          <Image src={shirtTwo} alt='' width={520} height={480} />
          <footer>
            <strong>Camiseta Beyond the Limits</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
        <Product className='keen-slider__slide'>
          <Image src={shirtTwo} alt='' width={520} height={480} />
          <footer>
            <strong>Camiseta Beyond the Limits</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
        <Product className='keen-slider__slide'>
          <Image src={shirtTwo} alt='' width={520} height={480} />
          <footer>
            <strong>Camiseta Beyond the Limits</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
        <Product className='keen-slider__slide'>
          <Image src={shirtTwo} alt='' width={520} height={480} />
          <footer>
            <strong>Camiseta Beyond the Limits</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
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

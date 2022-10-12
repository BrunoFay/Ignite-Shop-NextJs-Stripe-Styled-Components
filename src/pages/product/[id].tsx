import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductInfosContainer } from "../../styles/pages/product";
import Image from 'next/future/image'
import { useRouter } from "next/router";
import { useState } from "react";
import axios from 'axios'
import Head from "next/head";


interface ProductProps {
  product: {
    id: any
    name: string
    price: number
    imageURL: string
    defaultPriceId: string
  }
}

/* usar o window.location.href caso o redirec seja para uma pagina externa.
caso seja um redirect para uma pagina interna, usar o hook useRouter e dar um push para a rota.
ex : const router =useRouter()
router.push(_rota_)
*/

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const [isRedirectToCheckoutPage, setIsRedirectToCheckoutPage] = useState(false)

  async function handleBuyProduct(priceId: string) {

    try {
      setIsRedirectToCheckoutPage(true)

      const response = await axios.post('/api/checkout', {
        productId: priceId
      })
      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsRedirectToCheckoutPage(false)
      alert(error.message)
    }
  }

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>

        <ImageContainer>
          <Image src={product.imageURL} alt='' width={520} height={480} />
        </ImageContainer>

        <ProductInfosContainer>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dicta voluptatibus reiciendis pariatur praesentium quis error. Nobis impedit in veniam quod, obcaecati dolore maxime perferendis doloremque recusandae iusto quas esse!
          </p>

          <button
            disabled={isRedirectToCheckoutPage}
            onClick={() => handleBuyProduct(product.defaultPriceId)}>
            Comprar agora
          </button>
        </ProductInfosContainer>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  /*fallback: 'blocking', faz com que a pagina nao exiba nada até ter a reposta da api para renderizar as informações*/
  return {
    /* colocar nos paths itens mais buscados ou os mais vendidos dentro de paths/params */
    paths: [{ params: { id: 'prod_MYSp9wlnseMim4' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params['id'];
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })
  const price = product.default_price as Stripe.Price
  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price.unit_amount! / 100)

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageURL: product.images[0],
        price: priceFormatted,
        defaultPriceId: price.id
      }
    }
  }
}
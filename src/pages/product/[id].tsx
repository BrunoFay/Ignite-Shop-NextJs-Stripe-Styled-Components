import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductInfosContainer } from "../../styles/pages/product";
import Image from 'next/future/image'
import { useRouter } from "next/router";

interface ProductProps {
  product: {
    id: any
    name: string
    price: number
    imageURL: string
  }
}
export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  if (isFallback) {
    return <p>Loading...</p>
  }
  return (
    <ProductContainer>

      <ImageContainer>
        <Image src={product.imageURL} alt='' width={520} height={480} />
      </ImageContainer>

      <ProductInfosContainer>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dicta voluptatibus reiciendis pariatur praesentium quis error. Nobis impedit in veniam quod, obcaecati dolore maxime perferendis doloremque recusandae iusto quas esse!
        </p>

        <button>Comprar agora</button>
      </ProductInfosContainer>
    </ProductContainer>
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
        price: priceFormatted
      }
    }
  }
}
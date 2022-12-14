import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
 
  minHeight: 656
})

export const Product = styled('a', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative',
  overflowY: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',

    borderRadius: 6,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: '2rem',
    backgroundColor: 'rgba(0,0,0,0.6)',

    transition: 'all 0.2s ease-in',
    transform:"translate(0%, 110%)",
    opacity:0,
    strong: {
      fontSize: '$lg'
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',

    }
  },

  '&:hover': {
    footer: {
      transform:"translate(0%, 0%)",
      opacity:1
    }
  }
})
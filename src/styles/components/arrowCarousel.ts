import { styled } from "..";

export const NavigationCarousel = styled('div', {
  width: '100%',
  maxWidth: "calc(100vw  - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  '.arrow': {
    width: '30px',
    height: '30px',
    position: "absolute",
    top: '50%',
    transform: "translateY(-50 %)",
    "- webkit - transform": "translateY(- 50 %)",
    fill: "#fff",
    cursor: "pointer",
  },

  ".arrow--right": {
    left: "auto",
    right: "5px",
  },
  ".arrow--disabled": {
    fill: "rgba(255, 255, 255, 0.5)"
  }
})

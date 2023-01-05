import { useRecoilState } from 'recoil';

import { cartState, navbarState } from './Atoms';

export const useAddProduct = () => {
  const [cart, setCart] = useRecoilState(cartState);
  
  return (product) => {
    const index = cart.findIndex(item => item.id === product.id);

    if (index === -1) {
      return setCart([...cart, { ...product, qty: 1 }]);
    }

    const newCart = cart.map((item, i) => {
      if(i === index) {
        return {
          ...item,
          qty: item.qty + 1,
        }
      }

      return item;
    })
    
    setCart(newCart)
  }
}

export const useRemoveProduct = () => {
  const [cart, setCart] = useRecoilState(cartState);
  
  return (product) => {
    const index = cart.findIndex(item => item.id === product.id);

    if (index === -1) {
      alert('Product not found in cart!')
      return;
    }

    const newCart = cart.filter(item => item.id !== product.id)
    
    setCart(newCart)
  }
}

export const useClearCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  return () => {
    setCart([])
  }
}


export const useSetNavbar = (bool) => {
  const [state, setState] = useRecoilState(navbarState);
  return () => {
    setState(bool)
  }
}

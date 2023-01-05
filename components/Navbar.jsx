import Image from 'next/image'
import {useEffect, useState} from 'react'
import Link from "next/link";
import { useRecoilValue} from 'recoil';
import { cartStatus } from '../recoil/Selectors';
import { cartState as _cartState } from '../recoil/Atoms';
import {useClearCart, useRemoveProduct} from "../recoil/hooks";

export default function Navbar(){

    const removeProduct = useRemoveProduct()
    const clearCart = useClearCart()
    const cart = useRecoilValue(cartStatus);
    const cartState = useRecoilValue(_cartState);

    const [toggleCart, setToggleCart] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)

    useEffect(() => {
        if (toggleCart || toggleMenu){
            document.body.style.overflowY = "hidden"
        }
        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [toggleCart, toggleMenu])

    const closeMenus = () => {
        setToggleCart(false)
        setToggleMenu(false)
    }

    const closeMenu = () => {
        setToggleMenu(false)
    }
    const OpenCart = () => {
        setToggleCart(true)
        setToggleMenu(false)
    }
    const OpenMenu = () => {
        setToggleMenu(true)
        setToggleCart(false)
    }

    const MenuLink = (props) => {
        return(
            <Link href={props.link} legacyBehavior>
                <a onClick={() => closeMenu()} className='capitalize font-bold text-xl flex gap-2 transition-all hover:gap-3 visited:text-black'>
                    {props.label}
                    <Image className='h-6 w-6' alt={'link'} src={require('../assets/images/arrowright.webp')}/>
                </a>
            </Link>
        )
    }

    const FooterLink = (props) => {
        return(
            <Link href={props.link} legacyBehavior>
                <a onClick={() => closeMenu()} className='flex w-full bottom-0 h-16 w-full flex justify-center items-center gap-2 capitalize font-bold border-t border-gray-300 text-sm border-l'>
                    {props.label}
                </a>
            </Link>
        )
    }

    const CartArticle = ({product}) => {

        return(
                <span className='w-full flex h-20'>
                    <Link onClick={() => setToggleCart(false)} href={`/shop/products/${product.id}`}>
                        <span className='basis-1/4'>
                            <Image alt={product.name} className='h-20 w-20 bg-orange-100 p-1 object-scale-down rounded-full flex' src={require(`../assets/images/${product.name}.webp`)}/>
                        </span>
                    </Link>

                    <span className='w-full justify-start justify-between flex p-2.5 basis-3/4'>
                        <Link onClick={() => setToggleCart(false)} href={`/shop/products/${product.id}`}>

                            <span className='flex flex-col'>
                                <span className='name capitalize font-semibold text-lg text-gray-600'>{product.name}</span>
                                <span className='flex gap-2 w-full items-center'>
                                    <span className='font-extrabold'>{`€${(product.price * product.qty).toFixed(2)}`}</span>
                                        <span className='text-gray-400'>-</span>
                                        <span className='text-gray-400'>{`${product.qty} produits`}</span>
                                </span>
                            </span>
                        </Link>

                        <span onClick={() => removeProduct(product)} className='w-16 flex justify-center items-center'>
                            <Image alt={'supprimer le produit du panier'} className={'rotate-45 opacity-60 h-11 w-11'} src={require('../assets/images/increase.webp')}/>
                        </span>

                    </span>
                </span>
        )
    }

    return(
        <div className='absolute w-screen h-16 flex items-center justify-around shadow-sm'>
            <span className='basis-1/4 h-7 sm:h-8 md:h-9 flex justify-center'>
                {toggleMenu
                    ?
                    <svg onClick={() => setToggleMenu(false)} className='' fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"/></svg>
                    :
                    <Image onClick={() => OpenMenu()} height={28} width={28} object-fit="contain"  src={require('../assets/images/menu.webp')} alt="Open Menu"/>
                }
            </span>

            <span className='font-bold text-2xl'>Avenue</span>

            <span className='basis-1/4 h-7 sm:h-8 md:h-9 flex justify-center relative' onClick={() => OpenCart()}>
                <span className='relative'>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.5137 21.4999H8.16592C5.09955 21.4999 2.74715 20.3924 3.41534 15.9347L4.19338 9.89351C4.60528 7.66925 6.02404 6.81799 7.26889 6.81799H17.4474C18.7105 6.81799 20.0469 7.73332 20.5229 9.89351L21.3009 15.9347C21.8684 19.8889 19.5801 21.4999 16.5137 21.4999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M16.651 6.59836C16.651 4.21229 14.7167 2.27799 12.3306 2.27799V2.27799C11.1816 2.27312 10.078 2.72615 9.26381 3.53691C8.44963 4.34766 7.99193 5.44935 7.99194 6.59836H7.99194" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M15.2963 11.1018H15.2506" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M9.46566 11.1018H9.41989" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                        {cartState.length > 0 ? <span className='absolute bg-orange-500 h-4 w-4 text-xs text-white flex justify-center items-center rounded-full top-0 -right-2'>{cart.totalItems}</span> : null}
                </span>

            </span>



            <div className={`fixed justify-center flex-col inset-y-0 pt-24 w-full ${toggleCart? "right-0" : "-right-full"} transition-all flex box-border px-6 bg-white max-w-screen-md z-20`}>
                <span className='absolute inset-0 w-screen h-16 flex items-center shadow-sm'>
                    <svg className='h-7 sm:h-8 md:h-9 w-7 sm:w-8 md:w-9 relative cursor-pointer basis-1/6' onClick={closeMenus} fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="48px" height="48px"><path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"/></svg>
                    <span className='ml-4 font-bold text-2xl'>Panier</span>
                </span>
                {cartState.length > 0 ?
                    <span className='flex flex-col items-center justify-start w-full h-full gap-20 pt-10'>
                        {/*<button className='py-4 bg-red-500 rounded-full text-lg text-white w-full' onClick={clearCart}>Vider le panier</button>*/}

                         <div style={{minHeight: '50vh'}} className='hiddenScroll flex flex-col w-full gap-4 pt-4 overflow-y-scroll'>
                             {cartState.map(article => (
                                <CartArticle product={article} key={article.id}/>
                             ))}
                         </div>
                         <span className='flex px-6 py-5 w-full bg-orange-400 rounded-xl text-white shadow-sm'>
                             <span className='flex flex-col basis-3/5 h-full justify-center'>
                                 <span className='text-gray-200'>Montant total</span>
                                 <span className='font-black text-2xl'>€{cart.totalPrice.toFixed(2)}</span>
                             </span>
                             <Link onClick={closeMenus} href={'/checkout'} className={'h-full basis-2/5 flex items-center'}>
                                <button className={'border border-opacity-60 border-gray-300 rounded-full flex items-center justify-center py-2 px-6'}>
                                    <span className='font-black text-xl'>Payer</span>
                                    <Image alt={'payer le panier'} className={'h-6 w-6 invert'} src={require('../assets/images/blackarrow.webp')}/>
                                </button>
                             </Link>
                         </span>
                    </span>
                    :
                    <span className='relative w-full justify-center items-center flex flex-col gap-4'>
                        <span className='capitalize text-center text-2xl font-bold'>votre panier est vide 😔</span>
                        <span className='text-gray-500 text-base text-center'>Ajoutez vos produits favoris à votre panier</span>
                        <Link href={"/shop"}><button className='bg-orange-500 cursor-pointer w-full rounded-lg box-border py-3 px-8 text-center flex justify-center items-center text-white font-bold text-xl tracking-wide shadow-sm' onClick={closeMenus}>Produits</button></Link>
                    </span>
                }
            </div>


            <div className={`fixed top-16 inset-0 bg-white transition-all ${toggleMenu? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-20`}>
            <span className='flex flex-col py-10 px-6 gap-6'>
                <MenuLink label="produits" link="/shop"/>
                <MenuLink label="à propos de nous" link="/aboutus"/>
                <MenuLink label="faq" link="/faq"/>
            </span>
                <div className='flex w-full absolute bottom-0 h-16'>
                    <FooterLink label="mon compte" link="/account"/>
                    <FooterLink label="nous contacter" link="/contactus"/>
                </div>
            </div>



        </div>    )

}

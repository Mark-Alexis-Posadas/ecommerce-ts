import {useState,useEffect,useRef,useCallback} from 'react';
import type {ReactNode} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {CartContext} from './CartContext';
import {useAuth} from '../hooks/useAuth';
import {TOKEN_KEY} from '../services/api';
import * as cartAPI from '../services/cartService';
import type {CartResponse} from '../types/cart';
import type {Product} from '../types/product';
import {mapCartItems} from '../utils/cartMapper';
interface State {owner:string|null;cart:CartResponse|null;loading:boolean;pending:boolean;error:string;success:string}
const empty:State={owner:null,cart:null,loading:false,pending:false,error:'',success:''};
export const CartProvider=({children}:{children:ReactNode})=>{
 const {token}=useAuth();const navigate=useNavigate();
 const [state,setState]=useState<State>(empty);const sequence=useRef({value:0});const locked=useRef(false);
 const current=state.owner===token?state:empty;
 const valid=(id:number,owner:string)=>id===sequence.current.value&&owner===localStorage.getItem(TOKEN_KEY);
 const refreshCart=useCallback(async()=>{
  if(!token||locked.current)return;
  const id=++sequence.current.value;
  setState(v=>({...v,owner:token,loading:true,error:''}));
  try{const {data}=await cartAPI.getCart(token);if(valid(id,token))setState({owner:token,cart:data,loading:false,pending:false,error:'',success:''})}
  catch{if(valid(id,token))setState(v=>({...v,owner:token,loading:false,error:'Unable to load your cart. Please retry.'}))}
 },[token]);
 useEffect(()=>{
  const epoch=sequence.current;
  epoch.value++;locked.current=false;
  void Promise.resolve().then(()=>{if(token===localStorage.getItem(TOKEN_KEY)){if(token)void refreshCart();else setState(empty)}});
  return()=>{epoch.value++};
 },[token,refreshCart]);
 const mutate=async(operation:(owner:string)=>Promise<{data:CartResponse}>,message:string)=>{
  if(!token){navigate('/login');return;}if(locked.current)return;
  locked.current=true;const id=++sequence.current.value;
  setState(v=>({...v,owner:token,pending:true,loading:false,error:'',success:''}));
  try{const {data}=await operation(token);if(valid(id,token)){setState({owner:token,cart:data,pending:false,loading:false,error:'',success:message});toast.success(message)}}
  catch(error){if(valid(id,token)){const failure=axios.isAxiosError<{message?:string;cart?:CartResponse}>(error)?error.response?.data:undefined;const message=failure?.message||'Cart update failed. Please try again.';setState(v=>({...v,owner:token,cart:failure?.cart||v.cart,pending:false,error:message}));toast.error(message)}}
  finally{if(id===sequence.current.value){locked.current=false;setState(v=>({...v,pending:false}))}}
 };
 const cartItems=mapCartItems(current.cart?.items||[]);
 return <CartContext.Provider value={{cartItems,subtotalCentavos:current.cart?.subtotalCentavos||0,totalQuantity:current.cart?.totalQuantity||0,checkoutEligible:!!current.cart?.checkoutEligible&&!current.pending&&!current.loading&&!current.error,
 loading:current.loading||!!token&&state.owner!==token,pending:current.pending,error:current.error,success:current.success,
 addToCart:(product:Product,quantity=1)=>mutate(owner=>cartAPI.addToCart(product._id,quantity,owner),'Cart updated'),
 incrementQty:id=>mutate(owner=>cartAPI.incrementQty(id,owner),'Quantity updated'),decrementQty:id=>mutate(owner=>cartAPI.decrementQty(id,owner),'Quantity updated'),
 removeFromCart:id=>mutate(owner=>cartAPI.removeFromCart(id,owner),'Item removed'),clearCart:()=>mutate(owner=>cartAPI.clearCart(owner),'Cart cleared'),refreshCart}}>{children}</CartContext.Provider>;
};

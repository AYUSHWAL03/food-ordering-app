import axios from "axios"
import { ADD_TO_CART, CLEAR_CART, REMOVE_ITEM_CART, SAVE_DELIVERY_INFO, SET_RESTAURANT_ID, UPDATE_DELIVERY_INFO, UPDDATE_CART_QUANTITY } from "../constants/cartConstant";

export const addItemToCart = (id,quantity)=> async(dispatch,getState)=>{
    try{
        const {data} = await axios.get(`/api/v1/eats/item/${id}`)
        const fooditemData = data.data;
        
        const image = fooditemData.images && fooditemData.images.length>0 ?fooditemData.images[0].url:"";
        dispatch({
            type:ADD_TO_CART,
            payload:{
                fooditem:fooditemData._id,
                name:fooditemData.name,
                price:fooditemData.price,
                image,
                stock:fooditemData.stock,
                quantity
            }
        });
 
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
    }
    catch (error){
        
        // alert.error("failed to add item to cart, try again")
    }
}
export const updateCartQuantity = (fooditemId,quantity)=> async(dispatch)=>{
    dispatch({
        type:UPDDATE_CART_QUANTITY,
        payload:{fooditemId,quantity}
    })
   
};
export const removeItemFromCart = (id) => async(dispatch,getState)=>{
    dispatch({
        type:REMOVE_ITEM_CART,
        payload:id,

    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}
export const clearCart = ()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_CART
    
    })
    localStorage.removeItem("cartItmes")
}

export const saveDeliveryInfo = (deliveryInfo)=>(dispatch)=>{
    dispatch({
        type:SAVE_DELIVERY_INFO,
        payload:deliveryInfo
    })
    

};
export const updateDeliveryInfo = (deliveryInfo)=>(dispatch)=>{
    try{
        dispatch({
            type:UPDATE_DELIVERY_INFO,
            payload:deliveryInfo,
        })

    }
    catch(error){
         
    }
}

export const setRestaurantId = (id) =>{
 return{
    type:SET_RESTAURANT_ID,
    payload:id,
 }   
}
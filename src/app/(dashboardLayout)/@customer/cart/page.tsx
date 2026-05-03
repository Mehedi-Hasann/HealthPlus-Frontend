import { getMyCart } from "@/actions/customer.actions";
import CustomerCartItem from "@/components/modules/customer/CustomerCartItem";

import { CartItemProps } from "@/types/routes.type";

export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export default async function CartPage () {

  const {data} = await getMyCart();
  // console.log("data from cart is => ",data);
  
const enrichedCartItem = await Promise.all(
  (data ?? []).data.map(async (item: CartItemProps) => {
    const res = await fetch(`${API_URL}/api/medicines/${item.medicineId}`);
    const medicine = await res.json();
    // console.log("Res is => ",medicine)

    return {
      ...item,
      medicine,
    };
  })
);

  // console.log("enrichedCartItem ",enrichedCartItem)
  
  return (
    
    <div>
      <div className="grid grid-cols-2 gap-5">
          {
              enrichedCartItem?.map((item : CartItemProps) => (
                  < CustomerCartItem key={item.id} item = {item}/>
              ))
          }
      </div>

    </div>
    
  );
}
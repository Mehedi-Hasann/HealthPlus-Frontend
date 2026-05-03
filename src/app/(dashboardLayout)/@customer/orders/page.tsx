import { getMyAllOrders } from "@/actions/customer.actions";
import CustomerOrdersItem from "@/components/modules/customer/CustomerOrdersItem";
import { OrderProps } from "@/types/routes.type";

export const dynamic = "force-dynamic";

export default async function OrdersPage () {
  const {data} = await getMyAllOrders();
  console.log("All Order : ",data);
  
  return (
    
    <div>

      <div className="grid grid-cols-2 gap-5">
              {
                data.data.map((order : OrderProps) => (
                  < CustomerOrdersItem key={order.id} order = {order} />
                ))
              }
      </div>

    </div>
    
  );
}
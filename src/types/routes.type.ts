export interface Route {
  title : string;
  items : {
    title : string;
    url : string;
  }[];
}
export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
  CANCELLED = "CANCELLED"
}

export interface Order {
  id : string,
  quantity : number,
  totalAmount : number,
  status : OrderStatus
}
export interface Review {
  id : string,
  userId : string,
  medicineId : string,
  rating : string,
  description : string
}

export interface CreateReview{
  medicineId : string,
  description ?: string
}

export interface MedicinePost {
  id : string,
  name : string,
  price : number,
  stock : number,
  image ?: string,
  categoryId : string,
  categoryName : string,
  createdAt : string,
  updatedAt : string,
  orders : Order[]
  reviews : Review[]
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  orders: Order[];
}
export interface CreateNewMedicine {
  name : string,
  category : string,
  price : number,
  stock : number
}
export interface CreateNewCategory {
  categoryName : string,
  description ?: string
}
export interface Orders  {
  id?: string;
  totalAmount: number;
  quantity?: number;
  userId?: string;
  medicineId?: string;
  status?: string;
  shippingAddress?: string | null;
  createdAt?: string;
}

export interface Order {
  id: string
  totalAmount: number
  quantity: number
  userId: string
  medicineId: string
  addressId: string
  status: OrderStatus
  createdAt: string
}

export interface medicineParams {
  search ?: string,
  price ?: string,
  category ?: string,
}
export interface MedicineData {
  name ?: string,
  price : number,
  stock : number
}

export interface Medicine {
  success : boolean;
  message : string;
  data : {
      id: string;
      name: string;
      price: number;
      categoryName : string;
      description?: string;
      image?: string;
  }
}

export interface CartItemProps {
  id: string;
  userId: string;
  medicineId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  medicine?: Medicine; 
}

export interface OrderProps {
  id : string;
  totalAmount : number;
  quantity : number;
  medicineId : string;
  addressId : string;
  orderStatus : OrderStatus;
  paymentStatus : PaymentStatus;
  createdAt : Date;
  medicine : {
    name : string;
    price : number;
    categoryName : string;
    image : string;
  }
}

export interface Address  {
    id?: string;
    createdAt?: Date;
    userId?: string;
    fullName: string;
    phone: string;
    city: string;
}

export interface UpdateAddress  {
    fullName: string;
    phone: string;
    city: string;
    area : string;
    street : string;
    houseNo : string;
    postalCode : string;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image ?: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  userStatus: string;
}
export interface CategoryType {
  id : string,
  categoryName : string,
  description ?: string
}
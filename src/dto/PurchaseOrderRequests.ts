import { Product } from './../types/PurchaseOrder';
import { t } from 'elysia'

export const GetPurchaseOrderDto = t.Object({
    OrderCode: t.String(),
})

export const CreatePurchaseOrderDto = t.Object({
    OrderCode: t.String(),
})

export const AddProductDto = t.Object({
    OrderCode: t.String(),
    Product: Product,
})
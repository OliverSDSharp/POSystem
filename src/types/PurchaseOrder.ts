import { Static, t } from 'elysia'

export const Product = t.Object({
    Id: t.String(),
    Name: t.String(),
    Quantity: t.Number(),
    Rate: t.Number(), 
})

export type ProductType = Static<typeof Product>;

export const PurchaseOrder = t.Object({
    OrderCode: t.String(),
    Products: t.Array(Product),
    CreatedAt: t.Date(),
    UpdatedAt: t.Date(),
    Total: t.Number()
})

export type PurchaseOrderType = Static<typeof PurchaseOrder>;
import {z} from "zod"

const Products = z.object({
    Id: z.number(),
    Name: z.string(),
    Quantity: z.number(),
    Rate: z.number(), 
})

export type Products = z.infer<typeof Products>;

const PurchaseOrder = z.object({
    Id: z.number(),
    Code: z.string(),
    Products: Products,
    CreatedAt: z.date(),
    UpdatedAt: z.date()
})

export type PurchaseOrder = z.infer<typeof PurchaseOrder>;
import { PurchaseOrder, PurchaseOrderType, Product } from './../types/PurchaseOrder';
import { Static, t, } from 'elysia';
import { Init } from '../db/db';
import { AddProductDto, CreatePurchaseOrderDto, GetPurchaseOrderDto } from './../dto/PurchaseOrderRequests';
import { Redis } from '@upstash/redis';
import { NO_RECORDS_FOUND, PARSING_ERROR } from '../types/Errors';

export class PurchaseOrderService {
    private db: Redis;

    constructor(){
       this.db = Init()
    }

    async create(body:Static<typeof CreatePurchaseOrderDto>){
        try{
            const PurchaseOrder:PurchaseOrderType = {
                OrderCode:body.OrderCode,
                CreatedAt: new Date(),
                UpdatedAt: new Date(),
                Products: [],
                Total: 0
            }
            await this.db.set(body.OrderCode, PurchaseOrder)
            return PurchaseOrder
        }catch(err){
            return null
        }
    }

    async addProduct(body: Static<typeof AddProductDto>) {
        let response: PurchaseOrderType | null = await this.db.get(body.OrderCode)
        if (response === null){
            response = await this.create({OrderCode:body.OrderCode})
        }
        if (response) {
            const products = response?.Products.filter((p)=>p.Id !== body.Product.Id) ?? []
            response = {
                ...response,
                UpdatedAt: new Date(),
                Products: [...products,body.Product]
            }
            response = await this.calculate(response)
            await this.db.set(body.OrderCode, response)
            return response
        }else {
            return PARSING_ERROR
        }
    }

    private async calculate(body: PurchaseOrderType) {
        let total = 0;
        for (const p of body.Products) {
            total += p.Quantity * p.Rate
        }
        body.Total = total
        return body
    }

    async get(body: Static<typeof GetPurchaseOrderDto>){
        let response: PurchaseOrderType | null = await this.db.get(body.OrderCode)
        if (response){
            return response
        }else {
            return NO_RECORDS_FOUND
        }
    }

    async getAll(){
        const keys = await this.db.keys("")
        if(keys.length === 0)
            return NO_RECORDS_FOUND

        const POList:PurchaseOrderType[] = []
        
        for (let index = 0; index < keys.length; index++) {
            const po:PurchaseOrderType | null = await this.db.get(keys[index])
            if(po)
                POList.push(po)
        }
        
        return POList
    }

}
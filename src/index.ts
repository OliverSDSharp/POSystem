import { AddProductDto, CreatePurchaseOrderDto, GetPurchaseOrderDto } from './dto/PurchaseOrderRequests';
import { Elysia, t } from "elysia";
import { PurchaseOrderService } from "./services/PurchaseOrderService";

// Initialization of Service
const POService = new PurchaseOrderService()

// Initialization Of Server
const app = 
  new Elysia()
  // Get All Orders
  .get("/", () => POService.getAll())
  // Get Order by code
  .get("/id/:OrderCode", ({params}) => POService.get(params), {
    params: GetPurchaseOrderDto
  })
  // Create Order
  .post("/",({body})=> POService.create(body),{
    body: CreatePurchaseOrderDto
  })
  // Update Order
  .put("/",({body})=> POService.addProduct(body),{
    body: AddProductDto
  })
  .listen(3000);

// Logs
app.handle(new Request('http://localhost/')).then(console.log)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

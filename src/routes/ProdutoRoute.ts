import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";

const router = Router();
const controller = new ProdutoController();

router.get("/buscarProduto", controller.buscarProduto);
router.post("/salvar", controller.salvar);



export default router;
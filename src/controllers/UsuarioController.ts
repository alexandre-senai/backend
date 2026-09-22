import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";


const service = new UsuarioService();

export class UsuarioController {

    async salvar(req: Request, res: Response){
        const { nome } = req.body;

        if(nome != null || nome != ""){ // SUCESSO
            return res.status(200).json(await service.salvar(nome) );

        }else{ // ERRO
            return res.status(400).json({mensagem: "usuario nao encontrado"});
        }

        //req.body == requisicoes post 
        // req.params == requisicoes put/GET

    }

}

import joi from "joi";

const transationSchema = joi.object({
    type: joi.string().required(),
    valor: joi.number().required(),
    descricao: joi.string().required()
})

export default transationSchema;
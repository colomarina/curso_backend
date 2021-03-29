import mongoose from 'mongoose';

const mensajeCollection = 'mensaje'

const MensajeSchema = new mongoose.Schema({
    mail: { type: String, required: true, max: 50 },
    dateandhour: { type: String, required: true},
    message: { type: String, required: true}
})

export const mensajeModel = mongoose.model(mensajeCollection, MensajeSchema)
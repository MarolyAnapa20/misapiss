import Prueba from "../models/ejemplo.model.js";
import mongoose from "mongoose";
import express from 'express';

export const getAllPruebas = async (req, res) => {
    console.log('obtiene todos los pruebas');
    try {
        const pruebas = await Prueba.find({},{__v:0});
        if (!pruebas || pruebas.length === 0) {
            return res.status(404).json ({
                msg: 'No se encontraron pruebas' 
            });
        }
        res.status(200).json({
            pruebas
        });

    } catch (error) {
        console.error('Error al obtener pruebas:', error);
        res.status(500).json({
             msg: 'Error al obtener pruebas' 
            });
    }
};

export const getPruebaById = async (req, res) => {
    console.log('Prueba por ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        const prueba = await Prueba.findById(id, {__v: 0});
        if (!prueba) {
            return res.status(404).json({
                msg: 'Prueba no encontrada'
            });
        }
        res.status(200).json({
           prueba
        });
    }
    }catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener prueba por ID'
        });
    }
};

export const postPrueba = async (req, res) => {
    console.log('POST PRUEBA');
    const body = req.body;
    const prueba = new Prueba(body);
     try {
        const validationError = prueba.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(err => err.message);
            return res.status(400).json({
                error: errorMessages
            });
        }
        await prueba.save();
        return res.status(201).json({
           prueba
        });
     }  catch (error) {
        return res.status(500).json({
            msg: 'Error al crear prueba'
        });
     }
};

export const putPrueba = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const prueba = await Prueba.findByIdAndUpdate(id, body, {new: true, runValidators: true});
        if (!prueba) {
            return res.status(404).json({
                msg: 'Prueba no encontrada'
            });
        }
        res.status(200).json({
            prueba
        });
        }catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar prueba'
        });
    }
};

export const deletePrueba = async (req, res) => {
    console.log('DELETE PRUEBA');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const prueba = await Prueba.findByIdAndDelete(id);
        if (!prueba) {
            return res.status(404).json({
                msg: 'Prueba no encontrada'
            });
        }
        res.status(200).json({
            msg: 'Prueba eliminada correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al eliminar prueba'
        });
    }
};
import express from "express";
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    projectName : {type: String, required: true },
    projectDesctiption : {type: String, required: true},
});

export const ProjectModel = mongoose.model('Project', ProjectSchema);

export const getProjects = () => ProjectModel.find();
export const getProject = (id: string) => ProjectModel.findById(id);
export const deleteProject = (id: string) => ProjectModel.findByIdAndDelete(id);
export const createProject = (values: Record<string, any>) => new ProjectModel(values)
    .save().then((project) => project.toObject());
export const updateProject = (id : string, values:Record<string, any>) => ProjectModel.findByIdAndUpdate(id, values);
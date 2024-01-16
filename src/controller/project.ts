import express from 'express';
import { createProject, getProjects, getProject, deleteProject } from '../db/project';

export const addProject = async (request:express.Request, response: express.Response) => {
    try{
        const {projectName, projectDesctiption} = request.body;

        if(!projectName || !projectDesctiption){
            return response.sendStatus(400);
        }

        const project = await createProject({projectDesctiption, projectName});
        return response.status(200).json(project);
        
    } catch(error){
        console.log(error);
    } 
}

export const getAllProjects =async (request:express.Request, response: express.Response) => {
    try{
        const projects = await getProjects();
        return response.status(200).json(projects);
        
    } catch(error){
        console.log(error);
    } 
}

export const removeProject = async (request:express.Request, response: express.Response) => {
    try{
        const {id} = request.params;
        const projectToDelete = await getProject(id);

        if(!projectToDelete){
            return response.sendStatus(400);
        }

        const deletedProject = await deleteProject(id);
        return response.status(200).json(deletedProject);  
    } catch(error){
        console.log(error);
    } 
}

export const fetchProject = async (request:express.Request, response: express.Response) => {
    try{
        const {id} = request.params;
        const project = await getProject(id);

        if(!project){
            return response.sendStatus(400);
        }
        return response.status(200).json(project);  
    } catch(error){
        console.log(error);
    } 
}

export const updateProject = async (request:express.Request, response: express.Response) => {
    try{
        const {id} = request.params;
        const {projectName, projectDesctiption} = request.body;
        const projectToUpdate = await getProject(id);

        if(!projectToUpdate){
            return response.sendStatus(400);
        }

        projectToUpdate.projectName = projectName;
        projectToUpdate.projectDesctiption = projectDesctiption;
        await projectToUpdate.save();
        return response.status(200).json(projectToUpdate).end(); 
        
    } catch(error){
        console.log(error);
    } 
}

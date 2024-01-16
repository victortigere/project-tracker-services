import express from 'express';
import { addProject, getAllProjects, removeProject, fetchProject, updateProject } from '../controller/project';
import { isAunthenticated } from '../middleware';

export default(router: express.Router) => {
    router.post('/api/projects/add', isAunthenticated, addProject);
    router.get('/api/projects',isAunthenticated,  getAllProjects);
    router.delete('/api/projects/delete/:id',isAunthenticated, removeProject);
    router.patch('/api/project/update/:id', isAunthenticated, updateProject);
    router.get('/api/projects/project/:id',isAunthenticated , fetchProject);
}


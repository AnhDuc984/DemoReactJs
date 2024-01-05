import express from "express";
import homeController from "../controllers/homecontroller";
import  userController from '../controllers/userController'
import doctorController from '../controllers/doctorControllers'
let router = express.Router();

let initWebRouter = (app) => {
    router.get('/' , homeController.getHomePage)

    router.get('/test' , homeController.getTest)

    router.get('/crud' , homeController.getCrud)

    router.post('/post-crud' , homeController.postCRUD)

    router.get('/get-crud' , homeController.displayGetCrud)
    
    router.get('/edit-crud' , homeController.getEditCrud)

    router.post('/put-crud' , homeController.putEditCrud)

    router.get('/delete-crud' , homeController.deleteCrud)

    router.post('/api/login' , userController.handleLogin)

    router.get('/api/get-all-users' , userController.handleGetAllUsers)

    router.post('/api/create-new-user' , userController.handleCreateNewUser)

    router.put('/api/edit-user' , userController.handleEditUser)

    router.delete('/api/delete-user' , userController.handleDeleteUser)

    router.get('/api/allCode', userController.getAllCode)

    router.get('/api/top-doctor-home' , doctorController.getTopDoctorHome)

    router.get('/api/get-all-doctor' , doctorController.getAllDoctor)

    router.post('/api/save-info-doctor' , doctorController.postInfoDoctor)


    return app.use("/", router);
}

module.exports = initWebRouter; 
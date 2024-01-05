import { resolveInclude } from "ejs";
import db from "../models/index";

let getTopDoctorHome = (limit) => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = await db.User.findAll({
                limit : limit,
                // where : {roleId : ''},
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include : [
                    {model : db.AllCode , as :'positionData' , attributes :['valueEn' , 'valueVi']},
                    {model : db.AllCode , as :'genderData' , attributes :['valueEn' , 'valueVi']} 
                ],
                raw : true,
                nest : true
            })
            resolve({
                errCode : 0 ,
                data : users
            })
        }
        catch(e){
            reject(e)
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let doctors = await db.User.findAll({
                where : {roleId :'R2'},
                attributes: {
                    exclude: ['password','image']
                },
            })
            resolve({
                errCode : 0,
                data : doctors
            })
        }
        catch(e){
            reject(e)
        }
    })
}


let saveDetailDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => { 
        try{
            if(!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkDown){
                resolve({
                    errCode : 1,
                    errMessage :'Missing parameter'
                })  
            }else{
                await db.MarkDown.create({
                    contentHTML : inputData.contentHTML,
                    contentMarkDown : inputData.contentMarkDown,
                    description : inputData.description,
                    doctorId : inputData.doctorId,
                })

                resolve({
                    errCode : 0,
                    errMessage : 'save info doctor'
                })
            }
        }
        catch(e){
            reject(e)
        }
    })
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors : getAllDoctors,
    saveDetailDoctor : saveDetailDoctor,
}
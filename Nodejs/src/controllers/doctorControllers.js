import  doctorService from '../services/doctorService'



let getTopDoctorHome = async (req , res) => {
    let limit = req.query.limit
    if(!limit) limit = 10
    try{
        let response = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(response)
    }
    catch(e){
        console.log(e)
        return res.status(200).json({
            errCode : -1,
            message : "Error from server"
        })
    }
}


let getAllDoctor = async (req, res) => {
    try{
        let doctor = await doctorService.getAllDoctors()
        return res.status(200).json(doctor)
    }
    catch(e){
        console.log(e)
        return res.status(200).json({
            errCode : -1,
            errMessage : 'Error from the server'
        })
    }
}
let postInfoDoctor = async (req , res) => {
    try{
        let response = await doctorService.saveDetailDoctor(req.body)
        return res.status(200).json(response)
    }
    catch(e){
        console.log(e)
        return res.status(200).json({
            errCode : -1,
            errMessage : 'Error from the server'
        })
    }
}

module.exports = {
    getTopDoctorHome : getTopDoctorHome,
    getAllDoctor : getAllDoctor,
    postInfoDoctor : postInfoDoctor,
}
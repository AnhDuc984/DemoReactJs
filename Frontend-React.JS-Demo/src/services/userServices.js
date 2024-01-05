import axios from "../axios"


const  handleLoginApi = (email, password ) => {
    return axios.post('/api/login' , {email , password})
}

const getAllUsers = (inputId) =>{
    return axios.get(`api/get-all-users?id=${inputId}` )
}

const createNewUserService = (data) =>{
    return axios.post('/api/create-new-user' , data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
          id: userId
        }
      });
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data);
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allCode?type=${inputType}` )
}

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = (limit) => {
    return axios.get(`/api/get-all-doctor`)
  }
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-info-doctor` , data)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService
}
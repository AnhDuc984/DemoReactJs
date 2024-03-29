import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, 
    deleteUserService ,editUserService, getTopDoctorHomeService
,getAllDoctors,saveDetailDoctorService } from "../../services/userServices"
import { toast } from 'react-toastify';


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        }
        catch (e) {
            dispatch(fetchGenderFailed())
            console.log(e)
        }
    }

}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        }
        catch (e) {
            dispatch(fetchPositionFailed())
            console.log(e)
        }
    }

}

export const fetchPositionSuccess = (genderData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: genderData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        }
        catch (e) {
            dispatch(fetchRoleFailed())
            console.log(e)
        }
    }

}

export const fetchRoleSuccess = (genderData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: genderData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                toast.success('Oke bro')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(saveUserFailed())
            }
        }
        catch (e) {
            dispatch(saveUserFailed())
        }
    }
}

export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS',
})

export const saveUserFailed = () => ({
    type: 'CREATE_USER_FAILED',
})


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("All")
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed())
            }
        }
        catch (e) {
            dispatch(fetchAllUsersFailed())
            console.log(e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                toast.success('no cap')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error('ngu')
                dispatch(saveUserFailed())
            }
        }
        catch (e) {
            toast.error('ngu')
            dispatch(saveUserFailed())
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                toast.success('updated successfully')
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error('ngu')
                dispatch(editUserFailed())
            }
        }
        catch (e) {
            toast.error('ngu')
            dispatch(editUserFailed())
        }
    }
}

export const editUserSuccess = () => ({
    type : actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type : actionTypes.EDIT_USER_FAILED
})

// let res1 = await getTopDoctorHomeService(3)

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            if(res && res.errCode === 0){
                dispatch({
                    type : actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    data : res.data
                })
            }else {
                dispatch({
                    type : actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
        }
        catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED' , e)
            dispatch({
                type : actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })
        }
    }
}   

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors('')
            if(res && res.errCode === 0){
                dispatch({
                    type : actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    data : res.data
                })
            }else {
                dispatch({
                    type : actionTypes.FETCH_ALL_DOCTOR_FAILED,
                })
            }
        }
        catch (e) {
            console.log('FETCH_ALL_DOCTOR_FAILED' , e)
            dispatch({
                type : actionTypes.FETCH_ALL_DOCTOR_FAILED,
            })
        }
    }
} 

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            if(res && res.errCode === 0){
                toast.success('saved successfully')
                dispatch({
                    type : actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }else {
                toast.success('saved failed')
                dispatch({
                    type : actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        }
        catch (e) {    
            toast.success('saved failed')                
            dispatch({
                type : actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
} 

import db from '../models/index'
import CRUDservice from '../services/CRUDservice';
let getHomePage = async (req, res) => {

    try {
        let data = await db.User.findAll();
        console.log('--------------------------------')
        console.log(data)
        console.log('--------------------------------')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }

}
let getTest = (req, res) => {
    return res.render('test/test.ejs')
}


let getCrud = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send('post crud from server')
}

let displayGetCrud = async (req, res) => {
    let data = await CRUDservice.getAllUsers()
    console.log('with love trang')

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}
let getEditCrud = async (req, res) => {
    let UserId = req.query.id;
    if (UserId) {
        let userData = await CRUDservice.getUserInfoById(UserId);
        return res.render('edit-crud', {
            userData: userData
        });
    } else {
        return res.send('with love trang');
    }
}

let putEditCrud = async (req, res) => {
    let data = req.body;
    let newUser = await CRUDservice.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: newUser
    })
}
let deleteCrud = async (req, res) => {
    let id = req.query.id
    if(id){
        await CRUDservice.deleteUserById(id)
        return res.send('with love trang')
    }
    else {
        return res.send('no no')
    }
}


module.exports = {
    getHomePage: getHomePage,
    getTest: getTest,
    getCrud: getCrud,
    postCRUD: postCRUD,
    displayGetCrud: displayGetCrud,
    getEditCrud: getEditCrud,
    putEditCrud: putEditCrud,
    deleteCrud: deleteCrud,
}
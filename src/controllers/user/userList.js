//import {getAll} from "../../models/userModel.js"

const userList = async (req, res) => {
    
    //const users = await getAll()

    users = []
    res.json(users)
}

export default userList
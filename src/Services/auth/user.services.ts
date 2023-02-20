import User from "../../models/User"


const createUser = async (name:string,email:string,passwordHash:string)=>{
    
        const existentUser = await getAllUsers(email)
        
        if(existentUser){
            throw {statusCode: 500, msg:"User already exist"}
        }

        const user = await User.create({
            email:email,
            name:name,
            password:passwordHash
        })

        return user
   
}

const getUser = async (email:string)=>{
    try {
        

        const user = await  User.findOne({
          email:email
        })
       
        
        return user
    } catch (error:any) {
        throw {statusCode:500,msg:"Error in server" }
    }
}


const getAllUsers = async (email:string)=>{
    try {
        const allUsers = await User.find()
        // console.log("email",email)
        const userExist = allUsers.find((user)=>{
            if(user.email === email) return true
            else return false
        })
        // const userExist = allUsers.map((user)=>{
        //     if(user.email === email) {
        //         return true
        //     }else{
        //         return false
        //     }
        // })
       
        // if(userExist.includes(true))return true
        // else return false

        if(userExist)return true
        else return false
    } catch (error) {
        throw error
    }
} 

const getUserWithRefreshToken =async (refreshToken:any) => {
    try {
        const userFound = await User.findOne({
            refreshToken:refreshToken
        })
        return userFound
    } catch (error) {
        throw {statusCode: 500, msg: error}
    }
}






export {createUser,getUser,getAllUsers,getUserWithRefreshToken}
import User from "../../models/User"


const createUser = async (name:string,email:string,passwordHash:string)=>{
    try {
        const user = await User.create({
            email:email,
            name:name,
            password:passwordHash
        })
        return user
    } catch (error) {
        throw {status:500,msg:error}
    }
}

const getUser = async (email:string)=>{
    try {
        const user = await  User.findOne({
            where: {email:email}
        })
        if(!user){
            throw {status: 404, msg:"User doesnt exist"}
        }
        return user
    } catch (error) {
        throw {status:500,msg:error}
    }
}





export {createUser,getUser}
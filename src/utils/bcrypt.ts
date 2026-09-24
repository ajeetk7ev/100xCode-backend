import bcrypt from 'bcryptjs'

export  function hashPassword(password:string){
     return bcrypt.hash(password, 10);
}


export  function comparePassword(hashPassword:string, password:string){
    return bcrypt.compare(password, hashPassword);
}
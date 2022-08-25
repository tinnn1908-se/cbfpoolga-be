export interface User {
    id: string,
    username: string,
    password: string,
    email: string,
    created_date: string,
    is_activated: boolean,
    is_deleted: boolean
}
export interface IEmail {
    serviceID : string, 
    templateID : string, 
    userID : string,
    email : string
}
export const initialEmail : IEmail =  {
    serviceID : '', 
    templateID : '', 
    userID : '',
    email : ''
}

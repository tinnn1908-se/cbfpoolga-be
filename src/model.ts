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
    serviceID: string,
    templateID: string,
    userID: string,
    email: string
}
export const initialEmail: IEmail = {
    serviceID: '',
    templateID: '',
    userID: '',
    email: ''
}
export interface SigninRequest {
    username: string,
    email: string,
    password: string
}
export interface Picking {
    id: string,
    entry: string,
    username: string,
    tiebreak: string,
    pickingdetails: Array<Pickingdetail>
}
export interface PickingResponse {
    id: string,
    entry: string,
    username: string,
    tiebreak: string,
    counter: number;
    pickingdetails: Array<Pickingdetail>
}

export interface Pickingdetail {
    awayteam: string,
    awayscore: string,
    awaynumber: number,
    hometeam: string,
    homescore: string,
    homenumber: number,
    selected_team: string,
    isLastgame: boolean,
    pickingDetailId: string
}
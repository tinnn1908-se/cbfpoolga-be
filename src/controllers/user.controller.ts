import { Request, Response } from "express";
import { Picking, Pickingdetail, PickingResponse } from "../model";
import UserQuery from "../queries/user.queries";
export default class UserController {
    static async submitsheets(request: Request, response: Response) {
        var pickings: Array<Picking> = request.body.pickings;
        var lastCounter = await UserQuery.getLastCounter();
        console.log('pickings : ' + pickings)
        var counterPickingdetailsCreated = 0;
        var counterPickingCreated = 0;
        var pickingdetailsCreatedFlag = false;
        var pickingCreatedFlag = false;
        if (lastCounter === false) lastCounter = 0;
        console.log('lastCounter : ' + lastCounter)
        for (let i = 0; i < pickings.length; i++) {
            var isPickingCreated = await UserQuery.createPicking(pickings[i], lastCounter);
            console.log('isPickingCreated : ' + isPickingCreated)
            if (isPickingCreated) {

                counterPickingCreated++;
                for (let j = 0; j < pickings[i].pickingdetails.length; j++) {
                    var pickingDetail = pickings[i].pickingdetails[j];
                    var isPickingdetailsCreated = await UserQuery.createPickingDetail(pickingDetail, pickings[i].id);
                    if (isPickingdetailsCreated) {
                        console.log('isPickingCreated : ' + isPickingCreated);
                        counterPickingdetailsCreated++
                    };
                }
                console.log("counterPickingdetailsCreated : " + counterPickingdetailsCreated);
                console.log("list sie : " + pickings[i].pickingdetails.length)
                if (counterPickingdetailsCreated === pickings[i].pickingdetails.length
                ) {
                    console.log('pickingdetailsCreatedFlag : true')
                    pickingdetailsCreatedFlag = true;
                }
            }
        }
        if (counterPickingCreated === pickings.length) {
            console.log('counterPickingCreated : true')
            pickingCreatedFlag = true;
        }

        if (pickingCreatedFlag && pickingdetailsCreatedFlag) {
            return response.status(200).json('Create Pickings Successfully !')
        }
        return response.status(304).json('Create Pickings failed !')
    }
    static async getPickings(request: Request, response: Response) {
        var pickings: Array<PickingResponse> = [];
        pickings = await UserQuery.getAllPickingsInWeek();
        for (let i = 0; i < pickings.length; i++) {
            var pickingDetails: Array<Pickingdetail> = await UserQuery.getPickingDetailsByPickingID(pickings[i].id);
            pickings[i].pickingdetails = pickingDetails;
        }
        if(pickings.length > 0){
            return response.status(200).json({pickings})
        }
        return response.status(404).json('Can not find data') 
    }

}
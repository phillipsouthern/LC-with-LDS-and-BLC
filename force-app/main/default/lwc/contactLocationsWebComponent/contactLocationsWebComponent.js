/* eslint-disable no-irregular-whitespace */
import { LightningElement, api, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/contactLocationsController.getContacts';

export default class ContactLocationsWebComponent extends LightningElement {
    @api recordId;
    @track mapMarkers = [];
    @track errors;
    //zoomLevel = 15;
    listView = 'visible';

    @wire(getContacts, {recordId:'$recordId'})
    wiredContacts({error,data})
    {
        if(data)
        {

            data.forEach(dataItem => {
                this.mapMarkers = [...this.mapMarkers ,
                    {
                        location: {
                            Street: dataItem.MailingStreet,
                            City: dataItem.MailingCity,
                            State: dataItem.MailingState,
                        },
        
                        icon: 'custom:custom26',
                        title: dataItem.Name,
                    }                                    
                ];
            });

            /*
            for(let i=0;i<data.length;i++)
            {

                this.mapMarkers.push(
                    {
                        location:{
                            Street: data[i].MailingStreet,
                            City: data[i].MailingCity,
                            State: data[i].MailingState,
                            PostalCode: data[i].MailingPostalCode,
                        },
                        icon: 'standard:account',
                        title:data[i].Name,
                        description:data[i].Name+' in '+data[i].MailingState,
                   },
                );

                
            }
            */
            window.console.log('map markers string: ' + JSON.stringify(this.mapMarkers));

            this.errors = undefined;
        }
        else if(error)
        {
            window.console.log(error);
        }
        
        
        
    }
    


}
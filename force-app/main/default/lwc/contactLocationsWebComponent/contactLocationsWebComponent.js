import { LightningElement, api, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/contactLocationsController.getContacts';

export default class ContactLocationsWebComponent extends LightningElement {
    @api recordId;
    @track mapMarkers = [];
    @track errors;
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
                            PostalCode: dataItem.MailingPostalCode,
                        },
        
                        icon: 'standard:account',
                        title: dataItem.Name,
                        description:dataItem.Name + ' in ' + dataItem.MailingState,
                    }                                    
                ];
            });

            this.errors = undefined;
        }
        else if(error)
        {
            window.console.log(error);
        }   
    }
}


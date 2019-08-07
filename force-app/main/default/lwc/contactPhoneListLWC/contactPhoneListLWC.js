import { LightningElement, track, wire, api } from 'lwc';
import getContacts from '@salesforce/apex/ContactPhoneListController.getContacts';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Mobile', fieldName: 'MobilePhone', type: 'phone' },
    { label: 'Other', fieldName: 'OtherPhone', type: 'phone' }
];

export default class ContactPhoneListLWC extends LightningElement {
    @api recordId;
    @track columns = columns;
    @wire(getContacts, {accountId:'$recordId'}) contacts;    
}



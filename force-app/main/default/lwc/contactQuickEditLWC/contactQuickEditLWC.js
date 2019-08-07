import { LightningElement, api } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class ContactQuickEditLWC extends LightningElement {
    @api recordId;
    @api objectApiName;

    fields = [NAME_FIELD,TITLE_FIELD,EMAIL_FIELD];
}
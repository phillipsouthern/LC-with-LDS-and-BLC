import { LightningElement, api } from 'lwc';

import CASENUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import ACCOUNT_FIELD from '@salesforce/schema/Case.AccountId';
import OWNER_FIELD from '@salesforce/schema/Case.OwnerId';
import DESC_FIELD from '@salesforce/schema/Case.Description';


export default class caseDetailsWebComponent extends LightningElement {
    @api recordId;
    @api objectApiName;

    fields = [CASENUMBER_FIELD,SUBJECT_FIELD,ACCOUNT_FIELD,OWNER_FIELD,DESC_FIELD];
}



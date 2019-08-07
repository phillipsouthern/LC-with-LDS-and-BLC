public with sharing class AccountCaseHierarchyController 
{
    @AuraEnabled
    public static List<treeItem> getAllCases(Id recordId)
    {
        List<treeItem> hiearchy = new List<treeItem>();
        Id accountId = recordId;

        Account accountPassed = [Select Id, ParentId from Account where Id = :accountId];

        Id topAccountId = (accountPassed.ParentId == null) ? accountPassed.Id : accountPassed.ParentId;
        Set<Id> accountIds = new Set<Id>();

        for(Account a : [Select Id, Name, 
                            (Select Id, Name from ChildAccounts Order by Name ASC), 
                            (Select Id, Subject, Status, CaseNumber
                            from Cases Order by CaseNumber ASC)
                            from Account Where Id = :topAccountId])
        {
            treeItem topItem = new treeItem(a.Name, a.Id);

            for(Case topcases : a.Cases)
            {
                topItem.treeItems.add(new treeItem(topcases.CaseNumber, topcases.Id, topcases));
            }

            for(Account childAccount : a.ChildAccounts)
            {
                topItem.treeItems.add(new treeItem(childAccount.Name, childAccount.Id));
                accountIds.add(childAccount.Id);
            }

            hiearchy.add(topItem);
        }

        for(Case c : [Select Id, AccountId, CaseNumber, Subject, Status
                        from Case Where AccountId IN :accountIds Order by CaseNumber ASC])
        {
            for(treeItem ti : hiearchy)
            {
                if(ti.recordId == c.AccountId)
                {
                    ti.treeItems.add(new treeItem(c.CaseNumber, c.Id, c));
                }
                else
                {
                    for(treeItem childTi : ti.treeItems)
                    {
                        if(childTi.recordId == c.AccountId)
                        {
                            childTi.treeItems.add(new treeItem(c.CaseNumber, c.Id, c));
                        }
                    }
                }
            }
        }

        system.debug('hiearchy: ' + hiearchy);

        return hiearchy;

    }

    public class treeItem
    {
        @AuraEnabled
        public string recordName {get;set;}
        @AuraEnabled
        public Id recordId{get;set;}
        @AuraEnabled
        public String recordurl{get;set;}
    
        @AuraEnabled 
        public List<treeItem> treeItems {get;set;}
        
        @AuraEnabled
        public string casesubject{get;set;}
        @AuraEnabled
        public string casestatus{get;set;}
        

        
        public treeItem(String rName, Id rId)
        {
            recordName = rName;
            recordId = rId;
            recordurl = '/'+rId;

            treeItems = new List<treeItem>();
        }

        public treeItem(String rName, Id rId, Case c)
        {
            recordName = rName;
            recordId = rId;
            recordurl = '/'+rId;

            casesubject = c.Subject;
            casestatus = c.Status;
            
            treeItems = new List<treeItem>();
        }

    }
}


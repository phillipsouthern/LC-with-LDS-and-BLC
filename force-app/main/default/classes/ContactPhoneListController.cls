public with sharing class ContactPhoneListController 
{
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accountId) 
    {
        return [Select Id, Name, Phone, MobilePhone, OtherPhone From Contact Where AccountId = :accountId];
    }
}




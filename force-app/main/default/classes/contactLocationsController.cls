public class contactLocationsController 
{
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id recordId)
    {
        return [Select Id, Name, MailingStreet, MailingCity, MailingState, MailingPostalCode 
                    from Contact 
                    Where AccountId = :recordId 
                    AND MailingStreet != null 
                    AND MailingState != null 
                    AND MailingPostalCode != null];
    }
}



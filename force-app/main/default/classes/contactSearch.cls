public with sharing class contactSearch {
    @AuraEnabled(cacheable=true)
    public static list<contact> getContactList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
		list<contact> contactListRecord = new List<Contact>() ;
        
        for(Contact con:[Select id,Name From Contact WHERE name LIKE : searchKeyword]){
            contactListRecord.add(con);
        }
        if(contactListRecord.isEmpty()){
            throw new AuraHandledException('No records found...');
        }
        return(contactListRecord);
        
         
       
    }
}
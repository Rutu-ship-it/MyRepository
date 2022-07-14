import { LightningElement ,track } from 'lwc';
import getContactList from '@salesforce/apex/contactSearch.getContactList';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class Contact_search_bar extends LightningElement {
    @track contactsRecord;
    searchValue = '';
   
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }
 
    
    handleSearchKeyword() {
         if (this.searchValue !== '') {
            getContactList({
                    searchKey: this.searchValue
                })
                .then(result => {
                    this.contactsRecord = result;
                })
                .catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    this.contactsRecord = null;
                });
        } else {
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}
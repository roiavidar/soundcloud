angular.module("musicPlayerModule").component("lastSearchesContainer", {
   templateUrl: "lastSearchesContainer/lastSearchesContainer.template.html" ,
   controller: lastSearchesContainerController
});

function lastSearchesContainerController(searchesService, historyService) {
    this.searchItems;
    
    this.$onInit = function() {
        searchesService.addNewSearchesListener(this.addNewSearch.bind(this));
        this.searchItems = searchesService.getLastSearchesBy(5).reverse();
    }
    
    this.addNewSearch = function(newSearch) {
        this.searchItems.unshift(newSearch);
        
        if(this.searchItems.length > 5) {
            this.searchItems.pop();
        }
    }
    
    this.triggerHistorySearch = function(historySearchItem) {
        historyService.triggerHistorySearch(historySearchItem);
    }
}
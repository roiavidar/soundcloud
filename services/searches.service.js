angular.module('musicPlayerModule').service('searchesService', function() {

    var addNewSearchesListeners = [];
    var historySearchListeners = [];
    var searches = JSON.parse(window.localStorage.getItem('searches')) || [];
    
    this.addNewSearchesListener = function(callback) {
        addNewSearchesListeners.push(callback);
    }
    
    this.addHistorySearchListeners = function(callback) {
        historySearchListeners.push(callback);
    }
    
    this.getLastSearchesBy = function(num) {
        return searches.slice(num*-1);
    }
    
    this.addNewSearch = function(newSearch) {
        searches.push(newSearch);
        
        window.localStorage.setItem('searches', JSON.stringify(searches));
        
        addNewSearchesListeners.forEach(function(listener) {
            listener(newSearch);
        });
    }
    
    this.triggerHistorySearch = function(historySearch) {
        historySearchListeners.forEach(function(listener) {
            listener(historySearch)
        });
    }
});

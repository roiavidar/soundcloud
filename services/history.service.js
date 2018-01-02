angular.module('musicPlayerModule').service('historyService', function() {

    var historySearchListeners = [];
    
    this.addHistorySearchListeners = function(callback) {
        historySearchListeners.push(callback);
    }
    
    this.triggerHistorySearch = function(historySearch) {
        historySearchListeners.forEach(function(listener) {
            listener(historySearch)
        });
    }
});

angular.module('musicPlayerModule').service('trackService', function() {

    var trackListeners = [];
    
    this.addTrackListeners = function(callback) {
        trackListeners.push(callback);
    }
    
    this.pushTrack = function(track) {
        trackListeners.forEach(function(listener) {
            listener(track)
        });
    }
});
angular.module("musicPlayerModule").factory("soundCloudFactory", function($http) {

    function soundCloudFactory(options) {
        
        function search(query) {
            return SC.get('/tracks', {
                q: query,
                limit: options.limit,
                linked_partitioning: options.linked_partitioning
            });
        }
        
        function nextTracks(uri) {
            return $http.get(uri);
        }
        
        function streamMusic(trackId) {
            return SC.stream('/tracks/' + trackId)
        }
        
        return {
            search: search,
            nextTracks: nextTracks,
            streamMusic: streamMusic
        }
    }
    
    return soundCloudFactory;
});

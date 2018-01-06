angular.module("musicPlayerModule").component("searchContainer", {
    templateUrl: "searchContainer/searchContainer.template.html",
    controller: SearchContainerController
});

function SearchContainerController($scope, soundCloudFactory, searchesService, historyService, trackService) {

    this.tracks;
    this.SC;
    this.isImg = false;
    this.searchQuery = "";
    this.isSearched = false;

    this.$onInit = function() {
        this.SC = soundCloudFactory({ limit: 6, linked_partitioning: 1 });
        this.isImg = JSON.parse(window.localStorage.getItem('isImg')) || false;
        historyService.addHistorySearchListeners(this.historySearchRequest.bind(this));
    }

    this.historySearchRequest = function(searchRequest) {
        this.searchQuery = searchRequest;
        this.searchTracks(searchRequest);
    }

    this.triggerSearchOnEnter = function($event) {
        if ($event.keyCode == 13) {
            this.newSearchTracks(this.searchQuery);
        }
    }

    this.triggerTrackSelection = function(track) {
        trackService.pushTrack(track);
    }

    this.searchTracks = function(query) {
        this.isSearched = true;
        return this.SC.search(query).then(function(result) {
            $scope.$apply(function() {
                this.tracks = result.collection;

                setImagesToBetterQuality(this.tracks);

                this.nextTracks = result["next_href"];
            }.bind(this));
        }.bind(this))
    }

    this.newSearchTracks = function(query) {
        this.searchTracks(query);
        if (query !== "") {
            searchesService.addNewSearch(this.searchQuery);
        }
    }

    this.fetchNextTracks = function(uri) {
        this.SC.nextTracks(uri).then(function(result) {
            this.tracks = result.data.collection;
            this.nextTracks = result.data["next_href"];

            setImagesToBetterQuality(this.tracks);
        }.bind(this));
    }


    function setImagesToBetterQuality(tracks) {
        tracks.forEach(function(tempTrack) {
            tempTrack.artwork_url = tempTrack.artwork_url && tempTrack.artwork_url.replace('large.jpg', 't500x500.jpg');
        });
    }

    this.onListViewClicked = function(isImg) {
        this.isImg = isImg;

        window.localStorage.setItem('isImg', isImg);
    }
}

angular.module("musicPlayerModule").component("trackContainer", {
    templateUrl: "trackContainer/trackContainer.template.html",
    controller: trackContainerController
});

function trackContainerController(trackService, $timeout, soundCloudFactory) {

    this.newTrack;
    this.placeholderAlbum = "https://djazz.se/apps/eqbeats/img/album-placeholder.png";
    this.timeoutSwitch = 2500;
    this.player;
    this.isPlaying = false;

    this.$onInit = function() {
        trackService.addTrackListeners(this.addNewTrack.bind(this));
        this.currentTrack = { artwork_url: this.placeholderAlbum };
        this.SC = soundCloudFactory();
    }

    this.togglePlaySong = function($event) {
        var target = $event.target;
        if(target.tagName !== "IMG") {
            return;
        }
        
        if (this.player.isPlaying()) {
            this.player.pause();
            this.isPlaying = false;
        }
        else {
            this.player.play();
            this.isPlaying = true;
        }
    }

    this.addNewTrack = function(newTrack) {
        newTrack = angular.copy(newTrack);
        this.isNewTrack = false;
        this.isPlaying = false;
        this.player && this.player.pause();

        this.SC.streamMusic(newTrack.id).then(function(player) {
            this.player = player;
        }.bind(this))

        // fix to cause animation to stop (with causing the page to reflow)
        setTimeout(function() {
            document.querySelector('.new-track').offsetWidth;
        }, 0);

        if (this.unsubscribeSwitch !== undefined) {
            $timeout.cancel(this.unsubscribeSwitch);
            this.unsubscribeSwitch = undefined;
        }

        $timeout(function() {
            if (newTrack["artwork_url"] === null) {
                newTrack["artwork_url"] = this.placeholderAlbum;
            }
            this.newTrack = newTrack;
            this.isNewTrack = true;
        }.bind(this), 0);

        this.unsubscribeSwitch = $timeout(function() {
            var tempTrack = this.currentTrack;
            this.currentTrack = this.newTrack;
            this.newTrack = tempTrack;
            this.isNewTrack = false;
            this.unsubscribeSwitch = undefined;
        }.bind(this), this.timeoutSwitch)
    }

}

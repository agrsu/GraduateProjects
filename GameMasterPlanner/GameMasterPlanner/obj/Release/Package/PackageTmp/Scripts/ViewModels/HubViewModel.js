﻿class Hub {
    constructor(campaignId) {

        this.CampaignId = campaignId
        this.SessionList = ko.observableArray([]);

        //Check here if there is no sessions
        this.CurrentSession = ko.observable();

        this.CharacterList = ko.observableArray([]);

        this.LocationList = ko.observableArray([]);
        this.OrganizationList = ko.observableArray([]);

        let map = new GMaps({
            div: '#map',
            lat: 52.4801,
            lng: -1.8835,
            width: '100%',
            height: '500px',
            zoom: 7
        });

        map.setContextMenu({
            control: 'map',
            options: [{
                title: 'Add marker',
                name: 'add_marker',
                action: function (e) {
                    this.addMarker({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                        title: 'New marker'
                    });
                }
            }, {
                title: 'Center here',
                name: 'center_here',
                action: function (e) {
                    this.setCenter(e.latLng.lat(), e.latLng.lng());
                }
            }]
        });

        this.Map = map;
    }
}

class Character {
    constructor(data) {
        this.Id = data.Id;
        this.Name = data.Name;
        this.History = data.History;
        this.Description = data.Description;
    }
}

let hubViewModel = new Hub(campaignId);

$.getJSON(baseURL + 'api/Session?id=' + campaignId, function (data) {
    data.forEach(function (sessionData) {
        hubViewModel.SessionList.push(new Session(sessionData));
    });

    hubViewModel.CurrentSession(hubViewModel.SessionList()[0]);

    $.getJSON(baseURL + 'api/Character/GetSessionCharacters?sessionId=' + hubViewModel.CurrentSession().Id, function (data) {
        data.forEach(function (characterData) {
            hubViewModel.CharacterList.push(new Character(characterData));
        });

        
    });
    ko.applyBindings(hubViewModel);
});

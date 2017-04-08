﻿class CharacterViewModel {
    constructor(data) {
        if (data) {
            this.Id = data.Id;
            this.HistoryId = data.HistoryId;
            this.Name = ko.observable(data.Name);
            this.History = ko.observable(data.History);
            this.Description = ko.observable(data.Description);
            this.Notes = ko.observable(data.Notes);
        } else {
            this.Id = -1;
            this.HistoryId = -1;
            this.Name = ko.observable();
            this.History = ko.observable();
            this.Description = ko.observable();
            this.Notes = ko.observable();
        }

    }

    toJson() {
        let self = this;

        let character = {
            Id: self.Id,
            HistoryId: self.HistoryId,
            Name: self.Name(),
            History: self.History(),
            Descrption: self.Description(),
            Notes: self.Notes()
        }

        return character;
    }

    save() {
        $.post(baseURL + 'api/Character', this.toJson(), function (returnedData) { });

        if (this.SessionId) {
            this.associateToSesssion();
        }

        this.clear();
    }

    loadCharacter(characterId) {
        $.getJSON(baseUrl + "api/Character?characterId=" + characterId, function (data) { });

    }

    associateToSesssion() {
        $.post(baseURL + 'api/Character/PostAssociateToSession?characterId=' + this.Id + '&sessionId=' + this.SessionId,
            this.toJson(), function (returnedData) { });
    }

    setSessionId(sessionId) {
        this.SessionId = sessionId;
    }

    clear() {
        this.Id = -1;
        this.HistoryId = -1;
        this.SessionId = null;
        this.Name(null);
        this.History(null);
        this.Description(null);
        this.Notes(null);
    }
}


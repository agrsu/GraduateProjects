﻿CREATE TABLE [dbo].[Session]
(
	[Id] INT identity NOT NULL PRIMARY KEY, 
	[CampaignId] Int NULL,
	[BaseMapId] INT NULL, 
	[SessionNumber] INT NULL,
    [Notes] NVARCHAR(MAX) NULL, 
    CONSTRAINT [FK_Session_ToMap] FOREIGN KEY ([BaseMapId]) REFERENCES [Map]([Id]), 
    CONSTRAINT [FK_Session_ToCampaign] FOREIGN KEY ([CampaignId]) REFERENCES [Campaign]([Id])
    
)
﻿using DataAccess.Models;
using DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GameMasterPlanner.Controllers.API
{
    public class CampaignController : ApiController
    {
        private List<CampaignViewModel> campaignList = new List<CampaignViewModel>
        {
            new CampaignViewModel()
            {
                Name = "Dr. Larson and The Mystery of the Green Tomb",
                History = "A fricken sweet history"
            },
            new CampaignViewModel()
            {
                Name = "Dr. Larson and The Longest Knight",
                History = "Such facts"
            }
        };

        public HttpResponseMessage Get()
        {
            var repro = new CampaignRepository();
            var list = repro.getCampaignList();
            return Request.CreateResponse(HttpStatusCode.OK, list);
        }

        public HttpResponseMessage Post(CampaignViewModel newCampaign)
        {
            var repro = new CampaignRepository();
            repro.createCampaign(newCampaign);
            var list = repro.getCampaignList();
            return Request.CreateResponse(HttpStatusCode.OK, list);
        }
    }
}

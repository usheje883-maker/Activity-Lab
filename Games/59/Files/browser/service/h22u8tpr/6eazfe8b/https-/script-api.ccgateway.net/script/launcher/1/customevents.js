$scramjet$pushsourcemap([18,0,0,0,19,0,0,0,27,0,0,0,0,189,0,0,0,28,0,0,0,0,85,1,0,0,28,0,0,0,0,198,1,0,0,28,0,0,0,0,58,4,0,0,29,0,0,0,0,205,4,0,0,1,0,0,0,0,209,4,0,0,1,0,0,0,0,4,6,0,0,16,0,0,0,0,21,6,0,0,2,0,0,0,0,121,11,0,0,1,0,0,0,0,136,11,0,0,1,0,0,0,0,155,12,0,0,29,0,0,0,0,161,13,0,0,1,0,0,0,0,167,13,0,0,1,0,0,0,0,192,13,0,0,1,0,0,0,0,196,13,0,0,1,0,0,0,0,142,19,0,0,29,0,0,0,0,193,20,0,0,29,0,0,0,0], "f9d1cc46a22");
;(function(win,doc)/*scramtag 19 f9d1cc46a22*/{var ccao=win["cca"]||{};ccao.privacy=ccao.privacy||{que:[]};ccao.custAud=ccao.custAud||{que:[]};ccao.fireAudienceEvent=function(id,cs,usp,pco)/*scramtag 189 f9d1cc46a22*/{var eventObject={"id":id,"pco":pco};ccao.fireTrackingEvent(eventObject,false);};ccao.fireTrackingEvent=function(data,debug)/*scramtag 341 f9d1cc46a22*/{if(debug){console.log("Tracking Pixel triggered");}
ccao.privacy.que.push(function()/*scramtag 454 f9d1cc46a22*/{if(!ccao.privacy.law||typeof ccao.privacy.law!=="string"){ccao.privacy.law="unknown";}
switch(ccao.privacy.law.toLowerCase()){case "gdpr":if(ccao.privacy.gdpr.Consent){fireTrackingInternal(data,debug)}else{if(debug){console.log("GDPR consent not given, cannot fire Tracking Pixel");}}
break;case "ccpa":if(ccao.privacy.ccpa.Consent){fireTrackingInternal(data,debug)}else{if(debug){console.log("CCPA consent not given, cannot fire Tracking Pixel");}}
break;case "na":fireTrackingInternal(data,debug)
break;case "optout":case "unknown":default:break;}});};var fireTrackingMultiple=function(data,debug)/*scramtag 1082 f9d1cc46a22*/{if(debug){console.log("Multiple Pixels requested");}
var endpoint=win._ccLauncherSettings.customEvents;var ceUrl=new (URL)(endpoint+"/p/"+_ccScriptSettings.site.parentId+"/ces");if(ccao.privacy.gdpr&&ccao.privacy.gdpr.CS){ceUrl.searchParams.set("cs",ccao.privacy.gdpr.CS);}
if(ccao.privacy.ccpa&&ccao.privacy.ccpa.ConsentString){ceUrl.searchParams.set("usp",ccao.privacy.ccpa.CS);}
var bodyJson=[];for(i in data){var event=data[$scramjet$prop((i))];if(!event.id){if(debug){console.log("Event is missing ID, cannot be sent");console.log(event);}
continue;}
if(event.pco!==undefined&&!ceUrl.searchParams.get("pco")){ceUrl.searchParams.set("pco",event.pco);}
var eventObject={};eventObject["triggerid"]=event.id;eventObject["parent_id"]=_ccScriptSettings.site.parentId;eventObject["profileId"]=_ccScriptSettings.user.id;eventObject["pageview_id"]=_ccScriptSettings.pageData.pvid;if(event.NumberKey&&event.NumberKey!=""&&event.NumberValue&&!isNaN(event.NumberValue)){eventObject["numberkey"]=event.NumberKey;eventObject["numbervalue"]=event.NumberValue;}
if(event.StringKey&&event.StringKey!=""&&event.StringValue&&event.StringValue!=""){eventObject["stringkey"]=event.StringKey;eventObject["stringvalue"]=event.StringValue;}
var codes=["USD","EUR"];if(event.Money&&!isNaN(event.Money)&&event.CurrencyCode&&event.CurrencyCode.toUpperCase&&codes.includes(event.CurrencyCode.toUpperCase())){eventObject["money"]=event.Money;eventObject["currencycode"]=event.CurrencyCode.toUpperCase();}
if(event.Label&&event.Label!=""){eventObject["event_label"]=event.Label;}
ccao.engagement.registerEngagement();eventObject["engagement_id"]=ccao.engagement.id;eventObject["engagement_count"]=ccao.engagement.count;eventObject["engagement_ttl"]=ccao.engagement.ttl;bodyJson.push(eventObject);if(debug){console.log(eventObject);}}
var xmlHttp=new (XMLHttpRequest)();xmlHttp.open("POST",ceUrl,true);xmlHttp.setRequestHeader('Content-Type','application/json');xmlHttp.send(JSON.stringify(bodyJson));if(debug){console.log("Custom Event Pixel request sent. URL: "+ceUrl);console.log(bodyJson);}}
var fireTrackingInternal=function(data,debug)/*scramtag 3227 f9d1cc46a22*/{if(Array.isArray(data)){fireTrackingMultiple(data,debug);return}
if(!data.id){if(debug){console.log("Event is missing ID, cannot be sent");console.log(event);}
return}
var endpoint=win._ccLauncherSettings.customEvents;var pixel=new (Image)();var pagePixelUrl=new (URL)(endpoint+"/p/"+_ccScriptSettings.site.parentId+"/ce/"+data.id);pagePixelUrl.searchParams.set("ccuid",_ccScriptSettings.user.id);pagePixelUrl.searchParams.set("pvid",_ccScriptSettings.pageData.pvid);if(ccao.privacy.gdpr&&ccao.privacy.gdpr.CS){pagePixelUrl.searchParams.set("cs",ccao.privacy.gdpr.CS);}
if(ccao.privacy.ccpa&&ccao.privacy.ccpa.ConsentString){pagePixelUrl.searchParams.set("usp",ccao.privacy.ccpa.CS);}
if(data.pco){pagePixelUrl.searchParams.set("pco",data.pco);}
if(data.NumberKey&&data.NumberKey!=""&&data.NumberValue&&isNaN(data.NumberValue)==false){pagePixelUrl.searchParams.set("nk",data.NumberKey);pagePixelUrl.searchParams.set("nv",data.NumberValue);}
if(data.StringKey&&data.StringKey!=""&&data.StringValue&&data.StringValue!=""){pagePixelUrl.searchParams.set("sk",data.StringKey);pagePixelUrl.searchParams.set("sv",data.StringValue);}
var codes=["USD","EUR"];if(data.Money&&!isNaN(data.Money)&&data.CurrencyCode&&data.CurrencyCode.toUpperCase&&codes.includes(data.CurrencyCode.toUpperCase())){pagePixelUrl.searchParams.set("mn",data.Money);pagePixelUrl.searchParams.set("cc",data.CurrencyCode.toUpperCase());}
if(data.Label&&data.Label!=""){pagePixelUrl.searchParams.set("lb",data.Label);}
ccao.engagement.registerEngagement();pagePixelUrl.searchParams.set("engid",ccao.engagement.id);pagePixelUrl.searchParams.set("engcount",ccao.engagement.count);pagePixelUrl.searchParams.set("engttl",ccao.engagement.ttl);pixel.src=pagePixelUrl.href;setTimeout(function()/*scramtag 5006 f9d1cc46a22*/{if(!pixel.complete||!pixel.naturalWidth){pixel.src="";}},2000);if(debug){console.log("Custom Event Pixel request sent. URL: "+pagePixelUrl.href);}};var tempQue=ccao.custAud.que
for(custAudCallback of tempQue){custAudCallback();}
ccao.custAud.que={push:function(custAudCallback)/*scramtag 5313 f9d1cc46a22*/{custAudCallback();}}})(window,document);
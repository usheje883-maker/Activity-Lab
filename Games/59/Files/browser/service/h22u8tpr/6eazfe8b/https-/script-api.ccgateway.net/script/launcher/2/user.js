$scramjet$pushsourcemap([10,0,0,0,19,0,0,0,27,0,0,0,0,79,0,0,0,16,0,0,0,0,103,0,0,0,2,0,0,0,0,209,1,0,0,1,0,0,0,0,67,2,0,0,28,0,0,0,0,177,3,0,0,1,0,0,0,0,178,4,0,0,1,0,0,0,0,147,5,0,0,1,0,0,0,0,12,6,0,0,29,0,0,0,0,142,6,0,0,29,0,0,0,0], "1efea1faf52");
;(function(win,doc)/*scramtag 19 1efea1faf52*/{var ccaoName="cca";var ccao=win[$scramjet$prop((ccaoName))];ccao.privacy=ccao.privacy||{que:[]};var cachedUser={cached:false,localCache:false};try{if(window.localStorage){var ccuid=window.localStorage.getItem("carbon_ccuid");if(ccuid)
cachedUser={ccuid:ccuid,localCache:true,cached:true};}
if(window.sessionStorage){var ccsid=window.sessionStorage.getItem("carbon_ccsid");if(ccsid)
cachedUser.ccsid=ccsid;}}catch(err){;console.debug('error:'+err.message);}
win._ccScriptSettings.user.localCachedUser=cachedUser;function setStorage()/*scramtag 579 1efea1faf52*/{if(!ccao.privacy.law||typeof ccao.privacy.law!=="string"){ccao.privacy.law="unknown";}
switch(ccao.privacy.law.toLowerCase()){case "gdpr":if(ccao.privacy.gdpr.Consent){try{window.localStorage.setItem("carbon_ccuid",win._ccScriptSettings.user.id);window.sessionStorage.setItem("carbon_ccsid",win._ccScriptSettings.session.id);}catch(err){;console.debug('error:'+err.message);}}
break;case "ccpa":if(ccao.privacy.ccpa.Consent){try{window.localStorage.setItem("carbon_ccuid",win._ccScriptSettings.user.id);window.sessionStorage.setItem("carbon_ccsid",win._ccScriptSettings.session.id);}catch(err){;console.debug('error:'+err.message);}}
break;case "na":try{window.localStorage.setItem("carbon_ccuid",win._ccScriptSettings.user.id);window.sessionStorage.setItem("carbon_ccsid",win._ccScriptSettings.session.id);}catch(err){;console.debug('error:'+err.message);}
break;case "optout":case "unknown":default:break;}}
ccao.setUserStorage=function()/*scramtag 1548 1efea1faf52*/{ccao.privacy=ccao.privacy||{};ccao.privacy.que=ccao.privacy.que||[];ccao.privacy.que.push(function()/*scramtag 1678 1efea1faf52*/{setStorage();});};})(window,document);
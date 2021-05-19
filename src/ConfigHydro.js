
function setInnerHTML (selector, value) {
    if(document.querySelector(selector)){
        document.querySelector(selector).innerHTML = value;
    }
}
let config = {
    st_19090252: { 
        id: "st_19090252",
        topic: "device/ELP001/19090252/metrics/#",
	    title: "Pluviometro Leivi | Bacino Torrente Rupinaro",  
        soglie:  { m10: [6,14,19], m30: [19,29, 34], h1: [29,44,49]}
    },
    st_20030132: { 
        id: "st_20030132",
        topic: "device/ELP001/20030132/metrics/#",
        title: "Pluviometro Campodonico | Bacino Torrente Rupinaro",  
        soglie: { m10: [6,14,19], m30: [19,29, 34], h1: [29,44,49]}
    },
    st_cornua: { 
        id: "st_cornua",
        topic: 'device/PLUVIORETEMET/cornua/metrics/#',
        title: "Pluviometro Rio Fosso Grande - Bacino Torrente Nervi",   
        soglie: { m10: [6,14,19], m30: [19,29, 34], h1: [29,44,49]}
    },
    st_fasce: { 
        id: "st_fasce",
        topic: 'device/PLUVIORETEMET/fasce/metrics/#',
        title: "Pluviometro Rio Carega  - Bacino Torrente Nervi ",        
        soglie: { m10: [6,14,19], m30: [19,29, 34], h1: [29,44,49]}        
    },
	
	    st_pontori: { 
        id: "st_pontori",
        topic: 'device/PLUVIORETEMET/pontori/metrics/#',
        title: "Pluviometro Prato di Pontori, NE (GE) - Bacino Torrente Garibaldo",        
        soglie: { m10: [6,14,19], m30: [19,29, 34], h1: [29,44,49]}        
    },
	
	    st_mezzanego: { 
        id: "st_mezzanego",     
        topic: 'device/PLUVIORETEMET/mezzanego/metrics/#',
        title: "Pluviometro S.Siro Foce, Mezzanego (GE) - Bacino Torrente Mogliana ",        
        soglie: { m10: [6,14,19], m30: [19,29, 34], h1: [29,44,49]}        
    },
	
		st_casali: { 
        id: "st_casali",
        topic: 'device/PLUVIORETEMET/casali/metrics/#',
        title: "Pluviometro Casali di Stibiveri, Borzonasca (GE)  - Bacino Torrente Sturla ",        
        soglie: { m10: [6,14,19], m30: [19,29, 34], h1: [29,44,49]}             
    }
	    
	
  }
let parsedUrl = new URL(window.location.href);
let _id = parsedUrl.searchParams.get("id") || "19090252"
let st_id = "st_" + _id;
st_id = config[st_id] ? st_id : "st_19090252"
//Settings the station title
//setInnerHTML("title", "");
setInnerHTML("title", config[st_id].title);                       
// setInnerHTML("#info", config[st_id].info);
// setInnerHTML("#logo", config[st_id].logo);       
// setInnerHTML("#logo", config[st_id].logo);           
      
 
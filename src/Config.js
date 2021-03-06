
function setInnerHTML (selector, value) {
    if(document.querySelector(selector)){
        document.querySelector(selector).innerHTML = value;
    }
}
let config = {
    st_19070267: { 
        id: "st_19070267",
        topic: "device/ALP001/19070267/metrics/#",
	    title: "<i class='material-icons'>place</i> PENDENNIS SHIPYARD | Weather Station",  
	    titlePage: "PENDENNIS SHIPYARD | Real Time Wind Data",     
        logo: "<a href='https://pendennis.com/' target='_blank'><img src='img/pendennis.png' alt='logo customer'></a> ",             
        info: "PENDENNIS SHIPYARD <br/>50&deg;09&#39;13&#34; N 5&deg;03&#39;09&#34; W<br/>Real Time Wind Data",
        iframe: "https://navimeteoexternals.progestnow.com/externals/navimeteo/forecast/onehforecast?port_code=GBLGP&lat=50.138985&lng=-5.033733"
    },
    st_19090456: { 
        id: "st_19090456",
        topic: "device/ALP001/19090456/metrics/#",
        title: "<i class='material-icons'>place</i> NCI Cape Cornwall | Real Time Wind Data",
		titlePage: "NCI Cape Cornwall | Real Time Wind Data",       
	    logo: "<a href='https://www.nci.org.uk/capecornwall' target='_blank'><img src='img/nci.png' alt='logo customer'></a> ", 
	    info: "CAPE CORNWALL Lookout Station <br/>50&deg;07.63&#39;N - 5&deg;42.56&#39;W<br/>Real Time Wind Data",    
        iframe: "https://navimeteoexternals.progestnow.com/externals/navimeteo/forecast/onehforecast?port_code=GBCCL&lat=50.126992&lng=-5.715079"
    },
    st_19090456M: { 
        id: "st_19090456",
        topic: "device/ALP001/19090456/metrics/#",
        title: "<i class='material-icons'>place</i> NCI Cape Cornwall | Real Time Wind Data",               
		titlePage: "NCI Cape Cornwall | Real Time Wind Data",    
        logo: "<a href='https://www.nci.org.uk/capecornwall' target='_blank'><img src='img/nci.png' alt='logo customer'></a> ", 
	    info: "CAPE CORNWALL Lookout Station <br/>50&deg;07.63&#39;N - 5&deg;42.56&#39;W<br/>Real Time Wind Data",    
        iframe: "https://navimeteoexternals.progestnow.com/externals/navimeteo/forecast/onehforecast?port_code=GBCCL&lat=50.126992&lng=-5.715079",
        uom: "mph" // uom: one of kt, ms, mph default kt
    } ,

    st_19100250: { 
        id: "st_19100250",
        topic: "device/ALP001/19100250/metrics/#",
        title: "<i class='material-icons'>place</i> Torre Marina Chiavari | Real Time Wind Data",               
		titlePage: "Torre Marina Chiavari | Real Time Wind Data",    
        logo: "<a href='https://www.retemet.com/' target='_blank'><img src='img/retemet.png' alt='logo customer'></a> ",    
	    info: "Torre Marina Chiavari <br/>44&deg;18&#39;N - 09&deg;19&#39;E<br/>Real Time Wind Data",      
        iframe: "https://navimeteoexternals.progestnow.com/externals/navimeteo/forecast/onehforecast?port_code=ITCHX&lat=44.312604&lng=9.320266",         
    }
      
	     
	
  }
let parsedUrl = new URL(window.location.href);
let _id = parsedUrl.searchParams.get("id") || "19070267"
let st_id = "st_" + _id;
st_id = config[st_id] ? st_id : "st_19070267"
//Settings the station title
setInnerHTML("#title", config[st_id].title);
setInnerHTML("#titlePage", config[st_id].titlePage);                    
setInnerHTML("#info", config[st_id].info);
setInnerHTML("#logo", config[st_id].logo);       
setInnerHTML("#logo", config[st_id].logo);        
      


function setInnerHTML (selector, value) {
    if(document.querySelector(selector)){
        document.querySelector(selector).innerHTML = value;
    }
}
let config = {
    st_19070267: { topic: "device/ALP001/19070267/metrics/#",
	title: "PENDENNIS SHIPYARD | Real Time Wind Data",
    logo: "<a href='https://pendennis.com/' target='_blank'><img src='img/pendennis.png' alt='logo customer'></a> ", 
    info: "PENDENNIS SHIPYARD <br/>50&deg;09&#39;13&#34; N 5&deg;03&#39;09&#34; W<br/>Real Time Wind Data",
    iframe: "https://navimeteoexternals.progestnow.com/externals/navimeteo/forecast/onehforecast?port_code=GBLGP&lat=50.138985&lng=-5.033733"
    },
    st_19090456: { topic: "device/ALP001/19090456/metrics/#",
    title: "NCI Cape Cornwall | Real Time Wind Data",
    logo: "<a href='https://www.nci.org.uk/capecornwall' target='_blank'><img src='img/nci.png' alt='logo customer'></a> ", 
	info: "CAPE CORNWALL Lookout Station <br/>50&deg;07.63&#39;N - 5&deg;42.56&#39;W<br/>Real Time Wind Data",    
    iframe: "https://navimeteoexternals.progestnow.com/externals/navimeteo/forecast/onehforecast?port_code=GBCCL&lat=50.126992&lng=-5.715079",
    uom: "mph" // uom: one of kt, ms, mph default kt
    } 
  }
let parsedUrl = new URL(window.location.href);
let _id = parsedUrl.searchParams.get("id") || "19070267"
let st_id = "st_" + _id;
st_id = config[st_id] ? st_id : "st_19070267"
//Settings the station title
setInnerHTML("#title", config[st_id].title);
setInnerHTML("#info", config[st_id].info);
setInnerHTML("#logo", config[st_id].logo); 
      

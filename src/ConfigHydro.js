
function setInnerHTML (selector, value) {
    if(document.querySelector(selector)){
        document.querySelector(selector).innerHTML = value;
    }
}
let config = {
    st_19090252: { 
        id: "st_19090252",
        topic: "device/ELP001/19090252/metrics/#",
	    title: "<i class='material-icons'>place</i> PENDENNIS SHIPYARD | Weather Station",  
	    titlePage: "PENDENNIS SHIPYARD | Real Time Wind Data",     
        logo: "<a href='https://pendennis.com/' target='_blank'><img src='img/pendennis.png' alt='logo customer'></a> ",             
        info: "PENDENNIS SHIPYARD <br/>50&deg;09&#39;13&#34; N 5&deg;03&#39;09&#34; W<br/>Real Time Wind Data",
    },
    st_20030132: { 
        id: "st_20030132",
        topic: "device/ELP001/20030132/metrics/#",
        title: "<i class='material-icons'>place</i> NCI Cape Cornwall | Real Time Wind Data",
		titlePage: "NCI Cape Cornwall | Real Time Wind Data",       
	    logo: "<a href='https://www.nci.org.uk/capecornwall' target='_blank'><img src='img/nci.png' alt='logo customer'></a> ", 
	    info: "CAPE CORNWALL Lookout Station <br/>50&deg;07.63&#39;N - 5&deg;42.56&#39;W<br/>Real Time Wind Data",    
    }
  }
let parsedUrl = new URL(window.location.href);
let _id = parsedUrl.searchParams.get("id") || "19090252"
let st_id = "st_" + _id;
st_id = config[st_id] ? st_id : "st_19090252"
//Settings the station title
setInnerHTML("title", _id);
// setInnerHTML("#titlePage", config[st_id].titlePage);                    
// setInnerHTML("#info", config[st_id].info);
// setInnerHTML("#logo", config[st_id].logo);       
// setInnerHTML("#logo", config[st_id].logo);        
      

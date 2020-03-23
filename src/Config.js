let config = {
    st_19070267: { topic: "device/ALP001/19070267/metrics/#",
    title: "PENDENNIS SHIPYARD <br/>50&deg;09&#39;13&#34; N 5&deg;03&#39;09&#34; W<br/>Real Time Wind Data",
    iframe: "https://navimeteoexternals-dev.progestnow.com/externals/navimeteo/forecast/onehforecast?port_code=GBLGP&lat=50.1540592&lng=-5.052021"
    },
    st_19090456: { topic: "device/ALP001/19090456/metrics/#",
    title: "TODO change PENDENNIS SHIPYARD <br/>50&deg;09&#39;13&#34; N 5&deg;03&#39;09&#34; W<br/>Real Time Wind Data",
    iframe: "https://navimeteoexternals-dev.progestnow.com/externals/navimeteo/forecast/onehforecast?port_code=GBLGP&lat=50.1540592&lng=-5.052021"
    }
  }
let parsedUrl = new URL(window.location.href);
let _id = parsedUrl.searchParams.get("id") || "19070267"
let st_id = "st_" + _id;
st_id = config[st_id] ? st_id : "st_19070267"
//Settings the station title
document.querySelector("#title").innerHTML = config[st_id].title;
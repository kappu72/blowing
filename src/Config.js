const config = {
    st_19070267: { topic: "device/ELP001/19070267/metrics/#",
    title: "PENDENNIS SHIPYARD <br/>50&deg;09&#39;13&#34; N 5&deg;03&#39;09&#34; W<br/>Real Time Wind Data"
    },
    st_19090456: { topic: "device/ALP001/19090456/metrics/#",
    title: "TODO change PENDENNIS SHIPYARD <br/>50&deg;09&#39;13&#34; N 5&deg;03&#39;09&#34; W<br/>Real Time Wind Data"
    }
  }
const parsedUrl = new URL(window.location.href);
const id = parsedUrl.searchParams.get("id") || "19070267"
const st_id = "st_" + id;
//Settings the station title
document.querySelector("#title").innerHTML = config[st_id].title;
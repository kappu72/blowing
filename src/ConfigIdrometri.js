function setInnerHTML(selector, value) {
  if (document.querySelector(selector)) {
    document.querySelector(selector).innerHTML = value;
  }
}
const config = {
  st_baveno: {
    id: "st_baveno",
    topic: "device/TRF001/baveno/metrics/#",
    title: "<i class='material-icons'>place</i> Baveno Idrometro | Real Time Data",
    titlePage: "Baveno Idrometro  | Real Time Data",
    logo: "<a href='https://www.retemet.com' target='_blank'><img src='img/retemet.png' alt='logo customer'></a> ",
    info: "Idrometro Lago Maggiore <br/>44&deg;54&#39;N - 08&deg;30&#39;E<br/>Dati in tempo reale",
    iframe: "https://navimeteoexternals.progestnow.com/externals/navimeteo/forecast/onehforecast?port_code=ITCHX&lat=44.312604&lng=9.320266",
    transform: (punti) => (punti / 1000) + 184.17,
    uom: 'm',
    uomLabel: '(m) s.l.m.',
    chartCfg: { name: 'Lago Maggiore | Comune di Baveno',  axisTitle: 'Livello idrometrico (m, s.l.m.)', max: 196, plotLines: [{ value: 195.5
      ,color: 'red', width: 3, label: { text: 'Livello esondazione a Feriolo'}}]}                 
  },
  st_sml: {
    id: "st_sml",
    topic: "device/TRF001/sml/metrics/#",
    title: "<i class='material-icons'>place</i> Torrente S.Siro SML Idrometro | Real Time Data",
    titlePage: "Torrente S.Siro  | Santa Margherita Ligure",
    logo: "<a href='https://www.retemet.com' target='_blank'><img src='img/retemet.png' alt='logo customer'></a> ",
    info: "Torrente S.Siro <br/>44&deg;54&#39;N - 08&deg;30&#39;E<br/>Dati in tempo reale",
    iframe: "https://navimeteoexternals.progestnow.com/externals/navimeteo/forecast/onehforecast?port_code=ITCHX&lat=44.312604&lng=9.320266",
    transform: (punti) => ((punti - 4686) / 1000),
    uom: 'm',
    uomLabel: '(m)',
    chartCfg: { name: 'Torrente S.Siro Comune di Santa Margherita Ligure', axisTitle: 'Livello idrometrico (m)', max: 1.6, plotLines: [{ value: 1.5
      ,color: 'red', width: 3, label: { text: 'Franco Idraulico test'}}]}                              
  }
}
// Non rimuovere al massimo mettere un oggetto vuoto    
let customTheme = {
  
  chart: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    plotBorderColor: "#000"      
  },
  
  
      subtitle: {
        style: {
                color: '#0288d1'             
                   }	
    },     
	
	
	    legend: {

        style: {
                color: '#0288d1'             
                   }	

    },                 
          
  
    yAxis: {
	  alternateGridColor: "#E0F1FF",	       
      gridLineColor: "#CCCCCC", 
        labels: {
            style: {
                color: '#0288d1'             
                   }	 
               }	  			
			
    },               
               
	xAxis: {
        labels: {
            style: {
                color: '#666666'                     
            }
        }
		
          },  		         
			       

    series: {
          style: {
                color: '#666666'                     
            }                 
    }, 



  colors: ["#0288d1", "#f45b5b", "#fefe00"]         
     
	    
}
    
          

let parsedUrl = new URL(window.location.href);
let _id = parsedUrl.searchParams.get("id") || "baveno"
let st_id = "st_" + _id;
st_id = config[st_id] ? st_id : "st_baveno"

//Settings the station title
setInnerHTML("#title", config[st_id].title);
setInnerHTML("#titlePage", config[st_id].titlePage);
setInnerHTML("#info", config[st_id].info);
setInnerHTML("#logo", config[st_id].logo);
setInnerHTML("#uom_label", config[st_id].uomLabel);
setInnerHTML("#uom_label_max", config[st_id].uomLabel);
setInnerHTML("#uom_label_min", config[st_id].uomLabel);         
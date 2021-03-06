var lat, lon, fecha, hora, mensaj, poli,f1,f2,h1,h2,btn;
var road = []
let map = L.map('main').setView([10.99304, -74.82814], 13);
const tileurl2 = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
L.tileLayer(tileurl2).addTo(map);
var marcador = L.marker([0, 0]);
marcador.addTo(map);
//content
var titulo ='<h1> Historicos </h1>';
var contents='<div id="p"></div>';
var slideMenu= L.control.slideMenu('',{width:'50%',   icon:'fa-chevron-right'}).addTo(map);
slideMenu.setContents(titulo + contents);
$.ajax({
    type: "GET",
    url : '../public/prueba2.html',
    success: function(datos){
        $("#p").html(datos);
        
        f1 = document.getElementById("fecha1");
        f2 = document.getElementById("fecha2");
        h1 = document.getElementById("hora1"); 
        h2 = document.getElementById("hora2"); 
        btn = document.getElementById("bth");
        var date= new Date();
        var mes = (date.getMonth()+1)*0.01
        f1.value= date.getFullYear()+ "-" + mes.toString().slice(2,5) + "-" + date.getDate();
        f1.max=date.getFullYear()+ "-" + mes.toString().slice(2,5) + "-" + date.getDate();
        f2.value= date.getFullYear()+ "-" + mes.toString().slice(2,5) + "-" + date.getDate();
        f2.max=date.getFullYear()+ "-" + mes.toString().slice(2,5) + "-" + date.getDate();
        h1.value="00:00:01";
        h2.value="23:59:59";
        btn = document.getElementById("bth");
   ;  
  
        console.log(f1)
        var h ;
        
        let polyline;

        btn.addEventListener("click",()=>{
            let f11 = new Date(f1.value).getTime();
            let f22 = new Date(f2.value).getTime();
            let t11 = h1.value.split(":");
            let t22 = h2.value.split(":");
            let h11 = t11[0]*3600000+ t11[1]*60000+t11[2]*1000;
            let h22 = t22[0]*3600000+ t22[1]*60000+t22[2]*1000;
            let total1 = h11+f11;
            let total2 = h22+f22;

            if (total2 >= total1){
                console.log("En orden")
                let data = {
                    fecha1:f1.value,fecha2:f2.value, hora1:h1.value,  hora2:h2.value
                }
               // console.log(data)
                fetch("/historicos",{
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(res =>{
                    return res.json()
                }).then(data =>{
                    console.log(data)
                    data.map((d, i) => { // for 
                        road[i] = {
                            lat: d.latitud,
                            lon: d.longitud,
                           
                          
                        }
                    });
                    console.log(data.length)
                    if (polyline){
                        if (data.length==0){
                            console.log("a borrarrr")
                            road= [];
                            map.removeLayer(polyline);
                        }
                    }
                    
                    polyline =L.polyline(road).addTo(map);
                });
            }else{
                alert("Fecha inicial mayor que fecha final")
            }
        })
     
    }
});
//contents = contents.substr(0,5);






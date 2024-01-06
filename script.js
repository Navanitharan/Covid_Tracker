let c = document.querySelector(".cnfm-ttl");
        let r = document.querySelector(".rcvr-ttl");
        let t = document.querySelector(".tstd-ttl");
        let stName =[];
        let stCfrm = []
        let stobj=[];
        let total=0;
        let count = 0;
        fetch("https://data.covid19india.org/v4/min/data.min.json")
        .then((data)=>{
            return data.json();
            
        })
        .then( async (data)=>{
            for (let a in data) {
                count++;
                c.textContent= data[a].total.confirmed;
                r.textContent = data[a].total.recovered;
                t.textContent = data[a].total.tested;
                stName.push(a)
                let state = {
                    [stName[count-1]] : a,
                    confirmed : data[a].total.confirmed,
                    recovered : data[a].total.recovered,
                    tested : data[a].total.tested
                };
                stobj.push(state);
                stCfrm.push(data[a].total.confirmed);
                
            }
            graph()
        })
        
        console.log(stName,stCfrm);
        function graph(){
            let crt = document.getElementById("myLine");
        let lineChart = new Chart(crt,{
            type:"line",
            data : {
                labels:stName,
                datasets:[{
                    label:"State Vise",
                    backgroundColor:"rgba(241,196, 15,1.0)",
                    borderColor:"rgba(52,152, 219,1.0)",
                    fill:false,
                    data:stCfrm
                }]
            },
            options: {
                responsive: true, // Make the chart responsive
                maintainAspectRatio: false, // Disable aspect ratio to allow adjusting width and height independently
                scales: {
                    x: [{
                        ticks: {
                            autoSkip: false,
                            maxTicksLimit: 10 // Adjust the number of ticks on the x-axis as needed
                        }
                    }],
                    y: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        }


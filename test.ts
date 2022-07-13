import { AllKnownLayouts } from "./Customizations/AllKnownLayouts";
import * as data from "./test_data.json";
// import {Chart} from "chart.js/auto";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



var foodLayer = AllKnownLayouts.AllPublicLayers().find(x => x.id == "food");
// console.log(foodLayer);
// var wheelchairTagrendering  = foodLayer.tagRenderings.find(x=>x.id == "")

var labels : any[] = [];
var datas : Number[] = [];
var keyword = 'wheelchair';


for (const tagrendering of foodLayer.tagRenderings) {
    const statistics: any = {};
    console.log(tagrendering);
    var known = data.features.filter(x =>  tagrendering.IsKnown(x.properties))
    for (const item of known) {
        if(tagrendering.mappings == undefined)
            continue;
        for (const mapping of tagrendering.mappings) {

            if(mapping.if.matchesProperties(item.properties))
            {
                var key = mapping.then.textFor("en");
                if(statistics.key == undefined) {
                    statistics.key = key;
                    statistics.count = 0;
                }
                if(item.properties[keyword] != undefined)
                {
                    if(statistics[keyword] == undefined)
                    statistics[keyword] = {}
                    if( statistics[keyword][item.properties[keyword]] == undefined) 
                        statistics[keyword][item.properties[keyword]] = 0;

                    statistics[keyword][item.properties[keyword]]++;
                }
                

                statistics.count++;
            }
        }
    }

    if(statistics.count > 0){
        // labels.push(statistics.key);
        if(statistics[keyword] != undefined && statistics[keyword] != null){
            labels = Object.keys(statistics[keyword]) as Array<keyof typeof statistics>
            datas = Object.keys(statistics[keyword]).map(key => statistics[keyword][key]);
            createNewGraph(labels, datas,statistics.key);
        }
        //creating new chart : pie 
    }
}


function createNewGraph(labels, datas,_title)
{
    var container = document.createElement('div');
    container.style.width = "200px";
    container.style.height = "200px";
    container.style.margin = "10px";
    var mycanvas:any = document.createElement("canvas");
    
    const myChart = new Chart(mycanvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: datas,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: _title,
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }
    });
    container.appendChild(mycanvas);
    document.getElementById("maindiv").appendChild(container);
}





// const ctx:any = document.getElementById('myChart');
// const myChart = new Chart(ctx, {
//     type: 'pie',
//     data: {
//         labels: labels,
//         datasets: [{
//             label: '# of Votes',
//             data: datas,
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });




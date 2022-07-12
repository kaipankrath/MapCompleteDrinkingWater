import { AllKnownLayouts } from "./Customizations/AllKnownLayouts";
import * as data from "./test_data.json";
// import {Chart} from "chart.js/auto";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



var foodLayer = AllKnownLayouts.AllPublicLayers().find(x => x.id == "food");
// console.log(foodLayer);
// var wheelchairTagrendering  = foodLayer.tagRenderings.find(x=>x.id == "")

for (const tagrendering of foodLayer.tagRenderings) {
    var known = data.features.filter(x =>  tagrendering.IsKnown(x.properties))
    var statistics  = [];
    for (const item of known) {
        if(tagrendering.mappings == undefined)
            continue;
        for (const mapping of tagrendering.mappings) {

            if(mapping.if.matchesProperties(item.properties))
            {
                var key = mapping.then.textFor("en");
                if(statistics[key] == undefined) statistics[key] = [];
                if(statistics[key][item.properties[key]] == undefined) statistics[key][item.properties[key]] = 0;
                statistics[key][item.properties[key]] ++;
            }
        }
    }
    console.log(statistics);
   
    
}



const ctx:any = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
        }
    }
});




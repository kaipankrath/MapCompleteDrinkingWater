import { AllKnownLayouts } from "./Customizations/AllKnownLayouts";
import * as data from "./test_data.json";
// import {Chart} from "chart.js/auto";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



var foodLayer = AllKnownLayouts.AllPublicLayers().find(x => x.id == "food");

for (const tagrendering of foodLayer.tagRenderings) {
    
    var keyword = tagrendering.freeform?.key;
    console.log(keyword)

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
                if(statistics[key] == undefined) {
                    statistics[key] = 0;
                    // statistics.count = 0;
                }

                statistics[key]++;
            }
        }
    }
    if(statistics[key] != null && statistics[key] > 0)
    {
        createNewGraph(Object.keys(statistics), Object.keys(statistics).map(key => statistics[key]), tagrendering?.question?.textFor("en"))
    }

}


function createNewGraph(labels, datas,_title)
{
    var container = document.createElement('div');
    container.style.width = "200px";
    container.style.height = "200px";
    container.style.margin = "10px";
    container.style.float = "left";
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
                    text: stringToHTML(_title),
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
function stringToHTML(str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body.innerText;
};
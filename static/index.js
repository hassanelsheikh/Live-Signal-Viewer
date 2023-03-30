const Time = [];
const Amplitude = [];
const Time2 = [];
const Amplitude2 = [];


//playAnimation boolean to insure that play button functions when there is no animation
var playAnim = false;
var playAnim2 = false;

const fileInput = document.getElementById('sig1');
const fileInput2 = document.getElementById('sig2');

//execute
fileInput.addEventListener('change', importSignal);
fileInput2.addEventListener('change', importSignal2);


var i = 0;
var j = 0;

var interval;
var interval2;


//define a boolean that changes if rewind is checked to execute it
var IsRewind = false;
const rewindBtn = document.getElementById('rewind');

rewindBtn.addEventListener('change', (event) => {
    if(event.currentTarget.checked){
        IsRewind = true;
    }
    else
    {
        IsRewind = false;
    }
})


//define a boolean that changes if rewind is checked to execute it for plot2
var IsRewind2 = false;
const rewindBtn2 = document.getElementById('rewind2');

rewindBtn.addEventListener('change', (event) => {
    if(event.currentTarget.checked){
        IsRewind2 = true;
    }
    else
    {
        IsRewind2 = false;
    }
})





//Add Empty plot on load, and hide buttons and sliders
const layout = { title: 'Please add your signal', yaxis: { title: 'y', fixedrange: true }, xaxis: { title: 'x', fixedrange: true, rangemode: 'tozero'}, width : 700 }; // fixedrange -> No pan when there is no signal
const plotDiv = document.getElementById('plot1');
const config = {
    displayModeBar: false, //disable plotlytool bar when there is no signal
}
Plotly.newPlot(plotDiv, [], layout, config);


//Hide buttons onload for plot1
document.getElementById('playBtn').style.display = 'none';
document.getElementById('pauseBtn').style.display = 'none';
document.getElementById('color').style.display = 'none';
document.getElementById('cinespeed_lbl').style.display = 'none';
document.getElementById('cinespeed').style.display = 'none';
document.getElementById('Show/Hide').style.display = 'none';
document.getElementById('rewind').style.display = 'none';
document.getElementById('rewind_lbl1').style.display = 'none';
document.getElementById('show_lbl1').style.display = 'none';
document.getElementById('stats').style.display = 'none';
document.getElementById('label1').style.display = 'none';
document.getElementById('lab').style.display = 'none';

//Hide buttons onload for plot2
document.getElementById('playBtn2').style.display = 'none';
document.getElementById('pauseBtn2').style.display = 'none';
document.getElementById('color2').style.display = 'none';
document.getElementById('cinespeed_lbl2').style.display = 'none';
document.getElementById('cinespeed2').style.display = 'none';
document.getElementById('Show/Hide2').style.display = 'none';
document.getElementById('rewind2').style.display = 'none';
document.getElementById('rewind_lbl2').style.display = 'none';
document.getElementById('show_lbl2').style.display = 'none';
document.getElementById('label2').style.display = 'none';
document.getElementById('lab2').style.display = 'none';

//trace1,trace2 global dec to edit it (show/hide)
const trace1 = { x: [], y: [], mode: 'lines', line: { color: 'blue' }, visible: true };
const trace2 = { x: [], y: [], mode: 'lines', line: { color: 'blue' }, visible: true };

const speedSlider = document.getElementById('cinespeed');
const speedSlider2 = document.getElementById('cinespeed2');
var cinespeed = speedSlider.defaultValue; //initial value for speed
var cinespeed2 = speedSlider2.defaultValue; //initial value for speed



const layout2 = { title: 'Please add your signal', yaxis: { title: 'y', fixedrange: true }, xaxis: { title: 'x', fixedrange: true, rangemode: 'tozero'}, width : 700 }; // fixedrange -> No pan when there is no signal
const plotDiv2 = document.getElementById('plot2');
const config2 = {
    displayModeBar: false, //disable plotlytool bar when there is no signal
}
Plotly.newPlot(plotDiv2, [], layout2, config2);






// ImportSignal function
function importSignal() {
    // Get the selected file
    const fileInput = document.getElementById('sig1');
    const file = fileInput.files[0];

    // Create a new FileReader object
    const reader = new FileReader();

    // Define a callback function to handle the file data
    reader.onload = (event) => {
        // Get the file data as a string
        const fileData = event.target.result;

        // Split the string into lines
        const lines = fileData.split(/\r?\n/);

        // Clear the existing data, to reset if added new file
        Time.length = 0;
        Amplitude.length = 0;
        trace1.x.length = 0;
        trace1.y.length = 0;

        // Loop through the lines and split each line into columns
        for (let i = 0; i < lines.length; i++) {
            const columns = lines[i].split(',');

            // Store the column values in their respective arrays
            Time.push(columns[0]);
            Amplitude.push(columns[1]);
        }

        // Create a new plot using Plotly.js
        const plotDiv = document.getElementById('plot1');
        const layout = { title: 'Channel 1', yaxis: { title: 'Amplitude' }, xaxis: { title: 'x' },width : 700 };
        config_1 = { displayModeBar: true}
        Plotly.newPlot(plotDiv, [trace1], layout, config_1);

        
        // Define the play button
        const playBtn = document.getElementById('playBtn');
        playBtn.style.display = 'inline';

        document.getElementById('Show/Hide').style.display = 'inline';
        document.getElementById('rewind').style.display = 'inline';
        document.getElementById('rewind_lbl1').style.display = 'inline';
        document.getElementById('show_lbl1').style.display = 'inline';
        document.getElementById('stats').style.display = 'block';
        document.getElementById('label1').style.display = 'inline';
        document.getElementById('lab').style.display = 'inline';


        playBtn.addEventListener('click', function() {


            //if playAnim is false then change to true and execute play
            if(!playAnim)
            {
                playAnim = true;
                interval = setInterval(() => {
                trace1.x.push(Time[i]);
                trace1.y.push(Amplitude[i]);
                Plotly.redraw(plotDiv);
                i++;
        
                //if animation has ended reset i to 0 to start it again
                if (i >= Time.length) {
                    clearInterval(interval);
                    // Animation has ended, check if rewind button is checked reset the variables and replay the animation
                    if(IsRewind)
                    {
                    i = 0;
                    trace1.x = [];
                    trace1.y = [];
                    playAnim = false;
                    Plotly.redraw(plotDiv);
                    playBtn.click();
                    }
                }

        Plotly.relayout(plotDiv, { xaxis: { range: [Time[Math.max(0, i - 100)], Time[i]] }});
            }, cinespeed);

            if(linked) //play sig2
            {
                playBtn2.click();
            }

            }
        });

        

        // Define the pause button
        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.style.display = 'inline';
        pauseBtn.addEventListener('click', function() {
            if(playAnim)
            {
                playAnim = false;
                clearInterval(interval);

                if(linked)
                {
                    playAnim2 = false;
                    clearInterval(interval2);
                }
            }
            
        });

        // Add event listener to the color picker
        const colorInput = document.getElementById('color');
        colorInput.style.display = 'inline';
        colorInput.addEventListener('change', function() {
            const selectedColor = this.value;
            trace1.line.color = selectedColor;
            Plotly.redraw(plotDiv);
        });

        // Add event listener to the speed slider
        document.getElementById('cinespeed_lbl').style.display = 'inline';
        speedSlider.style.display = 'inline'; //show speedslider
        speedSlider.addEventListener('input', function() {
            cinespeed = speedSlider.max - this.value;  //slider max value - new value to reverse
            if(playAnim) {
                clearInterval(interval);
                interval = setInterval(() => {
                    trace1.x.push(Time[i]);
                    trace1.y.push(Amplitude[i]);
                    Plotly.redraw(plotDiv);
                    i++;
                    
                    if (i >= Time.length) {
                    clearInterval(interval);
                }

        Plotly.relayout(plotDiv, { xaxis: { range: [Time[Math.max(0, i - 100)], Time[i]] }});
            }, cinespeed);

            }
            
            if (linked && event.target !== speedSlider2) {
                speedSlider2.value = this.value;
                speedSlider2.dispatchEvent(new Event('input'));
            }
        });

        
        

        // Trigger the click event of the play button to start the animation
        playBtn.click();
    };
    

    // Read the file as text
    reader.readAsText(file);
};
function pdf(){
    if (Amplitude.length){
    var n = (Amplitude.length);
    var sum = 0;
    var sumSquared = 0;
    var min = Number.MAX_VALUE;
    var max = Number.MIN_VALUE;
    for (let i = 0; i <= n; i++) {
        var x = parseFloat(Amplitude[i]);
        sum = sum + x;
        sumSquared += x*x;
        if (x < min) {
            min = x;
        }
        if (x > max) {
            max = x;
        }
    }
    var mean = sum / n;
    var variance = sumSquared / n - mean*mean;
    var stdDev = Math.sqrt(variance);
    var duration = Time[Time.length-2];}
    if(Amplitude2.length){
    var n2 = (Amplitude2.length);
    var sum2 = 0;
    var sumSquared2 = 0;
    var min2 = Number.MAX_VALUE;
    var max2 = Number.MIN_VALUE;
    for (var i = 0; i <= n; i++) {
        var x = parseFloat(Amplitude2[i]);
        sum2 = sum2 + x;
        sumSquared2 += x*x;
        if (x < min2) {
            min2 = x;
        }
        if (x > max2) {
            max2 = x;
        }
    }
    var mean2 = sum2 / n2;
    var variance2 = sumSquared2 / n2 - mean2*mean2;
    var stdDev2 = Math.sqrt(variance2);
    var duration2 = Time2[Time2.length-2];
    }

var opt = {
    margin: 1,
    filename: 'signal.pdf',
    image: { type: 'pdf', quality: 0.95 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
};
if (!Amplitude.length){
    min=0;max=0;mean=0;stdDev=0;duration=0;
}
if (!Amplitude2.length){
    min2=0;max2=0;mean2=0;stdDev2=0;duration2=0;
}
var html = '<h2> Signals Analytics</h2>' // Add title to the plot in the PDF
 html += '<h2>Plotted Signal</h2>' + plotDiv.innerHTML; 
//html += '<h3>Statistics</h3><ul><li>Minimum Amplitude: ' + min + '</li><li>Maximum Amplitude: ' + max + '</li><li>Mean Amplitude: ' + mean + '</li><li>Standard Deviation: ' + stdDev + '</li></ul>'; // Add statistics to the PDF
html +='<table><tr><th>Stat</th><th>result</th></tr><tr><td>Minimum Amplitude</td><td>'+min+'</td></tr><tr><td>Maximum Amplitude</td><td>'+max+'</td><td></tr><tr><td>Mean amplitude</td><td>'+sum/n+'</td></tr><tr><td>Standard deviation</td><td>'+stdDev+'</td></tr><tr><td>Signal duration</td><td>'+duration+'</td></tr></table>';
html += '<h2>Plotted Signal</h2>' + plotDiv2.innerHTML;
html +='<table><tr><th>Stat</th><th>result</th></tr><tr><td>Minimum Amplitude</td><td>'+min2+'</td></tr><tr><td>Maximum Amplitude</td><td>'+max2+'</td><td></tr><tr><td>Mean amplitude</td><td>'+mean2+'</td></tr><tr><td>Standard deviation</td><td>'+stdDev2+'</td></tr><tr><td>Signal duration</td><td>'+duration2+'</td></tr></table>';
    html2pdf().set(opt).from(html).save();
   
    }
    function getlabel(){
        var label = document.getElementById('label1').value;
        var update = {
            annotations: [
                {
                    text: label,
                    xref: 'paper',
                    yref: 'paper',
                    x: 1.0,
                    y: 1.0,
                    showarrow: false,
                    font: {
                        size: 16
                    }
                }
            ]
        };
        Plotly.update(plotDiv, {}, update);
}/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function importSignal2() {
    // Get the selected file
    const fileInput2 = document.getElementById('sig2');
    const file2 = fileInput2.files[0];

    // Create a new FileReader object
    const reader2 = new FileReader();

    // Define a callback function to handle the file data
    reader2.onload = (event) => {
        // Get the file data as a string
        const fileData2 = event.target.result;

        // Split the string into lines
        const lines2 = fileData2.split(/\r?\n/);


        //clear previous data if a new signal is added
        Time2.length = 0;
        Amplitude2.length = 0;
        trace2.x.length = 0;
        trace2.y.length = 0;

        // Loop through the lines and split each line into columns
        for (let i = 0; i < lines2.length; i++) {
            const columns2 = lines2[i].split(',');

            // Store the column values in their respective arrays
            Time2.push(columns2[0]);
            Amplitude2.push(columns2[1]);
        }

        // Create a new plot using Plotly.js
        const plotDiv2 = document.getElementById('plot2');
        const layout2 = { title: 'Channel 2', xaxis: { title: 'Time' }, yaxis: { title: 'Amplitude' },width : 700 };
        config_2 = { displayModeBar: true};
        Plotly.newPlot(plotDiv2, [trace2], layout2, config_2);
        
        // Define the play button
        const playBtn2 = document.getElementById('playBtn2');
        playBtn2.style.display = 'inline';

        
        document.getElementById('Show/Hide2').style.display = 'inline';
        document.getElementById('rewind2').style.display = 'inline';
        document.getElementById('rewind_lbl2').style.display = 'inline';
        document.getElementById('show_lbl2').style.display = 'inline';
        document.getElementById('label2').style.display = 'inline';
        document.getElementById('lab2').style.display = 'inline';

        playBtn2.addEventListener('click', function() {
        


            //if playAnim is false then change to true and execute play
            if(!playAnim2)
            {
                playAnim2 = true;
                interval2 = setInterval(() => {
                trace2.x.push(Time2[j]);
                trace2.y.push(Amplitude2[j]);
                Plotly.redraw(plotDiv2);
                j++;
        

                if (j >= Time2.length) {
                    clearInterval(interval2);

                    // Animation has ended, check if rewind button is checked reset the variables and replay the animation
                    if(IsRewind)
                    {
                    j = 0;
                    trace1.x = [];
                    trace1.y = [];
                    playAnim = false;
                    playBtn.click();
                    }
                }

        Plotly.relayout(plotDiv2, { xaxis: { range: [Time2[Math.max(0, j - 100)], Time2[j]] }});
            }, cinespeed2);

            
            if(linked) //play sig2
            {
                playBtn.click();
            }

            }
        });

        

        // Define the pause button
        const pauseBtn2 = document.getElementById('pauseBtn2');
        pauseBtn2.style.display = 'inline';
        pauseBtn2.addEventListener('click', function() {
            if(playAnim2)
            {
                playAnim2 = false;
                clearInterval(interval2);

                if(linked)
                {
                    playAnim = false;
                    clearInterval(interval);
                }
            }
            
        });

        // Add event listener to the color picker
        const colorInput2 = document.getElementById('color2');
        colorInput2.style.display = 'inline';
        colorInput2.addEventListener('change', function() {
            const selectedColor2 = this.value;
            trace2.line.color = selectedColor2;
            Plotly.redraw(plotDiv2);
        });

        // Add event listener to the speed slider
        document.getElementById('cinespeed_lbl2').style.display = 'inline';
        speedSlider2.style.display = 'inline';

        speedSlider2.addEventListener('input', function() {
            cinespeed2 = speedSlider2.max - this.value;  //slider max value - new value to reverse
            if(playAnim2) {
                clearInterval(interval2);
                interval2 = setInterval(() => {
                    trace2.x.push(Time2[j]);
                    trace2.y.push(Amplitude2[j]);
                    Plotly.redraw(plotDiv2);
                    j++;
                    
                    if (j >= Time2.length) {
                    clearInterval(interval2);
                }
-
        Plotly.relayout(plotDiv2, { xaxis: { range: [Time2[Math.max(0, j - 100)], Time2[j]] }});
            }, cinespeed2);

            }

            if (linked && event.target !== speedSlider) {
                speedSlider.value = this.value;
                speedSlider.dispatchEvent(new Event('input'));
            }
        });

        
        

        // Trigger the click event of the play button to start the animation
        playBtn2.click();
    };
    

    // Read the file as text
    reader2.readAsText(file2);
};


//Show/Hide for plot1
const checkbox1 = document.getElementById('Show/Hide');

checkbox1.addEventListener('change', (event) => {
    if(event.currentTarget.checked){
        trace1.visible = false;
        Plotly.redraw(plotDiv);
    } else
    {
        trace1.visible = true;
        Plotly.redraw(plotDiv);
    }
})


//show/Hide for plot2
const checkbox2 = document.getElementById('Show/Hide2');

checkbox2.addEventListener('change', (event) => {
    if(event.currentTarget.checked){
        trace2.visible = false;
        Plotly.redraw(plotDiv2); //redraw to hide even if paused
    } else
    {
        trace2.visible = true;
        Plotly.redraw(plotDiv2);
    }
})
function pdf2(){
    if (Amplitude.length){
        var n = (Amplitude.length/100);
        var sum = 0;
        var sumSquared = 0;
        var min = Number.MAX_VALUE;
        var max = Number.MIN_VALUE;
        for (var i = 0; i <= n; i++) {
            var x = parseFloat(Amplitude[i]);
            sum = sum + x;
            sumSquared += x*x;
            if (x < min) {
                min = x;
            }
            if (x > max) {
                max = x;
            }
        }
        var mean = sum / n;
        var variance = sumSquared / n - mean*mean;
        var stdDev = Math.sqrt(variance);
        var duration = Time[Time.length-2];}
        if(Amplitude2.length){
            var n2 = (Amplitude2.length/100);
        var sum2 = 0;
        var sumSquared2 = 0;
        var min2 = Number.MAX_VALUE;
        var max2 = Number.MIN_VALUE;
        for (var i = 0; i <= n2; i++) {
            var x = parseFloat(Amplitude2[i]);
            sum2 = sum2 + x;
            sumSquared2 += x*x;
            if (x < min2) {
                min2 = x;
            }
            if (x > max2) {
                max2 = x;
            }
        }
        var mean2 = sum2 / n2;
        var variance2 = sumSquared2 / n2 - mean2*mean2;
        var stdDev2 = Math.sqrt(variance2);
        var duration2 = Time2[Time2.length-2];
        }
       // console.log(Amplitude);
    
    var opt = {
        margin: 1,
        filename: 'signal_1.pdf',
        image: { type: 'pdf', quality: 0.95 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    if (!Amplitude.length){
        min=0;max=0;mean=0;stdDev=0;duration=0;
    }
    if (!Amplitude2.length){
        min2=0;max2=0;mean2=0;stdDev2=0;duration2=0;
    }
    var html = '<h2> Signals Analytics</h2>' // Add title to the plot in the PDF
 html += '<h2>Plotted Signal</h2>' + plotDiv.innerHTML; 
//html += '<h3>Statistics</h3><ul><li>Minimum Amplitude: ' + min + '</li><li>Maximum Amplitude: ' + max + '</li><li>Mean Amplitude: ' + mean + '</li><li>Standard Deviation: ' + stdDev + '</li></ul>'; // Add statistics to the PDF
html +='<table><tr><th>Stat</th><th>result</th></tr><tr><td>Minimum Amplitude</td><td>'+min+'</td></tr><tr><td>Maximum Amplitude</td><td>'+max+'</td><td></tr><tr><td>Mean amplitude</td><td>'+sum/n+'</td></tr><tr><td>Standard deviation</td><td>'+stdDev+'</td></tr><tr><td>Signal duration</td><td>'+duration+'</td></tr></table>';
html += '<h2>Plotted Signal</h2>' + plotDiv2.innerHTML;
html +='<table><tr><th>Stat</th><th>result</th></tr><tr><td>Minimum Amplitude</td><td>'+min2+'</td></tr><tr><td>Maximum Amplitude</td><td>'+max2+'</td><td></tr><tr><td>Mean amplitude</td><td>'+mean2+'</td></tr><tr><td>Standard deviation</td><td>'+stdDev2+'</td></tr><tr><td>Signal duration</td><td>'+duration2+'</td></tr></table>';
    html2pdf().set(opt).from(html).save();
       
   
    }
    function getlabel2(){
        var label = document.getElementById('label2').value;
        var update = {
            annotations: [
                {
                    text: label,
                    xref: 'paper',
                    yref: 'paper',
                    x: 1.0,
                    y: 1.0,
                    showarrow: false,
                    font: {
                        size: 16
                    }
                }
            ]
        };
        Plotly.update(plotDiv2, {}, update);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

//Link function
const link = document.getElementById('link');
var linked = false;

link.addEventListener('change', (event) => {
    if(event.currentTarget.checked){
        linked = true;
        playAnim = true;
        i = 0;
        trace1.x =[];
        trace1.y =[];
       
        speedSlider.value = speedSlider.defaultValue; //returns to its deafult value
        cinespeed = speedSlider2.defaultValue;

        Plotly.redraw(plotDiv);
        playBtn.click(); // restart the animation

        
        playAnim2 = true;
        j = 0;
        trace2.x =[];
        trace2.y =[];
 
        speedSlider2.value = speedSlider2.defaultValue; //returns to its deafult value
        cinespeed2 = cinespeed

        Plotly.redraw(plotDiv2);
        playBtn2.click(); // restart the animation

        

//define a flag to avoid infinite loop
let isRelayouting = false;

        
        
// Link plot1 to plot2
plotDiv.on('plotly_relayout', function(eventData) {
    if (linked && !isRelayouting) {
        isRelayouting = true;
        Plotly.relayout(plotDiv2, eventData)
        .then(() => {
            isRelayouting = false;
        });
    }
});

// Link plot2 to plot1
plotDiv2.on('plotly_relayout', function(eventData) {
    if (linked && !isRelayouting) {
        isRelayouting = true;
        Plotly.relayout(plotDiv, eventData)
        .then(() => {
            isRelayouting = false;
        });
    }
});       



    }
    else
    {
        linked = false;
    }
});

// if (linked) {
// plotDiv1.on('plotly_relayout', function(eventData) {
//     Plotly.relayout(plotDiv2, eventData);
// });

// plotDiv2.on('plotly_relayout', function(eventData) {
//     Plotly.relayout(plotDiv1, eventData);
// });
//}



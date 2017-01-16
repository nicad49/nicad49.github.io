// Global Variables
var round1 = undefined;
var round2 = undefined;
var round3 = undefined;
var round4 = undefined;
var round5 = undefined;

//set a variable to hold the timer
var intervalTimer;

$(document).ready(function() {
  //console.log("Javascript is working!!!");
});


// Init App
var myApp = new Framework7({
    modalTitle: 'Reaktion Time',
    // Enable Material theme
    material: true,
    fastClicks: true
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
  domCache: true // enable inline pages
});

// Create Modal pop up for Begin button
$$('#begin').on('click', function () {
    myApp.confirm('Tap the red button when you see it appear.  Click OK to begin, or cancel to quit.', function () {
        //myApp.alert('You clicked Ok button');
      mainView.router.load({pageName: 'reactionTest'});
    });
});

// Hide the buttons on page init
myApp.onPageInit("reactionTest", function(e) {
  //alert("reactionTest reinited");
  $$('.button-fill').hide();
});


$$(document).on('pageReinit', '.page[data-page="reactionTest"]', function (e) {
  $$('.button-fill').hide();
});


// Once the page has loaded, create a button
$$(document).on('pageAfterAnimation', '.page[data-page="reactionTest"]', function (e) {
  
  var time1;
  var time2;
  var time3;
  var time4;
  var time5;
  
  //console.log($('.col-33').width());
  var widthVal = ($('.col-33').width()) / 1.5;
  
  $('.reaktButton').css({
     height: widthVal + "px"
  });

  round1 = setTimeout(function() {
    var buttonId = randomButton();
    startTimer();
    $$(buttonId).show().once('click', function(e) {
      // stop timer
      stopTimer();
      time1 = parseInt($$('#timer').text());
      
      // Hide the button
      $$(buttonId).hide()
      
      // begin round 2
      round2 = setTimeout(function() {
        var buttonId = randomButton();
        startTimer();
        $$(buttonId).show().once('mousedown', function(e) {
          // stop timer
          stopTimer();
          time2 = parseInt($$('#timer').text());
          
          // Hide the button
          $$(buttonId).hide();
          
          //begin round 3
          round3 = setTimeout(function() {
            var buttonId = randomButton();
            startTimer();
            $$(buttonId).show().once('click', function(e) {
              // stop the timer
              stopTimer();
              time3 = parseInt($$('#timer').text());
              
              // Hide the button
              $$(buttonId).hide();
              
              //begin round 4
              round4 = setTimeout(function() {
                var buttonId = randomButton();
                startTimer();
                $$(buttonId).show().once('click', function(e) {
                  // stop the timer
                  stopTimer();
                  time4 = parseInt($$('#timer').text());

                  // Hide the button
                  $$(buttonId).hide();
                  
                  //begin round 5
                  round5 = setTimeout(function() {
                    var buttonId = randomButton();
                    startTimer();
                    $$(buttonId).show().once('click', function(e) {
                      // stop the timer
                      stopTimer();
                      time5 = parseInt($$('#timer').text());

                      // Hide the button
                      $$(buttonId).hide();
                      
                      console.log("Gender: " + $$("#genderSelector").val());
                      console.log("Age: " + $$("#ageSelector").val());
                      console.log("Time1: " + time1);
                      console.log("Time2: " + time2);
                      console.log("Time3: " + time3);
                      console.log("Time4: " + time4);
                      console.log("Time5: " + time5);
                      var timeAvg = (time1 + time2 + time3 + time4 + time5) / 5;
                      var timeArray = [time1,time2,time3,time4,time5];
                      var timeMin = Math.min.apply(Math, timeArray);
                      var timeMax = Math.max.apply(Math, timeArray);
                      console.log("Avg: " + timeAvg);
                      
                      var myObject = new DbEntry();
                      myObject.time = (new Date()).toTimeString();
                      myObject.age = $$("#ageSelector").val();
                      myObject.gender = $$("#genderSelector").val();
                      myObject.mTime1 = time1;
                      myObject.mTime2 = time2;
                      myObject.mTime3 = time3;
                      myObject.mTime4 = time4;
                      myObject.mTime5 = time5;
                      myObject.mTimeMin = timeMin;
                      myObject.mTimeMax = timeMax;
                      myObject.mTimeAvg = timeAvg;

                      addToStorage("myObject", JSON.stringify(myObject));
                      
                      $('#yourId').append('Your ID is: ' + myObject.id);
                      $('#summaryTable > tbody:last-child').append('<tr><td>First</td><td>' + time1 + '</td></tr>');
                      $('#summaryTable > tbody:last-child').append('<tr><td>Second</td><td>' + time2 + '</td></tr>');
                      $('#summaryTable > tbody:last-child').append('<tr><td>Third</td><td>' + time3 + '</td></tr>');
                      $('#summaryTable > tbody:last-child').append('<tr><td>Fourth</td><td>' + time4 + '</td></tr>');
                      $('#summaryTable > tbody:last-child').append('<tr><td>Fifth</td><td>' + time5 + '</td></tr>');
                      $('#summaryTable > tbody:last-child').append('<tr><td></td><td></td></tr>');
                      $('#summaryTable > tbody:last-child').append('<tr><td>Average</td><td>' + timeAvg + '</td></tr>');
                      $('#summaryTable > tbody:last-child').append('<tr><td>Min</td><td>' + timeMin + '</td></tr>');
                      $('#summaryTable > tbody:last-child').append('<tr><td>Max</td><td>' + timeMax + '</td></tr>');
                      
                      myApp.popup('.popup-summary');
                    });
                  }, randomIntFromInterval(3000,10000));
                });
              }, randomIntFromInterval(3000,10000));
            });
          }, randomIntFromInterval(3000,10000));
        });
      }, randomIntFromInterval(3000,10000));
    });
  },randomIntFromInterval(3000,10000));
   
});


$$(document).on('pageInit', '.page[data-page="index"]', function (e) {
  alert("index page initialized");
  $$("#reakt_button").children().remove();
});

myApp.onPageReinit("index", function(e) {
  console.log("Index Page Re-Init; Stop existing timers");
  stopTimer();
  clearTimeout(round1);
  clearTimeout(round2);
  clearTimeout(round3);
  clearTimeout(round4);
  clearTimeout(round5);
  if ($$("#myButton") != null) {
    $$('#button1').remove();
  }
});

$$('.popup-summary').on('close', function () {
  console.log('Summary Popup is closing');
  $('#tableValues').children().remove();
  $$('#timer').text('');
  $$('#yourId').text('');
  mainView.router.load({pageName: 'index'});
});

myApp.onPageReinit("history", function(e) {
  addHistory();  
});

myApp.onPageInit("history", function(e) {
  addHistory();  
});

$$(document).on('pageAfterBack', '.page[data-page="history"]', function (e) {
  $('#historyTableValues').children().remove();
})

$$('#export').on('click', function() {
  //alert('Export button pressed');
  
  var currentData = getHistorySummary("myObject");
  var dataArray = [];
  for (var i = 0; i < currentData.length; i++) {
    dataArray.push(JSON.parse(currentData[i]));
  }
  dataArray.sortBy('id');
  var csv = convertJSONtoCSV(dataArray);
  //console.log(csv);
  
  var csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csv;
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  window.open(encodedUri);

  //link.click();
  
//  var filename = "reakt_data";
//  var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
//  console.log(uri);
//  //this trick will generate a temp <a /> tag
//  var link = document.createElement("a");    
//  link.href = uri;
//    
//  //set the visibility hidden so it will not effect on your web-layout
//  link.style = "visibility:hidden";
//  link.download = filename + ".csv";
//    
//  //this part will append the anchor tag and remove it after automatic click
//  document.body.appendChild(link);
//  link.click();
//  document.body.removeChild(link);
  
  
});


//////////////////////////////////////////////////////////////////////////
//Custom Array Sort
Array.prototype.sortBy = function(p) {
  return this.slice(0).sort(function(a,b) {
    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
  });
}
/////////////

function convertJSONtoCSV(json) {
  var csv = "";
  
  // generate the csv header
  var row = "";
  for (var index in json[0]) {
    row += '"' + index + '",'
    row.slice(0, row.length - 1);
  }
  csv += row + '\r\n';
  
  // generate the data rows
  for (var i = 0; i < json.length; i++) {
    var row = ""
    for (var index in json[i]) {
      row += '"' + json[i][index] + '",';
      row.slice(0, row.length - 1); 
    }
    csv += row + '\r\n';
  }
  
  if (csv == "") {
    console.log("Invalid Data");
    return;
  }
  
  //console.log(csv);
  return csv;
}

function addHistory() {
  var currentData = getHistorySummary("myObject");
  var dataArray = []
  for (var i = 0; i < currentData.length; i++) {
    dataArray.push(JSON.parse(currentData[i]));
  }
  dataArray = dataArray.sortBy('mTimeAvg');
  for (var i = 0; i < dataArray.length; i++) {
    $('#historyTable > tbody:last-child').append('<tr><td>' + 
                                                 dataArray[i].id + '</td><td>' + 
                                                 dataArray[i].age + '</td><td>' +
                                                 dataArray[i].gender + '</td><td>' +
                                                 dataArray[i].mTimeMin + '</td><td>' +
                                                 dataArray[i].mTimeMax + '</td><td>' +
                                                 dataArray[i].mTimeAvg + '</td></tr>');
  }
}

function getHistorySummary(key) {
  if (localStorage.getItem(key) != null) {
    return JSON.parse(localStorage.getItem(key));                        
  }
  else {
    return null; 
  }
}

function startTimer() {
  var start = new Date().getTime()
  intervalTimer = window.setInterval(function()
  {
    var time = new Date().getTime() - start;
    $$('#timer').text(time);
    }, 1);
}
  
function stopTimer() {
  if (intervalTimer) {
    window.clearInterval(intervalTimer);
  }
}
  
// Random Number Generator function
function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
  
function randomButton() {
  return "#" + (Math.floor(Math.random() * 9) + 1);
} 
  
function DbEntry(time,age,gender,mTime1,mTime2,mTime3,mTime3,mTime4,mTime5,mTimeMin,mTimeMax,mTimeAvg) {

  this.id = getID();
  this.time = time;
  this.age = age;
  this.gender = gender;
  this.mTime1 = mTime1;
  this.mTime2 = mTime2;
  this.mTime3 = mTime3;
  this.mTime4 = mTime4;
  this.mTime5 = mTime5;
  this.mTimeMin = mTimeMin;
  this.mTimeMax = mTimeMax;
  this.mTimeAvg = mTimeAvg;  
}
  
function getID () {
  var id = localStorage.getItem("pk_id");
  id++;
  localStorage.setItem("pk_id",id);
  console.log("ID: " + id);
  return id;
}
  
function addToStorage(key,value) {
  if (localStorage.getItem(key) != null) {
    var arr = [];
    var currData = JSON.parse(localStorage.getItem(key));
    console.log("Current data: " + currData);
    for (var i = 0; i < currData.length; i++) {
      arr.push(currData[i]);
    }
    arr.push(value);
    localStorage.setItem(key, JSON.stringify(arr));
  }
  else {
    console.log("Adding: " + value);
    var arr = [];
    arr.push(value);
    localStorage.setItem(key, JSON.stringify(arr));
  }
}

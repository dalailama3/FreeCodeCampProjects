$( document ).ready(function () {

  var setters = $('.timer-setter, .break-setter');
  setters.on("click", "span", function (e) {
    var $clicked = $(this);
    var parent = $clicked.parent();
    var operation = $clicked.text();
    var timerVal = parent.clone().children().remove().end().text().trim();
    var curVal = parseInt(timerVal);
    var curDisplayVal = $('.display').text().trim().slice(0,2);

    if (operation === "+") {
      curVal ++;
    } else {
      curVal --;
    }
    if (curVal > 0 && curVal <= 90) {
      parent.html("<span>-</span>" + ' ' + curVal + ' ' + "<span>+</span>");
      if (parent.attr("class") === 'timer-setter' && timerVal === curDisplayVal) {
        $('.display').text(curVal + ':00');
      }
    }

  });

  var startButton = $(".start");

  var timeStrToSecs = function (str) {
    if (str.length <= 2) {
      return parseInt(str) * 60;
    } else {
      var cIdx = str.indexOf(":");
      var mins = parseInt(str.slice(0, cIdx));
      var secs = parseInt(str.slice(cIdx+1));
      return (mins * 60) + secs;
    }
  }

  var paddedStr = function (num) {
    if ( num < 10 ) {
      return "0" + num;
    } else {
      return num;
    }
  }

  var countDown = function (start) {
    var seconds = timeStrToSecs(start)
    seconds -= 1;

    var mins = Math.floor(seconds/60);
    var secs = seconds % 60;

    if (seconds < 60) {
      mins = "00";
    }

    $('.display').text(mins + ":" + paddedStr(secs));
  };

  var startBreak = function () {

    var breakId = setInterval(function () {
      var displayTime = $(".display").text();
      if (displayTime === "00:00") {
        clearInterval(breakId);
        var timerLength = $('.timer-setter').clone().children().remove().end().text().trim();
        $(".display").text(timerLength + ":00");
        return

      }
      countDown(displayTime);
    }, 1000);

    var stopButton = $(".stop")

    stopButton.on('click', function () {
      clearInterval(breakId);
    });

  }

  startButton.on('click', function () {

    var intervalId = setInterval(function () {
      var startTime = $('.display').text();

      var strTime = startTime.toString().trim();

      if (strTime === '00:00') {
        clearInterval(intervalId);
        var breakLength = $('.break-setter').clone().children().remove().end().text().trim();
        $('.display').text(breakLength + ":" + "00");
        startBreak();
        return;

      }
      countDown(strTime);
    }, 1000);

    var stopButton = $(".stop")

    stopButton.on('click', function () {
      clearInterval(intervalId);
    });

  });


});

$( document ).ready(function () {
  var setters = $('.timer-setter, .break-setter');
  setters.on("click", "span", function (e) {
    var $clicked = $(this);
    var parent = $clicked.parent();
    var operation = $clicked.text().trim();
    var timerVal = parent.clone().children().remove().end().text().trim();
    var curVal = parseInt(timerVal);
    var colonIdx = $('.display').text().trim().indexOf(":");
    var curDisplayVal = $('.display').text().trim();

    if (operation === "+") {
      curVal ++;
    } else {
      curVal --;
    }
    if (curVal > 0 && curVal <= 90) {
      var pInner = parent.attr("class") === 'timer-setter' ? 'timer length' : 'break length';
      parent.html("<p>" + pInner + "</p>" + "<span>-</span>" + ' ' + curVal + ' ' + "<span>+</span>");
      if (parent.attr("class") === 'timer-setter' && (timerVal + ":00") === curDisplayVal) {
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

  var bounce = new Bounce();
  bounce
  .scale({
    from: { x: 0.5, y: 0.5 },
    to: { x: 1, y: 1 }
  });
  // .translate({
  //   from: { x: -300, y: 0 },
  //   to: { x: 0, y: 0 },
  //   duration: 600,
  //   stiffness: 4
  // })
  // .scale({
  //   from: { x: 1, y: 1 },
  //   to: { x: 0.1, y: 2.3 },
  //   easing: "sway",
  //   duration: 800,
  //   delay: 65,
  //   stiffness: 2
  // })
  // .scale({
  //   from: { x: 1, y: 1},
  //   to: { x: 5, y: 1 },
  //   easing: "sway",
  //   duration: 300,
  //   delay: 30,
  // })

  var countDown = function (start) {
    var seconds = timeStrToSecs(start)
    seconds -= 1;

    var mins = Math.floor(seconds/60);
    var secs = seconds % 60;

    if (seconds < 60) {
      mins = "00";
    }

    if (seconds <= 10) {
      bounce.applyTo($(".tomato"));
    }
    var curTime = mins + ":" + paddedStr(secs);

    if (curTime === "00:00") {
      var audio = new Audio("./audio/ping.mp3");
      audio.play();

    }

    $('.display').text(mins + ":" + paddedStr(secs));

  };

  var startBreak = function () {
    var breakId = setInterval(function () {
      var displayTime = $(".display").text();
      if (displayTime === "00:00") {
        clearInterval(breakId);
        bounce.remove();
        var timerLength = $('.timer-setter').clone().children().remove().end().text().trim();
        $(".display").text(timerLength + ":00");
        $("button.break").remove();
        return;

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
        bounce.remove();

        var animateId = setInterval(function() {
          $("body").toggleClass("backgroundRed");
          $("h1").toggleClass("colorWhite")
        }, 1000);
        var breakLength = $('.break-setter').clone().children().remove().end().text().trim();
        $('.display').text(breakLength + ":" + "00");
        var breakButton = $("<button class='break'>START BREAK</button>");

        breakButton.on('click', function () {
            startBreak();
            clearInterval(animateId);
        });
        $('.button-group').append(breakButton);
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

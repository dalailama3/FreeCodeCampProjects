$( document ).ready(function () {

  var setters = $('.timer-setter, .break-setter');
  setters.on("click", "span", function (e) {
    var $clicked = $(this);
    var parent = $clicked.parent();
    var operation = $clicked.text();
    var timerVal = parent.clone().children().remove().end().text();
    var curVal = parseInt(timerVal);

    if (operation === "+") {
      curVal ++;
    } else {
      curVal --;
    }
    if (curVal > 0 && curVal <= 90) {
      parent.html("<span>-</span>" + ' ' + curVal + ' ' + "<span>+</span>");
      if (parent.attr("class") === 'timer-setter') {
        $('.display').text(curVal + ':00');
      }
    }

  });

  var startButton = $("button");

  var timeStrToSecs = function (str) {
    if (str.length === 2) {
      return parseInt(str) * 60;
    } else {
      var mins = parseInt(str.slice(0,2));
      var secs = parseInt(str.slice(3));
      return mins * 60 + secs;
    }
  }

  var countDown = function (start) {
    var seconds = timeStrToSecs(start)
    seconds -= 1;
    var mins = Math.floor(seconds/60);
    var secs = seconds % 60;
    $('.display').text(mins + ":" + secs);
  };

  startButton.on('click', function () {
    setInterval(function () {
      var startTime = $('.display').text();
      var strTime = startTime.toString().trim();
      countDown(strTime);
    }, 1000);
  });

});

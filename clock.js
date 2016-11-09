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
    parent.html("<span>-</span>" + ' ' + curVal + ' ' + "<span>+</span>");
    if (parent.attr("class") === 'timer-setter') {
      $('.display').text(curVal + ':00');
    }
  });

});

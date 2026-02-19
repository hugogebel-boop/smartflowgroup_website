/* SmartFlow Tag — smartflowsa.ch */
(function () {
  document.querySelectorAll('.sf-tag').forEach(function (tag) {
    var letters = tag.querySelectorAll('.sf-letter');
    var icon = tag.querySelector('.sf-icon');
    if (!letters.length || !icon) return;

    var delays = [0, 35, 60, 100, 130, 175, 210, 260, 310];
    var timeouts = [];

    tag.addEventListener('mouseenter', function () {
      timeouts.forEach(clearTimeout);
      timeouts = [];
      letters.forEach(function (letter, i) {
        timeouts.push(setTimeout(function () {
          letter.classList.add('glitch');
          if (i === letters.length - 1) {
            setTimeout(function () { icon.classList.add('visible'); }, 40);
          }
        }, delays[i] || i * 35));
      });
    });

    tag.addEventListener('mouseleave', function () {
      timeouts.forEach(clearTimeout);
      timeouts = [];
      icon.classList.remove('visible');
      letters.forEach(function (letter, i) {
        timeouts.push(setTimeout(function () {
          letter.classList.remove('glitch');
        }, (letters.length - 1 - i) * 30));
      });
    });
  });
})();

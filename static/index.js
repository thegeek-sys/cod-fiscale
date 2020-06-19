document.addEventListener('DOMContentLoaded', () => {
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
  socket.on('connect', () => {
    document.querySelector("#provincia").onchange = function() {
      var prov = this.value
      var comune = document.querySelector('#comune');
      var i;
      for (i = comune.length - 1; i >= 0; i--) {
	       comune.remove(i);
      }
      socket.emit('select provincia', {'prov': prov});
    };
  });
  socket.on('selected provincia', data => {
    var comune = document.querySelector('#comune');
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(`${data.comune}`));
    opt.value = `${data.comune}`;
    comune.appendChild(opt);
  });
});

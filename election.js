$(document).ready(function() {

  // Imagination!
  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(responseData) {
    for (var step = 0; step < responseData.candidates.length; step++) {
      var name = responseData.candidates[step].name;
      var votes = responseData.candidates[step].votes;
      var list = $('<li>').html(name + ' ' + votes).appendTo('#list');
      var form = $('<form>').appendTo(list);
      $(form).attr({
        method: "POST",
        action: "https://bb-election-api.herokuapp.com/vote"
      });
      var hidden = $('<input>').attr({
        type: "hidden",
        name: "id",
        value: responseData.candidates[step].id
      });
      var button = $('<input>').attr({
        type: "submit"
      });
      $(form).append(hidden, button);
      $(form).submit(function(event) {
        event.preventDefault();
        $.ajax({
          url: "https://bb-election-api.herokuapp.com/vote",
          method: "POST",
          data: { id: $(this).children('input[type=hidden]').val() }
        }).done(function() {
          console.log('success');
          location.reload();
          $('#refresh').on('click', function() {
            location.reload();
          });
        }).fail(function() {
          console.log('fail');
        });
      });
    };
  });
});

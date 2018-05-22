$(document).ready(function() {

  function preview(input){
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = $("<img>");
        img.attr('src', e.target.result);
        $('.inline-hints').html(img);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $(document).on('change', 'input:file', function(){
    preview(this);
  });
});

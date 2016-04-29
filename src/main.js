$(function(){


  // When a section is chosen, the page will do the following:
  // -change the class of the header to 'loaded'
  // -display the loading .gif
  // -use ajax to load in up to 12 articles of the chosen section
  // -for each story loaded:
  //    -create a div with a background image of the featured image
  //    -create a paragraph with the blurb
  //    -link the div to the url of the article
  // -hide the loading .gif


  $('select').on('change', function() {

      var $section = $('section');

      $('header').addClass('loaded');
      $('.while-loading').show();

      $section.empty();

      var userSection = $(this).val();
      var urlForAPI = 'http://api.nytimes.com/svc/topstories/v1/' + userSection
                      + '.json?api-key=8b4edc1d68ed46052e25047d8cbb612a:15:75124067';


      $.ajax({
        method: 'GET',
        url: urlForAPI,
        dataType: 'json'
      })
      .done(function(data) {

        // data comes back as an object, one property of which is called results
        // data.results is an array containing all the articles of the chosen section

        var nytResults = data.results;

        if (nytResults != 0) {

          nytResults = nytResults.filter(function(item) {
                                    return item.multimedia.length;
                                  }).splice(0,12);
        }

        //nytResults[] now holds max 12 articles that all have a photo attached

        var articlesToAppend = '';
        $.each(nytResults, function(index, value) {

            var imgUrl = '';
            $.each(value.multimedia, function(key, val) {

              if (val.format === 'superJumbo') {
                imgUrl = val.url;
              }
            });

            articlesToAppend += '<article>'
                                + '<a href=\'' + value.url + '\' target=\'_blank\'>'
                                + '<div class= \'inner\''
                                +' style = "background: url(\'' + imgUrl +  '\');'
                                + 'background-size: cover">'
                                + '<p>' + value.abstract
                                + '</p></div></a>'
                              + '</article>';
          });

          $section.append(articlesToAppend);

          // when user hovers over an image, the abstract text appears

          $('.inner').hover(function() {
            $(this).children().slideToggle(1000);
          });

      })
      .always(function(){
        $('.while-loading').hide();
      });

  });



});

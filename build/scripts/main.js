'use strict';

$(function () {

  /*
   INSTANEWS WEBSITE
      When a section is chosen by the user:
      -change the class of the header to 'loaded'
      -display the loading .gif
      -use ajax to load in up to 12 articles of the chosen section
      -for each story loaded:
          -create a div with a background image of the featured image
          -create a paragraph with the blurb
          -link the div to the url of the article
      -hide the loading .gif
    Select is styled with heapbox jquery plugin
  */

  $('select').heapbox({
    onChange: function onChange(input) {

      var $section = $('section');
      var $header = $('header');

      // the header will shrink to it's smaller height
      $header.animate({
        height: $header.css('height', 'auto').height()
      }, 'slow');
      $header.addClass('loaded');

      $('.while-loading').show();

      //empty out any previous search results
      $section.empty();

      var userSection = input;
      var urlForAPI = 'http://api.nytimes.com/svc/topstories/v1/' + userSection + '.json?api-key=8b4edc1d68ed46052e25047d8cbb612a:15:75124067';

      $.ajax({
        method: 'GET',
        url: urlForAPI,
        dataType: 'json'
      }).done(function (data) {

        // data comes back as an object, one property of which is called results
        // data.results is an array containing all the articles of the chosen section

        var nytResults = data.results;

        if (nytResults.length === 0) {

          $section.append('<p class=\'no-results\'>Sorry no results were found</p>');
        } else {

          if (nytResults !== 0) {

            // filter to keep only articles that have images, limit to 12
            nytResults = nytResults.filter(function (item) {
              return item.multimedia.length;
            }).splice(0, 12);
          }

          //nytResults[] now holds max 12 articles that all have a photo attached

          var articlesToAppend = '';
          $.each(nytResults, function (index, value) {

            var imgUrl = '';
            $.each(value.multimedia, function (key, val) {

              if (val.format === 'superJumbo') {
                imgUrl = val.url;
              }
            });

            articlesToAppend += '<article>\n                                      <a href="' + value.url + '" target="_blank">\n                                        <div class="inner"\n                                              style="background: url(\'' + imgUrl + '\');\n                                                     background-size: cover">\n                                          <p>' + value.abstract + '</p>\n                                        </div>\n                                      </a>\n                                      </article>';
          });

          $section.append(articlesToAppend);

          // when user hovers over an image, the abstract text appears

          $('.inner').hover(function () {
            $(this).children().slideToggle(1000);
          });
        }
      }).always(function () {
        //hide the loading .gif
        $('.while-loading').hide();
      });
    }
  });
});
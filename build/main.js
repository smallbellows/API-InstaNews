$(function(){$("select").on("change",function(){var e=$("section");$("header").addClass("loaded"),$(".while-loading").show(),e.empty();var a=$(this).val(),n="http://api.nytimes.com/svc/topstories/v1/"+a+".json?api-key=8b4edc1d68ed46052e25047d8cbb612a:15:75124067";console.log(n),$.ajax({method:"GET",url:n,dataType:"json"}).done(function(a){var n=a.results;0!=n&&(n=n.filter(function(e){return e.multimedia.length}).splice(0,12));var i="";$.each(n,function(e,a){var n="";$.each(a.multimedia,function(e,a){"superJumbo"===a.format&&(n=a.url)}),i+="<article><div class= 'inner' style = \"background: url('"+n+"');background-size: cover\"><p>"+a["abstract"]+"</p></div></article>"}),e.append(i)}).always(function(){$(".while-loading").hide()})})});
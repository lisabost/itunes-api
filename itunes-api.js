$(document).ready(function () {
   let limit = 10;
   let page = 0;
   $('#search-button, #load-more').on('click', function(e){
      let searchTerm = $('#search-term').val();
      $.get(
          // endpoint
          'https://itunes.apple.com/search?',
          // parameters
          {
              term: searchTerm,
              limit,
              offset: limit * page++,
          },
          // success callback function - what to do on a success
          function (data) {
             //data is what you see in postman
             for(r in data.results){
                $('#results').append(`
                    <div class="card col-12 col-md-3 m-3 result-card">
                        <div class="card-header result-header">
                            <h5 class="card-title">${data.results[r].trackName}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Artist: ${data.results[r].artistName}</h6>
                        </div>
                        <div claass="card-body p-4">
                            <a href="${data.results[r].previewUrl}">Download Track Preivew</a>
                        </div>
                    </div>
                        `);
             }
             console.log(page);
             $('#load-more').show();
          },
          // datatype returned
          'JSONP'
      )
   });

   $('#reset-button').on('click', function() {
      $('#search-term').val('');
      $('#results').empty();
      page = 0;
      $('#load-more').hide();
   });

});
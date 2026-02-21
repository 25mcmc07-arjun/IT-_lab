let booksJSON = [];

$(document).ready(function(){
    $.ajax({
        url: "books.xml",
        dataType: "xml",
        success: function(xml){
            $(xml).find("book").each(function(){
                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publication_date: $(this).find("publication_date").text()
                };

                booksJSON.push(book);
            });

            populateGenre();
            renderTable(booksJSON);
        }
    });
    $("#genreFilter, #authorFilter, #minPrice, #maxPrice").on("input change", function(){
        applyFilters();
    });

});
function populateGenre(){
    let genres = [...new Set(booksJSON.map(function(b){ return b.genre; }))];

    genres.forEach(function(g){
        $("#genreFilter").append('<option value="'+g+'">'+g+'</option>');
    });
}
function renderTable(data){
    let tbody = $("#bookTable tbody");
    tbody.empty();

    data.forEach(function(b){
        tbody.append(
            "<tr>" +
            "<td>"+b.title+"</td>" +
            "<td>"+b.author+"</td>" +
            "<td>"+b.genre+"</td>" +
            "<td>"+b.price+"</td>" +
            "<td>"+b.publication_date+"</td>" +
            "</tr>"
        );
    });
}
function applyFilters(){
   let genre = $("#genreFilter").val().toLowerCase();
    let author = $("#authorFilter").val().toLowerCase();
    let min = parseFloat($("#minPrice").val()) || 0;
    let max = parseFloat($("#maxPrice").val()) || Infinity;

    let filtered = booksJSON.filter(function(b){
        return (!genre || b.genre.toLowerCase() === genre) &&
               (!author || b.author.toLowerCase().includes(author)) &&
               (b.price >= min && b.price <= max);
    });

    renderTable(filtered);
}
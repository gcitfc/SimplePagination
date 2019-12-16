var bookList = new Array();
var books = new Array();
var currpage = 1;
var numPerPage = 10;
var numOfPages = 1;
var numOfShows = 1;

function initTable() {
    for (var i = 0; i < 100; i++)
    bookList.push([i ,"Book Title #" + i, "Author #" + i]);
    numOfPages = getNumOfPages();
    numOfShows = numOfPages > 5 ? 5 : numOfShows;
}

function getNumOfPages() {
    return Math.ceil(bookList.length / numPerPage);
}

function nextPage() {
    if(currpage < numOfPages) {
        currpage += 1;
        loadTable();
    }
}

function prevPage() {
    if(currpage > 1) {
        currpage -= 1;
        loadTable();
    }
}

function toPageId(id) {
    currpage = parseInt(id);
    loadTable();
}

function loadTable() {
    var begin = ((currpage - 1) * numPerPage);
    var end = begin + numPerPage;
    books = bookList.slice(begin, end);
    drawTable();
}
    
function drawTable() {
    var tmp = "<table class=\"table table-hover\">";
    tmp += "<thead><th>#</th><th>Title</th><th>Author</th></thead>";
    tmp += "<tbody>";
    for (var i = 0; i < books.length; i++) {
        tmp += "<tr>";
        tmp += "<td>" + books[i][0] + "</td>";
        tmp += "<td>" + books[i][1] + "</td>";
        tmp += "<td>" + books[i][2] + "</td>";
        tmp += "</tr>";
    }
    tmp += "</tbody>";
    tmp += "</table>";
    document.getElementById("table").innerHTML = tmp;
    drawBar();
    //console.log(tmp);
}

function drawBar() {
    var tmp = "";
    tmp += "<li class=\"page-item\">\n";
    tmp += "<a class=\"page-link\" href=\"#\" onclick=\"prevPage()\" aria-label=\"Previous\">\n";
    tmp += "<span aria-hidden=\"true\">&laquo;</span>\n";
    tmp += "<span class=\"sr-only\">Previous</span></a></li>\n";
    for(var i = 0; i < numOfShows && currpage + i - numOfShows/2 <= numOfPages; i++) {
        tmp += "<li class=\"page-item\"><a class=\"page-link\" href=\"#\" onclick = \"toPageId(this.textContent)\">";
        if(currpage == 1) {
            tmp += currpage + i;
        }
        else if(currpage == 2) {
            tmp += currpage - 1 + i;
        }
        else {
            tmp += currpage - 2 + i;
        }   
        tmp += "</a></li>\n";
    }     
    tmp += "<li class=\"page-item\">\n";
    tmp += "<a class=\"page-link\" href=\"#\" onclick=\"nextPage()\" aria-label=\"Next\">\n";
    tmp += "<span aria-hidden=\"true\">&raquo;</span>\n";
    tmp += "<span class=\"sr-only\">Next</span></a></li>\n";
    document.getElementById("pageBar").innerHTML = tmp;
}

function initPage() {
    initTable();
    loadTable();
}

window.onload = initPage;
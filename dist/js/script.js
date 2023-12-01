var dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');


    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });
    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});


$(document).ready(function () {
    $.clicked = false;
    $('.select').on('click', function () {
        if ($.clicked) {
            $('.main').css({
                marginRight: 'inherit'
            })
            $(".main-content").css({
                padding: '50px 50px 0 50px'
            })
            $(".item3-content2 h4").css({
                marginLeft: '150px'
            })
            $(".item3-content11 h4").css({
                marginLeft: '30px'
            })
            $(".right-item").css({ marginLeft: '30px' });
            $(".left-item").css({ "width": "430px" });
            $(".chartjs-render-monitor").css({ "width": "inherit" })
            $(".usd h3").css({ fontSize: '18px' });
            $.clicked = false;
        } else {
            $(".main").css({
                marginRight: '287px'
            })
            $(".main-content").css({
                padding: '30px 30px 0 30px'
            })
            $(".item3-content2 h4").css({
                marginLeft: '110px'
            })
            $(".item3-content11 h4").css({
                marginLeft: '10px'
            })
            $("canvas").css({ "width": "750px" });
            $(".right-item").css({ marginLeft: '10px' });
            $(".left-item").css({ "width": "350px" });
            $(".usd h3").css({ fontSize: '15px' });
            $(".chartjs-render-monitor").css({ "width": "650px" });
            $.clicked = true;
        }

    });
});
new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: [10, 50, 100, 200, 300, 400, 500],
        datasets: [{
            data: [83, 80, 90, 60, 49, 90, 100],
            borderColor: "rgb(89,113,216)",
            backgroundColor: "rgb(89,113,216)",
            pointBackgroundColor: ["white", "white", "white", "white", "white", "white", "white"],
            pointBorderColor: ["white", "white", "white", "white", "white", "white", "white"],
            fill: true
        }
        ]
    }

});

const allRanges = document.querySelectorAll(".left-1-item");
allRanges.forEach(wrap => {
    const range = wrap.querySelector(".range");
    const bubble = wrap.querySelector(".bubble");

    if (range) {
        range.addEventListener("input", () => {
            setBubble(range, bubble);
        });
        setBubble(range, bubble);
    }
});

function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;

    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}


$.getJSON("data.json", function (data) {
    let _data = '';
    $.each(data["newsItems"], function (key, value) {
        _data = '';
        _data += '<h3>' + value.cardnumber + '</h3>';
        _data += '<div class="card-text">';
        _data += '<h5>' + value.name + '</h5>';
        _data += '<p>' + value.date + '</p>';
        _data += '</div>';
        $('#cards'+key).append(_data);
    });
});



function loadData() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert(xhr.responseText);
            }
            if (xhr.status == 404) {
                alert('Ups...error :(');
            }
        }
    }

    xhr.open('get', dataPath, true);
    xhr.send();
}

function newsContainerItem(date, name, number) {
    var html = '';
    html = html + '<h3>' + number + '</h3>\n'
        + ' <div class="card-text">'
        + '<h5>' + name + '</h5>'
        + ' <p>' + date + '</p>' + ' </div>';
    return html;
}

function newsContainerBuilder() {
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html = html + newsContainerItem(data[i].date, data[i].name, date[i].number);
    }
    $('#cards').html(html);
}

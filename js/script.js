;"use strict"

$(document).ready(function() {
    var year = new Date().getFullYear();
    $("#copyYear").html(year);

    $("#navigation > li > a").hover(function () {
        $(this).css("color", "#FF6700");
    }, function () {
        $(this).css("color", "#FFF");
    });


    consoleText(['Webb Development'], 'text', ['#ff6700']);

    function consoleText(words, id, colors) {
        if (colors === undefined) colors = ['#fff'];
        var visible = true;
        var con = $('#console');
        var letterCount = 1;
        var x = 1;
        var waiting = false;
        var target = document.getElementById(id)
        target.setAttribute('style', 'color:' + colors[0])
        window.setInterval(function () {
            if (letterCount === 0 && waiting === false) {
                waiting = true;
                target.innerHTML = words[0].substring(0, letterCount)
                window.setTimeout(function () {
                    var usedColor = colors.shift();
                    colors.push(usedColor);
                    var usedWord = words.shift();
                    words.push(usedWord);
                    x = 1;
                    target.setAttribute('style', 'color:' + colors[0])
                    letterCount += x;
                    waiting = false;
                }, 1000)
            } else if (letterCount === words[0].length + 1 && waiting === false) {
                waiting = true;
                window.setTimeout(function () {
                    x = -1;
                    letterCount += x;
                    waiting = false;
                }, 9000)
            } else if (waiting === false) {
                target.innerHTML = words[0].substring(0, letterCount)
                letterCount += x;
            }
        }, 120)
        window.setInterval(function () {
            if (visible === true) {
                con.className = 'console-underscore hidden'
                visible = false;
            } else {
                con.className = 'console-underscore'
                visible = true;
            }
        }, 400)
    }

    $(document).one('focus.textarea', '.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
        .on('input.textarea', '.autoExpand', function(){
            var minRows = this.getAttribute('data-min-rows')|0,
                 rows;
            this.rows = minRows;
            console.log(this.scrollHeight , this.baseScrollHeight);
            rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
            this.rows = minRows + rows;
        });
});
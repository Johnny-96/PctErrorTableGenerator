/**
 * Created by jcurran2 on 2/21/2017.
 */


var tableGenerator = new Vue({
    el: "#tableGenerator",
    data: {
        data: ''
    },
    computed: {
        tabledData: function() {
            // parse your \t's and \n's
            // &emsp
            var output = "<table border='1'><tr><th>Theoretical</th><th>Experimental</th><th>% Error</th></tr><tr>"
            if (this.data != "") {
                var table = this.data.split("\n");
                table.forEach(function (row, rowIndex) {
                    // split row by \t
                    // put each cell in its own column
                    var splitRow = row.split("\t")
                    splitRow.forEach(function (cell, columnIndex) {
                        output += "<td>"
                        output += cell
                        output += "</td>"
                    });
                    // Calculate percent difference
                    if (splitRow != "") {
                        // if the row isn't empty
                        output += "<td>"
                        var theoretical = parseFloat(splitRow[splitRow.length - 2])
                        var experimental = parseFloat(splitRow[splitRow.length - 1])
                        var pctDiff = Math.round(Math.abs((experimental-theoretical)/theoretical * 100) * 100) / 100
                        output = output.concat(pctDiff, "%")
                        output += "</td>"
                    }
                    output += "</tr>"
                });
                output += "</table>"
                return output
            }
        }
    },
    methods: {
        update: _.debounce(function(e) {
            this.data = e.target.value
        }, 300)
    }
})

// Enable tab presses in textarea
document.querySelector("textarea").addEventListener('keydown',function(e) {
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var target = e.target;
        var value = target.value;

        // set textarea value to: text before caret + tab + text after caret
        target.value = value.substring(0, start)
        + "\t"
        + value.substring(end);

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
    }
},false);
/* global jconfirm */

$(function () {
    var star;
    var isMobilePhone = false;
    var game = {
        field: $("#field"),
        cellArray: [[]],
        occupied: [],
        neighbors: [],
        level: 1,
        prop: {
            update: function () {
                switch (game.level) {
                    case 2:
                        this.fieldSize = 10;
                        this.colors = 7;
                        this.maxSteps = 25;
                        break;
                    case 3:
                        this.fieldSize = 12;
                        this.colors = 8;
                        this.maxSteps = 30;
                        break;
                    default:
                        this.fieldSize = 8;
                        this.colors = 6;
                        this.maxSteps = 20;
                        break;
                }
            }
        },
        viewProp: {
            maxColorBlockSize: 50,
            maxCellSize: 45
        },
        records: {
            eazy: '-',
            medium: '-',
            hard: '-',
            set: function (value) {
                var current = this[Object.keys(this)[game.level - 1]];
                if (current === '-' || current > value) {
                    if (value > 5) {
                        this[Object.keys(this)[game.level - 1]] = value;
                        if (current !== '-')
                            return true;
                    }
                }
                return false;
            },
            get: function () {
                return this[Object.keys(this)[game.level - 1]];
            }
        },
        reset: function () {
            this.cellArray = [[]];
            this.occupied = [];
            this.neighbors = [];
            this.prop.update();
        }
    };

    var colorBlocks = $("#colors div");
    var steps = $("#steps");
    steps.count = 0;

    var COLORS = colorBlocks.map(function () {
        return $(this).css("background-color");
    }).get();

    firstLaunch();

    $("#level").on("change", function () {
        if (steps.count) {
            var message = 'Are you sure you want to change the level?';
            var onOk = function () {
                startNewGame();
            };
            var onCancel = function () {
                $('#level').find(':selected')
                        .prop("selected", false)
                        .find("[data-id='" + game.level + "']")
                        .prop("selected", true);
            };

            showAreYouSureWindow(message, onOk, onCancel);
        } else
            startNewGame();
    });


    $("#new-game").on("click", function () {
        var message = 'Are you sure you want to start a new game?';
        var onOk = function () {
            startNewGame();
        };

        showAreYouSureWindow(message, onOk, function () {});
    });

    colorBlocks.on("click tap", function () {
        var block = $(this);
        var color = block.css("background-color");

        block.stop()
                .animate({boxShadow: "0 0 0 4px " + color}, 20)
                .animate({boxShadow: "0 0 0 0.5px " + color}, 120)
                .animate({boxShadow: "0 0 0 2px " + color}, 150)
                .animate({boxShadow: "0 0 0 0 " + color}, 200, function () {
                    block.removeAttr("style");
                });
        steps.text(++steps.count);
        nextStep(color);
    });

    function firstLaunch() {
        $('#year').html(new Date().getFullYear());
        star = $(new Image()).attr('src', 'http://s8.hostingkartinok.com/uploads/images/2017/01/09f59799c8afab7173fc7158d6d448f5.png').addClass('star');

        jconfirm.pluginDefaults.theme = 'supervan';
        jconfirm.pluginDefaults.useBootstrap = false;
        jconfirm.pluginDefaults.boxWidth = '70%';

        var w = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

        isMobilePhone = w < 481;
        if (isMobilePhone) {
            jconfirm.pluginDefaults.boxWidth = '85%';
            var score = $('#score');
            score.removeClass();
            score.detach().appendTo('#hidden-score');
            $('#steps-wrap').detach().prependTo("#top");
        }
        $.alert({
            title: 'Hello!',
            content: '<big>I am glad to introduce you my implementation of '
                    + 'the Flood-it! game.</big></br></br>'
                    + 'Flood-It! is a simple yet addictive strategy game in '
                    + 'which you have to flood the whole game board with one '
                    + 'color in less than the allowed steps. Select one of the '
                    + 'colored buttons and your "flood" area will grow to '
                    + 'include that color.</br></br>'
                    + '<big>Enjoy it! :)</big>',
            buttons: {
                "OK, THANKS": {
                    keys: ['enter']
                }
            }
        });

        startNewGame();
    }

    function startNewGame() {
        steps.count = 0;
        steps.text(steps.count);
        game.level = $('#level').find(':selected').data('id');
        game.reset();


        $('#maxSteps').text(game.prop.maxSteps);
        game.field.html(generateTable(game.prop.fieldSize));
        tuneView();

        colorizeCells();
        moveElement2d(game.cellArray, game.occupied, 0, 0);
        game.neighbors = getNeighbors(0, 0);
        testFirstThreeCells();
    }

    function tuneView() {
        for (var i = 4; i < colorBlocks.length; i++) {
            if (i + 1 > game.prop.colors)
                colorBlocks.eq(i).hide();
            else
                colorBlocks.eq(i).show();
        }

        var css = $('#addedCSS').empty();

        if (isMobilePhone) {
            var oneBlock = colorBlocks.eq(0);
            var newColorSize = $("#colors").width()
                    - game.prop.colors * (oneBlock.outerWidth(true) - oneBlock.width());
            newColorSize = Math.floor(newColorSize / game.prop.colors);
            newColorSize = Math.min(game.viewProp.maxColorBlockSize, newColorSize);
            css.text("#colors div {" + getCssSize(newColorSize) + "}");
        }

        if (isMobilePhone || $('.cell:eq(0)').width() * game.prop.fieldSize >= $("#table").width()) {
            var newCellSize = Math.floor($("#table").width() / game.prop.fieldSize);
            css.append('.cell {' + getCssSize(newCellSize) + "}");
        }
    }

    function getCssSize(size) {
        return "width: " + size + "px !important;"
                + "height: " + size + "px !important;";
    }

    function generateTable(fieldSize) {
        var table = $("<div id='table'></div>");
        for (var i = 0; i < fieldSize; i++) {
            var row = $("<div class='row'></div>");
            game.cellArray[i] = [];
            for (var j = 0; j < fieldSize; j++) {
                var cell = $("<span class='cell'></span>");
                cell.I = i;
                cell.J = j;
                game.cellArray[i][j] = cell;
                row.append(cell);
            }
            table.append(row);
        }
        return table;
    }

    function colorizeCells() {
        game.field.find(".cell").each(function () {
            $(this).css("background-color", getRandomColor());
        });
    }

    function getRandomColor() {
        var randNum = Math.floor(Math.random() * game.prop.colors);
        return COLORS[randNum] + "";
    }

    function testFirstThreeCells() {
        var firstColor = $(game.occupied[0]).css('background-color');
        var second = $(game.neighbors[0]);
        var third = $(game.neighbors[1]);

        while (firstColor === second.css('background-color')) {
            second.css('background-color', getRandomColor());
        }
        var secondColor = second.css('background-color');
        while (firstColor === third.css('background-color')
                || secondColor === third.css('background-color')) {
            third.css('background-color', getRandomColor());
        }
    }

    function nextStep(color) {
        checkNeighbors(game.neighbors, color);
        paintOccupiedCells(color);

        if (game.occupied.length === Math.pow(game.prop.fieldSize, 2)) {
            var isRecordBeaten = game.records.set(steps.count);
            updateScoreTable();
            showResultWindow(true, isRecordBeaten);
        } else if (steps.count > game.prop.maxSteps) {
            showResultWindow(false);
        }
    }

    function checkNeighbors(Neighbors, color) {
        var neighbors = Neighbors.slice(0);
        while (neighbors.length) {
            var success = [];
            var len = neighbors.length;
            for (var i = 0; i < len; ++i) {
                if (game.occupied.indexOf(neighbors[i]) === -1) {
                    if ($(neighbors[i]).css("background-color") === color) {
                        success.push(neighbors[i]);

                        game.occupied.push(neighbors[i]);
                        game.cellArray[neighbors[i].I][neighbors[i].J] = undefined;

                        var index = game.neighbors.indexOf(neighbors[i]);
                        if (index !== -1)
                            game.neighbors.splice(index, 1);

                        continue;
                    }
                }
                if (game.neighbors.indexOf(neighbors[i]) === -1) {
                    moveElement2d(game.cellArray, game.neighbors, neighbors[i].I, neighbors[i].J);
                }
            }
            neighbors = [];

            if (success.length) {
                success.forEach(function (el) {
                    neighbors.push.apply(neighbors, getNeighbors(el.I, el.J));
                });
            }
        }
    }

    function getNeighbors(i, j, arr) {
        arr = arr || game.cellArray;

        function pos(index) {
            if (index === 0)
                return -1;
            if (index === game.prop.fieldSize - 1)
                return 1;
            return 0;
        }

        var localNeighbors = [];

        if (pos(i) !== -1 && arr[i - 1][j])
            localNeighbors.push(arr[i - 1][j]);

        if (pos(i) !== 1 && arr[i + 1][j])
            localNeighbors.push(arr[i + 1][j]);

        if (pos(j) !== -1 && arr[i][j - 1])
            localNeighbors.push(arr[i][j - 1]);

        if (pos(j) !== 1 && arr[i][j + 1])
            localNeighbors.push(arr[i][j + 1]);

        return localNeighbors;
    }

    function moveElement2d(from, to, i, j) {
        to.push(from[i][j]);
        from[i][j] = undefined;
    }

    function paintOccupiedCells(color) {
        game.occupied.forEach(function (el) {
            $(el).css("background-color", color);
        });
    }

    function updateScoreTable() {
        var id;
        switch (game.level) {
            case 1:
                id = 'ez_score';
                break;
            case 2:
                id = 'med_score';
                break;
            case 3:
                id = 'hrd_score';
                break;
        }
        $("#" + id).text(game.records.get());
    }

    function showAreYouSureWindow(message, onOk, onCancel) {
        $.confirm({
            title: message,
            theme: 'dark',
            content: 'Current progress will be lost',
            buttons: {
                Cancel: onCancel,
                Ok: {
                    btnClass: 'btn-red',
                    action: onOk
                }
            }
        });
    }

    function showResultWindow(playerWin, isRecordBeaten) {
        var title = playerWin ? 'YOU WIN!' : 'GAME OVER!';
        var content = $("<div class='result-text'></div>");
        var mark = rateGame(steps.count, game.prop.maxSteps);
        content.append("<div class='result-mark'>" + mark[1] + "</div>");

        if (playerWin) {
            var stars = $("<div id='stars-container'></div>");
            content.prepend(stars);
            content.append("<div class='result-score'>NEW SCORE: <big><big>"
                    + steps.count + "</big></big></div>");
            if (isRecordBeaten)
                content.append("<div class='result-text'>WOW! You beat your record!</div>");
        }

        content.append("<div class='result-level'> LEVEL: "
                + $('#level').find(':selected').val() + "</div>");

        if (isMobilePhone)
            content.append($('#hidden-score').html());

        function changeBG() {
            var bg = $('.jconfirm-bg').last();
            if (playerWin) {
                bg.addClass('jconfirm-bg-green');
                var colors = [
                    'rgba(0,255,127, 0.95)',
                    'rgba(124,252,0, 0.95)',
                    'rgba(0,255,0, 0.95)',
                    'rgba(127,255,0, 0.95)',
                    'rgba(0,250,154, 0.95)'];
                var i = 0;
                animate_loop = function () {
                    bg.animate({backgroundColor: colors[(i++) % colors.length]
                    }, 750, function () {
                        animate_loop();
                    });
                };
                animate_loop();
            } else
                bg.css('background-color', 'rgba(205,38,38, 0.95)');
        }

        $.confirm({
            title: title,
            content: function () {
                if (game.level === 3)
                    this.buttons['Next level'].hide();

                return content.html();
            },
            buttons: {
                'Play again': {
                    btnClass: 'btn-blue',
                    action: function () {
                        startNewGame();
                    }
                },
                'Next level': {
                    btnClass: 'btn-green',
                    action: function () {
                        $('#level').find(':selected').prop("selected", false)
                                .next().prop("selected", true);
                        startNewGame();
                    }
                }
            },
            onOpenBefore: function () {
                changeBG();
            },
            onContentReady: function () {
                for (var i = 0; i < mark[0]; ++i)
                    star.clone(true).appendTo('#stars-container').hide().delay(200 * i).show(300);
            },
            onClose: function () {
                $('.jconfirm-bg').stop();
            }
        });
    }

    function rateGame(steps, maxSteps) {
        var marks = [
            [0, 'You can do better!'],
            [1, 'Not bad!'],
            [2, 'Good!'],
            [3, 'Very Good!'],
            [4, 'Excellent!'],
            [5, 'Perfect!']
        ];
        var increment = 2;

        if (steps - maxSteps > 0)
            return marks[0];
        else
            for (var i = 1; i < marks.length - 1; ++i) {
                if (between(steps, maxSteps - increment * i, maxSteps - increment * (i - 1)))
                    return marks[i];
            }
        return marks.slice(-1)[0];

        function between(x, min, max) {
            if (min > max)
                min = max + (max = min, 0);
            return x > min && x <= max;
        }
    }
});
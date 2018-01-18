function makeWelcome(term) {
  var index = 0;
  for (var i = 0; i < welcome.length; i++) {
    var delay = 0 + i * 50;
    var decimalLength = term.cols() / welcome[i].length - 0.02;
    var line = [Math.ceil(decimalLength), Math.floor((decimalLength % 1) * 100)];
    term.echo(welcome[i])
  }
  term.echo('\n Press 1 to roll, 2 for help, 3 for the main menu.')
}

function makeSuccess(term) {
    var index = 0;
    for (var i = 0; i < success.length; i++) {
      var delay = 0 + i * 50;
      var decimalLength = term.cols() / success[i].length - 0.02;
      var line = [Math.ceil(decimalLength), Math.floor((decimalLength % 1) * 100)];
      term.echo(success[i])
    }
}

function makeRuhRoh(term) {
    var index = 0;
    for (var i = 0; i < ruhRoh.length; i++) {
      var delay = 0 + i * 50;
      var decimalLength = term.cols() / ruhRoh[i].length - 0.02;
      var line = [Math.ceil(decimalLength), Math.floor((decimalLength % 1) * 100)];
      term.echo(ruhRoh[i])
    }
}

function showRules(term) {
    var index = 0;
    for (var i = 0; i < rules.length; i++) {
      var delay = 0 + i * 50;
      var decimalLength = term.cols() / rules[i].length - 0.02;
      var line = [Math.ceil(decimalLength), Math.floor((decimalLength % 1) * 100)];
      term.echo(rules[i])
    }
    term.echo('\n Press 1 to roll, 2 for help, 3 for the main menu.')
}

function pauseTerm(delay, term){
    term.pause();
    term.freeze(true);
    setTimeout(function(){
      term.resume();
      term.freeze(false);
    }, delay);
  };

function rollOutcome(term,result,documented,trained) {
    var finalResult = 0;
    finalResult = result + documented + trained;
    if (finalResult >= 11) {
        if (documented >=1 || trained >=1) {
            makeSuccess(term)
            term.echo('\n')
            term.echo('A ' + result + ' was rolled. With modifiers the final number is ' + finalResult + '.')
            term.echo('\n Press 1 to roll again, 2 for help, 3 for the main menu.')
        } else {
            makeSuccess(term)
            term.echo('\n')
            term.echo('The result was ' + result)
            term.echo('\n Press 1 to roll again, 2 for help, 3 for the main menu.')
        }

    } else {
        makeRuhRoh(term)
        term.echo('\n')
        term.echo('The result was ' + result)
        term.echo('\n Press 1 to roll again, 2 for help, 3 for the main menu.')
    }
}

function roleDice(term,command) {
    var dice = {
        sides: 20,
        roll: function () {
          var randomNumber = Math.floor(Math.random() * this.sides) + 1;
          return randomNumber;
        }
      }
    var result = dice.roll();
    
    var trained = 0; 
    var documented = 0;

    //Check for Trained Person
    term.push(function(command) {
        if (command.match(/^(y|yes)$/i)) {
            trained = 5 //+5 modifier for trained person
            term.echo('Adding a +' + trained + ' modifier for training.')
            term.echo('Rolling Dice...')
            rollOutcome(term,result,documented,trained)
            term.pop();
        }
        else {
            term.echo('Rolling Dice...')
            rollOutcome(term,result,documented,trained)
            term.pop();
        }  
    }, {
            prompt: 'Has anyone been trained to perform the action? (yes/[no]) '
        });

    //Check for Documented Procedure
    term.push(function(command) {
        if (command.match(/^(y|yes)$/i)) {
            documented = 10;
            term.echo('Adding a +' + documented + ' modifier for documentation.')
            term.pop();
        }
        else {
            term.pop();
        }  
    }, {
            prompt: 'Is there a documented procedure for the action? (yes/[no]) '
        });
}

function startTerm(){
    jQuery(function($, undefined) {
        $('#term').terminal(function(command, term) {
            if (command == 'roll' || command == '1'){
                term.clear() //clear the screen
                roleDice(term,command)
            } else if (command == 'help' || command == '2' || command == 'rules' || command == 'h') {
                term.clear() //clear the screen
                showRules(term)
            } else if (command == 'menu' || command == '3') {
                term.clear()
                makeWelcome(term)
            }
        }, {
        greetings: null,
        name: 'js_demo',
        height: '50%',
        width: '600',
        prompt: '# ',
        convertLinks: false,
        onInit: function(term) {
            makeWelcome(term);
        },
        onBlur: function() {
            // prevent loosing focus
            return false;
        }
        });
    });
  }
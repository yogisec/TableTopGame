  
function typed(finish_typing) {
    var anim = false;
    return function(term, message, delay, finish) {
        anim = true;
        var prompt = term.get_prompt();
        var c = 0;
        if (message.length > 0) {
            term.set_prompt('');
            var new_prompt = '';
            var interval = setInterval(function() {
                var chr = $.terminal.substring(message, c, c+1);
                new_prompt += chr;
                term.set_prompt(new_prompt);
                c++;
                if (c == length(message)) {
                    clearInterval(interval);
                    // execute in next interval
                    setTimeout(function() {
                        // swap command with prompt
                        finish_typing(term, message, prompt);
                        anim = false
                        finish && finish();
                    }, delay);
                }
            }, delay);
        }
    };
}
function length(string) {
    string = $.terminal.strip(string);
    return $('<span>' + string + '</span>').text().length;
}
var typed_prompt = typed(function(term, message, prompt) {
    term.set_prompt(message + ' ');
});
var typed_message = typed(function(term, message, prompt) {
    term.echo(message)
    term.set_prompt(prompt);
});



function startWelcome(){
    jQuery(function($, undefined) {
        $('#landing').terminal(function(cmd, term) {
        }, {
            name: 'xxx',
            greetings: null,
            height: '50%',
            width: '600',
            onInit: function(term) {
                var msg = welcome[7]
                typed_message(term, msg, 25, function() {
                    typed_message(term, msg, 25, function() {
                        document.getElementById("landing").style.display === "none"
                    });
                });
            },
            keydown: function(e) {
                //disable keyboard when animating
                if (anim) {
                    return false;
                }
            }
        });
    });
}
/**
 * $.playSound('http://example.org/sound.wav')
 * $.playSound('/attachments/sounds/1234.wav')
 * $.playSound('/attachments/sounds/1234.mp3')
 * $.stopSound();
**/

//questa funzione si integra con la pagina quando viene utilizzata, serve per velocizzare appunto l'utilizzo di suoni

(function ($) {
    $.extend({
        playSound: function () {
            return $(
                   '<audio class="sound-player" autoplay="autoplay" style="display:none;">'
                     + '<source src="' + arguments[0] + '" />'
                     + '<embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false"/>'
                   + '</audio>'
                 ).appendTo('body');
        },
        
        stopSound: function () {
            $(".sound-player").remove();
        }
    });
})(jQuery);

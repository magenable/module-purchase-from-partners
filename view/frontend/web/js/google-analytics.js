define(['jquery', 'domReady!'], function ($) {
    'use strict';

    var defined = false;

    return function(analitycsIsEnabled) {
        if (defined) {
            return false;
        }
        defined = true;

        $('.magenable-purchase-partner-url').on('click onchange', function(e){
            var $element = $(e.currentTarget);
            if ($element.prop('tagName').toUpperCase() == 'SELECT') {
                $element = $element.find('option:selected');
            }
            if (!$element.data('link')) {
                return false;
            }
            $('body').trigger('processStart');

            if (analitycsIsEnabled && window.ga) {
                ga(
                    'send',
                    {
                        hitType: 'event',
                        eventCategory: $element.data('event-category'),
                        eventAction: $element.data('event-action'),
                        eventLabel: $element.data('link'),
                        eventValue: $element.data('event-value')
                    }
                );
            }

            document.location = $element.data('link');
        });
    }
});

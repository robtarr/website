(function() {
  var rob;

  rob = {
    recordOutboundLink: function(link, category, action) {
      _gat._getTrackerByName()._trackEvent(category, action);
      setTimeout('document.location = "' + link.href + '"', 100);
    },
    init: function() {
      var els = document.querySelectorAll('.outbound, .external-link')

      for (var i = 0; i < els.length; i++) {
        els[i].click = function(e) {
          e.preventDefault;
          return rob.recordOutboundLink(this, this.dataset[category], 'click');
        };
      };
    },
  };

  rob.init();

}).call(this);

require('./modernizr');

(function() {
  var Animator, rSVG, tSVG,
    __bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; };

  Animator = (function() {
    function Animator(id, total_frames, paths) {
      this.draw = __bind(this.draw, this);
      this.id = id;
      this.total_frames = total_frames;
      this.paths = paths;
      this.path = document.getElementById(id);
      this.length = this.path.getTotalLength();
      this.reset();
    }

    Animator.prototype.reset = function() {
      this.current_frame = 0;
      this.handle = 0;
      this.path.style.strokeDasharray = this.length + ' ' + this.length;
      return this.path.style.strokeDashoffset = this.length;
    };

    Animator.prototype.draw = function(cb) {
      var progress, _ref;
      progress = this.current_frame / this.total_frames;
      if (progress >= 1) {
        return window.cancelAnimationFrame(this.handle);
      } else {
        this.current_frame++;
        this.path.style.strokeDashoffset = Math.floor(this.length * (1 - progress));
        this.handle = window.requestAnimationFrame(this.draw);
        if ((_ref = this.paths) != null ? _ref[this.current_frame] : void 0) {
          return this.paths[this.current_frame].draw();
        }
      }
    };

    return Animator;

  })();

  if (Modernizr.svg) {
    tSVG = new Animator('logo-t', 100);
    rSVG = new Animator('logo-r', 100, {
      30: tSVG,
    });
    rSVG.draw();
    document.querySelector('#logo').click = function() {
      rSVG.reset();
      tSVG.reset();
      return rSVG.draw();
    };
  }

}).call(this);

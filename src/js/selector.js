function $(selector) {
  var els = document.querySelectorAll(selector);

  if (els.length > 1) {
    return els[0]
  }

  return els;
}

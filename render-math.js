/* Render inline/display math after KaTeX auto-render loads.
   Delimiters: $...$ (inline), $$...$$ (display), \( \) and \[ \]. */
(function () {
  function run() {
    if (!window.renderMathInElement) return;
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false,
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "summary"]
    });
  }
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", function () {
      // auto-render is deferred too; poll briefly until it's available
      var tries = 0;
      (function wait() {
        if (window.renderMathInElement || tries++ > 50) return run();
        setTimeout(wait, 40);
      })();
    });
  } else {
    run();
  }
})();

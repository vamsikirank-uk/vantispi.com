// Vantis PI — shared behaviour
(function () {
  // Theme toggle (boot script in <head> sets the initial data-theme before paint)
  var root = document.documentElement;
  var tbtn = document.querySelector(".theme-toggle");
  var syncThemeIcon = function () {
    if (tbtn) tbtn.textContent = root.getAttribute("data-theme") === "dark" ? "☼" : "☾";
  };
  if (tbtn) {
    tbtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("vpi-theme", next); } catch (e) {}
      syncThemeIcon();
    });
    syncThemeIcon();
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Scroll reveals + gantt draw-in
  var observed = document.querySelectorAll(".reveal, .gantt-fig");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observed.forEach(function (el) { io.observe(el); });
  } else {
    observed.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Contact form success note (form posts to FormSubmit and returns with ?sent=1)
  var note = document.getElementById("cf-note");
  if (note && /[?&]sent=1/.test(location.search)) {
    note.hidden = false;
    note.scrollIntoView({ block: "center" });
  }

  // Product tabs (products page)
  var tablist = document.querySelector(".product-tabs[role='tablist']");
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll("[role='tab']"));
    var showReveals = function (panel) {
      var rv = panel.querySelectorAll(".reveal");
      for (var j = 0; j < rv.length; j++) { rv[j].classList.add("is-in"); }
    };
    var activate = function (tab, setFocus, updateHash) {
      for (var k = 0; k < tabs.length; k++) {
        var t = tabs[k], selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        if (selected) { t.removeAttribute("tabindex"); } else { t.setAttribute("tabindex", "-1"); }
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) {
          if (selected) { panel.hidden = false; showReveals(panel); } else { panel.hidden = true; }
        }
      }
      if (setFocus) tab.focus();
      if (updateHash && history.replaceState) {
        history.replaceState(null, "", "#" + tab.getAttribute("aria-controls"));
      }
    };
    for (var i = 0; i < tabs.length; i++) {
      (function (tab, i) {
        tab.addEventListener("click", function () { activate(tab, false, true); });
        tab.addEventListener("keydown", function (e) {
          var idx = null;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") idx = (i + 1) % tabs.length;
          else if (e.key === "ArrowLeft" || e.key === "ArrowUp") idx = (i - 1 + tabs.length) % tabs.length;
          else if (e.key === "Home") idx = 0;
          else if (e.key === "End") idx = tabs.length - 1;
          if (idx !== null) { e.preventDefault(); activate(tabs[idx], true, true); }
        });
      })(tabs[i], i);
    }
    var initial = tabs[0];
    var h = (location.hash || "").replace("#", "");
    if (h) { for (var m = 0; m < tabs.length; m++) { if (tabs[m].getAttribute("aria-controls") === h) initial = tabs[m]; } }
    activate(initial, false, false);
  }
})();

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
})();

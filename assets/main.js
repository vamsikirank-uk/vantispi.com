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

  // Contact form → pre-filled email (no backend required)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var get = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      var topic = get("cf-topic") || "General enquiry";
      var subject = "[vantispi.com] " + topic + " — " + get("cf-name");
      var body =
        "Name: " + get("cf-name") + "\n" +
        "Organisation: " + get("cf-org") + "\n" +
        "Topic: " + topic + "\n\n" +
        get("cf-message");
      window.location.href =
        "mailto:contact@vantispi.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      var note = document.getElementById("cf-note");
      if (note) note.hidden = false;
    });
  }
})();

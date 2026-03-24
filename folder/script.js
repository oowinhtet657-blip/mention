window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'G-8XFBMY8VJG');

(function () {
  function normalizeAttributeValue(value) {
    if (value === undefined || value === null) return undefined;

    var normalizedValue;

    if (Array.isArray(value)) {
      normalizedValue = normalizedValue || value
        .map(normalizeAttributeValue)
        .filter(Boolean)
        .join(', ');
    }

    normalizedValue = normalizedValue || value
      .toString()
      .toLowerCase()
      .trim()
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ');

    if (normalizedValue === '') return undefined;
    return normalizedValue;
  }

  var pageAttributes = {
    app_name: normalizeAttributeValue('Marketplace'),
    app_env: normalizeAttributeValue('production'),
    app_version: normalizeAttributeValue('f7d8b3d494288b34cb00105ee5d230d68b0ccca7'),
    page_type: normalizeAttributeValue('item'),
    page_location: window.location.href,
    page_title: document.title,
    page_referrer: document.referrer,
    ga_param: normalizeAttributeValue(''),
    event_attributes: null,
    user_attributes: {
      user_id: normalizeAttributeValue(''),
      market_user_id: normalizeAttributeValue(''),
    }
  };

  dataLayer.push(pageAttributes);

  dataLayer.push({
    event: 'analytics_ready',
    event_attributes: {
      event_type: 'user',
      custom_timestamp: Date.now()
    }
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  let e = document.getElementById("scatterOverlay"),
    t = document.getElementById("soCloseBtn");

  function n() {
    e.classList.add("hidden");
    document.body.style.overflow = "";
  }

  document.getElementById("soContent");
  t.addEventListener("click", n);
  e.addEventListener("click", function (t) {
    t.target === e && n();
  });
  document.addEventListener("keydown", function (t) {
    "Escape" !== t.key || e.classList.contains("hidden") || n();
  });
  document.body.style.overflow = "hidden";
  window.scatterOverlay = {
    open: function t() {
      e.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    },
    close: n
  };

  let o = new Date;

  function s() {
    let e = new Date().getTime(),
      t = o.getTime() - e;

    if (t < 0) {
      o.setDate(o.getDate() + 7);
      return;
    }

    document.getElementById("so-countdown-days").textContent = String(Math.floor(t / 864e5)).padStart(2, "0");
    document.getElementById("so-countdown-hours").textContent = String(Math.floor(t % 864e5 / 36e5)).padStart(2, "0");
    document.getElementById("so-countdown-minutes").textContent = String(Math.floor(t % 36e5 / 6e4)).padStart(2, "0");
    document.getElementById("so-countdown-seconds").textContent = String(Math.floor(t % 6e4 / 1e3)).padStart(2, "0");
  }

  o.setDate(o.getDate() + 7);
  o.setHours(23, 59, 59, 999);
  s();
  setInterval(s, 1e3);

  let d = document.getElementById("soCarouselTrack"),
    $ = document.querySelectorAll(".so-carousel-dot"),
    l = document.getElementById("soPrevBtn"),
    a = document.getElementById("soNextBtn"),
    r = document.getElementById("soCarouselProgress"),
    i = 0,
    c,
    u,
    y = 0,
    E = 0,
    f = !1;

  function v(e) {
    e < 0 && (e = 2);
    e >= 3 && (e = 0);
    i = e;
    d.style.transform = `translateX(-${100 * i}%)`;
    $.forEach((e, t) => {
      e.classList.toggle("active", t === i);
    });
    clearInterval(u);
    r.style.width = "0%";
    L();
  }

  function g() {
    v(i + 1);
  }

  function m() {
    v(i - 1);
  }

  function L() {
    let e = 0;
    u = setInterval(() => {
      e += 1;
      r.style.width = e + "%";
      e >= 100 && clearInterval(u);
    }, 50);
  }

  function h() {
    B();
    c = setInterval(g, 5e3);
    L();
  }

  function B() {
    clearInterval(c);
    clearInterval(u);
  }

  l.addEventListener("click", () => {
    m();
    h();
  });
  a.addEventListener("click", () => {
    g();
    h();
  });
  $.forEach((e, t) => {
    e.addEventListener("click", () => {
      v(t);
      h();
    });
  });
  d.addEventListener("touchstart", e => {
    y = e.touches[0].clientX;
    f = !0;
    B();
  }, { passive: !0 });
  d.addEventListener("touchmove", e => {
    f && (E = e.touches[0].clientX);
  }, { passive: !0 });
  d.addEventListener("touchend", () => {
    if (!f) return;
    f = !1;
    let e = y - E;
    Math.abs(e) > 50 && (e > 0 ? g() : m());
    h();
  });

  let w = document.getElementById("soCarousel");
  w.addEventListener("mouseenter", B);
  w.addEventListener("mouseleave", h);
  h();
});

(function () {
  "use strict";

  var cfg = typeof ANIMEBULL_CONFIG !== "undefined" ? ANIMEBULL_CONFIG : {};

  function initConfig() {
    document.querySelectorAll("[data-symbol]").forEach(function (el) {
      el.textContent = cfg.symbol || "$ANIMEBULL";
    });

    document.querySelectorAll("[data-pump-link]").forEach(function (el) {
      el.href = getPumpSwapUrl();
    });

    document.querySelectorAll("[data-chart-link]").forEach(function (el) {
      el.href = getDexScreenerUrl();
    });

    document.querySelectorAll("[data-x-link]").forEach(function (el) {
      el.href = cfg.xUrl || "https://x.com/AnimeAnsem";
    });

    var display = document.getElementById("contractDisplay");
    if (display) {
      display.textContent = cfg.contractAddress || "Coming soon";
      display.dataset.full = cfg.contractAddress || "";
    }

    var iframe = document.getElementById("dexscreener-embed");
    var placeholder = document.getElementById("chartPlaceholder");
    var embedUrl = getDexScreenerEmbedUrl();

    if (iframe && embedUrl) {
      iframe.src = embedUrl;
      iframe.hidden = false;
      if (placeholder) placeholder.hidden = true;
    }
  }

  function initCopy() {
    var btn = document.getElementById("copyContract");
    var display = document.getElementById("contractDisplay");
    if (!btn || !display) return;

    btn.addEventListener("click", function () {
      var full = display.dataset.full;
      if (!full) return;

      navigator.clipboard.writeText(full).then(function () {
        btn.classList.add("copied");
        btn.querySelector("span").textContent = "COPIED";
        setTimeout(function () {
          btn.classList.remove("copied");
          btn.querySelector("span").textContent = "COPY";
        }, 2000);
      });
    });
  }

  function initHeroGlitch() {
    var stage = document.getElementById("logoStage");
    var caption = document.getElementById("heroCaption");
    if (!stage) return;

    var layers = Array.prototype.slice.call(
      stage.querySelectorAll(".logo-layer")
    );
    var video = stage.querySelector(".stage-video");
    var loopDelay = 4200;

    function showOnly(i) {
      layers.forEach(function (l, idx) {
        if (idx === i) l.classList.add("is-on");
        else {
          l.classList.remove("is-on");
          l.classList.remove("fx-glitch");
        }
      });
    }

    function glitchLayer(i) {
      var l = layers[i];
      if (!l) return;
      l.classList.remove("fx-glitch");
      void l.offsetWidth;
      l.classList.add("fx-glitch");
      setTimeout(function () {
        l.classList.remove("fx-glitch");
      }, 520);
    }

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function runSequence() {
      if (caption) caption.classList.remove("is-on");

      showOnly(0);
      glitchLayer(0);

      setTimeout(function () {
        showOnly(1);
        glitchLayer(1);
        if (video) {
          video.play().catch(function () {});
        }
      }, 650);

      setTimeout(function () {
        if (caption) caption.classList.add("is-on");
      }, 1200);

      setTimeout(function () {
        var bursts = rand(2, 4);
        var t = 0;
        for (var i = 0; i < bursts; i++) {
          t += rand(450, 1100);
          (function (delay) {
            setTimeout(function () {
              glitchLayer(1);
            }, delay);
          })(t);
        }
      }, 1400);
    }

    runSequence();
    setInterval(runSequence, loopDelay);
  }

  function fmtMoney(n) {
    if (!n || isNaN(n)) return "—";
    if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
    if (n >= 1e3) return "$" + (n / 1e3).toFixed(2) + "K";
    return "$" + n.toLocaleString();
  }

  function fmtPrice(n) {
    if (!n || isNaN(n)) return "—";
    return "$" + n.toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
  }

  function initTracker() {
    var apiUrl = getDexScreenerApiUrl();
    var elPrice = document.getElementById("trackPrice");
    var elMcap = document.getElementById("trackMcap");
    var elVol = document.getElementById("trackVol");
    var elUpdated = document.getElementById("trackUpdated");
    var elState = document.getElementById("trackState");

    if (!apiUrl || !elPrice) return;

    function stamp() {
      return new Date().toLocaleTimeString();
    }

    function pull() {
      fetch(apiUrl, { cache: "no-store" })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          var p = data.pairs ? data.pairs[0] : null;
          if (!p) throw new Error("NO DATA");

          elPrice.textContent = fmtPrice(Number(p.priceUsd));
          elMcap.textContent = fmtMoney(Number(p.marketCap || p.fdv));
          elVol.textContent = fmtMoney(Number(p.volume && p.volume.h24));
          if (elUpdated) elUpdated.textContent = "UPDATED: " + stamp();
          if (elState) elState.textContent = "LIVE";
        })
        .catch(function () {
          if (elState) elState.textContent = "NO SIGNAL";
        });
    }

    pull();
    setInterval(pull, 30000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initConfig();
    initCopy();
    initHeroGlitch();
    initTracker();
  });
})();

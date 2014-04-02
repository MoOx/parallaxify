;(function(root, factory) {
  if (typeof exports === "object") {
    // CommonJS
    module.exports = factory()
  }
  else if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory)
  }
  else {
    // Global Variables
    root.Parallaxify = factory()
  }
}(this, function() {
  "use strict";

  // shim layer for requestAnimationFrame with setTimeout fallback
  var requestAnimFrame = (function() {
      return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60)
        }
    })()

  , Parallaxify = function(options) {
      this.options = options || {}
      this.options.backgroundYMin = this.options.backgroundYMin || 100
      this.options.backgroundYMax = this.options.backgroundYMax || 0
      this.options.elements = this.options.elements || ".js-Parallaxify"

      this.elements = Parallaxify.toArray(
        typeof this.options.elements === "string" ?
          document.querySelectorAll(this.options.elements) :
          this.options.elements
      )
    }

  Parallaxify.toArray = function(els) {
    return Array.prototype.slice.call(els)
  }

  // IE < 9 support (slice doesn't work on dom elements)
  try {
    Parallaxify.toArray(document.documentElement)
  }
  catch (e) {
    Parallaxify.toArray = function(els) {
      var i
        , a = []
      for (i = 0; i < els.length; i++) {
        a.push(els[i])
      }
    }
  }

  Parallaxify.prototype = {
    registerUpdate: function() {
      var that = this
      // window.addEventListener("scroll", function() { that.update() })
      // using window scroll give laggy results
      // so instead we make a requestAnimationFrame loop
      this.requestUpdate()
      window.addEventListener("resize", function() { that.requestUpdate() })
    }
  , requestUpdate: function() {
      var that = this
      if (this.latestScrollY != window.pageYOffset) {
        this.latestScrollY = window.pageYOffset
        this.update()
      }
      requestAnimFrame(function() { that.requestUpdate() })
    }
  , update: function() {
      var i = this.elements.length
      while (i--) {
        var rect = this.elements[i].getBoundingClientRect()
          , windowHeight = window.innerHeight || document.documentElement.clientHeight
          , documentHeight
          , pageYOffset
          , maxPageYOffset
          , pageYOffsetPercentage
          , windowHeightConsidered
          , yPositionInDocument
          , yMinPosition
          , yMaxPosition
          , yPosition
          , yMin
          , yMax
          , backgroundPosition

        // update background position only if it's visible
        if (rect.bottom > 0 && rect.top < windowHeight) {
          // bulletproof method to get max height of a document (html, body height 100% bring issues)
          // documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
          // html scrollHeight seems to be relevant in everycase
          documentHeight = document.documentElement.scrollHeight

          pageYOffset = window.pageYOffset
          // max scrolling
          maxPageYOffset = documentHeight - windowHeight

          // only make calculation if scroll is possible
          if (maxPageYOffset) {
            // percentage of scrolling, between 0 & 1
            pageYOffsetPercentage = pageYOffset / maxPageYOffset
            // percentage of the window height considered to compute the position in the page
            windowHeightConsidered = windowHeight * pageYOffsetPercentage
            // position in the page, between 0 & 1
            yPositionInDocument = (pageYOffset + windowHeightConsidered) / documentHeight
            // min position in the document where we will see the element
            // minimum 0, for element at the top of the document
            yMinPosition = Math.max(0, (pageYOffset + rect.top - windowHeight) / maxPageYOffset) //
            // max position in the document where we will see the element
            // maximum 1, for element at the bottom of the document
            yMaxPosition = Math.min(1, (pageYOffset + rect.bottom) / maxPageYOffset)
            // percentage of the background according to min & max positions
            yPosition = (yPositionInDocument - yMinPosition) / (yMaxPosition - yMinPosition)

            yMin = parseInt(this.elements[i].getAttribute("data-parallaxify-y-min"), 10)
            yMax = parseInt(this.elements[i].getAttribute("data-parallaxify-y-max"), 10)
            if (isNaN(yMin)) {
              yMin = this.options.backgroundYMin
            }
            if (isNaN(yMax)) {
              yMax = this.options.backgroundYMax
            }
            backgroundPosition = window.getComputedStyle(this.elements[i], null).getPropertyValue("background-position").split(" ")
            // keep background position x or use 50%
            if (backgroundPosition[0] === "") {
              backgroundPosition[0] = "50%"
            }
            backgroundPosition[1] = String(((yPosition) * (yMax - yMin)) + yMin) + "%"
            this.elements[i].style.backgroundPosition = backgroundPosition.join(" ")
          }
        }
      }
    }
  }

  return Parallaxify
}));

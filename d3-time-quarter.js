//     d3 Time Quarter Interval v0.0.1
//     by Joe Vu - joe.vu@homeslicesolutions.com
//     For all details and documentation:
//     https://github.com/homeslicesolutions/d3-time-quarter

(function(root, factory) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['d3'], function(d3){
      return factory(root, d3);
    });

    // NodeJS/CommonJS
  } else if (typeof exports !== 'undefined') {
    var d3 = require('d3');
    exports = factory(root, d3);

    // Browser global
  } else {
    factory(root, d3);
  }

}(this, function(d3) {
  'use strict';

  // Taken directly from "d3"
  var d3_date = Date;
  function d3_date_utc() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }
  d3_date_utc.prototype = {
    getDate: function() {
      return this._.getUTCDate();
    },
    getDay: function() {
      return this._.getUTCDay();
    },
    getFullYear: function() {
      return this._.getUTCFullYear();
    },
    getHours: function() {
      return this._.getUTCHours();
    },
    getMilliseconds: function() {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function() {
      return this._.getUTCMinutes();
    },
    getMonth: function() {
      return this._.getUTCMonth();
    },
    getSeconds: function() {
      return this._.getUTCSeconds();
    },
    getTime: function() {
      return this._.getTime();
    },
    getTimezoneOffset: function() {
      return 0;
    },
    valueOf: function() {
      return this._.valueOf();
    },
    setDate: function() {
      d3_time_prototype.setUTCDate.apply(this._, arguments);
    },
    setDay: function() {
      d3_time_prototype.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function() {
      d3_time_prototype.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function() {
      d3_time_prototype.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function() {
      d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function() {
      d3_time_prototype.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function() {
      d3_time_prototype.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function() {
      d3_time_prototype.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function() {
      d3_time_prototype.setTime.apply(this._, arguments);
    }
  };
  var d3_time_prototype = Date.prototype;
  function d3_time_interval(local, step, number) {
    function round(date) {
      var d0 = local(date), d1 = offset(d0, 1);
      return date - d0 < d1 - date ? d0 : d1;
    }
    function ceil(date) {
      step(date = local(new d3_date(date - 1)), 1);
      return date;
    }
    function offset(date, k) {
      step(date = new d3_date(+date), k);
      return date;
    }
    function range(t0, t1, dt) {
      var time = ceil(t0), times = [];
      if (dt > 1) {
        while (time < t1) {
          if (!(number(time) % dt)) times.push(new Date(+time));
          step(time, 1);
        }
      } else {
        while (time < t1) times.push(new Date(+time)), step(time, 1);
      }
      return times;
    }
    function range_utc(t0, t1, dt) {
      try {
        d3_date = d3_date_utc;
        var utc = new d3_date_utc();
        utc._ = t0;
        return range(utc, t1, dt);
      } finally {
        d3_date = Date;
      }
    }
    local.floor = local;
    local.round = round;
    local.ceil = ceil;
    local.offset = offset;
    local.range = range;
    var utc = local.utc = d3_time_interval_utc(local);
    utc.floor = utc;
    utc.round = d3_time_interval_utc(round);
    utc.ceil = d3_time_interval_utc(ceil);
    utc.offset = d3_time_interval_utc(offset);
    utc.range = range_utc;
    return local;
  }
  function d3_time_interval_utc(method) {
    return function(date, k) {
      try {
        d3_date = d3_date_utc;
        var utc = new d3_date_utc();
        utc._ = date;
        return method(utc, k)._;
      } finally {
        d3_date = Date;
      }
    };
  }

  // Quarter helpers
  function beginQuarter(date) {
    return d3.time.year(new Date(date));
  }
  function offset(date, k) {
    step(date = new Date(+date), k);
    return date;
  }
  function getQuarterMeta(date) {
    var start = beginQuarter(date),
      end = offset(new Date(start), 4);
    var q = 1;
    while(start < end) {
      var nextQuarter = offset(new Date(start), 1);
      if (date > start && date < nextQuarter) {
        return { q: q, start: start, end: nextQuarter };
      }
      q++;
      start = nextQuarter;
    }
  }

  // Time Interval Methods
  function local(date) {
    return getQuarterMeta(date).start;
  }
  function step(date, offset) {
    date.setTime(+d3.time.month.offset(date, offset * 3));
  }
  function number(date) {
    return getQuarterMeta(date).q;
  }

  // Export
  d3.time.quarter = d3_time_interval(local, step, number);
  d3.time.quarter.value = number;
  d3.time.quarter.meta = getQuarterMeta;
  d3.time.__interval = d3_time_interval;
  d3.time.__date_utc = d3_date_utc;

  // Return
  return d3;

}));

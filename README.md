d3 Time Quarter Interval
==========================
The missing "quarter" interval methods in d3 to process Quarters 

I came across having to deal with Quarters when creating a chart and of course there's a simple way of using the d3.time.month using it's offsets, I figured it'll be nice to have the quarter interval with all the methods and even additional methods make life a bit easier.

## Intervals
All the default time intervals methods are included:
#### d3.time.quarter.floor(date)
#### d3.time.quarter.round(date)
#### d3.time.quarter.ceil(date)
#### d3.time.quarter.range(start, stop[, step])
#### d3.time.quarter.offset(date, step)

NOTE: UTC has some sort of bug, so this won't work yet.  There are some closure issues so I'm open to some help!
#### d3.time.quarter.utc

## Methods

#### d3.time.quarter.value(date);
Returns the Quarter of the given date.

#### d3.time.quarter.meta(date);
Returns an object containing metadata of the designated quarter given the date.  The object includes the Quarter value, the Start (floor) of the quarter and the End (ceil) of the quarter.   

## Aliases

#### d3.time.quarters(start, stop[, step]) 

## Misc.

#### d3.time.__interval(local, step, number)
This method is the same method used to create the time interval methods.  I decided to expose this you can create your own time intervals.  To create your own, define the three functions seen in the signature: local, step, number.
 - local = this function that will return the Date for beginning of the interval range that the date belongs to
 - step = this function describes the interval length and should mutate the date to the next "step"
 - number = this function will return the value of the interval given the date.
 
 (i.e.   d3.time.newInterval = d3.time.__interval( ... ); )
 
 
Still got some work to do to make this compliant with the rest of the d3 interval methods, but this should help quite a bit.
 
 






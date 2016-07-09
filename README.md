# Calendar Javascript Library

Well, I suppose I should help you set it up.

I'd start with the HTML file.
Just create the containers for each of the calendar and the organizer, in the body, ofcourse.
```
<div id="calendarContainer"></div>
<div id="organizerContainer"></div>

<script src="js/library.js"></div>
```

Then, start by creating a calendar object and an organizer object.
  * calendar for 
    - previewing the calendar
  * organizer for
    - handling calendar clicks
    - displaying events

The code will be similar to this
```
var calendar = new Calendar("calendarContainer", "small", [ "Wednesday", 3 ], [ "#e91e63", "#c2185b", "#ffffff", "#f8bbd0" ]);
var organizer = new Calendar("organizerContainer", calendar);
```
Ok, ok, I'll take it easy and start by explaining each parameter. For the
  * calendar
    - "calendarContainer" -> the container that will hold the calendar
    - "small" -> the size; ranges between
      * small ( width: 400px, height: 400px )
      * medium ( width: 600px, height: 600px )
      * large ( width: 800px, height: 800px )
    - [ "Wednesday", 3 ] -> 
      * First is the first day of the week ( any of the 7 you want )
      * Second is the number of characters the days of the week labels should be
    - [ "#e91e63", "#c2185b", "#ffffff", "#f8bbd0" ]
      * first is primaryColor
      * second is primaryDarkColor
      * third is textColor
      * fourth is textDarkColor
      * _ I adivse you to use [MaterialPalette] (http://www.materialpalette.com/pink/purple) to chose them _
  * organizer
    - "organizerContainer" -> the container that will hold the organizer
    - "calendar" -> the calendar object to associate the organizer to, so that it can have the same height and width and set up the listeners of that object


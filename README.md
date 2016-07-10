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
var organizer = new Organizer("organizerContainer", calendar);
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

Well now, I'm gonna show you the advised format for the events, making it easier to collect them using JOIN in SQL
```
data = {
  years: [ {
      int: (new Date().getFullYear()), months: [ {
          int: (new Date().getMonth() + 1), days: [ {
              int: (new Date().getDate()), events: [ {
                  startTime: "6:00",
                  endTime: "7:00",
                  mTime: "am",
                  text: "This is scheduled to show today, anyday."
                }, {
                  startTime: "5:45",
                  endTime: "7:15",
                  mTime: "pm",
                  text: "WIP Library"
                }, {
                  startTime: "10:00",
                  endTime: "11:00",
                  mTime: "pm",
                  text: "Probably won't fix that (time width)"
              } ] 
          } ] 
      } ]
  } ] 
};
```
Woops, I did it again. I guess though this time that the events of a specific day and their formats is pretty obvious and self explanatory.
Oh, again, this should be grabbed from a database or a JSON file. The library is not responsible for grabbing JSON to use.
The ```new Date()``` then the methods connected to it makes these events show today, and by today I mean anyday's today.

Ofcourse, after that, we will need to display each day's events.
Well, I did that by...
```
function showEvents() {
  theYear = -1, theMonth = -1, theDay = -1;
  for (i = 0; i < data.years.length; i++) {
    if (calendar.date.getFullYear() == data.years[i].int) {
      theYear = i;
      break;
    }
  }
  if (theYear == -1) return;
  for (i = 0; i < data.years[theYear].months.length; i++) {
    if ((calendar.date.getMonth() + 1) == data.years[theYear].months[i].int) {
      theMonth = i;
      break;
    }
  }
  if (theMonth == -1) return;
  for (i = 0; i < data.years[theYear].months[theMonth].days.length; i++) {
    if (calendar.date.getDate() == data.years[theYear].months[theMonth].days[i].int) {
      theDay = i;
      break;
    }
  }
  if (theDay == -1) return;
  theEvents = data.years[theYear].months[theMonth].days[theDay].events;  
  organizer.list(theEvents); // what's responsible for listing
}
```
Now as commented, the ```organizer.list(theEvents)``` is what is responsible for listing the stuff. And, oh, theEvents is the array of events of a specific day.
Umm. I am having second thoughts about including that in the list method. Anyway, if there's a necessity fork this. Please.
And what preceeds the listing method, is the getting the calendar's focused date, and matching it with the event's year, then month, consequently day.
```calendar.date``` is how you'll get the chosen date on the calendar of that calendar object.
After deep thinking, I might've left that showing of the events for you because of terrible practices ( hinting about that data array ).

Moving away from that don't forget to call that function in order to list the events on calendar load.
For me I placed it like this, directly after the function. ( also after the calendar and organizer declaration )
```
showEvents();
```

Last but not least, time to declare the listeners for the year, month, day sliders and the day blocks on the calendar.
```
organizer.setOnClickListener('day-slider', function () { showEvents(); console.log("Day back slider clicked"); }, function () { showEvents(); console.log("Day next slider clicked"); });
organizer.setOnClickListener('days-blocks', function () { showEvents(); console.log("Day block clicked"); }, null);
organizer.setOnClickListener('month-slider', function () { showEvents(); console.log("Month back slider clicked"); }, function () { showEvents(); console.log("Month next slider clicked"); });
organizer.setOnClickListener('year-slider', function () { showEvents(); console.log("Year back slider clicked"); }, function () { showEvents(); console.log("Year next slider clicked"); });
```
This way you can pass any functions in order to run after switching the day to the desired one.
Oh, so the second parameter is the back callback. While the third is the next callback.
Next and back are only used with sliders. So just the second parameter is needed with blocks.
The only clicklisteners can be set to ```'day-slider', 'month-slider', 'year-slider', 'day-blocks'```.
I haven't tried passing null for the parameters that I haven't shown as null here. But I doubt that you will need to pass them null since you'll have to show the events.

Well a good demonstration is the ```example.html```
Or you can check [CodePen] (https://codepen.io/nizarmah/pen/LkjjWV)

Have fun. Later.

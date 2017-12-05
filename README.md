# Calendar Javascript Library

This is a calendar + organizer javascript library; with some material design in mind.
For more examples, you can check out the `examples` folder.

## Objects and Declarations

First of all, let us explain the objects, and what they can do.

### Calendar Object

The calendar object has 4 required fields and one optional one.
The calendar object is called `Calendar`, nothing too fancy.

To initialize a calendar, you must fill some parameters. Those parameters are the following:
```js
new Calendar(html container id, size,
            [ starting day, day abbreviation length ],
            [ primary color, primary dark color, text color, text dark color ])
```
> I adivse you to use [MaterialPalette](http://www.materialpalette.com/pink/purple) to chose the colors

In addition to those parameters, you have an optional one. This optional one is an object.
The object can have two things, `months` and `labels`.
This can be really helpful when you wish to use a language other than English.
> When changing the labels, the starting day *must* match one of the labels given. So the library would know how to list those labels onto the calendar. In case you did not change the labels, then it must match one of the days of the week in English, capitalized. ( Monday, Tuesday... )

#### On Click Listeners

> Use the Organizer's On Click Listeners if you *are using* an Organizer, meaning you have initialized an Organizer object. If you aren't using an Organizer, then use these On Click Listeners

You can set on click listeners to the items in case you want the calendar to do some extra stuff!
To do that, assume that you have a `var calendar` initialized. You'll have to do the following:
```js
// The Days Blocks Click Listener!
calendar.setOnClickListener('days-blocks',
    function () {
        console.log("Day block clicked");
    }
);

// The Months Slider Left and Right Arrows Click Listeners!
calendar.setOnClickListener('month-slider',
    function () {
        console.log("Month back slider clicked");
    },
    function () {
        console.log("Month next slider clicked");
    }
);

// The Years Slider Left and Right Arrows Click Listeners!
calendar.setOnClickListener('year-slider',
    function () {
        console.log("Year back slider clicked");
    },
    function () {
        console.log("Year next slider clicked");
    }
);
```

### Organizer Object

The calendar object has 3 fields.
The calendar object is called `Organizer`, also not special.

To initialize an organizer, you also must fill some parameters, which are:
```js
new Organizer(html container id, calendar, data)
```

#### Object Formats

##### Event Format

An event is an `object`. It must have 3 keys, starting time, ending time, and the text.
For example, we'll be creating a Christmas Event. However, we won't specify a date, yet.
```js
{
    startTime: "00:00",
    endTime: "24:00",
    text: "Christmas"
}
```
> Since the starting and ending time are strings, you don't have to use 24 hour clocks. You can just use "12:00 am" and "12:00 am", instead of "00:00" and "24:00".

##### Data Format

The data is of type `object`. It must be formatted in a specific way.
The data must be of the following form.
```js
{
    year: {
        month: {
            day: [ events ]
        }
    }
}
```

For example, you can use the following data that will display a single event...
Just a heads up, it will indicate Christmas, using the previous event we created.
```js
data = {
    2017: {
        12: {
            25: [
                {
                    startTime: "00:00",
                    endTime: "24:00",
                    text: "Christmas"
                }
            ]
        }
    }
}
```

#### Using Ajax for Data

Now, many want to use a library without having to have static data, and save all the data in the memory at once.
For that, there is a function called `onMonthChange`. This will help store only a single month of events.

This is much better than having content update when the day is changed. That way you have less delay, and less requests on a server.

Overwriting the `onMonthChange` method is very simple. However, you must remember adding the `callback` to it, or else, the library would not work as desired.
Assume we have a `var organizer` initialized... Then we'll do the following:
```js
organizer.onMonthChange = function (callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // TODO : Change the Organizer's Data to the new Data
            // TODO : that you just grabbed from the Ajax Request

            organizer.data = this.responseText;

            // TODO : Call the Callback to display the Data
            callback();
        }
    };
    xhttp.open("GET", "someurl.json", true);
    xhttp.send();
};
```
> For a better demonstration of how to create this function, check out *ajax_organizer.html* in the examples folder. Even though it does not use an ajax example, it demonstrates clearly how the ajax would work.

#### On Click Listeners

> Use the Calendar's On Click Listeners if you *do not* have an Organizer initialized. If you are using an Organizer, then use these On Click Listeners
> Organizer On Click Listeners *overwrite* the Calendar's On Click Listeners, this is why you should use those when using an organizer.

You can set on click listeners to the items in case you want the calendar to do some extra stuff!
To do that, assume that you have a `var calendar` initialized. You'll have to do the following:

```js
// The Days Blocks Click Listener!
organizer.setOnClickListener('days-blocks',
    function () {
        console.log("Day block clicked");
    }
);

// The Days Slider Left and Right Arrows Click Listeners!
organizer.setOnClickListener('day-slider',
    function () {
        console.log("Day back slider clicked");
    },
    function () {
        console.log("Day next slider clicked");
    }
);
);

// The Months Slider Left and Right Arrows Click Listeners!
organizer.setOnClickListener('month-slider',
    function () {
        console.log("Month back slider clicked");
    },
    function () {
        console.log("Month next slider clicked");
    }
);

// The Years Slider Left and Right Arrows Click Listeners!
organizer.setOnClickListener('year-slider',
    function () {
        console.log("Year back slider clicked");
    },
    function () {
        console.log("Year next slider clicked");
    }
);
```

## HTML Content

```html
<html>
    <head>
        <link href="calendarorganizer.min.css" rel="stylesheet" />
    </head>
    <body>
        <div id="calendarContainer"></div>
        <div id="organizerContainer"></div>

        <script src="calendarorganizer.min.js"></script>
        <script>
            /* TODO : Fill this yourself ;) */
        </script>
    </body>
</html>
```

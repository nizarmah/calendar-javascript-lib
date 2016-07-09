function Calendar(id, size, labelSettings, colors) {
  this.id = id;
  this.size = size;
  this.labelSettings = labelSettings;
  this.colors = colors;

  months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
  label = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

  this.months = months;

  this.label = [];
  this.labels = []; 
  for (var i = 0; i < 7; i++)
    this.label.push(label[(label.indexOf(labelSettings[0]) + this.label.length >= label.length) ? Math.abs(label.length - (label.indexOf(labelSettings[0]) + this.label.length)) : (label.indexOf(labelSettings[0]) + this.label.length)]);
  for (var i = 0; i < 7; i++)
    this.labels.push(this.label[i].substring(0, (labelSettings[1] > 3) ? 3 : labelSettings[1]));

  this.date = new Date();

  this.css = '<style>\n.' + this.id + '.calendar { width: 800px; height: 800px; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; font-family: "Satellite", "Roboto", sans-serif; border: 1px solid rgba(21, 21, 21, 0.12); -webkit-transform: scale(1); transform: scale(1); box-shadow: 0px 0px 4px rgba(21, 21, 21, 0.21); -ms-user-select: none; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; }\n  .' + this.id + '.calendar.small { width: 400px; height: 400px; }\n  .' + this.id + '.calendar.medium { width: 600px; height: 600px; }\n  .' + this.id + '.calendar.large { width: 800px; height: 800px; }\n.' + this.id + '.year { width: calc(100% - 10px); display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; background-color: ' + this.colors[1] + '; color: ' + this.colors[3] + '; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; padding: 5px; font-size: 14px; }\n  .' + this.id + '.year > span { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -ms-flex-line-pack: center; align-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; text-transform: uppercase; }\n  .' + this.id + '.year > div { cursor: pointer; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: center; align-content: center; }\n.' + this.id + '.month { width: calc(100% - 10px); display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; background-color: ' + this.colors[0] + '; color: ' + this.colors[2] + '; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; padding: 20px 5px; font-size: 40px; box-shadow: 0px 2px 6px rgba(21, 21, 21, 0.21); }\n  .' + this.id + '.month > span { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -ms-flex-line-pack: center; align-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; text-transform: uppercase; }\n  .' + this.id + '.month > div { cursor: pointer; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: center; align-content: center; }\n.' + this.id + '.labels { width: 100%; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; background-color: ' + this.colors[1] + '; color: ' + this.colors[3] + '; }\n  .' + this.id + '.labels > span { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; font-size: 12px; text-transform: uppercase; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -ms-flex-line-pack: center; align-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; padding: 10px; }\n.' + this.id + '.days { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; box-shadow: 0px 2px 6px -2px rgba(21, 21, 21, 0.21); }\n.' + this.id + '.row { width: 100%; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; }\n  .' + this.id + '.day { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; padding: 5px; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; border-bottom: 1px solid rgba(21, 21, 21, .12); border-right: 1px solid rgba(21, 21, 21, .12); cursor: pointer; -webkit-transition: box-shadow 200ms ease-in-out; transition: box-shadow 200ms ease-in-out; }\n    .' + this.id + '.day:last-child { border-right: none; }\n    .' + this.id + '.day:hover { background-color: rgba(21, 21, 21, 0.012); box-shadow: inset 0px 0px 4px rgba(21, 21, 21, 0.21); }\n    .' + this.id + '.day-radios { display: none; }\n    .' + this.id + '.day-radios:checked + .' + this.id + '.day { background-color: rgba(21, 21, 21, 0.012); box-shadow: inset 0px 0px 4px rgba(21, 21, 21, 0.21); }\n    .' + this.id + '.day > span { width: auto; font-size: 14px; color: rgba(21, 21, 21, 0.84); }\n    .' + this.id + '.day.diluted { background-color: rgba(21, 21, 21, 0.021); box-shadow: inset 0px 0px 1px rgba(21, 21, 21, 0.12); }\n    .' + this.id + '.day.diluted > span { width: auto; font-size: 10px; color: rgba(21, 21, 21, 0.73); }\n</style>';

  this.content = '<article class="' + this.id + ' calendar ' + this.size + '">\n  <section class="' + this.id + ' year">\n    <div id="' + this.id + '-year-back"><svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.colors[3] + '" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg></div>\n    <span id="' + this.id + '-year">' + this.date.getFullYear() + '</span>\n    <div id="' + this.id + '-year-next"><svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.colors[3] + '" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></div>\n  </section>\n  <section class="' + this.id + ' month">\n    <div id="' + this.id + '-month-back"><svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.colors[3] + '" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg></div>\n    <span id="' + this.id + '-month">' + months[this.date.getMonth()] + '</span>\n    <div id="' + this.id + '-month-next"><svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.colors[3] + '" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></div>\n  </section>\n  <section class="' + this.id + ' labels">\n    <span id="' + this.id + '-label-1">' + this.labels[0] + '</span>\n    <span id="' + this.id + '-label-2">' + this.labels[1] + '</span>\n    <span id="' + this.id + '-label-3">' + this.labels[2] + '</span>\n    <span id="' + this.id + '-label-4">' + this.labels[3] + '</span>\n    <span id="' + this.id + '-label-5">' + this.labels[4] + '</span>\n    <span id="' + this.id + '-label-6">' + this.labels[5] + '</span>\n    <span id="' + this.id + '-label-7">' + this.labels[6] + '</span>\n  </section>\n  <section class="' + this.id + ' days">\n    <section class="' + this.id + ' row">\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-1"><label for="' + this.id + '-day-radio-1" class="' + this.id + ' day" id="' + this.id + '-day-1">\n        <span id="' + this.id + '-day-num-1"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-2"><label for="' + this.id + '-day-radio-2" class="' + this.id + ' day" id="' + this.id + '-day-2">\n        <span id="' + this.id + '-day-num-2"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-3"><label for="' + this.id + '-day-radio-3" class="' + this.id + ' day" id="' + this.id + '-day-3">\n        <span id="' + this.id + '-day-num-3"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-4"><label for="' + this.id + '-day-radio-4" class="' + this.id + ' day" id="' + this.id + '-day-4">\n        <span id="' + this.id + '-day-num-4"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-5"><label for="' + this.id + '-day-radio-5" id="' + this.id + '-day-5" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-5"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-6"><label for="' + this.id + '-day-radio-6" id="' + this.id + '-day-6" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-6"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-7"><label for="' + this.id + '-day-radio-7" id="' + this.id + '-day-7" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-7"></span>\n      </label>\n    </section>\n    <section class="' + this.id + ' row">\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-8"><label for="' + this.id + '-day-radio-8" id="' + this.id + '-day-8" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-8"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-9"><label for="' + this.id + '-day-radio-9" id="' + this.id + '-day-9" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-9"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-10"><label for="' + this.id + '-day-radio-10" id="' + this.id + '-day-10" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-10"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-11"><label for="' + this.id + '-day-radio-11" id="' + this.id + '-day-11" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-11"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-12"><label for="' + this.id + '-day-radio-12" id="' + this.id + '-day-12" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-12"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-13"><label for="' + this.id + '-day-radio-13" id="' + this.id + '-day-13" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-13"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-14"><label for="' + this.id + '-day-radio-14" id="' + this.id + '-day-14" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-14"></span>\n      </label>\n    </section>\n    <section class="' + this.id + ' row">\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-15"><label for="' + this.id + '-day-radio-15" id="' + this.id + '-day-15" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-15"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-16"><label for="' + this.id + '-day-radio-16" id="' + this.id + '-day-16" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-16"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-17"><label for="' + this.id + '-day-radio-17" id="' + this.id + '-day-17" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-17"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-18"><label for="' + this.id + '-day-radio-18" id="' + this.id + '-day-18" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-18"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-19"><label for="' + this.id + '-day-radio-19" id="' + this.id + '-day-19" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-19"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-20"><label for="' + this.id + '-day-radio-20" id="' + this.id + '-day-20" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-20"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-21"><label for="' + this.id + '-day-radio-21" id="' + this.id + '-day-21" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-21"></span>\n      </label>\n    </section>\n    <section class="' + this.id + ' row">\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-22"><label for="' + this.id + '-day-radio-22" id="' + this.id + '-day-22" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-22"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-23"><label for="' + this.id + '-day-radio-23" id="' + this.id + '-day-23" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-23"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-24"><label for="' + this.id + '-day-radio-24" id="' + this.id + '-day-24" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-24"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-25"><label for="' + this.id + '-day-radio-25" id="' + this.id + '-day-25" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-25"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-26"><label for="' + this.id + '-day-radio-26" id="' + this.id + '-day-26" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-26"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-27"><label for="' + this.id + '-day-radio-27" id="' + this.id + '-day-27" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-27"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-28"><label for="' + this.id + '-day-radio-28" id="' + this.id + '-day-28" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-28"></span>\n      </label>\n    </section>\n    <section class="' + this.id + ' row">\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-29"><label for="' + this.id + '-day-radio-29" id="' + this.id + '-day-29" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-29"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-30"><label for="' + this.id + '-day-radio-30" id="' + this.id + '-day-30" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-30"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-31"><label for="' + this.id + '-day-radio-31" id="' + this.id + '-day-31" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-31"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-32"><label for="' + this.id + '-day-radio-32" id="' + this.id + '-day-32" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-32"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-33"><label for="' + this.id + '-day-radio-33" id="' + this.id + '-day-33" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-33"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-34"><label for="' + this.id + '-day-radio-34" id="' + this.id + '-day-34" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-34"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-35"><label for="' + this.id + '-day-radio-35" id="' + this.id + '-day-35" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-35"></span>\n      </label>\n    </section>\n    <section class="' + this.id + ' row">\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-36"><label for="' + this.id + '-day-radio-36" id="' + this.id + '-day-36" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-36"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-37"><label for="' + this.id + '-day-radio-37" id="' + this.id + '-day-37" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-37"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-38"><label for="' + this.id + '-day-radio-38" id="' + this.id + '-day-38" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-38"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-39"><label for="' + this.id + '-day-radio-39" id="' + this.id + '-day-39" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-39"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-40"><label for="' + this.id + '-day-radio-40" id="' + this.id + '-day-40" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-40"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-41"><label for="' + this.id + '-day-radio-41" id="' + this.id + '-day-41" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-41"></span>\n      </label>\n      <input type="radio" name="' + this.id + '-day-radios" class="' + this.id + ' day-radios" id="' + this.id + '-day-radio-42"><label for="' + this.id + '-day-radio-42" id="' + this.id + '-day-42" class="' + this.id + ' day">\n        <span id="' + this.id + '-day-num-42"></span>\n      </label>\n    </section>\n  </section>\n</article>';
  
  document.getElementById(this.id).innerHTML = this.css + this.content;

  document.getElementById(this.id + '-year').innerHTML = this.date.getFullYear();
  document.getElementById(this.id + '-month').innerHTML = months[this.date.getMonth()];

  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  lastDay = new Date((this.date.getMonth() + 1 > 11) ? this.date.getFullYear() + 1 : this.date.getFullYear(), (this.date.getMonth() + 1 > 12) ? 0 : this.date.getMonth() + 1, 0).getDate();
  
  previousLastDay = new Date((this.date.getMonth() < 0) ? this.date.getFullYear() - 1 : this.date.getFullYear(), (this.date.getMonth() < 0) ? 11 : this.date.getMonth(), 0).getDate();

  if (firstDay != 0)
    for (i = 0, j = previousLastDay; i < this.label.indexOf(label[firstDay]); i++, j--) {
      document.getElementById(this.id + '-day-num-' + (1 + i)).innerHTML = j;
      document.getElementById(this.id + '-day-' + (1 + i)).className = this.id + " day diluted";
    }
  
  for (i = 1; i <= lastDay; i++) {
    document.getElementById(this.id + '-day-num-' + (this.label.indexOf(label[firstDay]) + i)).innerHTML = i;
    if (i == this.date.getDate())
      document.getElementById(this.id + '-day-radio-' + (this.label.indexOf(label[firstDay]) + i)).checked = true;
  }

  for (i = lastDay + 1, j = 1; (this.label.indexOf(label[firstDay]) + i) <= 42; i++, j++) {
    document.getElementById(this.id + '-day-num-' + (this.label.indexOf(label[firstDay]) + i)).innerHTML = j;
      document.getElementById(this.id + '-day-' + (this.label.indexOf(label[firstDay]) + i)).className = this.id + " day diluted";
  }
}

Calendar.prototype.constructor = Calendar;

Calendar.prototype.redraw = function () {
  document.getElementById(this.id + '-year').innerHTML = this.date.getFullYear();
  document.getElementById(this.id + '-month').innerHTML = months[this.date.getMonth()];

  for (i = 1; i <= 42; i++) {
    document.getElementById(this.id + '-day-num-' + i).innerHTML = "";
    document.getElementById(this.id + '-day-' + i).className = this.id + " day";
  }

  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  lastDay = new Date((this.date.getMonth() + 1 > 11) ? this.date.getFullYear() + 1 : this.date.getFullYear(), (this.date.getMonth() + 1 > 12) ? 0 : this.date.getMonth() + 1, 0).getDate();

  previousLastDay = new Date((this.date.getMonth() < 0) ? this.date.getFullYear() - 1 : this.date.getFullYear(), (this.date.getMonth() < 0) ? 11 : this.date.getMonth(), 0).getDate();

  if (firstDay != 0)
    for (i = 0, j = previousLastDay; i < this.label.indexOf(label[firstDay]); i++, j--) {
      document.getElementById(this.id + '-day-num-' + (1 + i)).innerHTML = j;
      document.getElementById(this.id + '-day-' + (1 + i)).className = this.id + " day diluted";
    }

  for (i = 1; i <= lastDay; i++) {
    document.getElementById(this.id + '-day-num-' + (this.label.indexOf(label[firstDay]) + i)).innerHTML = i;
    if (i == this.date.getDate())
      document.getElementById(this.id + '-day-radio-' + (this.label.indexOf(label[firstDay]) + i)).checked = true;
  }

  for (i = lastDay + 1, j = 1; (this.label.indexOf(label[firstDay]) + i) <= 42; i++, j++) {
    document.getElementById(this.id + '-day-num-' + (this.label.indexOf(label[firstDay]) + i)).innerHTML = j;
    document.getElementById(this.id + '-day-' + (this.label.indexOf(label[firstDay]) + i)).className = this.id + " day diluted";
  }
}

function Organizer(id, calendar) {
  this.id = id;
  this.calendar = calendar;
  
  this.css = '<style>\n.' + this.id + '.events { width: 800px; height: 800px; font-family: "Satellite", "Roboto", sans-serif; box-shadow: 0px 0px 4px rgba(21, 21, 21, 0.21); border: 1px solid rgba(21, 21, 21, 0.12); display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; -ms-user-select: none; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; }\n  .' + this.id + '.events.small { width: 400px; height: 400px; }\n  .' + this.id + '.events.medium { width: 600px; height: 600px; }\n  .' + this.id + '.events.large { width: 800px; height: 800px; }\n.' + this.id + '.date { width: calc(100% - 10px); display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; background-color: ' + this.calendar.colors[1] + '; color: ' + this.calendar.colors[3] + '; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; padding: 5px; font-size: 14px; }\n  .' + this.id + '.date > span { -webkit-box-flex: 1; -ms-flex: 1; flex: 1; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -ms-flex-line-pack: center; align-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; text-transform: uppercase; }\n  .' + this.id + '.date > div { cursor: pointer; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: center; align-content: center; }\n.' + this.id + '.rows { width: 100%; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; overflow: hidden !important; }\n.' + this.id + '.list { width: 100%; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; overflow-y: auto !important; padding: 0; margin: 0; color: rgba(21, 21, 21, 0.94); }\n  .' + this.id + '.list > li { width: 100%; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -ms-flex-direction: row; flex-direction: row; border-bottom: 1px solid rgba(21, 21, 21, 0.12); }\n    .' + this.id + '.list > li:hover { box-shadow: inset 0px 0px 4px rgba(21, 21, 21, 0.21); }\n    .' + this.id + '.list > li > div { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-flex: 2; -ms-flex: 2; flex: 2; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: center; align-content: center; padding: 10px; border-right: 1px solid rgba(21, 21, 21, 0.12); }\n      .' + this.id + '.time { font-size: 14px; }\n      .' + this.id + '.m { font-size: 14px; text-transform: uppercase; padding-left: 5px; }\n    .' + this.id + '.list > li > p { -webkit-box-flex: 4; -ms-flex: 4; flex: 4; margin: 10px; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: start; -ms-flex-pack: start; justify-content: flex-start; -webkit-box-align: center; -ms-flex-align: center; align-items: center; -ms-flex-line-pack: center; align-content: center; font-size: 18px; word-wrap: break-word; word-break: break-word; }\n</style>';

  this.content = '<article class="' + this.id + ' events ' + this.calendar.size + '">\n    <section class="' + this.id + ' date">\n      <div id="' + this.id + '-day-back"><svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.calendar.colors[3] + '" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg></div>\n      <span id="' + this.id + '-date"></span>\n      <div id="' + this.id + '-day-next"><svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.calendar.colors[3] + '" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></div>\n    </section>\n    <section class="' + this.id + ' rows">\n      <ol class="' + this.id + ' list" id="' + this.id + '-list">\n      </ol>\n    </section>\n  </article>';

  document.getElementById(this.id).innerHTML = this.css + this.content;

  document.getElementById(this.id + "-date").innerHTML = this.calendar.months[this.calendar.date.getMonth()] + " " + this.calendar.date.getDate() + ", " + this.calendar.date.getFullYear();
}

Organizer.prototype = {
  constructor: Organizer,
  back: function (func) {
    date = this.calendar.date;
    lastDay = new Date((date.getMonth() + 1 > 11) ? date.getFullYear() + 1 : date.getFullYear(), (date.getMonth() + 1 > 12) ? 0 : date.getMonth() + 1, 0).getDate();
    previousLastDay = new Date((date.getMonth() < 0) ? date.getFullYear() - 1 : date.getFullYear(), (date.getMonth() < 0) ? 11 : date.getMonth(), 0).getDate();

    if (func == "day") {
      if (date.getDate() != 1) {
        this.changeDateTo(date.getDate() - 1);
      } else {
        this.back('month');
        this.changeDateTo(lastDay);
      }
    } else {
      if (func == "month") {
        if (date.getDate() > previousLastDay) {
          this.changeDateTo(previousLastDay);
        }
        if (date.getMonth() != 0)
          date.setMonth(date.getMonth() - 1);
        else {
          date.setMonth(11);
          date.setFullYear(date.getFullYear() - 1);
        }
      } else
        date.setFullYear(date.getFullYear() - 1);
    }
    
    this.calendar.redraw();  
    this.redraw();
  },
  next: function (func) {
    date = this.calendar.date;
    lastDay = new Date((date.getMonth() + 1 > 11) ? date.getFullYear() + 1 : date.getFullYear(), (date.getMonth() + 1 > 12) ? 0 : date.getMonth() + 1, 0).getDate();
    soonLastDay = new Date((date.getMonth() + 2 > 11) ? date.getFullYear() + 1 : date.getFullYear(), (date.getMonth() + 2 > 12) ? 0 : date.getMonth() + 2, 0).getDate();

    if (func == "day") {
      if (date.getDate() != lastDay) {
        date.setDate(date.getDate() + 1);
      } else {
        this.next('month');
        date.setDate(1);        
      }
    } else {
      if (func == "month") {
        if (date.getDate() > soonLastDay) {
          this.changeDateTo(soonLastDay);
        }
        if (date.getMonth() != 11)
          date.setMonth(date.getMonth() + 1);
        else {
          date.setMonth(0);
          date.setFullYear(date.getFullYear() + 1);
        }
      } else
        date.setFullYear(date.getFullYear() + 1);
    }
    
    this.calendar.redraw();
    this.redraw();
  },
  changeDateTo: function (theDay, theBlock) {
    if ((theBlock >= 31 && theDay <= 11) || (theBlock <= 6 && theDay >= 8)) {
      if (theBlock >= 31 && theDay <= 11)
        this.next('month');
      else if (theBlock <= 6 && theDay >= 8)
        this.back('month');
    }
    this.calendar.date.setDate(theDay);
    this.calendar.redraw();
    this.redraw();
    calendar = this.calendar;
    setTimeout(function () { calendar.redraw(); }, 10);
  }
}

Organizer.prototype.redraw = function () {
  document.getElementById(this.id + "-date").innerHTML = this.calendar.months[this.calendar.date.getMonth()] + " " + this.calendar.date.getDate() + ", " + this.calendar.date.getFullYear();
  document.getElementById(this.id + "-list").innerHTML = "";
}

Organizer.prototype.list = function (data) {
  document.getElementById(this.id + "-list").innerHTML = "";

  content = ""; 
  for (var i = 0; i < data.length; i++) {
    content += '<li id="' + this.id + '-list-item-' + i + '"><div><span class="' + this.id + ' time" id="' + this.id + '-list-item-' + i + '-time">' + data[i].startTime + ' - ' + data[i].endTime + '</span><span class="' + this.id + ' m" id="' + this.id + '-list-item-' + i + '-m">' + data[i].mTime + '</span></div><p id="' + this.id + '-list-item-' + i + '-text">' + data[i].text + '</p></li>';
  }

  document.getElementById(this.id + "-list").innerHTML = content;
}

Organizer.prototype.setupBlock = function (blockId, theOrganizer, callback) {
  document.getElementById(calendarId + "-day-" + blockId).addEventListener('click', function () {
    if (document.getElementById(calendarId + "-day-num-" + blockId).innerHTML.length > 0) {
      theOrganizer.changeDateTo(document.getElementById(calendarId + "-day-num-" + blockId).innerHTML, blockId);
      callback();
    }
  });
}

Organizer.prototype.setOnClickListener = function (theCase, backCallback, nextCallback) {
  calendarId = this.calendar.id;
  organizerId = this.id;

  theOrganizer = this;

  switch (theCase) {
    case "days-blocks":
      for (i = 1; i <= 42; i++) {
        theOrganizer.setupBlock(i, theOrganizer, backCallback);
      }
      break;
    case "day-slider":
      document.getElementById(organizerId + "-day-back").addEventListener('click', function () {
        theOrganizer.back('day');
        backCallback();  
      });
      document.getElementById(organizerId + "-day-next").addEventListener('click', function () {
        theOrganizer.next('day');
        nextCallback();
      });
      break;
    case "month-slider":
      document.getElementById(calendarId + "-month-back").addEventListener('click', function () {
        theOrganizer.back('month');
        backCallback();
      });
      document.getElementById(calendarId + "-month-next").addEventListener('click', function () {
        theOrganizer.next('month');
        nextCallback();
      });
      break;
    case "year-slider":
      document.getElementById(calendarId + "-year-back").addEventListener('click', function () {
        theOrganizer.back('year');
        backCallback();
      });
      document.getElementById(calendarId + "-year-next").addEventListener('click', function () {
        theOrganizer.next('year');
        nextCallback();
      });
      break;
  }
};
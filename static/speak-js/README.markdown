speak.js
========

A port of the eSpeak speech synthesizer from C++ to JavaScript using Emscripten.

Enables text-to-speech on the web using only JavaScript and HTML5.

View a working demo at [http://projects.mattytemple.com/speak-js/](http://projects.mattytemple.com/speak-js/ "Demo").

Usage
-----

Very simple! Do this:

 * Include the script in your html header,
 
```html
<script src="speakClient.js"></script>
```

   (and make sure you have speakClient.js available, as well as
   speakWorker.js and speakGenerator.js)

 * Add a div with an audio element called 'audio' in your html body,

```html
<div id="audio"></div>
```

 * Call speak() to say stuff in JavaScript

```javascript
speak('hello world!')
```

Options
-------

You can also specify some options with calling speak(), by doing

```javascript
speak('hello world', { option1: value1, option2: value2 .. })
```

available options are:

 * amplitude: How loud the voice will be (default: 100)
 * pitch: The voice pitch (default: 50)
 * speed: The speed at which to talk (words per minute) (default: 175)
 * voice: Which voice to use (for a non-default voice, requires you to
          build speak.js to include the proper data. See Language Support
          below) (default: en/en-us)
 * wordgap: Additional gap between words in 10 ms units (default: 0)
 * noWorker: Do not use a web worker (see below in 'Architecture')

For example

```javascript
speak('hello world', { pitch: 100 })
```

will talk in a very high-pitched voice.

Architecture
------------

speakClient.js is the file that you interact with. It defines speak(), and
will load speakWorker.js in a web worker. speakWorker wraps around
speakGenerator.js, which does the actual work of converting a string into
a WAV file. The WAV data is returned to speak(), which then plays it in
an HTML Audio element.

You can also use speak.js without a web worker. In that case, you don't
need speakWorker.js, but you do need to load speakGenerator.js along
with speakClient.js in your HTML page. speak(), if called with noWorker
set to true in the options object, will directly call the WAV generation
code in speakGenerator.js instead of forwarding the call to a worker
which would have done the same.

Language Support
----------------

eSpeak supports multiple languages so speak.js can too. To do this, you
need to build a custom version of speak.js:

You then need to call speak() with the `voice` option that tells it to use the
right voice for your language. For example, for French this should work:

```javascript
speak('boulanger', { voice: 'fr' })
```


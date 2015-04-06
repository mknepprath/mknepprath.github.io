<!DOCTYPE html>
<!--

cd Documents/Github/mknepprath.github.io/lab/lilt
browser-sync start --server --files "*.html, *.css"

-->
<head>
  <link rel="stylesheet" type="text/css" href="cyo.css" />
</head>
<body>
  <hr id="cyo_debug">
  [Start Over]:#cyo.begin:retry
  [all_done]:#cyo.all_done:yes
  [get_the_code]:#cyo.get_the_code:yes
  [lame]:#cyo.abort:no
  [step1]:#cyo.step1:yes
  [how_does_it_work]:#cyo.how_does_it_work:q
  [about_css]:#cyo.about_css:ok
  [about_md]:#cyo.about_md:ok
  [about_buttons]:#cyo.about_buttons:ok
  [breakdown_css]:#cyo.breakdown_css:ok

  <hr id="cyo.get_the_code:yes">
  # You can find the code...

  Right now, I've put the code in [a gist][gist].

  I'll probably pull it all into a proper repository soon, but you can also just check out this pen for all the juicy details.

  [But how does it work?][how_does_it_work]

  [Thanks, I'm all done!][all_done]

  <hr id="cyo.about_buttons:ok">
  # The Buttons

  The buttons were the funnest thing to work on. Again, with the goal of minimal impact to Markdown syntax, the buttons work by matching _parts_ of the fragment you are trying to navigate to.

  For example

  ```md
  [This link will be blue](#cyo.this-is-where-i-wanna-go:ok)
  ```

  The button styles will only apply if the `href` of the link is prefixed with `#cyo`, then its icon and color are determined by the suffix.

  Examples:

  (Warning! clicking these will take you back to the start)

  [No Suffix](#cyo.nowhere)
  [`:ok` suffix](#cyo.nowhere:ok)
  [`:yes` suffix](#cyo.nowhere:yes)
  [`:no` suffix](#cyo.nowhere:no)
  [`:warn` suffix](#cyo.nowhere:warn)
  [`:info` suffix](#cyo.nowhere:info)
  [`:retry` suffix](#cyo.nowhere:retry)
  [`:q` suffix](#cyo.nowhere:q)

  A _total_ hack, but a fun one!

  Okay, what now?

  [The Core CSS][about_CSS]
  [Markdown Hacks][about_MD]

  [I got it...][all_done]

  <hr id="cyo.about_md:ok">
  # Hacking Markdown

  This also works by 'hacking' in some extensions into the existing markdown format. Namely by specifying links with anchors:

  ```md
  [Lets go!](#cyo.here)
  ```

  While, this _is_ a basic feature of Markdown, we leverage almost more like a `class`, matching parts of the `id` to reuse functionality. The fragment caries more information than just where to go on the page.

  For Markdown compilers that don't support adding ID's to elements, then you have to fall back to HTML for defining sections:

  ```md
  <hr id="cyo.step1">
  # Part 1
  Welcome to step one. Thats it!

  [Start Over!](#cyo.begin)

  <hr id="cyo.begin">
  #Hello there
  Ready to get started?

  [Goto Step 1](#cyo.step1)
  ```

  Other syntaxes of Markdown allow for built-in id creation.

  I origionally started with a more semantic HTML approach using the `<section>` element, which I liked. However, it became problematic &ndash; and frankly ugly &ndash; when trying to mix that style with the limited grammar of Markdown. I enjoy the _speed_ of writing Markdown too much to sacrifice that. But perhaps I'll revisit that someday...

  Any more questions?

  [How does the CSS work?][about_CSS]
  [But those buttons?][about_buttons]

  [No thanks, I got it...][all_done]

  <hr id="cyo.breakdown_css:ok">
  # Taking the CSS rule-by-rule.

  1. ```*[id^='cyo'], *[id^='cyo'] ~ * { display: none; }```
      
      Find any element whose `id` begins with `cyo` and all of thier siblings, and hide them.
      
  1. ```*[id^='cyo']:last-of-type ~ * { display: block; }```

      Find the last element with an `id` that begins with `cyo` and make all of it's siblings displayed again.
      
      This is used to bootstrap a request that has no `#fragment` in the URL. You place your 'first' page, as the last section in the document. This rule gets 'overriden' by the next two rules.

  1. ```*[id^='cyo']:target ~ * { display: block }```

      If there is a fragment, find all of its siblings and show them.
      
      But _oops_, now I've shown from the match to the bottom of the page!
      
  1. `*[id^='cyo']:target ~ *[id^='cyo'],
        *[id^='cyo']:target ~ *[id^='cyo'] ~ * {
          display: none;
        }
        `
        
      From the target, find the _next_ element that has an id that starts with `cyo` and then hide it and all it's siblings. 
      
  *PHEW*

  What do you want to know about now?

  [The Markdown][about_MD]
  [Those Custom Buttons][about_buttons]

  [No thanks, I got it...][all_done]

  <hr id="cyo.about_css:ok">
  # NoJS? How?

  The core of display engine requires only 7 lines of css:

  ```css
  *[id^='cyo'], *[id^='cyo'] ~ * { display: none; }
  *[id^='cyo']:last-of-type ~ * { display: block; }
  *[id^='cyo']:target ~ * { display: block }
  *[id^='cyo']:target ~ *[id^='cyo'],
  *[id^='cyo']:target ~ *[id^='cyo'] ~ * {
    display: none;
  }
  ```

  It uses `<hr>` elements with a special `id`, hidden within the document to designate "sections" of the document. Then it uses the document fragment to control the visibility of the section. 

  It (ab)uses a few simple css features:

  * Attribute begins with `[id^='']`
  * The general sibling selector `~`
  * The `:target` pseduo-class, which represents the unique element, if any, with an id matching the fragment identifier of the URI of the document. [source](https://developer.mozilla.org/en-US/docs/Web/CSS/:target)

  Maybe a rule by rule breakdown would help?

  [Rule By Rule Breakdown][breakdown_css]

  Or we can talk about another topic.

  [Markdown Extension][about_MD]
  [Custom Buttons][about_buttons]

  [No thanks, I got it...][all_done]


  <hr id="cyo.how_does_it_work:q">
  # I'm glad you asked!

  So, in working on this, I had a couple of interesting constraints. I wanted it to be:

  * A CSS only solution &ndash; no-JS.
  * Play nicely with Markdown.
  * Allow custom links/buttons styles, again without breaking MD

  Which do you want to learn more about?

  [The CSS][about_CSS]
  [Markdown Hacks][about_MD]
  [Custom Buttons][about_buttons]

  [I got it...][all_done]

  <hr id="cyo.abort:no">
  # Well, shucks!

  I'm sorry you feel that way! But thanks for taking the time to check this out anyway!

  [Start Over]

  <hr id="cyo.all_done:yes">
  # Thanks for checking out this experiment.

  Thanks for trying out my little experiment in storytelling and tutorials. Feel free to hit me up with any questions, comments or improvements anytime!

  Cheers and _keep coding!_

  [Start Over][Start Over]

  Oh wait, did you forget to get the code?

  [Get the code][get_the_code]

  <hr id="cyo.step1:yes">
  # Great, so have I!

  That's why I've been working on this:

  A ["Choose Your Own Adventure"](http://en.wikipedia.org/wiki/Choose_Your_Own_Adventure) style markdown extension that helps simplify the construction and distrubution of branching style stories and tutorials. 

  It's a CSS-only extension &ndash; doesn't use any JavaScript &ndash; and tries to stay out of your way as much as possible but still add a sliver of interactivity to traditional markdown documents.

  It should also play nice with almost every markdown compiler that supports adding custom CSS, and shouldn't interfere with existing themes.

  [Cool, where can I get the code][get_the_code]
  [Extension? What do you mean?][how_does_it_work]
  [That's lame][lame]

  <hr id="cyo_begin">
  # Choose Your Own Tutorial...

  I've been a developer and a teacher for quite a few years now, and while I love writing tutorials, I sometimes miss the ability of working directly with a co-worker or student and really help them understand a problem.

  Have you ever wanted to write a tutorial, but wanted to customize the learning experience for multiple skill levels?

  Have you ever wanted to explore an idea collaboratively, and didn't want to feel like you were talking _at_ somebody?

  [Yes][step1]
  [No][lame]

  [gist]:https://gist.github.com/32bitkid/e890983e929e6335ec65
</body>

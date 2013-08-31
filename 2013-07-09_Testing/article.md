Testing - Dive Into Serious Coding
==================================

- [Previous Education](#previous-education)
- [Idea of Testing](#idea-of-testing)
- [Continuous Flow](#continuous-flow)
- [Mature Community](#mature-community)
- [Few Advices](#few-advices)
- [Related Sites](#related-sites)


## Previous Education

After 3 years of studiying I will finally receive my bachelor degree in *international media and computing* and graduate from college in a few weeks.
Despite the general assumption that computer science in universities covers most of the necessary
skills for contributing to larger projects, I have to admit that in reality this is rarely the
case. We certainly get to know the fundamentals about programming languages, architectures, design
patterns or quality assurance - but left with questions about solving common [technical debts](http://martinfowler.com/bliki/TechnicalDebt.html).

In the 3rd semester we had *Software Engineering* two times a week, but we were running out of
time and just discussed some general principles about project management. Some of us never had the
opportunity to learn more about version control, social coding or software testing. There is no
specific course which teaches real world problems or at least informs about the basics outside
the academic comfort zone.

My first experience of testing is therefore unusual: no traditional language like Java or C++
got me in contact, but a dynamic web application using JavaScript in the browser.


## Idea of Testing

For going further its necessary to understand what the term *software testing* actually means.
There are various definitions and explanations, but it can be sum up as:

> [...] the process of *validating & verifying* that a software works as expected and can be
  implemented with the same *characteristics*, meeting the *requirements* that guided its design
  and development [...]

Source: [Wikipedia](https://en.wikipedia.org/wiki/Software_testing)

Although manual testing by people fits in this category as well, in the following I am focusing on
*automatic tests*. These are scripts which are executed during a build process and used to validate the functionality of code.

Some developers prefer to solely focus on acceptance tests, which rely on external feedback to
improve the result in production (e.g. fix the unsatisfying performance noticeable by the end user)
, but you will more likely encounter one of these types already during the development:

* unit tests: handling small logical components (= units) with specific behavior, calls and
              references

* functional tests: regarding a single function execution or change on user interaction

* integration tests: checks the requirements of the whole application in a specific environment,
                      considering hard- & software dependencies (e.g. technology support, database setup, available devices)

In many cases are unit tests written first, since they promote a seperation into smaller modules -
ideal for applying knowledge of object orientated programming (OOP). The elementary structure can therefore be defined without even implementing a single line of "real code".

Taking this additional effort of typing a specification seems to be a waste of time for some of
you, despite it's mostly quite the opposite. Its true that you aren't participating directly on
solving a current problem, but the task of setting up a test a head provides multiple benefits later on.

One would be the *reliability*. With a test which validates code and verifies the outcome -
you got a defined interface to communicate with others, disregarding an actual implementation.
Since its created before anyone started programming, it allows debugging without any assumptions.

Another advantage is the resulting *maintainability*. Refactoring code or substitute internals
can be done without fearing to break the original behavior. The adjustments will be checked
immediately and a failure stops the build if they don't match with the previous values.

Finally *modularity* will be rewarded. As tests can be shared between different projects, its recommended to create reusable abstractions for basic functionalities. Even specific ones can
be leveraged, e.g. if a component instance will be accessible on the client and the server.


## Continuous Flow

In 2001 introduced the [agile manifest](http://agilemanifesto.org/) the idea of continuous
development and short release cycles. Compared to the former waterfall model, claims the agile
workflow short iterations with viable products at the end of each sprint. The approach of test
driven development (TDD) raised out of this movement.

Basically the process is following a repetitive pattern consisting of these steps:
```
  1.) define the expected result (what should happen on a higher level)
  2.) group these use-cases and split their logic into modules
  3.) write an explicit test for each of them
  4.) implement the specified part according to its test
  5.) run the test on top of the code
```
At the end of this general flow will the tests either succeed or fail. In this case they are going
to be updated and refactored until all of them pass their set of rules.

![Continuous-Flow](https://raw.github.com/Autarc/talks/gh-pages/2013-07-09_Testing/material/Iterative-Cycles.png)

The continous approach includes often smaller updates, which affects the ongoing development.
Design flaws will be recognized already during the definition of the tests and can therefore be fixed
as soon as possible.

Similar to TDD is the concept of behavior driven development (BDD). In contrast to TDD it uses
a different selection of words, which empowers users to describe stories with an interface similar
to our natural language.

Writing assertions in TDD is like relying on benchmarks: the rating at the end can be
valuable for some, but the actual problem doesn't have to be solved by the application.
Instead of focusing on just the tests or logic itself, BDD defines expectations *how* something
should happen compared to just *what* is going on. Even people with less coding experience can
learn to write such tests in a few minutes, which can be useful for collaborative work in a team.


## Mature Community

In web development we often distinguish between front- & back-end. Both of them can be tested,
although the server side is more aware of this approach. Especially in the
[Rails Community](http://guides.rubyonrails.org/testing.html) are automatic tests standard and
often expected by other developers. As their environment promotes a well structured hierarchy of
classes, defining functionalities and finding dependencies between different modules can be done
easily during the build process. Before the actual program is deployed into production - a spec
runner will validate the expected results.

On the otherhand we got the client: while different programming languages can be used by the
server, here we got mainly a browser which parses HTML, CSS and JavaScript. All of these can be
tested according to their usage:

* content: HTML can be checked by the [W3C markup validator](http://validator.w3.org/),
           other services include grammar checks of text or heuristics for semantic

* styling: CSS can be looked up for redundancy via
           [Helium CSS](https://github.com/geuis/helium-css) or best practise recommendations by
           [CSS Lint](http://csslint.net/)

* behavior: JavaScript can either use passive static code analysis tools like
            [JSLint](http://www.jslint.com/) / [JSHint](http://jshint.com/), custom snippets for
            comparing performance at [JSPerf](http://jsperf.com/) or complete tests suites written
            for the specific script logic

As scripts in a browser will by default loaded and executed asynchronous, testing multiple files
can be cumbersome. Moreover a libary which provides an API for TDD or BDD is required, along with
helper functions to mock certain data. Therefore I am using a few tools which eases the setup.

First we got [mocha](http://visionmedia.github.io/mocha/), a testing framework running in nodeJS
and the browser. It supports interfaces for the TDD and BDD style. Additional assertions will be
handled by [chai](http://chaijs.com/). [Sinon.js](http://sinonjs.org/) is used to inject mocks,
stubs and spies. The tests itself will be written in [CoffeeScript](http://coffeescript.org/), a transpiled language for JavaScript which omits braces and semicolons. Furthermore it provides
syntactic sugar by introducing new keywords and shortcuts. Using this abstraction makes it
possible to write readable tests which are distinguishable from the original code.

The mentioned tools will be used in conjunction with the testrunner
[testem](https://github.com/airportyh/testem) , as it orchestrates multiple environments with
just one command. It can easily installed via the node package manager: __npm install -g testem__


## Few Advices

In the end I like to share a few advices regarding tests in JavaScript. All actions in the
browser can mainly be categorized as either DOM manipulation (rendered nodes), data handling (I/O
communication) or executing business logic (specific tasks).

* inline code in HTML files should be avoided and lines extracted into their own modules
* the JavaScript logic should be decoupled from DOM elements which requires a seperate rendering
* encapsule each module as an object with its own properties, so instance can be created in runtime
* provide fake data for aynchronous behavior or interactions like input options
* don't repeat yourself and test one aspect multiple times in different test files


## Related Sites

- [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com/) - course about TDJS
- [CSS Test](http://csste.st/) - best practices for testing CSS

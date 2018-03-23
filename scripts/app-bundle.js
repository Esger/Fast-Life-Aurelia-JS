define("app",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.App=function e(){t(this,e)}}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!1,testing:!1}}),define("main",["exports","./environment"],function(e,t){"use strict";function s(e){e.use.standardConfiguration().feature("resources"),i.default.debug&&e.use.developmentLogging(),i.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=s;var i=function(e){return e&&e.__esModule?e:{default:e}}(t);Promise.config({longStackTraces:i.default.debug,warnings:{wForgottenReturn:!1}})}),define("resources/index",["exports"],function(e){"use strict";function t(e){}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=t}),define("resources/elements/controls",["exports","aurelia-framework","aurelia-event-aggregator"],function(e,t,s){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.ControlsCustomElement=void 0;var n,r;e.ControlsCustomElement=(n=(0,t.inject)(s.EventAggregator))(r=function(){function e(t){i(this,e),this.ea=t,this.startPulsor=!0,this.clearPulsor=!1,this.timeOut=0,this.addListeners()}return e.prototype.clear=function(){this.ea.publish("clear"),this.clearPulsor=!1,this.startPulsor=!0},e.prototype.stop=function(){this.ea.publish("stop")},e.prototype.step=function(){this.ea.publish("step"),this.startPulsor=!1},e.prototype.start=function(){this.ea.publish("start"),this.startPulsor=!1},e.prototype.startNstop=function(){this.ea.publish("startNstop"),this.startPulsor=!1},e.prototype.fillRandom=function(){this.ea.publish("fillRandom")},e.prototype.setTimeoutInterval=function(){this.ea.publish("timeoutInterval",this.timeOut)},e.prototype.addListeners=function(){var e=this;this.ea.subscribe("cellSize",function(t){e.clearPulsor=!0})},e}())||r}),define("resources/elements/life",["exports","aurelia-framework","aurelia-event-aggregator","resources/services/life-worker-service"],function(e,t,s,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.LifeCustomElement=void 0;var r,a,l=function(){function e(e,t){for(var s=0;s<t.length;s++){var i=t[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,s,i){return s&&e(t.prototype,s),i&&e(t,i),t}}();e.LifeCustomElement=(r=(0,t.inject)(s.EventAggregator,i.LifeWorkerService))(a=function(){function e(t,s){n(this,e),this.statusUpdateHandle=null,this.ea=t,this.lfWs=s,this.cellSize=2,this.cellsAlive=0,this.liferules=[],this.speedInterval=0,this.trails=!0,this.running=!1,this.opacity=1-.9*this.trails,this.cellCounts=[],this.lastMean=0,this.stableCountDown=20,this.grid=!1}return e.prototype.showStats=function(){var e=this.lifeSteps-this.prevSteps;this.prevSteps=this.lifeSteps,this.ea.publish("stats",{cellCount:this.cellsAlive,generations:this.lifeSteps,speed:2*e})},e.prototype.clearSpace=function(){this.ctx.fillStyle="rgb(255, 255, 255)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctxOffscreen.fillStyle="rgb(255, 255, 255)",this.ctxOffscreen.fillRect(0,0,this.canvas.width,this.canvas.height)},e.prototype.animateStep=function(e){var t=this;this.drawCells(!0),this.running&&(!this.stable&&e||!e)?setTimeout(function(){t.animateStep(e)},this.speedInterval):this.stop()},e.prototype.drawCells=function(e){e&&this.lfWs.getGeneration();var t=this.lfWs.cells,s=this.cellSize,i=this.ctxOffscreen;i.fillStyle="rgba(255, 255, 255, "+this.opacity+")",i.fillRect(0,0,this.canvas.width,this.canvas.height),this.grid&&this.drawgrid(),i.fillStyle="rgba(128, 128, 0, 1)";for(var n=t.length-1;n>=0;){var r=t[n];n-=1,i.fillRect(r[0]*s,r[1]*s,s,s)}this.ctx.drawImage(this.offScreenCanvas,0,0,this.canvasWidth,this.canvasHeight),this.cellsAlive=t.length,this.lifeSteps+=1},e.prototype.drawgrid=function(e){var t=this.ctxOffscreen,s=Math.max(this.cellSize,4),i=this.canvas.width-s,n=this.canvas.height-s,r=2*s;t.fillStyle="rgba(128, 128, 128, 0.1)";for(var a=0,l=0;a<n;a+=s){var o=l;for(l=(l+s)%r;o<i;o+=r)t.fillRect(o,a,s,s)}e&&this.ctx.drawImage(this.offScreenCanvas,0,0,this.canvasWidth,this.canvasHeight)},e.prototype.initLife=function(){this.opacity=1-.9*this.trails,this.canvas=document.getElementById("life"),this.ctx=this.canvas.getContext("2d"),this.canvasWidth=this.canvas.width,this.canvasHeight=this.canvas.height,this.offScreenCanvas=document.createElement("canvas"),this.offScreenCanvas.width=this.canvasWidth,this.offScreenCanvas.height=this.canvasHeight,this.ctxOffscreen=this.offScreenCanvas.getContext("2d"),this.setSpaceSize(),this.resetSteps(),this.lfWs.init(this.spaceWidth,this.spaceHeight,this.liferules),this.subscribeOnFirstData(),this.lfWs.fillRandom()},e.prototype.setSpaceSize=function(){this.spaceWidth=Math.floor(this.canvasWidth/this.cellSize),this.spaceHeight=Math.floor(this.canvasHeight/this.cellSize)},e.prototype.resetSteps=function(){this.lifeSteps=0,this.prevSteps=0},e.prototype.slowDown=function(){this.speedWas=this.speedInterval,this.speedInterval=500},e.prototype.fullSpeed=function(){this.speedInterval=this.speedWas},e.prototype.clear=function(){this.stop(),this.resetSteps(),this.lfWs.clear()},e.prototype.stop=function(){this.running=!1,this.statusUpdateHandle&&(clearInterval(this.statusUpdateHandle),this.statusUpdateHandle=null)},e.prototype.start=function(){var e=this;this.running=!0,this.animateStep(!1),this.statusUpdateHandle=setInterval(function(){e.showStats()},500)},e.prototype.startNstop=function(){var e=this;this.running=!0,this.animateStep(!0),this.statusUpdateHandle=setInterval(function(){e.showStats()},500)},e.prototype.subscribeOnFirstData=function(){var e=this;this.ea.subscribeOnce("dataReady",function(){e.drawCells()})},e.prototype.addCell=function(e){var t=e.offsetX?e.offsetX:e.pageX-this.offsetLeft,s=Math.floor(t/this.cellSize),i=e.offsetY?e.offsetY:e.pageY-this.offsetTop,n=Math.floor(i/this.cellSize);this.ctx.fillStyle="#d4d4d4",this.ctx.fillRect(s*this.cellSize,n*this.cellSize,this.cellSize,this.cellSize),this.subscribeOnFirstData(),this.lfWs.addCell([s,n])},e.prototype.addListeners=function(){var e=this;this.ea.subscribe("clear",function(){e.clear(),e.subscribeOnFirstData()}),this.ea.subscribe("stop",function(){e.stop()}),this.ea.subscribe("start",function(){e.start()}),this.ea.subscribe("startNstop",function(){e.startNstop()}),this.ea.subscribe("step",function(){e.lfWs.getGeneration(),e.subscribeOnFirstData()}),this.ea.subscribe("fillRandom",function(){e.lfWs.fillRandom(),e.subscribeOnFirstData()}),this.ea.subscribe("timeoutInterval",function(t){e.speedInterval=t}),this.ea.subscribe("toggleTrails",function(){e.trails=!e.trails,e.opacity=1-.9*e.trails}),this.ea.subscribe("toggleGrid",function(){e.grid=!e.grid,e.grid&&e.drawgrid(!0)}),this.ea.subscribe("cellSize",function(t){e.cellSize=t,e.setSpaceSize(),e.lfWs.resize(e.spaceWidth,e.spaceHeight),e.subscribeOnFirstData()}),this.ea.subscribe("lifeRules",function(t){e.liferules=t.liferules,t.init?e.initLife():e.lfWs.changeRules(e.liferules)})},e.prototype.attached=function(){this.addListeners()},l(e,[{key:"meanOver100Gens",get:function(){this.cellCounts.push(this.cellsAlive),this.cellCounts=this.cellCounts.slice(-100);return function(e){return e.reduce(function(e,t){return e+t},0)/e.length}(this.cellCounts)}},{key:"stable",get:function(){return Math.abs(this.meanOver100Gens-this.cellsAlive)<7?this.stableCountDown-=1:this.stableCountDown=20,this.stableCountDown<=0}}]),e}())||a}),define("resources/elements/main",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.MainCustomElement=function e(){t(this,e)}}),define("resources/elements/settings",["exports","aurelia-framework","aurelia-event-aggregator"],function(e,t,s){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.SettingsCustomElement=void 0;var n,r,a=function(){function e(e,t){for(var s=0;s<t.length;s++){var i=t[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,s,i){return s&&e(t.prototype,s),i&&e(t,i),t}}();e.SettingsCustomElement=(n=(0,t.inject)(s.EventAggregator))(r=function(){function e(t){i(this,e),this.ea=t,this.liferules=[],this.selectedPreset=6,this.presets=[{rule:void 0,name:""},{rule:"125/36",name:"2&times;2"},{rule:"34/34",name:"34 Life"},{rule:"1358/357",name:"Amoeba"},{rule:"4567/345",name:"Assimilation"},{rule:"235678/378",name:"Coagulations"},{rule:"23/3",name:"Conway&rsquo;s Life"},{rule:"45678/3",name:"Coral"},{rule:"34678/3678",name:"Day &amp; Night"},{rule:"5678/35678",name:"Diamoeba"},{rule:"012345678/3",name:"Flakes"},{rule:"1/1",name:"Gnarl"},{rule:"23/36",name:"High Life"},{rule:"5/345",name:"Long Life"},{rule:"12345/3",name:"Maze"},{rule:"1234/3",name:"Mazectric"},{rule:"245/368",name:"Move"},{rule:"238/357",name:"Pseudo Life"},{rule:"1357/1357",name:"Replicator"},{rule:"/2",name:"Seeds"},{rule:"/234",name:"Serviettes"},{rule:"235678/3678",name:"Stains"},{rule:"2345/45678",name:"Walled Cities"}],this.grid=!1,this.trails=!0,this.cellSizeExp=1,this.minCellSize=0,this.maxCellSize=5,this.setPreset()}return e.prototype.toggleTrails=function(){this.ea.publish("toggleTrails",this.trails)},e.prototype.toggleGrid=function(){this.ea.publish("toggleGrid",this.grid)},e.prototype.setCellSize=function(){this.ea.publish("cellSize",this.cellSize)},e.prototype.setPreset=function(){if(this.selectedPreset>0){for(var e=this.presets[this.selectedPreset].rule.split("/"),t=e[0],s=e[1],i=[],n=0;n<9;n++)i[n]=s.includes(n),i[n+10]=t.includes(n);this.liferules=i,this.publishRules(!1)}},e.prototype.publishRules=function(e){this.ea.publish("lifeRules",{liferules:this.liferules,init:e})},e.prototype.compareToPresets=function(){var e=this.liferules.slice(0,9),t=this.liferules.slice(10,19),s=function(e,t){return e?t:""},i=t.map(s).join(""),n=e.map(s).join(""),r=i+"/"+n,a=function(e){return e.rule==r},l=this.presets.findIndex(a);this.selectedPreset=l>-1?l:void 0},e.prototype.setRules=function(e){this.liferules[e]=!this.liferules[e],this.compareToPresets(),this.publishRules(!1)},e.prototype.attached=function(){this.publishRules(!0)},a(e,[{key:"cellSize",get:function(){return Math.pow(2,this.cellSizeExp)}}]),e}())||r}),define("resources/elements/stats",["exports","aurelia-framework","aurelia-event-aggregator"],function(e,t,s){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.StatsCustomElement=void 0;var n,r;e.StatsCustomElement=(n=(0,t.inject)(s.EventAggregator))(r=function(){function e(t){i(this,e),this.ea=t,this.speed=0,this.cellCount=0,this.generations=0}return e.prototype.addListeners=function(){var e=this;this.ea.subscribe("stats",function(t){e.cellCount=t.cellCount,e.generations=t.generations,e.speed=t.speed})},e.prototype.attached=function(){this.addListeners()},e}())||r}),define("resources/elements/story",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.StoryCustomElement=function e(){t(this,e)}}),define("resources/elements/tabs",["exports","aurelia-framework","aurelia-event-aggregator"],function(e,t,s){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.TabsCustomElement=void 0;var n,r;e.TabsCustomElement=(n=(0,t.inject)(s.EventAggregator))(r=function(){function e(t){i(this,e),this.tabs=[{title:"Life Rules",active:!0},{title:"Story",active:!1}]}return e.prototype.activateTab=function(e){var t=this.tabs.slice();t.forEach(function(e){e.active=!1}),t[e].active=!0,this.tabs=t},e}())||r}),define("resources/services/life-worker-service",["exports","aurelia-framework","aurelia-event-aggregator"],function(e,t,s){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.LifeWorkerService=void 0;var n,r,a=function(){function e(e,t){for(var s=0;s<t.length;s++){var i=t[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,s,i){return s&&e(t.prototype,s),i&&e(t,i),t}}();e.LifeWorkerService=(n=(0,t.inject)(s.EventAggregator))(r=function(){function e(t){i(this,e),this.ea=t,this._buffer=[],this._fillSlotIndex=0,this._getSlotIndex=0,this._maxIndex=9}return e.prototype.init=function(e,t,s){var i=this;this.wrkr=new Worker("./assets/life-worker.js"),this._buffer=[],this.wrkr.onmessage=function(e){i._buffer=e.data.cells||[],i.ea.publish("dataReady")};var n={message:"initialize",w:e,h:t,liferules:s};this.wrkr.postMessage(n)},e.prototype.resize=function(e,t){var s=function(s){return s[0]<=e&&s[1]<=t};this._buffer=this._buffer.filter(s);var i={message:"setSize",w:e,h:t};this.wrkr.postMessage(i)},e.prototype.clear=function(){var e={message:"clear"};this.wrkr.postMessage(e)},e.prototype.fillRandom=function(){var e={message:"fillRandom"};this.wrkr.postMessage(e)},e.prototype.changeRules=function(e){var t={message:"rules",rules:e};this.wrkr.postMessage(t)},e.prototype.addCell=function(e){var t=this._buffer;e&&t.push(e);var s={message:"setCells",cells:t};this.wrkr.postMessage(s)},e.prototype.getGeneration=function(){var e={message:"step"};this.wrkr.postMessage(e)},a(e,[{key:"cells",get:function(){return this._buffer}}]),e}())||r}),define("text!app.html",["module"],function(e){e.exports='<template>\n    <require from="resources/elements/main"></require>\n    <main></main>\n</template>'}),define("text!resources/elements/controls.html",["module"],function(e){e.exports='<template>\n    <require from="resources/elements/stats"></require>\n    <life-controls>\n        <a href="#"\n           class="clearbutton"\n           class.bind="clearPulsor ? \'pulsor\' : \'\'"\n           title="Clear"\n           click.delegate="clear()"></a>\n        <a href="#"\n           class="stopbutton"\n           title="Stop"\n           click.delegate="stop()"></a>\n        <a href="#"\n           class="stepbutton"\n           title="Step"\n           click.delegate="step()"></a>\n        <a href="#"\n           class="startnstopbutton"\n           class.bind="startPulsor ? \'pulsor\' : \'\'"\n           title="Start … and stop automatically"\n           click.delegate="startNstop()"><span></span></a>\n        <a href="#"\n           class="startbutton"\n           title="Start"\n           click.delegate="start()"></a>\n        <a href="#"\n           class="randombutton"\n           title="Fill randomly"\n           click.delegate="fillRandom()"></a>\n        <input type="range"\n               min.one-time="0"\n               max.one-time="500"\n               step="50"\n               value.bind="timeOut"\n               change.delegate="setTimeoutInterval()">\n        <output value.bind="\'interval: \' + timeOut"></output>\n\n    </life-controls>\n    <stats></stats>\n</template>'}),define("text!resources/elements/life.html",["module"],function(e){e.exports='<template>\n    <canvas id="life"\n            width="750"\n            height="464"\n            click.delegate="addCell($event)"\n            mouseenter.trigger="slowDown()"\n            mouseleave.trigger="fullSpeed()">\n    </canvas>\n</template>'}),define("text!resources/elements/main.html",["module"],function(e){e.exports='<template>\n    <require from="resources/elements/life"></require>\n    <require from="resources/elements/controls"></require>\n    <require from="resources/elements/tabs"></require>\n    <h1>Fast Life | AureliaJS<a href="/">ashWare</a></h1>\n    <life></life>\n    <controls></controls>\n    <tabs></tabs>\n</template>'}),define("text!resources/elements/settings.html",["module"],function(e){e.exports='<template>\n\n    <tab-content class="lifeRules">\n        <row-labels>\n            <p title="Preset life rules">Presets</p>\n        </row-labels>\n        <life-rules>\n            <select change.delegate="setPreset()"\n                    value.bind="selectedPreset"> \n                <option repeat.for="preset of presets"  \n                    model.bind="$index" \n                    innerhtml.one-time="preset.name"> \n                </option> \n            </select>\n        </life-rules>\n    </tab-content>\n\n    <tab-content class="lifeRules">\n        <row-labels>\n            <p title="Neighbour count to stay alive">New</p>\n            <p title="Neighbour count to come alive">Stay</p>\n        </row-labels>\n        <life-rules>\n            <life-rule repeat.for="rule of liferules"\n                       if.bind="$index !== 9">\n                <input type="checkbox"\n                       checked.bind="rule"\n                       id.one-time="\'rule_\'+$index"\n                       change.delegate="setRules($index)">\n                <label for.one-time="\'rule_\'+$index">${$index % 10}</label>\n            </life-rule>\n        </life-rules>\n    </tab-content>\n\n    <tab-content class="lifeRules">\n        <row-labels>\n            <p title="Change cell size and toggle trails">Cell size</p>\n        </row-labels>\n        <life-rules>\n            <input type="range"\n                   title="cell size ${cellSize}"\n                   min.one-time="minCellSize"\n                   max.one-time="maxCellSize"\n                   value.bind="cellSizeExp"\n                   change.delegate="setCellSize()"\n                   focus.delegate="stop()">\n            <output value.bind="cellSize"></output>\n            <input id="trails"\n                   type="checkbox"\n                   checked.bind="trails"\n                   change.delegate="toggleTrails()" />\n            <label for="trails"> Trails</label>\n            <input id="grid"\n                   type="checkbox"\n                   checked.bind="grid"\n                   change.delegate="toggleGrid()" />\n            <label for="grid"> Grid</label>\n\n        </life-rules>\n    </tab-content>\n\n</template>'}),define("text!resources/elements/stats.html",["module"],function(e){e.exports="<template>\n    <p>generations: ${generations} | cells: ${cellCount} | ${speed} gen/s</p>\n</template>"}),define("text!resources/elements/story.html",["module"],function(e){e.exports='<template>\n    <h2>Pushing Aurelia JS to speed</h2>\n    <p>Conway\'s Game Of Life has been a vehicle to learn new things to me for many years; here I&rsquo;m experimenting to see if Aurelia can match a <a href="/graylife"\n           target="_blank">Vanilla js version</a> &mdash; It does. Take look at <a href="https://nl.wikipedia.org/wiki/Game_of_Life"\n           target="_blank">this wikipedia page for a description of GOL</a></p>\n    <p>The modular nature of Aurelia invited me to enhance the UI / layout as well.</p>\n    <h2>Features</h2>\n    <ul>\n        <li>Easy buttons to experiment with the rules</li>\n        <li>Rule presets that sync with your own settings if there&rsquo;s a match</li>\n        <li>Draw cells yourself</li>\n        <li>Optional &lsquo;trails&rsquo; to smooth things out</li>\n        <li>Slow life with slider or hover over the canvas</li>\n        <li>Grid for drawing life cells more precisely</li>\n        <li>Web-worker for computing of life generations</li>\n        <li>Optionally stop heavy computing automatically when Life get\'s stable</li>\n    </ul>\n    <p>Don\'t hesitate to check out my other games and projects at <a href="/"\n           target="_blank">ashWare.nl</a></p>\n</template>'}),define("text!resources/elements/tabs.html",["module"],function(e){e.exports='<template>\n    <require from="resources/elements/settings"></require>\n    <require from="resources/elements/story"></require>\n    <tab-buttons>\n        <tab-button repeat.for="tab of tabs"\n                    click.delegate="activateTab($index)"\n                    class.bind="tab.active ? \'active\' : \'\'">${tab.title}</tab-button>\n    </tab-buttons>\n    <tab-contents>\n        <settings if.bind="tabs[0].active"></settings>\n        <story if.bind="tabs[1].active"></story>\n    </tab-contents>\n</template>'});
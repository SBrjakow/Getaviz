!function(e){function t(){var e=document.createElement("p"),t=!1;if(e.addEventListener)e.addEventListener("DOMAttrModified",function(){t=!0},!1);else{if(!e.attachEvent)return!1;e.attachEvent("onDOMAttrModified",function(){t=!0})}return e.setAttribute("id","target"),t}function i(t,i){if(t){var a=this.data("attr-old-value");if(i.attributeName.indexOf("style")>=0){a.style||(a.style={});var n=i.attributeName.split(".");i.attributeName=n[0],i.oldValue=a.style[n[1]],i.newValue=n[1]+":"+this.prop("style")[e.camelCase(n[1])],a.style[n[1]]=i.newValue}else i.oldValue=a[i.attributeName],i.newValue=this.attr(i.attributeName),a[i.attributeName]=i.newValue;this.data("attr-old-value",a)}}var a=window.MutationObserver||window.WebKitMutationObserver;e.fn.attrchange=function(n){var o={trackValues:!1,callback:e.noop};if("function"==typeof n?o.callback=n:e.extend(o,n),o.trackValues&&e(this).each(function(t,i){for(var a,n={},t=0,o=i.attributes,s=o.length;s>t;t++)a=o.item(t),n[a.nodeName]=a.value;e(this).data("attr-old-value",n)}),a){var s={subtree:!1,attributes:!0,attributeOldValue:o.trackValues},r=new a(function(t){t.forEach(function(t){var i=t.target;o.trackValues&&(t.newValue=e(i).attr(t.attributeName)),o.callback.call(i,t)})});return this.each(function(){r.observe(this,s)})}return t()?this.on("DOMAttrModified",function(e){e.originalEvent&&(e=e.originalEvent),e.attributeName=e.attrName,e.oldValue=e.prevValue,o.callback.call(this,e)}):"onpropertychange"in document.body?this.on("propertychange",function(t){t.attributeName=window.event.propertyName,i.call(e(this),o.trackValues,t),o.callback.call(this,t)}):this}}(jQuery),x3dom.registerNodeType("AnimationFramework","Core",defineClass(x3dom.nodeTypes.X3DSensorNode,function(e){x3dom.nodeTypes.AnimationFramework.superClass.call(this,e),e?e.doc._nodeBag.timer.push(this):x3dom.debug.logWarning("TimeSensor: No runtime context found!"),this.addField_MFString(e,"eventsUrl",[]),this.addField_SFFloat(e,"speed",1),this.addField_MFNode("children",x3dom.nodeTypes.HandlerModule),this._sources=[],this._events=[],this._guidcounter=0,this._onlyOneEventPerTimeStamp=!1,this._maxEventsPerTimeStamp=500,this._executionTimeMultiplicator=1,this._startTime=void 0,this._uidCounter=0,this._frameworkSceneTime=0,this._lastTimeStamp=0,this.nodes=void 0,this.edges=void 0,this._actions={},this._handleNextEventsFromEventStream=function(){if(this._onlyOneEventPerTimeStamp)this._events[0]&&this._events[0].time<this._frameworkSceneTime&&this._handleEvent(this._events.shift());else for(var e=0;this._events[0]&&this._events[0].time<this._frameworkSceneTime;){if(e++,e>this._maxEventsPerTimeStamp)return;this._handleEvent(this._events.shift())}},this._handleEvent=function(e){e.time=this._frameworkSceneTime,e.action&&this._actions[e.action]&&(e.parameters._eventTime=e.time,this._actions[e.action][e.action](e.parameters))},this._registerHandler=function(e){for(var t in e._actions)this._actions[t]=e},this._insertEvent=function(e){if(void 0!==e.time){if(!(this._events.length>0))return void(this._events[0]=e);if(0===e.time){for(var t=0;t<this._events.length-1;t++)if(this._events[t].time>0)return void this._events.splice(t+1,0,e);return void this._events.push(e)}if(e.time<this._events[0].time)return void(this._events=[e].concat(this._events));if(e.time>=this._events[this._events.length-1].time)return void this._events.push(e);for(var t=0;t<this._events.length-1;t++)if(e.time>=this._events[t].time&&e.time<=this._events[t+1].time)return void this._events.splice(t+1,0,e)}},this._insertEvents=function(e){console.log("insertion");for(var t=0;t<e.length;t++)this._insertEvent(e[t])},this._createSources=function(){this._sources=[];for(var e=0;e<this._vf.eventsUrl.length;e++){var t=this._nameSpace.getURL(this._vf.eventsUrl[e]);x3dom.debug.logInfo("Adding event file: "+t);var i=this;jQuery.getJSON(t,function(e){i._insertEvents(e)})}}},{parentAdded:function(e){var t=document.createElement("Transform");t.setAttribute("id","frameworknodes");var i=document.createElement("Transform");i.setAttribute("id","nodes");var a=document.createElement("Transform");a.setAttribute("id","edges"),t.appendChild(i),t.appendChild(a),document.getElementById(this._DEF).parentNode.appendChild(t),this.nodes=t,this.edges=t},getUID:function(){return"UID"+this._guidcounter++},nodeChanged:function(){x3dom.debug.logInfo("AnimationFramework: nodeChanged called"),this._createSources(),console.log(this)},tick:function(e){void 0!==this._startTime?(this._frameworkSceneTime+=1e3*(e-this._lastTimeStamp)*this._executionTimeMultiplicator,this._lastTimeStamp=e,this._handleNextEventsFromEventStream()):(this._startTime=e,this._lastTimeStamp=e)},fieldChanged:function(e){x3dom.debug.logInfo("AnimationFramework: fieldChanged called"+e),"eventsUrl"===e&&x3dom.debug.logInfo("AnimationFramework: new eventsUrl"),"speed"===e&&(this._executionTimeMultiplicator=this._vf.speed,console.log("setSpeed"+this._vf.speed))},addRoute:function(e,t,i,a,n){var o=document.createElement("ROUTE");o.setAttribute("id",e),o.setAttribute("fromNode",t),o.setAttribute("fromField",i),o.setAttribute("toNode",a),o.setAttribute("toField",n),document.getElementById("scene").appendChild(o)}})),x3dom.registerNodeType("HandlerModule","Core",defineClass(x3dom.nodeTypes.X3DTransformNode,function(e){x3dom.nodeTypes.HandlerModule.superClass.call(this,e),this._actions={},this._animationFramework=void 0},{fieldChanged:function(e){console.log("A")},nodeChanged:function(){console.log("B")},getActions:function(){return this._actions},parentAdded:function(e){e._registerHandler(this),this._animationFramework=e},getCompletedParameters:function(e,t){for(var i in e)void 0===t[i]&&(t[i]=e[i]);return t}})),x3dom.registerNodeType("NodeEventHandler","Core",defineClass(x3dom.nodeTypes.HandlerModule,function(e){x3dom.nodeTypes.NodeEventHandler.superClass.call(this,e),x3dom.debug.logInfo("NodeEventHandler: Constructor"),this._actions={addNode:this.addNode,removeNode:this.removeNode},this._nodeInitialPosition=new x3dom.fields.SFVec3f(0,0,0),this._positionCounter=0,this._positionOffset=3,this._positionOffsetIncrement=3,this._default_parameters={node_name:"",node_type:"CustomGlowingSphere",usedefaultlayout:!0,layout:void 0,use_label:!0,chaserduration:1,size:"2 2 2",centerattraction:-1},this._getInitialPosition=function(){return this._positionCounter++,this._positionCounter%26==0?(this._positionCounter=0,new x3dom.fields.SFVec3f(+this._positionOffset,0,0)):this._positionCounter%25==0?new x3dom.fields.SFVec3f(-this._positionOffset,0,0):this._positionCounter%24==0?new x3dom.fields.SFVec3f(0,-this._positionOffset,0):this._positionCounter%23==0?new x3dom.fields.SFVec3f(0,+this._positionOffset,0):this._positionCounter%22==0?new x3dom.fields.SFVec3f(0,0,-this._positionOffset):this._positionCounter%21==0?new x3dom.fields.SFVec3f(0,0,+this._positionOffset):this._positionCounter%20==0?new x3dom.fields.SFVec3f(-this._positionOffset,+this._positionOffset,0):this._positionCounter%19==0?new x3dom.fields.SFVec3f(+this._positionOffset,+this._positionOffset,0):this._positionCounter%18==0?new x3dom.fields.SFVec3f(+this._positionOffset,-this._positionOffset,0):this._positionCounter%17==0?new x3dom.fields.SFVec3f(-this._positionOffset,-this._positionOffset,0):this._positionCounter%16==0?new x3dom.fields.SFVec3f(-this._positionOffset,0,+this._positionOffset):this._positionCounter%15==0?new x3dom.fields.SFVec3f(+this._positionOffset,0,+this._positionOffset):this._positionCounter%14==0?new x3dom.fields.SFVec3f(+this._positionOffset,0,-this._positionOffset):this._positionCounter%13==0?new x3dom.fields.SFVec3f(-this._positionOffset,0,-this._positionOffset):this._positionCounter%12==0?new x3dom.fields.SFVec3f(0,-this._positionOffset,+this._positionOffset):this._positionCounter%11==0?new x3dom.fields.SFVec3f(0,+this._positionOffset,+this._positionOffset):this._positionCounter%10==0?new x3dom.fields.SFVec3f(0,+this._positionOffset,-this._positionOffset):this._positionCounter%9==0?new x3dom.fields.SFVec3f(0,-this._positionOffset,-this._positionOffset):this._positionCounter%8==0?new x3dom.fields.SFVec3f(-this._positionOffset,+this._positionOffset,+this._positionOffset):this._positionCounter%7==0?new x3dom.fields.SFVec3f(-this._positionOffset,-this._positionOffset,+this._positionOffset):this._positionCounter%6==0?new x3dom.fields.SFVec3f(-this._positionOffset,+this._positionOffset,-this._positionOffset):this._positionCounter%5==0?new x3dom.fields.SFVec3f(+this._positionOffset,-this._positionOffset,+this._positionOffset):this._positionCounter%4==0?new x3dom.fields.SFVec3f(+this._positionOffset,+this._positionOffset,+this._positionOffset):this._positionCounter%3==0?new x3dom.fields.SFVec3f(+this._positionOffset,+this._positionOffset,-this._positionOffset):this._positionCounter%2==0?new x3dom.fields.SFVec3f(+this._positionOffset,-this._positionOffset,-this._positionOffset):(this._positionOffset+=this._positionOffsetIncrement,new x3dom.fields.SFVec3f(-this._positionOffset,-this._positionOffset,-this._positionOffset))};var t='<Box size="1.0 1.0 1.0"></Box>',i='<Cone bottomradius="0.5" height="1"></Cone>',a='<Cylinder radius="0.5" height="1"></Cylinder>',n='<Sphere radius="0.5"></Sphere>',o='<Torus innerRadius="0.25" outerRadius="0.5"></Torus>';this._templates={Box:t,Cone:i,Cylinder:a,Sphere:n,Torus:o},this._createNode=function(e){var t;t=this._templates[e.node_type]?jQuery.parseHTML(this._templates[e.node_type]):jQuery.parseHTML(this._templates.Box),jQuery(t).attr("id",this._animationFramework.getUID());var i=jQuery.parseHTML('<Transform data-geometry-id="'+jQuery(t).attr("id")+'"data-id="node"><Transform  data-id="decoration-handle"><Transform data-tf-type="rotate-transform"><Shape onclick="handleSingleClick(this)"><MetadataString name="information" value=""></MetadataString><Appearance><Material data-mat-type="node_material"></Material></Appearance><Transform data-id="geometry"></Transform></Shape></Transform></Transform><Transform translation="0 -2 0"><Billboard axisOfRotation="0 0 0"><Shape onclick="handleSingleClick(this)"><MetadataString name="information" value=""></MetadataString><Appearance><Material data-mat-type="label_material"></Material></Appearance><Text string="test"><FontStyle justify="&quot;MIDDLE&quot;"></FontStyle></Text></Shape></Billboard></Transform></Transform>');for(var a in e)("node_name"===a||"node_id"===a||"centerattraction"===a||"layout"===a||"usedefaultlayout"===a||a.chaserduration)&&jQuery(i).attr("data-"+a,e[a]),"node_id"===a&&jQuery(i).attr("id",e[a]),"size"===a&&(3===e[a].split(" ").length?jQuery(i).attr("scale",e[a]):jQuery(i).attr("scale",e[a]+","+e[a]+","+e[a])),"color"===a&&jQuery(i).find("material").attr("diffuseColor",e[a]),"emissivecolor"===a&&jQuery(i).find("material").attr("emissiveColor",e[a]),"transparency"===a&&jQuery(i).find('material[data-mat-type="node_material"]').attr("transparency",e[a]),"rotation"===a&&jQuery(i).find('transform[data-tf-type="rotate-transform"]').attr("rotation",e[a]),"metadata"===a&&jQuery(i).find('metadatastring[name="information"]').attr("value",e[a]),"use_label"===a&&1==e[a]&&jQuery(i).find("text").attr("string",e.label),"use_label"===a&&0==e[a]&&jQuery(i).find("text").attr("string",""),"initial_position"===a&&jQuery(i).attr("translation",e[a]);return void 0==e.initial_position&&jQuery(i).attr("translation",this._getInitialPosition()),void 0==jQuery(i).attr("id")&&jQuery(i).attr("data-node_name")&&jQuery(i).attr("id",jQuery(i).attr("data-node_name")),jQuery(i).find('[data-id="geometry"]').after(t),jQuery(i).find('[data-id="geometry"]').remove(),i[0]}},{fieldChanged:function(e){},nodeChanged:function(){},addNode:function(e){var t=this._createNode(e),i=this._animationFramework.nodes;setTimeout(function(){i.appendChild(t)},0)},removeNode:function(e){if(e.node_id){var t=document.getElementById(e.node_id);if(t)this._animationFramework.nodes.removeChild(t);else{var i=this;setTimeout(function(){i.removeNode(e),console.log("AA")},50)}}}})),x3dom.registerNodeType("EdgeEventHandler","Core",defineClass(x3dom.nodeTypes.HandlerModule,function(e){x3dom.nodeTypes.EdgeEventHandler.superClass.call(this,e),this._actions={addEdge:this.addEdge,removeEdge:this.removeEdge},this._default_parameters={edge_type:"Arrow",create_routes:!0},this._createEdge=function(e){var t='<Transform data-type="arrowtransform"><Group><Transform translation="0 -0.05 0"><Shape><Appearance><Material transparency="0.0"></Material></Appearance><Cylinder radius=".05" height="0.9"></Cylinder></Shape></Transform><Group><Transform translation="0 -0.05 0"><Shape><Appearance><Material transparency="0.0"></Material></Appearance><Cylinder radius=".05" height="0.9"></Cylinder></Shape></Transform><Transform translation="0 0.45 0"><Shape><Appearance><Material transparency="0.0"></Material></Appearance><Cone bottomRadius=".3" height="0.1"/></Shape></Transform></Group></Transform>',i=jQuery.parseHTML(t);return i[0]}},{fieldChanged:function(e){},nodeChanged:function(){},addEdge:function(e){e=this.getCompletedParameters(this._default_parameters,e);var t=this._animationFramework.nodes,i=this._createEdge(e);setTimeout(function(){t.appendChild(i)},0),console.log("add Edge"),console.log(e);var a=e.from,n=e.to;if(e.from!=e.to){var o=this;setTimeout(function(){console.log("Huhu"),o.actualize(i,a,n),o.linkNodes(a,n,i)},0)}},removeEdge:function(e){console.log("remove edge")},linkNodes:function(e,t,i){console.log("linknodes");var a=document.getElementById(e),n=document.getElementById(t),o="outputChanged"+this._animationFramework.getUID(),s="outputChanged"+this._animationFramework.getUID(),r=this;window[o]=function(e){"translation"==e.fieldName&&r.actualizeWithPosition(i,[e.value.x,e.value.y,e.value.z],!0)},window[s]=function(e){"translation"==e.fieldName&&r.actualizeWithPosition(i,[e.value.x,e.value.y,e.value.z],!1)};var d=a.getAttribute("onoutputchange"),l=n.getAttribute("onoutputchange");d?a.setAttribute("onoutputchange",d+";"+o+"(event)"):a.setAttribute("onoutputchange",o+"(event)"),l?n.setAttribute("onoutputchange",l+";"+s+"(event)"):n.setAttribute("onoutputchange",s+"(event)")},actualize:function(e,t,i){console.log("actualize");var a=jQuery("#"+t),n=jQuery("#"+i),o=a.attr("translation").split(" "),s=n.attr("translation").split(" "),r=[s[0]-o[0],s[1]-o[1],s[2]-o[2]],d=Math.sqrt(Math.pow(r[0],2)+Math.pow(r[1],2)+Math.pow(r[2],2)),l=[s[2]-o[2],0,-1*(s[0]-o[0]),Math.acos((s[1]-o[1])/d)],u=[1*o[0]+(s[0]-o[0])/2,1*o[1]+(s[1]-o[1])/2,1*o[2]+(s[2]-o[2])/2];jQuery(e).attr("scale","1 "+d+" 1"),jQuery(e).attr("rotation",l.join(" ")),jQuery(e).attr("translation",u.join(" ")),e.setAttribute("data-source-position",o.join(" ")),e.setAttribute("data-target-position",s.join(" ")),jQuery(e).attr("data-source_name",t),jQuery(e).attr("data-target_name",i)},actualizeWithPosition:function(e,t,i){if(i)var a=t,n=e.getAttribute("data-target-position").split(" ");else var a=e.getAttribute("data-source-position").split(" "),n=t;var o=[n[0]-a[0],n[1]-a[1],n[2]-a[2]],s=Math.sqrt(Math.pow(o[0],2)+Math.pow(o[1],2)+Math.pow(o[2],2)),r=[n[2]-a[2],0,-1*(n[0]-a[0]),Math.acos((n[1]-a[1])/s)],d=[1*a[0]+(n[0]-a[0])/2,1*a[1]+(n[1]-a[1])/2,1*a[2]+(n[2]-a[2])/2];s&&e.setAttribute("scale","1 "+s+" 1"),e.setAttribute("rotation",r.join(" ")),e.setAttribute("translation",d.join(" ")),i?(jQuery("[data-source_name='"+e.getAttribute("data-source_name")+"']").each(function(e,t){this.setAttribute("data-source-position",a.join(" "))}),jQuery("[data-target_name='"+e.getAttribute("data-source_name")+"']").each(function(){this.setAttribute("data-target-position",a.join(" "))})):(jQuery("[data-source_name='"+e.getAttribute("data-target_name")+"']").each(function(e,t){this.setAttribute("data-source-position",n.join(" "))}),jQuery("[data-target_name='"+e.getAttribute("data-target_name")+"']").each(function(){this.setAttribute("data-target-position",n.join(" "))}))}})),x3dom.registerNodeType("NodePropertyChangeHandler","Core",defineClass(x3dom.nodeTypes.HandlerModule,function(e){x3dom.nodeTypes.NodeEventHandler.superClass.call(this,e),x3dom.debug.logInfo("NodePropertyChangeHandler: Constructorsss"),this._actions={changeSize:this.changeSize,changeScale:this.changeScale,changeColor:this.changeColor,changeOuterRadius:this.changeOuterRadius,changeEmissiveColor:this.changeEmissiveColor,changeTransparency:this.changeTransparency},this._size_default_parameters={node_name:"",duration:1e4,target_value:"4.0 4.0 4.0"},this._color_default_parameters={node_name:"",duration:1e4,target_value:"1.0 1.0 1.0"},this._transparency_default_parameters={node_name:"",duration:1e4,target_value:"1.0"},this._scalar_default_parameters={node_name:"",duration:1e4,target_value:"1.0"},this._getInterpolator=function(e,t,i,a){var n=document.createElement(t+"Interpolator");return n.setAttribute("id",e),n.setAttribute("key",i),n.setAttribute("keyValue",a),n},this._getTimeSensor=function(e,t,i){if(timesensorId=i+"___"+t+"___"+e,this._timeSensors[timesensorId])return{id:timesensorId};var a=document.createElement("TimeSensor");return a.setAttribute("id",timesensorId),a.setAttribute("cycleInterval",e),a.setAttribute("loop",t),0==t&&a.setAttribute("startTime",Date.now()/1e3),{id:timesensorId,element:a}},this._timeSensors={},this._changeProperty=function(e,t){if(e.node_def){var i=document.getElementById(e.node_def);i=i.getElementsByTagName("MATERIAL")[0]}else var i=document.getElementById(e.node_id);if(i){(void 0==i.id||""==i.id)&&(i.id=this._animationFramework.getUID(),i.def=i.id);var a,n,o,s,r,d;n="transparency"!=t&&"outerRadius"!=t?3===e.target_value.split(" ").length?e.target_value:e.target_value+" "+e.target_value+" "+e.target_value:e.target_value;var l=this;switch(t){case"size":d="Position",i=document.getElementById(jQuery(i).attr("data-geometry-id")),a=jQuery(i).attr("size");break;case"scale":d="Position",a=jQuery(i).attr("scale");var u="outputChanged"+this._animationFramework.getUID();window[u]=function(e){"value_changed"==e.fieldName&&l.actualizeScaleData(i,[e.value.x,e.value.y,e.value.z])};break;case"diffuseColor":d="Color",a=jQuery(i).attr("diffuseColor");break;case"emissiveColor":d="Color",a=jQuery(i).attr("emissiveColor");break;case"transparency":d="Scalar",a=jQuery(i).attr("transparency");break;case"outerRadius":d="Scalar";var u="outputChanged"+this._animationFramework.getUID(),l=this;window[u]=function(e){"value_changed"==e.fieldName&&l.actualizeOuterRadiusData(i,[e.value])},a=jQuery(i).attr("outerRadius");break;default:return void console.log("unknown attribute to change")}e.type&&"show_and_return_later"==e.type?(s=a+" "+n+" "+n+" "+n+" "+a,o="0 0.05 0.5 0.95 1"):e.type&&"show_and_return"==e.type?(s=a+" "+n+" "+a,o="0 0.5 1"):(s=a+" "+n,o="0 1");var h;h=this._animationFramework.getUID(),r=this._getInterpolator(h,d,o,s),u&&r.setAttribute("onoutputchange",u+"(event)"),document.getElementById("scene").appendChild(r);var f=this._animationFramework;setTimeout(function(){e.count?timeSensor=l._getTimeSensor(e.duration/1e3,!1,e._eventTime):timeSensor=l._getTimeSensor(e.duration/1e3,!0,e._eventTime),timeSensor.element&&document.getElementById("scene").appendChild(timeSensor.element);var a=timeSensor.id;f.addRoute(f.getUID(),a,"fraction_changed",h,"set_fraction"),f.addRoute(f.getUID(),h,"value_changed",i.id,t)},0)}else console.log(t),console.log("Node not found")}},{fieldChanged:function(e){},nodeChanged:function(){},changeScale:function(e){e=this.getCompletedParameters(this._size_default_parameters,e),this._changeProperty(e,"scale")},changeSize:function(e){e=this.getCompletedParameters(this._size_default_parameters,e),this._changeProperty(e,"size")},changeOuterRadius:function(e){e=this.getCompletedParameters(this._scalar_default_parameters,e),this._changeProperty(e,"outerRadius")},changeColor:function(e){e=this.getCompletedParameters(this._color_default_parameters,e),this._changeProperty(e,"diffuseColor")},changeEmissiveColor:function(e){e=this.getCompletedParameters(this._color_default_parameters,e),this._changeProperty(e,"emissiveColor")},changeTransparency:function(e){e=this.getCompletedParameters(this._transparency_default_parameters,e),this._changeProperty(e,"transparency")},actualizeScaleData:function(e,t){e.setAttribute("scale",t[0]+" "+t[1]+" "+t[2])},actualizeDiffuseColorData:function(e,t){e.setAttribute("diffuseColor",t.r+" "+t.g+" "+t.b)},actualizeOuterRadiusData:function(e,t){e.setAttribute("outerRadius",t)}})),x3dom.registerNodeType("MoveNodeHandler","Core",defineClass(x3dom.nodeTypes.HandlerModule,function(e){x3dom.nodeTypes.MoveNodeHandler.superClass.call(this,e),x3dom.debug.logInfo("MoveNodeHandler: Constructor"),this._actions={moveNode:this.moveNode,moveNodeCircular:this.moveNodeCircular},this._default_parameters={position:"0.0 0.0 0.0",chaserduration:.001,duration:1e4,last_moving_duration:0,target_value:"3.0 3.0 3.0",direction_for_circular:"z"},this._actualize=function(e,t,i){var a=jQuery("#"+t),n=jQuery("#"+i),o=a.attr("translation").split(" "),s=n.attr("translation").split(" "),r=[s[0]-o[0],s[1]-o[1],s[1]-o[1]],d=Math.sqrt(Math.pow(r[0],2)+Math.pow(r[1],2)+Math.pow(r[2],2)),l=[s[2]-o[2],0,-1*(s[0]-o[0]),Math.acos((s[1]-o[1])/d)],u=[1*o[0]+(s[0]-o[0])/2,1*o[1]+(s[1]-o[1])/2,1*o[2]+(s[2]-o[2])/2];jQuery(e).attr("scale","1 "+d+" 1"),jQuery(e).attr("rotation",l.join(" ")),jQuery(e).attr("translation",u.join(" ")),jQuery(e).attr("data-source_name",t),jQuery(e).attr("data-target_name",i),this._linkNodes(t,i,e)},this._getInterpolator=function(e,t,i,a){var n=document.createElement(t+"Interpolator");return n.setAttribute("id",e),n.setAttribute("key",i),n.setAttribute("keyValue",a),n},this._getTimeSensor=function(e,t,i,a){var n=document.createElement("TimeSensor");return n.setAttribute("id",e),n.setAttribute("cycleInterval",t),n.setAttribute("loop",i),n.setAttribute("startTime",a),n},this._getKeysAndKeyValues=function(e,t,i){var a=e.split(" ");1==a.length&&(a=e.split(","));var n=t.split(" ");1==n.length&&(n=t.split(","));var o=[.1,.2,.3,.4,.5,.6,.7,.8,.9];e=new x3dom.fields.SFVec3f(parseFloat(a[0]),parseFloat(a[1]),parseFloat(a[2])),t=new x3dom.fields.SFVec3f(parseFloat(n[0]),parseFloat(n[1]),parseFloat(n[2]));var s=t.subtract(e);if(0==s.length())return["0","0"];var r=e.add(s.divide(2)),d=[e.x+" "+e.y+" "+e.z];jQuery.each(o,function(){var t=(new x3dom.fields.SFVec3f(0,1,0),new x3dom.fields.SFVec3f(1,0,0),new x3dom.fields.SFVec3f(0,0,1)),i=t,a=new x3dom.fields.SFVec3f(i.y*s.z-i.z*s.y,i.z*s.x-i.x*s.z,i.x*s.y-i.y*s.x);a=a.divide(a.length());var n=Math.PI*this,o=a,l=Math.cos(n),u=Math.sin(n),h=[[o.x*o.x*(1-l)+l,o.x*o.y*(1-l)-o.z*u,o.x*o.z*(1-l)+o.y*u],[o.y*o.x*(1-l)+o.z*u,o.y*o.y*(1-l)+l,o.y*o.z*(1-l)-o.x*u],[o.z*o.x*(1-l)-o.y*u,o.z*o.y*(1-l)+o.x*u,o.z*o.z*(1-l)+l]],f=e.subtract(r),m=new x3dom.fields.SFVec3f(h[0][0]*f.x+h[0][1]*f.y+h[0][2]*f.z,h[1][0]*f.x+h[1][1]*f.y+h[1][2]*f.z,h[2][0]*f.x+h[2][1]*f.y+h[2][2]*f.z).add(r);d.push(m.x+" "+m.y+" "+m.z)}),d.push(t.x+" "+t.y+" "+t.z);var l=[0].concat(o).concat([1]);return[l,d]}},{fieldChanged:function(e){},nodeChanged:function(){},moveNode:function(e){e=this.getCompletedParameters(this._default_parameters,e);var t=document.getElementById(e.node_id);if(3===e.target_value.split(" ").length)new_value=e.target_value;else if(e.target_node){document.getElementById(e.node_id)}interpolator_name="Position",old_value=jQuery(t).attr("translation"),key_value=old_value+" "+new_value,key="0 1";var i,a;i=this._animationFramework.getUID(),a=this._animationFramework.getUID(),interpolator=this._getInterpolator(i,interpolator_name,key,key_value),time_sensor=this._getTimeSensor(a,e.duration/1e3,!1,Date.now()/1e3),document.getElementById("scene").appendChild(interpolator),document.getElementById("scene").appendChild(time_sensor),this._animationFramework.addRoute(this._animationFramework.getUID(),a,"fraction_changed",i,"set_fraction"),this._animationFramework.addRoute(this._animationFramework.getUID(),i,"value_changed",t.id,"translation")},moveNodeCircular:function(e){e=this.getCompletedParameters(this._default_parameters,e);var t=this,i=function(){var a=document.getElementById(e.node_id);if(a){var n="outputChanged"+t._animationFramework.getUID();if(window[n]=function(e){"value_changed"==e.fieldName&&t.actualizePositionData(a,[e.value.x,e.value.y,e.value.z])},3===e.target_value.split(" ").length)new_value=e.target_value;else if(3===e.target_value.split(",").length)new_value=e.target_value.split(",").join(" ");else if(e.target_node){document.getElementById(e.node_id)}interpolator_name="Position",old_value=a.getAttribute("translation"),key_value=old_value+" "+new_value,key="0 1";var o,s,r=t._getKeysAndKeyValues(old_value,new_value,"-z");key_value=r[1],key=r[0],o=t._animationFramework.getUID(),s=t._animationFramework.getUID(),interpolator=t._getInterpolator(o,interpolator_name,key,key_value),interpolator.setAttribute("onoutputchange",n+"(event)"),time_sensor=t._getTimeSensor(s,e.duration/1e3,!1,Date.now()/1e3),document.getElementById("scene").appendChild(interpolator),document.getElementById("scene").appendChild(time_sensor),t._animationFramework.addRoute(t._animationFramework.getUID(),s,"fraction_changed",o,"set_fraction"),t._animationFramework.addRoute(t._animationFramework.getUID(),o,"value_changed",a.id,"translation")}else console.log("wait..."),setTimeout(i,10)};i()},actualizePositionData:function(e,t){e.setAttribute("translation",t)}}));x3dom.registerNodeType("NodePropertyChangeHandler","Core",defineClass(x3dom.nodeTypes.HandlerModule,function(e){x3dom.nodeTypes.NodeEventHandler.superClass.call(this,e),x3dom.debug.logInfo("NodePropertyChangeHandler: Constructorsss"),this._actions={changeSize:this.changeSize,changeScale:this.changeScale,changeColor:this.changeColor,changeOuterRadius:this.changeOuterRadius,changeEmissiveColor:this.changeEmissiveColor,changeTransparency:this.changeTransparency},this._size_default_parameters={node_name:"",duration:1e4,target_value:"4.0 4.0 4.0"},this._color_default_parameters={node_name:"",duration:1e4,target_value:"1.0 1.0 1.0"},this._transparency_default_parameters={node_name:"",duration:1e4,target_value:"1.0"},this._scalar_default_parameters={node_name:"",duration:1e4,target_value:"1.0"},this._getInterpolator=function(e,t,a,r){var n=document.createElement(t+"Interpolator");return n.setAttribute("id",e),n.setAttribute("key",a),n.setAttribute("keyValue",r),n},this._getTimeSensor=function(e,t,a){if(timesensorId=a+"___"+t+"___"+e,this._timeSensors[timesensorId])return{id:timesensorId};var r=document.createElement("TimeSensor");return r.setAttribute("id",timesensorId),r.setAttribute("cycleInterval",e),r.setAttribute("loop",t),0==t&&r.setAttribute("startTime",Date.now()/1e3),{id:timesensorId,element:r}},this._timeSensors={},this._changeProperty=function(e,t){if(e.node_def){a=document.getElementById(e.node_def);a=a.getElementsByTagName("MATERIAL")[0]}else var a=document.getElementById(e.node_id);if(a){void 0!=a.id&&""!=a.id||(a.id=this._animationFramework.getUID(),a.def=a.id);var r,n,o,i,s,u;n="transparency"!=t&&"outerRadius"!=t?3===e.target_value.split(" ").length?e.target_value:e.target_value+" "+e.target_value+" "+e.target_value:e.target_value;l=this;switch(t){case"size":u="Position",a||(a=document.getElementById(jQuery(a).attr("data-geometry-id"))),r=jQuery(a).attr("size");break;case"scale":u="Position",r=jQuery(a).attr("scale");d="outputChanged"+this._animationFramework.getUID();if(window[d]=function(e){"value_changed"==e.fieldName&&l.actualizeScaleData(a,[e.value.x,e.value.y,e.value.z])},e.only_y&&"true"==e.only_y)try{jQuery(a).attr("center","0.0 "+-parseFloat(jQuery(a).find("[size]").attr("size").split(/\s+/)[1])/2+" 0.0")}catch(e){}break;case"diffuseColor":u="Color",r=jQuery(a).attr("diffuseColor");break;case"emissiveColor":u="Color",r=jQuery(a).attr("emissiveColor");break;case"transparency":u="Scalar",r=jQuery(a).attr("transparency");break;case"outerRadius":u="Scalar";var d="outputChanged"+this._animationFramework.getUID(),l=this;window[d]=function(e){"value_changed"==e.fieldName&&l.actualizeOuterRadiusData(a,[e.value])},r=jQuery(a).attr("outerRadius");break;default:return void console.log("unknown attribute to change")}e.type&&"show_and_return_later"==e.type?(i=r+" "+n+" "+n+" "+n+" "+r,o="0 0.05 0.5 0.95 1"):e.type&&"show_and_return"==e.type?(i=r+" "+n+" "+r,o="0 0.5 1"):e.type&&"show_stay_and_return"==e.type?(i=r+" "+n+" "+n+" "+r,o="0 0.4 0.6 1"):(i=r+" "+n,o="0 1");var c;c=this._animationFramework.getUID(),s=this._getInterpolator(c,u,o,i),d&&s.setAttribute("onoutputchange",d+"(event)"),document.getElementById("scene").appendChild(s);var _=this._animationFramework;setTimeout(function(){e.count?timeSensor=l._getTimeSensor(e.duration/1e3,!1,e._eventTime):timeSensor=l._getTimeSensor(e.duration/1e3,!0,e._eventTime),timeSensor.element&&document.getElementById("scene").appendChild(timeSensor.element);var r=timeSensor.id;_.addRoute(_.getUID(),r,"fraction_changed",c,"set_fraction"),_.addRoute(_.getUID(),c,"value_changed",a.id,t)},0)}else console.log(t),console.log(e.node_id),console.log("Node not found")}},{fieldChanged:function(e){},nodeChanged:function(){},changeScale:function(e){e=this.getCompletedParameters(this._size_default_parameters,e),this._changeProperty(e,"scale")},changeSize:function(e){e=this.getCompletedParameters(this._size_default_parameters,e),this._changeProperty(e,"size")},changeOuterRadius:function(e){e=this.getCompletedParameters(this._scalar_default_parameters,e),this._changeProperty(e,"outerRadius")},changeColor:function(e){e=this.getCompletedParameters(this._color_default_parameters,e),this._changeProperty(e,"diffuseColor")},changeEmissiveColor:function(e){e=this.getCompletedParameters(this._color_default_parameters,e),this._changeProperty(e,"emissiveColor")},changeTransparency:function(e){e=this.getCompletedParameters(this._transparency_default_parameters,e),this._changeProperty(e,"transparency")},actualizeScaleData:function(e,t){e.setAttribute("scale",t[0]+" "+t[1]+" "+t[2])},actualizeDiffuseColorData:function(e,t){e.setAttribute("diffuseColor",t.r+" "+t.g+" "+t.b)},actualizeOuterRadiusData:function(e,t){e.setAttribute("outerRadius",t)}}));
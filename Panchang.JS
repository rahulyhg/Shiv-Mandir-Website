var srv_root = "http://www.indianastrologysoftware.com/widget/wpanchang/";
/* var srv_root = "http://192.168.0.216/php/test";*/
var cssFile = "av.tools.widget.rv_new.css";
var cssFile2 = "https://fonts.googleapis.com/icon?family=Material+Icons";
var cssFile3 = "https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.css";
var cssFile4 = "http://www.indianastrologysoftware.com/widget/wpanchang/style.css";
//var cssFile = "av.tools.widget.big.css";
var gwindowspath = 'http://rep.clickastro.com/';
var av$ = function(id){ return new DomElm(id)};
var sun = 'Sun';
var moon = 'Moon';
var moonbackground ='';
var sunbackground = 'bbgrey';
var ecode =0;
var randomvariable ='1231werwer141';
var DomElm = function(id){ this.instance = document.getElementById(id); };

DomElm.prototype.setHTML = function(h){ this.instance.innerHTML = h; };
DomElm.prototype.clear = function(){ this.setHTML("");};
var ecode = 0;

var jq = document.createElement("script");
jq.type = "text/javascript";
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.body.appendChild(jq);

var js = document.createElement("script");
js.type = "text/javascript";
js.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBywcZIjdvJIypHUWlUaXf_aK24O8400t8&signed_in=true&libraries=places";
document.body.appendChild(js);

var aCurrentLocationResults = null;
var avHoroClientId = 'IAS-FREE-WIDGET';
// onload panchang widget set impressions and clicks
var onloadPanchangWidget = function(sType)
{
	if(window.location.hostname != 'www.indianastrologysoftware.com') {
		var sHostname 	= window.location.hostname;
		var sFullUrl 	= window.location.href;
		var sAjaxUrl 	= 'http://www.indianastrologysoftware.com/widget/panchang-widget-tracking/panchang_widget_handler.php';

		$.ajax({
			'url' 		: sAjaxUrl,
			'method' 	: 'POST',
			'data' 		: {
				sHostname 	: sHostname,
				sFullUrl 	: sFullUrl,
				status 		: sType
			},
			success:function(response){
				var oResponse 	= JSON.parse(response);
				avHoroClientId 	= oResponse.client_id;

				// remove panchang widget if admin deactivated the client
				if(oResponse.approved == 'N') {
					$('#astro_widget').hide();
					$('#avx_widget_148_wid').hide();
					return false;
				}

				// chart style selection on load
				if(oResponse.client_chart) {
					setTimeout(function(){
						$('#av-selectRegion').val(oResponse.client_chart);
						refreshRegion();
					},1000);
				}

				// location selection on load
				if(oResponse.client_location) {
					setTimeout(function(){
						var ReturnData = getLocationAreaDetails(oResponse.client_location);
					},5000);
				}
			}
		});
	}
}

/*setTimeout(function(){
	onloadPanchangWidget('Impressions');
},3000);
*/

/*
	validClients holds the list of registered clients for the widget
	whenever a new client comes please add that client in the list 
	with the unique key for the client's domain
*/

var JSONScript = function(url)
{
	/* REST request path */
    this.fullUrl = url; 
    /* Keep IE from caching requests */
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    /* Get the DOM location to put the script tag */
    this.headLoc = document.getElementsByTagName("head").item(0);
    /* Generate a unique script tag id */
    this.scriptId = 'JscriptId' + JSONScript.scriptCounter++;
};
JSONScript.scriptCounter = 1;
JSONScript.prototype.buildScriptTag = function () 
{

	/* Create the script tag */
	this.scriptObj = document.createElement("script");
	
	/*  Add script object attributes */
	this.scriptObj.setAttribute("type", "text/javascript");
	this.scriptObj.setAttribute("charset", "utf-8");
	this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
	this.scriptObj.setAttribute("id", this.scriptId);
};


JSONScript.prototype.removeScriptTag = function () 
{
	/*  Destroy the script tag */
	this.headLoc.removeChild(this.scriptObj);  
};

JSONScript.prototype.addScriptTag = function () 
{
    /* Create the script tag	*/
	this.buildScriptTag();
    this.headLoc.appendChild(this.scriptObj);
};

var Element = function(type,att)
{
	/*
	The Element Object creates a Dom Element
	and sets the attributes for it that we supply.
	The create() function returns the object	*/

	this.instance = document.createElement(type);
	for(i in att)
	{	if(i =='html'){ this.instance.innerHTML = att[i];}
		else if(i =='class') this.instance.className = att[i]+"";
		else this.instance.setAttribute(i,att[i]);
	}
};

Element.prototype.create = function(){ return this.instance; };

var buildCssTag = function () 
{

	/* Create the script tag */
	cssScriptObj = document.createElement("link");
	
	/*  Add script object attributes */
	cssScriptObj.setAttribute("type", "text/css");
	cssScriptObj.setAttribute("charset", "utf-8");
	cssScriptObj.setAttribute("rel", "stylesheet");
	cssScriptObj.setAttribute("href", srv_root+''+cssFile);
	cssScriptObj.setAttribute("id", 'tag'+cssFile.replace(".",""));
	document.getElementsByTagName("head").item(0).appendChild(cssScriptObj);
};
var buildCssTag2 = function () 
{

	/* Create the script tag */
	cssScriptObj2 = document.createElement("link");
	
	/*  Add script object attributes */
	cssScriptObj2.setAttribute("type", "text/css");
	cssScriptObj2.setAttribute("charset", "utf-8");
	cssScriptObj2.setAttribute("rel", "stylesheet");
	cssScriptObj2.setAttribute("href", cssFile2);
	document.getElementsByTagName("head").item(0).appendChild(cssScriptObj2);
};

var buildCssTag3 = function () 
{

	/* Create the script tag */
	cssScriptObj3 = document.createElement("link");
	
	/*  Add script object attributes */
	cssScriptObj3.setAttribute("type", "text/css");
	cssScriptObj3.setAttribute("charset", "utf-8");
	cssScriptObj3.setAttribute("rel", "stylesheet");
	cssScriptObj3.setAttribute("href", cssFile3);
	document.getElementsByTagName("head").item(0).appendChild(cssScriptObj3);
};

var buildCssTag4 = function () 
{

	/* Create the script tag */
	cssScriptObj4 = document.createElement("link");
	
	/*  Add script object attributes */
	cssScriptObj4.setAttribute("type", "text/css");
	cssScriptObj4.setAttribute("charset", "utf-8");
	cssScriptObj4.setAttribute("rel", "stylesheet");
	cssScriptObj4.setAttribute("href", cssFile4);
	document.getElementsByTagName("head").item(0).appendChild(cssScriptObj4);
};


/* ----------------------------------------------------------
				Widget Area Starts Here
--------------------------------------------------------------*/

var jObj = null; var cback = 'parseOutput';
var avWidget = null;
var options = { initScreen:'',width:0,height:0,chartStyle:0,region:'null',language:'null',key:'',link:'',target1:'',target2:'',clientid:'',color1:''};
var wInput = null;
var astroData = null;
var curDate = new Date();
var ld = loading();
var sInput = {type:"Country",country:"",state:"",place:"",data:"",curIndex:0,curSCity:''};
var predictionOptions = {type:"Sun",sign:"Aries",signId:"1",caption:"Aries"};
var sunsigns=new Array("","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces");
var moonsigns=new Array("","Mesha","Vrishaba","Mithuna","Karkata","Simha","Kanya","Thula","Vrischika","Dhanu","Makara","Kumbha","Meena");
var sunoneliner=new Array("","","","","","","","","","","","","");
var moononeliner=new Array("","","","","","","","","","","","","");
var targetElementId = null;

var inpSearch = '<div name="frm" onsubmit="return false;"><input type="text" class="prf_tbox pt11 av_fa" '+
				'onblur="doSearch(this)" id="tbsearch" name="tbsearch" value="**VL**" onclick="refreshSbox(this)" />'+
				'<input type="image"  src="'+srv_root+'images/dbullet_grey.gif" width="10" height="9" class="pl3 cp" '+
				'onclick=""/></div>';

var resTpl =	'<div class="pt11 av_fa">'+
				'<div class="blk b">**PLC**</div>'+
				'<div class="shim2px cb">&nbsp;</div>'+
				'<div class="w60 fl">Longitude : </div><div class="w60 fl">**LNG**</div>'+
				'<div class="w60 fl">Latitude : </div><div class="w60 fl">**LAT**</div>'+
				'<div class="w60 fl">Time Zone : </div><div class="w60 fl">**TZN**</div>'+
				'<div class="shim2px cb">&nbsp;</div>'+
				'<div class="cb">Time Correction : </div>'+
				'</div>';


var selTimeCorr = function()
{				
	aTc = [" Standard Time", "Summer Time (Daylight Saving Time)"," Double Summer Time", " War Time"];
	sel =		new Element('select',{id:"selTimeCorr",html:'','class':'prf_sel pt11 fa'}).create();
	for(var c=0;c<aTc.length;c++)
	{
		el = new Element('option',{'value':c+'',html:aTc[c]}).create();
		sel.appendChild(el);
	}
	return sel;
};

var refreshSbox = function(el)
{
	if(el.value.indexOf("Country") == 0 || el.value.indexOf("State") == 0 || el.value.indexOf("City") == 0)
	{
		sInput.type = el.value.replace(" ","");
		el.value="";
	}
};
var refreshRegion = function()
{
    //console.log(src);
    var av_slctdRegion = document.getElementById('av-selectRegion').value;
    document.getElementById('av-shakavarshaVal').innerHTML = "Loading..";
    //console.log(av_slctdRegion);
	options.region = av_slctdRegion;
	//src.parentNode.innerHTML = "Loading..";
	loadWidget('panchanga2',true);
};
/*
var refreshRegion = function(src)
{
    console.log(src);
	options.region = src.value;
	src.parentNode.innerHTML = "Loading..";
	loadWidget('basic',true);
};*/
var selRegion = function()
{
	reg = ["Sakavarsha","Malayalam","Tamil","Telugu"];
	sel = new Element('select',{id:"selRegion",html:'','class':'prf_sel pt11 fa', onchange:'refreshRegion(this);'}).create();
	s = false;
	for(var c=0;c<reg.length;c++)
	{
		if(astroData.header.regional.year_caption == reg[c]) s = true; else s = false;
		el = new Element('option',{'value':reg[c].substring(0,3).toUpperCase(),html:reg[c]}).create();
		if(s) el.setAttribute("selected","selected");
		sel.appendChild(el);
	}
	return sel;
};
var strSelRegion = function()
{
	dv = new Element('div',{html:''}).create();
	dv.appendChild(selRegion());
	return dv.innerHTML;
};

var doSearch = function(el)
{
	if(el.value.length == 0) return (el.value = sInput.type);
	
	if(sInput.type == "Finish"){ sInput.curSCity = sInput.place;}
	av$('src_result').setHTML("<div class=\'head-text3\'><center>Loading..</center></div>");
	try
	{
		lsrv =  "http://www.indianastrologysoftware.com/widget/wpanchang/location.search.v2.php?callBk=loadPlace&type="+sInput.type+"&value="+el.value+''+
				'&country='+sInput.country+'&state='+sInput.state+'&city='+((sInput.type != "Finish")?sInput.place :sInput.curSCity)+'&index='+sInput.curIndex;
		jObj = new JSONScript(lsrv); 
		//jObj.addScriptTag();
	}
	catch(err)
	{
		////alert('1:' + err.description );
		error(err.description);
	}
};
var getNotFoundScreen = function()
{
	return	'<div><b>'+sInput.type+'</b> you searched is not found in the database!<br>'+
			'<a href="javascript:prepareSearch();">Search again</a></div>';
};
var getErrFoundScreen = function()
{
	return	'<div><b>Error :</b>The place you searched returns some invalid data!<br>'+
			'<a href="javascript:loadWidget(\'prfnc\',false);">Search again</a></div>';
};
var loadPlace = function(type,json)
{
	av$('src_result').clear();
	if(json.list == '') return av$('src_result').setHTML(getNotFoundScreen());
	if(type != "Display")
	{
		av$('src_result').instance.appendChild(new Element("div",{'class':'b',html:'Select your '+sInput.type}).create());
		sInput.type = type;
		list = json.list.split(',');
		h = '';
		for(i=0;i<list.length;i++)		h += '<div class="cp src_link" title="'+list[i]+'" onclick="setPlace(\''+list[i]+'\','+i+')">&nbsp;&nbsp;'+Trimm(list[i],20)+'</div>';
		av$('src_result').instance.appendChild(new Element("div",{'class':'',html:h}).create());
	}
	else
	{
		tpl = resTpl;
		sInput.data = json.list;
		var res = json.list.split('-');
		if(res[0].length < 3)
		{ av$('src_result').instance.innerHTML = getErrFoundScreen(); return; }
		tpl = tpl.replace("**PLC**",sInput.place+' of '+sInput.state+' in '+sInput.country);
		tpl = tpl.replace("**LNG**",res[0]);
		tpl = tpl.replace("**LAT**",res[1]);
		tpl = tpl.replace("**TZN**",res[2]);
		av$('src_result').instance.innerHTML += tpl;
		av$('src_result').instance.appendChild(selTimeCorr());
		av$('src_result').instance.appendChild(new Element('div',{html:'&nbsp;','class':'shim4px w60'}).create());
		btn = new Element('div',{align:'',html:'Save','class':'ml5 cp bttn tac b'}).create();
		btn.onclick = function(){changePlace()};
		av$('src_result').instance.appendChild(btn);
	}
};
var setPlace = function(inp,idx)
{
	sInput.curIndex = idx;
	if(sInput.type == "State") sInput.country = inp;
	else if(sInput.type == "City") sInput.state = inp;
	else sInput.place = inp;
	prepareSearch();
};
var prepareSearch = function()
{
	if(sInput.type != "Finish")
	av$("src_result").instance.innerHTML =	inpSearch.replace("**VL**",sInput.type);
	else
	{
		doSearch({value:sInput.place});
	}
	if(sInput.type == "Country")
	av$("src_result").instance.innerHTML +=	'<div class="shim4px"></div>'+
											'<div class="ml5 pt11">Type atleast three '+
				'starting letters of the country you want to Search. <br> Then the result will be loaded "Here"</div>';
	if(sInput.type == "State")
	av$("src_result").instance.innerHTML +=	'<div class="shim4px"></div>'+
											'<div class="ml5 pt11">Please Search for a state/province in <b>'+sInput.country+'</b></div>';
	if(sInput.type == "City")
	av$("src_result").instance.innerHTML +=	'<div class="shim4px"></div>'+
											'<div class="ml5 pt11">Please Search for a place/city in <b>'+sInput.country+' > '+sInput.state+'</b></div>';
};

var changePlace = function()
{
	sInput.data += '-'+ av$('selTimeCorr').instance.selectedIndex;
	try
	{	
		av$('src_result').setHTML("<div class=\'head-text3\'><cenetr>Saving..</center></div>");
		lsrv =  ""+srv_root+"setcookie.php?callBk=loadWidgetEx&type=SET"+"&data="+sInput.data+''+
				'&country='+sInput.country+'&state='+sInput.state+'&city='+sInput.place;
				////alert(lsrv);
		jObj = new JSONScript(lsrv); 
		jObj.addScriptTag();
	}
	catch(err)
	{
		////alert('2:' + err.description );
		error(err.description);
	}
};

function setOptions(opt)
{
	////alert('obj : ' + opt);
	if((opt != null)&&(opt != ''))	for(i in options)
	  {
		  ////alert(i + opt[i]);
		  options[i] = (typeof(opt[i])=="undefined") ? options[i] : opt[i];
		  //alert(i + ':' + options[i]);
	  }
	// else options = { initScreen:'basic',width:150,height:254,chartStyle:1,region:'SAK',language:'ENG',key:'98124e5a80f31c36fc5a06b783339eab',link:'Astrology Software',target1:'http://www.indianastrologysoftware.com',target2:'http://www.indianastrologysoftware.com'};
    
    //console.log(options);
    
	av$(targetElementId).instance.style.width = 'auto';
	av$(targetElementId).instance.style.height = 'auto';
};
          
function getDateString(date)
{
	return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
};
          
function getTimeString(date,type)
{
	hour = date.getHours();
	if(type == 12 && hour > 12) hour = hour - 12;
	return hour+':'+date.getMinutes();
};

function viewChart(url)
{
	var fl = null;
	if(av$('floatimage').instance == null)
	{
		fl	= new Element('input',{id:'floatimage',type:'image',src:url,'class':'floatimage'}).create();
		av$(targetElementId).instance.appendChild(fl);
	}
	else fl = av$('floatimage').instance;
	mleft = pMouse.x; mleft = (mleft > 300)? mleft - 220 : mleft;
	mtop = pMouse.y; mtop = (mtop > 300)? mtop - 220 : mtop;
	ofs = (pMouse.x > 300)? -20 : 20;

	fl.style.left =  mleft+ofs+ 'px';
	fl.style.top = mtop+ofs+ 'px';
	fl.style.display = "block";

};
function hideChart()
{
	if(av$('floatimage').instance != null ) av$('floatimage').instance.style.display = "none";
};

function getPlaceData()
{
	////alert('placedata');
	try
	{
		lsrv = ""+srv_root+"location.wsrv.db.v1.php?callBk=parsePlace&key="+options.key;
		//console.log(lsrv);
		////alert(lsrv);
		jObj = new JSONScript(lsrv); 
		jObj.addScriptTag();
	}
	catch(err)
	{
		////alert('3:' + err.description );
		error(err.description);
	}
};

function testerr(txt)
{
			////alert(txt);	
}
function parsePlace(jsonData) 
{     
    //console.log("parsePlace(",jsonData,")");
	////alert('PP:' +jsonData.cityName);
	wInput = { date:getDateString(curDate),time:getTimeString(curDate,24),place:jsonData};

	if(options.language=='null')
	{
		////alert('null');
		options.language = 'ENG';
	}
	if(options.region=='null')
	{
		////alert('null');
		options.region = 'SAK';
	} 

	
	ipJ = '{ date:"'+wInput.date+'",time:"'+wInput.time+'",place:{name:"'+wInput.place.cityName+'",longitude:"'+wInput.place.longitude+'",latitude:"'+wInput.place.latitude+'",timezone:"'+wInput.place.timeZone+'",timecorrection:"'+wInput.place.timeCorrection+'"},language:\''+options.language+'\',region:\''+options.region+'\'}';
	//console.log(ipJ);
	//jObj.removeScriptTag();  
	try
	{
		wsrv  = ''+srv_root+'av.tools.widget.php?callBack='+cback+'&json=true&ipJ='+ipJ; 
		jObj = new JSONScript(wsrv); 
		jObj.addScriptTag();
	}
	catch(err)
	{
		////alert('4:' + err.description );
		error(err.description);
	}
	

} ; 

/*
	function to prepare input data and request
	webservice to return the astrology data
*/
function wProcess()
{
	if(!validateRequest())
	{
		////alert('oops!');
		return new Widget().unauthorisedAccess();
	}
	checkid();
	getPlaceData();
};
/*
	This function is called at the integration
	end. The target element's id and the widget 
	size, initial screen will be passed as options
*/
var avWidgetAstroCalendar = function(trgId,widType)
{
	////alert('start');
	//flowlog('1');
	targetElementId = trgId;
	buildCssTag();
    buildCssTag2();
    buildCssTag3();
    buildCssTag4();
	getoneliners();
	if(!validateRequest())
	{
		try
		{
			////alert('crypt');
            if(widType == "free") {
                //console.log(widType);
                lsrv = ""+srv_root+"location.wsrv.db.v1.php?callBk=validateClient&req=crypt&type=free";   
            }
            else {
                //console.log(widType);
                lsrv = ""+srv_root+"location.wsrv.db.v1.php?callBk=validateClient&req=crypt&type=premium";
            }
			jObj = new JSONScript(lsrv); 
            //console.log(jObj);
			jObj.addScriptTag();
		}
		catch(err)
		{
			////alert('5:' + err.description );
			error(err.description);
		}
	}
	else
	{
		////alert('validation ok');
		ipJ = wProcess();
	}
};

var validateClient = function(key)
{
	//console.log(key);
	jsonopt ='';
	if(key!='')
    	jsonopt = eval('(' + key + ')');
    //console.log(jsonopt);
	setOptions(jsonopt);
	//setOptions(key);
	jObj.removeScriptTag(); 
	
	ipJ = wProcess();
	
};
var checkid = function()
{
	var pb = av$('pb' + options.clientid).instance;
	////alert('pb' + options.clientid + ' : ' + pb);
}
function trim(s)
{
	////alert('function');
	////alert(s);
	var l=0; var r=s.length -1;
	while(l < s.length && s[l] == ' ')
	{	l++; }
	while(r > l && s[r] == ' ')
	{	r-=1;	}
	////alert('result:' + s.substring(l, r+1))
	return s.substring(l, r+1);
}

var validateRequest = function()
{
	////alert('1');
	var bld= av$('avx_widget_148_wid').instance;
	ecode =7;
	var anc = av$('avx_widget_148_wid_in').instance;
	ecode =8;
	aurl = anc.getElementsByTagName("a")[0].getAttribute("href").replace(new RegExp("/","g"),"");
	ecode =9;
	if(window.opera) 
	{
	return true;
	}
	else if(bld != null)
	{	
		ecode =10;
		/*if(options.initScreen == '' || options.chartStyle == 0 || options.region == 'null' || options.key == '')
		{
			url1 = "http://www.indianastrologysoftware.com".replace(new RegExp("/","g"),"");
			url2 = "http://www.indianastrologysoftware.com".replace(new RegExp("/","g"),"");
			anctext = "Astrology Software";
			
		}
		else
		{	 */
			/*url1 = options.target1.replace(new RegExp("/","g"),"");
			url2 = options.target2.replace(new RegExp("/","g"),"");*/
            url1 = url2 = "http:www.indianastrologysoftware.comfree-download-kundli-software.php";
			anctext = options.link;
            //console.log(url1,url2,aurl);
		//}
		//alert(JSON.stringify(options));
		ecode =1;
		if(bld.style.display != "block") return false;
		ecode =2;
		if(anc.style.display != "block") return false;
		ecode =3;
		
		//if(bld.className.replace(new RegExp(" ","g"),"") != "fa av_pt10" ) return false; 
		ecode =4;
		//alert(anc.className.replace(new RegExp(" ","g"),""));
		//if(anc.className.replace(new RegExp(" ","g"),"") != "back_link") return false;
		ecode =5;
		//alert(aurl + ' != ' + url1 + '&& ' + aurl +' != ' + url2);
		if(aurl != url1 && aurl != url2) return false;
		ecode =6;
		if(anc.innerHTML.indexOf(anctext) < 0) return false; 
		//alert('12');
		return true;
	}
	else 
	{
		return false;
	}

	return true;
};

/*
	Call back function. This function will be 
	called at the webservice end with the JSON
	output. This function parses the output &
	presents it at the client.
*/
function parseOutput(jsonData) 
{     
	astroData = jsonData.data;
	avWidget = new Widget().prepareCalendar(false);
	jObj.removeScriptTag(); 
}

/*-----------------------------------------------
		Widget Declaration
  -----------------------------------------------
		class		: Widget
		methods		: setOptions
					: prepareCalendar
					: showBasicScreen
					: showChartScreen
					: showSignificanceScreen
					: showPanchangaScreen
					: showCalendarScreen
  ----------------------------------------------*/
var chDate = function(d)
{
	if(!d)
		return false;
    av_toggleMenu("av-calendar-container");
    av_toggleMenu("av-calIcon");
    document.getElementById("av-aw-panchang-header").innerHTML = "<div style='font-weight: bold;font-size: 1.2em;line-height: 27px;'>Loading..</div>";
	if(d==NaN || d==0) return;
	curDate.setDate(d);
    curDate.setMonth(slctdMonth);
    curDate.setYear(slctdYear);
	avWidget = avWidget.prepareCalendar(true);
};
var prevDay = function()
{
	d = curDate.getDate()-1;
	curDate.setDate(d);
	avWidget = avWidget.prepareCalendar(true);
};
var nextDay = function()
{
	d = curDate.getDate()+1;
	curDate.setDate(d);
	avWidget = avWidget.prepareCalendar(true);
};
/* OLD
var loadChart = function(cs)
{
    console.log("loadChart",cs);
	options.chartStyle = cs;
	avWidget.showChartScreen();
};*/
var loadChart = function(cs)
{
    //console.log("loadChart",cs);
	options.chartStyle = cs;
	avWidget.showChart2Screen();
};
var loadWidget = function(screen,doRef)
{
	options.initScreen = screen; 
	avWidget = avWidget.prepareCalendar(doRef);
};
var loadWidgetEx = function()
{
	options.initScreen = 'basic';
	avWidget = avWidget.prepareCalendar(true);
};
var Widget = function()
{
	this.targetId = targetElementId;
	this.jsonData = astroData;
};

//initialize the fancy box
var initializeFancyBox = function()
{
	$(".fancybox").fancybox({
		'width' 			: 630,
		'height' 			: 465,
		'autoScale' 		: true,
		'autoDimensions' 	: true,
		'transitionIn' 		: 'elastic',
		'transitionOut' 	: 'elastic',
		'speedIn' 			: 200, 
		'speedOut' 			: 200,
		'overlayShow' 		: true,
		'centerOnScroll' 	: true,
		'easingIn' 			: 'easeOutBack',
		'easingOut' 		: 'easeInBack',
		'type' 				: 'image'
	});
}

function loading()
{
	return new Element('div',{'class':'avw_loading'}).create();
};

Widget.prototype.prepareCalendar = function(doRefresh)
{
    
	if(doRefresh)
	{ 
		return new avWidgetAstroCalendar(this.targetId);
	}
	switch(options.initScreen)
	{
		//case 'basic': this.showBasicScreen(); break;
        case 'basic': this.showPanchanga2Screen(); break;
		case 'chart': this.showChartScreen(); break;
		case 'astro': this.showAstroScreen(); break;
		case 'signf': this.showSignificanceScreen(); break;
		case 'panch': this.showPanchangaScreen(); break;
		case 'clndr': this.showCalendarScreen(); break;
		case 'prfnc': this.showPreference(); break;
		case 'rgion': this.showRegionSet(); break;
		case 'frpred': this.showFreePredMenu(); break;
		case 'fullpred': this.showFreePredictions(); break;
        //new
        case 'panch2': this.showPanchanga2Screen(); break;
        case 'chart2': this.showChart2Screen(); break;
        case 'astro2': this.showAstro2Screen(); break;
        case 'horos2': this.showHoroscope2Screen(); break;
        case 'about2': this.showAbout2Screen(); break;
		//default		: this.showBasicScreen(this.trgId); break;
        default		: this.showPanchanga2Screen(); break;

	}
	if(!options.initScreen){
		onloadPanchangWidget('Impressions');
	}
	return this;
};
Widget.prototype.unauthorisedAccess = function()
{
	av$(this.targetId).instance.childNodes[0].innerHTML ="";
	frame = new Element('div',{id:'av_widget_148','class':'',html:''}).create();
	frame.appendChild(this.uAAccess());
	av$(this.targetId+'_content').instance.appendChild(frame);
};

Widget.prototype.showPanchanga2Screen = function()
{
    av$(this.targetId+'_content').clear();
    frame = new Element('div',{id:'av-aw-panchang-wrapper','class':'',html:''}).create();
    frame.appendChild(this.header2());
    frame.appendChild(this.shim1px2());
    frame.appendChild(this.panchanga2());
    frame.appendChild(this.shim1px2());
    //frame.appendChild(this.footer2());
    frame.appendChild(this.shim1px2());
    av$(this.targetId+'_content').instance.appendChild(frame);
    
    av_selectedMenuItem();
    av_createCal();
    av_setSelectedYear();
    measureWidth("astro_widget_content");
    //initAutocomplete();
}
Widget.prototype.showChart2Screen = function()
{
    av$(this.targetId+'_content').clear();
    frame = new Element('div',{id:'av-aw-panchang-wrapper','class':'',html:''}).create();
    frame.appendChild(this.header2());
    frame.appendChild(this.shim1px2());
    frame.appendChild(this.chart2());
    frame.appendChild(this.shim1px2());
    //frame.appendChild(this.footer2());
    frame.appendChild(this.shim1px2());
    av$(this.targetId+'_content').instance.appendChild(frame);
    
    av_selectedMenuItem();
    av_createCal();
    av_setSelectedChart();
    measureWidth("astro_widget_content");
    //$('.fancybox').bind('click', false);
    //initAutocomplete();
    setTimeout(function(){
    	initializeFancyBox();
    	//$('.fancybox').unbind('click', false);
    	$('.fancybox').removeAttr('style');
    }, 100);
}
Widget.prototype.showAstro2Screen = function()
{
    av$(this.targetId+'_content').clear();
    frame = new Element('div',{id:'av-aw-panchang-wrapper','class':'',html:''}).create();
    frame.appendChild(this.header2());
    frame.appendChild(this.shim1px2());
    frame.appendChild(this.astroday2());
    frame.appendChild(this.shim1px2());
    //frame.appendChild(this.footer2());
    frame.appendChild(this.shim1px2());
    av$(this.targetId+'_content').instance.appendChild(frame);
    
    av_selectedMenuItem();
    av_createCal();
    measureWidth("astro_widget_content");
    //initAutocomplete();
}
Widget.prototype.showHoroscope2Screen = function()
{
    av$(this.targetId+'_content').clear();
    frame = new Element('div',{id:'av-aw-panchang-wrapper','class':'',html:''}).create();
    frame.appendChild(this.header2());
    frame.appendChild(this.shim1px2());
    frame.appendChild(this.horoscope2());
    frame.appendChild(this.shim1px2());
    //frame.appendChild(this.footer2());
    frame.appendChild(this.shim1px2());
    av$(this.targetId+'_content').instance.appendChild(frame);
    
    av_selectedMenuItem();
    av_createCal();
    av_initDateVals();
    measureWidth("astro_widget_content");
    // RECHECK DMV
    //initAutocomplete();
    //horoscopeAutocomplete();
}
Widget.prototype.showChartScreen = function()
{
	av$(this.targetId+'_content').clear();
	frame = new Element('div',{id:'av_widget_148','class':'',html:''}).create();
	frame.appendChild(this.header());
	frame.appendChild(this.shim1px());
	frame.appendChild(this.chart());
	frame.appendChild(this.shim1px());
	frame.appendChild(this.linkDualChart(options.chartStyle));
	frame.appendChild(this.shim1px());
	frame.appendChild(this.linkPanchang());
	frame.appendChild(this.shim1px());
	frame.appendChild(this.linkSpeciality());
	frame.appendChild(this.shim1px());
	frame.appendChild(this.linkAstroDay());
	frame.appendChild(this.shim1px());
	frame.appendChild(this.linkFreePredictions());
	frame.appendChild(this.shim1px());
	av$(this.targetId+'_content').instance.appendChild(frame);
};

Widget.prototype.showAbout2Screen = function()
{
	av$(this.targetId+'_content').clear();
    frame = new Element('div',{id:'av-aw-panchang-wrapper','class':'',html:''}).create();
    frame.appendChild(this.header2());
    frame.appendChild(this.shim1px2());
    frame.appendChild(this.about2());
    frame.appendChild(this.shim1px2());
    //frame.appendChild(this.footer2());
    frame.appendChild(this.shim1px2());
    av$(this.targetId+'_content').instance.appendChild(frame);
    
    av_selectedMenuItem();
    av_createCal();
    av_setSelectedYear();
    measureWidth("astro_widget_content");
};

Widget.prototype.showCalendarScreen = function()
{
	av$(this.targetId+'_content').clear();
    //console.log(getDateString(curDate));
	var acal = createCalendarFor(getDateString(curDate));
    //console.log(acal, dtpl, curDate);
	var y = '';
	for(j=0;j<7;j++)
	{
		d = dtpl.replace("**DT**",wlist[j].substring(0,1));
		d = d.replace("**CL**","wcaption fl "+((j==0)?"red":"blk")+" fa pt12 b");
		d = d.replace("**IP**",'0');
		y += d;
	}
	y += '<br class="cb"/>';
    //console.log(acal, dtpl, y);
	for(i=0;i<5;i++)
	{
		for(j=0;j<7;j++)
		{
			d = (acal[i][j] == 0)? dtpl.replace("**DT**","") : dtpl.replace("**DT**",lpad(acal[i][j]+''));
			d = d.replace("**CL**",((acal[i][j] == 0)?"wcaption":"caldate cp")+" fl "+((acal[i][j] == curDate.getDate())?" bgrey " :"") +
				((j==0)?"red":"blk")+" fa pt12 b");
			d = d.replace("**IP**",acal[i][j]);
			y += d;
		}
		y += '<br class="cb"/>';
	}
    //console.log(y);
	av$(this.targetId).instance.childNodes[0].innerHTML ="";
	frame = new Element('div',{id:'av_widget_148','class':'',html:''}).create();
	frame.appendChild(this.header());
	frame.appendChild(this.shim1px());
	frame.appendChild(this.lcalendar(y));
	frame.appendChild(this.shim1px());
	frame.appendChild(this.linkChart());
	frame.appendChild(this.shim1px());
	frame.appendChild(this.linkPanchang());
	frame.appendChild(this.shim1px());
	frame.appendChild(this.linkSpeciality());
	frame.appendChild(this.shim1px());
	frame.appendChild(this.linkMain());
	frame.appendChild(this.shim1px());
	av$(this.targetId+'_content').instance.appendChild(frame);

};
Widget.prototype.getCurChart = function()
{
	var lcs = ['','southindian','eastindian','northantique'];
	var cs =	'&sun='+astroData.chart.sun+
				'&moo='+astroData.chart.moon+
				'&mer='+astroData.chart.mercury+
				'&ven='+astroData.chart.venus+
				'&mar='+astroData.chart.mars+
				'&jup='+astroData.chart.jupiter+
				'&sat='+astroData.chart.saturn+
				'&rah='+astroData.chart.rahu+
				'&ket='+astroData.chart.ketu+
				'&gul='+astroData.chart.gulikan+
				'&lag='+astroData.chart.lagnam+
				'&style='+lcs[options.chartStyle]+'&rf='+
				new Date().getTime();
		
	
	url = gwindowspath + 'SMexe/WebStarChart.dll?width=220&height=220'+cs;
	return url;
};
Widget.prototype.uAAccess = function()
{
	var tpl =	'<div class="uaaceess blk"><div class="pt16 b warning">(!)Warning</div>'+
				'<div>&nbsp;</div>'+
				'<div class="red b pt16">Access Denied </div><br>'+
				''+
				'We think you are trying to access this widget from a domain '+
				'which is not registered with us. Or Your browser will not support this script. Error Code : ' + ecode + '</div>';
	return new Element('div',{'class':'',html:tpl}).create();
};
Widget.prototype.header2 = function()
{
    var tpl =   
            '<div class="av-aw-panchang-header av-clr1Bg av-clr2Txt" id="av-aw-panchang-header">'+
            '       <div class="head-text1 av-clr2Txt" id="av-selectedDate">'+av_getDayName(curDate.getDay())+', '+curDate.getDate()+' '+av_getMonthName(curDate.getMonth())+' '+curDate.getFullYear()+'</div>'+
            '       <div class="av-calendar">'+
            '           <div style="cursor:pointer;line-height: 43px;" class="av-calIcon" id="av-calIcon" ><i class="material-icons av-clr2Txt" onclick="av_toggleMenu(&#34;av-calendar-container&#34;);" >&#xE24F;</i></div>'+
            '    <section id="av-calendar-container" class="av-calendar-container av-hider" style="float:right;position: absolute;z-index:10; margin-top: -7px;">'+
            '    </section>'+
            '       </div>'+
            '    </div>'+
            '    <div class="av-clear"></div>'+
            '    <div class="av-aw-menu-holder">'+
            '       <div class="av-cc-ddl-header">'+
            '           <div class="av-location-icon" style="display:none;"></div>'+
            '           <div id="locationSetter" style="font-weight: bold;font-size:1.1em;margin-left:5px;line-height:30px;"><i class="material-icons av-clr1Txt" style="vertical-align:middle;">location_on</i><span>'+Trimm(wInput.place.cityName,15)+'</span><span onclick="av_toggleMenu(\'av-panchangPlaceDiv\');av_toggleMenu(\'locationSetter\');" style="cursor:pointer;">&nbsp;&#9658;&nbsp;</span></div>'+
            '           <div id="av-panchangPlaceDiv" class="av-hider">'+
            '           <i class="material-icons av-clr1Txt" style="vertical-align:middle;">&#xE567;</i>'+
            '           <input type="text" id="av-panchangPlace" onkeydown="av_bst(event)" autocomplete="off" onfocus="initAutocomplete();" onchange="av_toggleMenu(\'av-panchangPlaceDiv\');av_toggleMenu(\'locationSetter\');" onblur="if(this.value!=\'\') this.value=\'\';" placeholder="Enter a Location">'+
            '           </div>'+
            '       </div>'+
            '       <div class="av-togglemenu" onclick="av_toggleMenu(&#34;av-cssmenu&#34;)">'+
            '           <i class="material-icons av-clr1Txt" style="line-height: 38px;font-size:30px;">menu</i>'+
            '       </div>'+
            '       <div id="av-cssmenu" style="float:right;margin-right:5px;" class="av-hider av-cssmenu" onclick="av_toggleMenu(&#34;av-cssmenu&#34;)">'+
            '           <ul>'+
            '               <li id="av-panchang" onclick="loadWidget(\'panch2\',false);av_toggleMenu(&#34;av-cssmenu&#34;);" class="av-menuLinks"><span href="#">Daily Panchangam</span>'+
            '               </li>'+
            '               <li id="av-astroday" onclick="loadWidget(\'astro2\',false);av_toggleMenu(&#34;av-cssmenu&#34;);" class="av-menuLinks"><span href="#">Astro Day</span>'+
            '               </li>'+
            '               <li id="av-astrochart" onclick="loadWidget(\'chart2\',false);av_toggleMenu(&#34;av-cssmenu&#34;);" class="av-menuLinks"><span href="#">Astro Chart</span>'+
            '               </li>'+
            '               <li id="av-horoscope" onclick="loadWidget(\'horos2\',false);av_toggleMenu(&#34;av-cssmenu&#34;);" class="av-menuLinks"><span href="#">Free Online Horoscope</span>'+
            '               </li>'+
            '              <li id="av-about" onclick="loadWidget(\'about2\',false);av_toggleMenu(&#34;av-cssmenu&#34;);" class="av-menuLinks"><span href="#">About Widget</span></a>'+
            '               </li>'+
            '           </ul>'+
            '       </div>'+
            '       <div class="av-clear"></div>'+
            '    </div>';
    return new Element('div',{id:'',html:tpl}).create();
};
Widget.prototype.shim1px2 = function()
{
    return new Element('div',{'class':'av-clear',html:''}).create();
};

Widget.prototype.footer2 = function()
{
    var tpl =  '<div class="av-footer">'+
            '    Astrology Software, Powered by <span style="font-weight:bold;"><a href="http://www.clickastro.com/" target="_blank">Shiv Mandir</a>.</span>'+
            '</div>';
    return new Element('div',{id:'',html:tpl}).create();
};
//checked
Widget.prototype.panchanga2 = function()
{
    reg = lpad(astroData.header.regional.day)+' '+astroData.header.regional.month_name+'	'+astroData.header.regional.year_value;
    var tpl =   
            '<div class="av-aw-panchang-holder">'+
            '    <div class="av-heading av-clr1Bg">'+
            '        <div class="av-left-arrow2" onclick="loadWidget(\'about2\',false);">'+
            '           <i class="material-icons av-clr2Txt">&#xE5CB;</i>'+
            '        </div>'+
            '        <div class="av-headtext av-clr2Txt">Daily Panchang</div>'+
            '        <div class="av-right-arrow2" onclick="loadWidget(\'astro2\',false);">'+
            '           <i class="material-icons av-clr2Txt">&#xE5CC;</i>'+
            '        </div>'+
            '    </div>'+
            '    <div class="av-clear"></div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="head-text2">Star : </div>'+
            '        <div class="head-text3">'+astroData.panchangam.star.value+' <span style="color:#000000; font-size:.8em;">('+astroData.panchangam.star.duration.replace("AM", " am").replace("PM", " pm")+')</span></div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="head-text2">Tithi : </div>'+
            '        <div class="head-text3">'+astroData.panchangam.thithi.value+'<span style="color:#000000; font-size:.8em;"> ('+astroData.panchangam.thithi.duration.replace("AM", " am").replace("PM", " pm")+')</span></div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="head-text2">Karana : </div>'+
            '        <div class="head-text3">'+astroData.panchangam.karana.value+' </div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="head-text2">Nithya Yoga : </div>'+
            '        <div class="head-text3"> '+astroData.panchangam.nithyayogam.value+'</div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="av-form-wrapper head-text2">'+
            '            <select name="select" id="av-selectRegion" onchange="refreshRegion();">'+
            '                <option value="SAK">Shaka Varsha</option>'+
            '                <option value="MAL">Malayalam</option>'+
            '                <option value="TAM">Tamil</option>'+
            '                <option value="TEL">Telugu</option>'+
            '            </select>'+
            '            <div class="av-clear"></div>'+
            '        </div>'+
            '        <div class="head-text3" id="av-shakavarshaVal" style="margin-top: 5px;"> '+reg+'</div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder av-freeHoroscope av-clr1Bg av-clr2Txt" style="font-weight:bold;cursor:pointer;font-size: 1.2em;text-align: center;padding: 9px 0;" onclick="loadWidget(\'horos2\',false);" >Free Online Horoscope</div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'
            '</div>';
    return new Element('div',{id:'',html:tpl}).create();
};
Widget.prototype.chart2 = function()
{
    var tpl =	
            '<div class="av-aw-panchang-holder">'+
            '    <div class="av-heading av-clr1Bg">'+
            '        <div class="av-left-arrow2" onclick="loadWidget(\'astro2\',false);">'+
            '           <i class="material-icons av-clr2Txt">&#xE5CB;</i>'+
            '        </div>'+
            '        <div class="av-headtext av-clr2Txt">Astro Chart</div>'+
            '        <div class="av-right-arrow2" onclick="loadWidget(\'horos2\',false);">'+
            '           <i class="material-icons av-clr2Txt">&#xE5CC;</i>'+
            '        </div>'+
            '    </div>'+
            '    <div class="av-clear"></div>'+
            '    <div class="av-content-holder">'+
            '        <div class="av-form-wrapper-chart">'+
            '            <select name="select" id="av-selectChartType" onchange="av_setChartType();">'+
            '                <option value="1">South Indian</option>'+
            '                <option value="3">North Indian</option>'+
            '                <option value="2">East Indian</option>'+
            '            </select>'+
            '            <div class="av-clear"></div>'+
            '        </div>'+
            '        <div class="av-clear"></div>'+
            '        <div class="av-chart">'+
            '           <a class="fancybox" style="pointer-events: none;cursor: default;" href="'+this.getCurChart()+'"> <img src="'+this.getCurChart()+'" style="height:100%;z-index:9003;" id="av-chartImage" /*onclick="av_imgZoomer();*/"></a> </div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '</div>';
    return new Element('div',{'class':'',html:tpl}).create();
};
Widget.prototype.astroday2 = function()
{
    var tpl = 
            '<div class="av-aw-panchang-holder">'+
            '    <div class="av-heading av-clr1Bg">'+
            '        <div class="av-left-arrow2" onclick="loadWidget(\'panch2\',false);">'+
            '           <i class="material-icons av-clr2Txt">&#xE5CB;</i>'+
            '        </div>'+
            '        <div class="av-headtext av-clr2Txt">Astro Day</div>'+
            '        <div class="av-right-arrow2" onclick="loadWidget(\'chart2\',false);">'+
            '           <i class="material-icons av-clr2Txt">&#xE5CC;</i>'+
            '        </div>'+
            '    </div>'+
            '    <div class="av-clear"></div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="head-text2">Rahukalam : </div>'+
            '        <div class="head-text3"> '+av_splitSpaceJoiner(astroData.panchangam.rahukalam.duration.toLowerCase())+'</div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="head-text2">Yamaganda : </div>'+
            '        <div class="head-text3"> '+av_splitSpaceJoiner(astroData.panchangam.yamakantakalam.duration.toLowerCase())+'</div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="head-text2">Gulika : </div>'+
            '        <div class="head-text3" id="av-gulikakalam"> '+av_splitSpaceJoiner(astroData.panchangam.gulikakalam.duration.toLowerCase())+'</div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="head-text2">Abhijit : </div>'+
            '        <div class="head-text3">'+av_splitSpaceJoiner(astroData.panchangam.abhijith.duration.toLowerCase())+'</div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="head-text2">Sunrise : </div>'+
            '        <div class="head-text3"> '+astroData.panchangam.sunrise.value.toLowerCase().replace("am"," am").replace("pm"," pm")+'</div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder ">'+
            '        <div class="head-text2">Sunset : </div>'+
            '        <div class="head-text3"> '+astroData.panchangam.sunset.value.toLowerCase().replace("am"," am").replace("pm"," pm")+'</div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '    <div class="av-content-holder av-freeHoroscope av-clr1Bg av-clr2Txt" style="font-weight:bold;cursor:pointer;font-size: 1.2em;text-align: center;padding: 10px 0;" onclick="loadWidget(\'horos2\',false);" >Free Online Horoscope</div>'+
            '        <div class="av-clear"></div>'+
            '    </div>'+
            '</div>';
    return new Element('div',{'class':'',html:tpl}).create();
};
Widget.prototype.horoscope2 = function()
{
    var tpl =	
            '<div class="av-aw-panchang-holder">'+
            '    <div class="av-heading av-clr1Bg">'+
            '        <div class="av-left-arrow2" onclick="loadWidget(\'chart2\',false);">'+
            '           <i class="material-icons av-clr2Txt">&#xE5CB;</i>'+
            '        </div>'+
            '        <div class="av-headtext av-clr2Txt">Free Horoscope</div>'+
            '        <div class="av-right-arrow2" onclick="loadWidget(\'about2\',false);">'+
            '           <i class="material-icons av-clr2Txt">&#xE5CC;</i>'+
            '        </div>'+
            '    </div>'+
            '    <div class="av-clear"></div>'+
            '    <div class="av-content-holder ">'+
            '    <form name="frmplaceorder" id="frmplaceorder" method="post" action="http://report.clickastro.com/freehoro/composexml-new.php" target="_tab">'+
            '        <div class="av-w100">'+
            '            <div class="av-w50">'+
            '                <input name="name" id="av-name" placeholder="Name" type="text" tabindex="1" required autofocus class="av-label"/>'+
            '            </div>'+
            '            <div class="av-w50">'+
            '                <div class="av-fl">'+
            '                    <input name="gender" id="av-genderMale" value="Male" checked="" type="radio"><label for="av-genderMale" style="cursor:pointer;" >Male</label>'+
            '                    <input name="gender" id="av-genderFemale" value="Female" type="radio"><label for="av-genderFemale" style="cursor:pointer;" >Female</label></div>'+
            '            </div>'+
            '        </div>'+
            '        <div class="av-w100">'+
            '           <input name="cityofbirthfill" id="cityofbirthfill" placeholder="City of birth" onfocus="horoscopeAutocomplete();" onkeydown="av_bst(event)" type="text" class="av-label" autocomplete="off">'+
            '           <div id="solr_search_suggest" tabindex="-1" style="width: auto;display: block;border: 1px solid rgb(204, 204, 204);padding-right: 2px;visibility: visible;margin-left: 0px;position: absolute;z-index: 1000000;overflow: auto;background: rgb(255, 255, 255);"></div>'+
            '        </div>'+
            '        <div class="av-w100">'+
            '            <div class="av-fr">Date of Birth</div>'+
            '            <div class="av-w25">'+
            '                <select name="dobyear" id="av-dobyear">'+
            '                    <option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989" selected="">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option><option value="1904">1904</option><option value="1903">1903</option><option value="1902">1902</option><option value="1901">1901</option>'+
            '                </select>'+
            '            </div>'+
            '            <div class="av-w25">'+
            '                <select name="dobmonth" id="av-dobmonth">'+
            '                    <option value="1">Jan</option><option value="2">Feb</option><option value="3">Mar</option><option value="4">Apr</option><option value="5">May</option><option value="6">Jun</option><option value="7" selected="">Jul</option><option value="8">Aug</option><option value="9">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option>'+
            '                </select>'+
            '            </div>'+
            '            <div class="av-w25">'+
            '                <select name="dobday" id="av-dobday">'+
            '                    <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20" selected="">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option>'+
            '                </select>'+
            '            </div>'+
            '        </div>'+
            '        <div class="av-w100">'+
            '            <div class="av-fr">Time of Birth</div>'+
            '            <div class="av-w25">'+
            '                <select name="tobhour" id="av-tobhour">'+
            '                    <option value="01">1</option><option value="02">2</option><option value="03">3</option><option value="04">4</option><option value="05">5</option><option value="06">6</option><option value="07">7</option><option value="08">8</option><option value="09" selected="">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>'+
            '                </select>'+
            '            </div>'+
            '            <div class="av-w25">'+
            '                <select name="tobmin" id="av-tobmin">'+
            '                    <!--if(00==27)--><option value="00">0</option><!--if(01==27)--><option value="01">1</option><!--if(02==27)--><option value="02">2</option><!--if(03==27)--><option value="03">3</option><!--if(04==27)--><option value="04">4</option><!--if(05==27)--><option value="05">5</option><!--if(06==27)--><option value="06">6</option><!--if(07==27)--><option value="07">7</option><!--if(08==27)--><option value="08">8</option><!--if(09==27)--><option value="09">9</option><!--if(10==27)--><option value="10">10</option><!--if(11==27)--><option value="11">11</option><!--if(12==27)--><option value="12">12</option><!--if(13==27)--><option value="13">13</option><!--if(14==27)--><option value="14">14</option><!--if(15==27)--><option value="15">15</option><!--if(16==27)--><option value="16">16</option><!--if(17==27)--><option value="17">17</option><!--if(18==27)--><option value="18">18</option><!--if(19==27)--><option value="19">19</option><!--if(20==27)--><option value="20">20</option><!--if(21==27)--><option value="21">21</option><!--if(22==27)--><option value="22">22</option><!--if(23==27)--><option value="23">23</option><!--if(24==27)--><option value="24">24</option><!--if(25==27)--><option value="25">25</option><!--if(26==27)--><option value="26">26</option><!--if(27==27)--><option value="27" selected="">27</option><!--if(28==27)--><option value="28">28</option><!--if(29==27)--><option value="29">29</option><!--if(30==27)--><option value="30">30</option><!--if(31==27)--><option value="31">31</option><!--if(32==27)--><option value="32">32</option><!--if(33==27)--><option value="33">33</option><!--if(34==27)--><option value="34">34</option><!--if(35==27)--><option value="35">35</option><!--if(36==27)--><option value="36">36</option><!--if(37==27)--><option value="37">37</option><!--if(38==27)--><option value="38">38</option><!--if(39==27)--><option value="39">39</option><!--if(40==27)--><option value="40">40</option><!--if(41==27)--><option value="41">41</option><!--if(42==27)--><option value="42">42</option><!--if(43==27)--><option value="43">43</option><!--if(44==27)--><option value="44">44</option><!--if(45==27)--><option value="45">45</option><!--if(46==27)--><option value="46">46</option><!--if(47==27)--><option value="47">47</option><!--if(48==27)--><option value="48">48</option><!--if(49==27)--><option value="49">49</option><!--if(50==27)--><option value="50">50</option><!--if(51==27)--><option value="51">51</option><!--if(52==27)--><option value="52">52</option><!--if(53==27)--><option value="53">53</option><!--if(54==27)--><option value="54">54</option><!--if(55==27)--><option value="55">55</option><!--if(56==27)--><option value="56">56</option><!--if(57==27)--><option value="57">57</option><!--if(58==27)--><option value="58">58</option><!--if(59==27)--><option value="59">59</option>'+
            '                </select>'+
            '            </div>'+
            '            <div class="av-w25">'+
            '                <select name="ampm" id="av-ampm">'+
            '                    <option value="AM">AM</option><option value="PM">PM</option>'+
            '                </select>'+
            '            </div>'+
            '        </div>'+
            '        <div class="av-w100">'+
            '            <div class="av-w50">'+
            '            <div>'+
            '               <select name="chart_style" id="chart_style">'+
            ' 				    <option value="1">South Indian</option>'+
            '                   <option value="2">North Indian</option>'+
            '                   <option value="3">East Indian</option>'+
            '                   <option value="0">Kerala</option>'+
            '               </select>'+
            '             </div>'+
            '            </div>'+
            '            <div class="av-w50">'+
            '                <select name="language" id="av-language" onchange="selectRegionOnLan()">'+
            '                    <option selected="selected" value="Eng">English</option>'+
            '                    <option value="Mal">Malayalam</option>'+
            '                    <option value="Tam">Tamil</option>'+
            '                    <option value="Tel">Telugu</option>'+
            '                    <option value="Hin">Hindi</option>'+
            '                    <option value="Kan">Kannada</option>'+
            '                    <option value="Mar">Marathi</option>'+
            '                    <option value="Ben">Bengali</option>'+
            '                    <option value="Ori">Oriya</option>'+
            '                </select>'+
            '            </div>'+
            '        </div>'+
            '        <div class="av-w100">'+
            '            <input name="email" id="av-email" placeholder="E-mail" type="text" tabindex="1" required class="av-label" />'+
            '        </div>'+
            '        <div class="av-w100">'+
            '            <div class="av-w50 av-fltxt">No. of Pages <span style="font-weight:bold;">13</span>'+
            '            </div>'+
            '            <div class="av-w50">'+
            '                <a href="javascript:av_validate()"><div class="av-gethoroscope-button av-clr1Bg av-clr2Txt">Get Free Horoscope'+
            '                </div></a>'+
            '            </div>'+
            '        </div>'+
            '        <div class="av-clear"></div>'+
            '        <input type="hidden" name="details" value=""/><input type="hidden" name="userid" value=""/><input type="hidden" name="registertype" value=""/><input type="hidden" name="country" id="country"/><input type="hidden" name="region_dist" id="region_dist"/><input type="hidden" name="state" id="state"/><input type="hidden" name="txt_place_search" id="txt_place_search" value=""/><input type="hidden" name="longdeg" id="longdeg" value=""/><input type="hidden" name="longmin" id="longmin" value=""/><input type="hidden" name="longdir" id="longdir" value=""/><input type="hidden" name="latdeg" id="latdeg" value=""/><input type="hidden" name="latmin" id="latmin" value=""/><input type="hidden" name="latdir" id="latdir" value=""/><input type="hidden" name="timezone" id="timezone" value=""/><input type="hidden" name="timezone_name" id="timezone_name" value=""/><input type="hidden" name="correction" id="correction" value=""/><input type="hidden" name="placechecked" id="placechecked"/><input type="hidden" name="lsmid" id="lsmid" value=""/><input type="hidden" name="clientid" id="clientid" value=""/>'+
            '    </form>'+
            '    </div>'+
            '</div>';
    return new Element('div',{'class':'',html:tpl}).create();
};

Widget.prototype.about2 = function()
{
    var tpl =	
            '<div class="av-aw-panchang-holder">'+
            '    <div class="av-heading av-clr1Bg">'+
            '        <div class="av-left-arrow2" onclick="loadWidget(\'horos2\',false);">'+
            '           <i class="material-icons av-clr2Txt">&#xE5CB;</i>'+
            '        </div>'+
            '        <div class="av-headtext av-clr2Txt">About Widget</div>'+
            '        <div class="av-right-arrow2" onclick="loadWidget(\'panch2\',false);">'+
            '           <i class="material-icons av-clr2Txt">&#xE5CC;</i>'+
            '        </div>'+
            '    </div>'+
            '    <div class="av-clear"></div>'+
            '    <div class="av-content-holder ">'+
            '		<div style="text-align:left">'+
	        ' 			<div style="float:right"><img src='+srv_root+'images/logo.png></div>'+
			' 			<div style="font-size: 14px;"><b>Panchang Widget - Version 1.0</b></div><br>'+
			'			<div><b>Licensed to :</b></div>'+
			' 			<div>Except where otherwise noted, the Panchang Widget displayed on this website is licensed under a <a href="https://creativecommons.org/licenses/by-nd/4.0/" target="_blank">Creative Commons Attribution-NoDerivs 4.0 International License</a>.</div><br>'+
			' 			<div>This license allows for redistribution, commercial and non-commercial, as long as it is passed along unchanged and in whole, with credit to the licensor, Astro-Vision Futuretech Pvt Ltd, Kochi, Kerala, India.</div><br>'+
			'			<div><a style="font: bold 11px Arial; text-decoration: none; background-color: #EEEEEE; color:#171ef3; padding:2px 6px 2px 6px;border-top: 1px solid #CCCCCC;border-right: 1px solid #333333;border-bottom: 1px solid #333333;border-left: 1px solid #CCCCCC;width: 100px;" href="http://www.indianastrologysoftware.com/astrology-tools/panchang-widget.php" target="_blank">Get This Widget</a></div><br>'+			'			<div><b>Customer Support by:</b></div>'+
			'			<div>Email: alliances@indianastrologysoftware.com</div>'+
			' 			<div>Mob: +91 8281622113</div>'+
			'    	</div>'+
            '    </div>'+
            '</div>';
    return new Element('div',{'class':'',html:tpl}).create();
};

Widget.prototype.significance = function()
{
	var tpl =   '<div class="resultbox">'+
                '<div class="resultbox_head ac fa pt12 b">'+astroData.significance_of_the_day.caption+'</div>'+
                '<div class="special_text pt11">'+
                '<span class="pt12 b red">'+astroData.significance_of_the_day.value+'</span>'+
				'<div class="shim1px">&nbsp;</div>'+
				astroData.significance_of_the_day.description +
                '</div>';
	return new Element('div',{'class':'',html:tpl}).create();
};

Widget.prototype.preference = function()
{
	sInput = {type:"Country",country:"",state:"",place:"",data:"",curIndex:0,curSCity:''};
	var tpl =   '<div class="resultbox_prf">'+
                '<div class="resultbox_head ac fa pt12 b">Change Location</div>'+
				'<div class="blk">&nbsp;</div>'+
                '<div class="pt11 ml5 src_result" id="src_result">'+
                '<span class="pt12 b blk tal">'+inpSearch.replace("**VL**",sInput.type)+'</span>'+
				'<div class="shim4px">&nbsp;</div>'+
				'Type atleast three '+
				'starting letters of the country you want to Search. <br> Then the result will be loaded "Here"</div>'+
				'<div class="shim1px">&nbsp;</div>'+
                '</div>';
	return new Element('div',{'class':'',html:tpl}).create();
};

Widget.prototype.chart = function()
{
	var tpl =	'<div class="resultbox">'+
			    '     <div class="resultbox_head ac fa pt12 b">Astro Chart</div>'+
				'<div class="shim1px">&nbsp;</div>'+
				'     <img src="'+this.getCurChart()+'" style="width:142px; height:112px; " onmousemove="viewChart(\''+this.getCurChart()+'\')" onmouseout="hideChart()" />'+
				'	<input type="image" id="floatimage" src="'+this.getCurChart()+'" border="0" class="floatimage" />'+
				'</div>';
	return new Element('div',{'class':'',html:tpl}).create();
};

Widget.prototype.lcalendar = function(obCal)
{
	var tpl =	'<div class="resultbox">'+
			    '     <div class="resultbox_head ac fa pt12 b">Calendar</div>'+
				'<div class="shim1px">&nbsp;</div>'+
				'<div align="center" class="pl3">'+obCal+'</div>'+
				'</div>';
	return new Element('div',{'class':'',html:tpl}).create();
};

var getoneliners = function()
{	
	try
	{
		
		lsrv = "http://www.indianastrologysoftware.com/widget/wpanchang/dailyprediction.php?tag=full";
		jObj = new JSONScript(lsrv); 
		jObj.addScriptTag();
	}
	catch(err)
	{
		////alert('3:' + err.description );
		error(err.description);
	}
};

var parseoneliners = function(jsonpred)
{
	var full = jsonpred;
	sunoneliner[1] = jsonpred.Aries;
	sunoneliner[2] = jsonpred.Taurus;
	sunoneliner[3] = jsonpred.Gemini;
	sunoneliner[4] = jsonpred.Cancer;
	sunoneliner[5] = jsonpred.Leo;
	sunoneliner[6] = jsonpred.Virgo;
	sunoneliner[7] = jsonpred.Libra;
	sunoneliner[8] = jsonpred.Scorpio;
	sunoneliner[9] = jsonpred.Sagittarius;
	sunoneliner[10] = jsonpred.Capricorn;
	sunoneliner[11] = jsonpred.Aquarius;
	sunoneliner[12] = jsonpred.Pisces;

	moononeliner[1] = jsonpred.Mesha;
	moononeliner[2] = jsonpred.Vrishaba;
	moononeliner[3] = jsonpred.Mithuna;
	moononeliner[4] = jsonpred.Karkata;
	moononeliner[5] = jsonpred.Simha;
	moononeliner[6] = jsonpred.Kanya;
	moononeliner[7] = jsonpred.Thula;
	moononeliner[8] = jsonpred.Vrischika;
	moononeliner[9] = jsonpred.Dhanu;
	moononeliner[10] = jsonpred.Makara;
	moononeliner[11] = jsonpred.Kumbha;
	moononeliner[12] = jsonpred.Meena;
	
	////alert(jsonpred.Mesha);
};


var prediction = function(predSign)
{	 	
	predictionOptions.signId = predSign;
	predictionOptions.sign = sunsigns[predSign];
	if(predictionOptions.type=='Sun')
	{
		predictionOptions.caption =	 sunsigns[predSign];
	}
	else if(predictionOptions.type=='Moon')
	{
		predictionOptions.caption =	 moonsigns[predSign];
	}

	loadWidget('fullpred',false);
}

var makeactivehead = function(section)
{
	////alert(section);
	if(section=='Sun')
	{
		sunbackground = 'bbgrey';
		moonbackground = '';
		predictionOptions.caption =	 sunsigns[predictionOptions.signId];
	}
	else
	{
		sunbackground = '';
		moonbackground = 'bbgrey';
		predictionOptions.caption =	 moonsigns[predictionOptions.signId];
	}
	predictionOptions.type = section;
	loadWidget(options.initScreen,false);
	//avWidget = avWidget.prepareCalendar(true);

}

var gettitle = function(sign,section)
{	
	if(section=='Sun')
	{
		title = sunsigns[sign];
	}
	else
	{
		title = moonsigns[sign];		
	}
	
	return title;
}

var showsignmenu = function()
{
	options.initScreen = 'frpred';
	//avWidget = avWidget.prepareCalendar(true);
	loadWidget(options.initScreen,false);
}

Widget.prototype.shim1px = function()
{
	return new Element('div',{'class':'shim1px cb',html:'&nbsp;'}).create();
};

Widget.prototype.astroCal = function(isChMod)
{
    //console.log('v1.0 loaded MOD:',isChMod);
	reg = lpad(astroData.header.regional.day)+' '+astroData.header.regional.month_name+'	'+astroData.header.regional.year_value;
	reg = (isChMod)?strSelRegion():reg;
	var tpl = '<div class="calnstar">'+
              '	<div class="calnstar_2">'+
              '  	<div class="calnstar_head pt11 b cp pl3 av_fa" onclick="loadWidget(\'rgion\',false);"><u>'+astroData.header.regional.year_caption+'</u>&nbsp;<img src="'+srv_root+'images/p_bot.gif" class="cp blk" onclick="loadWidget(\'rgion\',false);" width="5" height="4"/> </div>'+
              '     <div class="shim2px cb">&nbsp;</div>'+
			  '      <div class="calnstar_text red pt12 b ac av_fa" id="regional_result">'+reg+'</div>'+
              '  </div>'+
			  '	<div class="calnstar_1">'+
              '  	<div class="resultbox_text pl3 fa pt11 b">'+astroData.panchangam.rahukalam.caption+':</div>'+
              '      <div class="calnstar_head pt11 ac fa "><span class="pt12 b red">'+astroData.panchangam.rahukalam.duration.toLowerCase()+'</span></div>'+
              '  </div>'+
              '  <div class="calnstar_star">'+
              '  	<div class="calnstar_sname pl3 fa pt12 b">'+astroData.panchangam.star.caption+' : <span class="pt12 b red">'+astroData.panchangam.star.value+'</span></div>'+
              '      <div class="calnstar_head pt11 ac fa grey">('+astroData.panchangam.star.duration+')</div>'+
              '  </div>'+
              '</div>'+
			  '</div>';
	return new Element('div',{'class':'',html:tpl}).create();
};

Widget.prototype.linkChart = function()
{
	var tpl = '<div class="linkbox ar red pt12 b pr4 av_fa">Instant astro chart<img src="'+srv_root+'images/dbullet_grey.gif" width="10" height="9" class="pl3"/></div>';
	li = new Element('div',{'class':'cp cb',html:tpl}).create();
	li.onclick = function(){ loadWidget('chart',false);};
	return li;
};

Widget.prototype.linkMain = function()
{
	var tpl = '<div class="linkbox ar blk pt12 b pr4 av_fa">Main Screen<img src="'+srv_root+'images/dbullet_grey.gif" width="10" height="9" class="pl3"/></div>';
	li = new Element('div',{'class':'cp cb',html:tpl}).create();
	li.onclick = function(){ loadWidget('basic',false);};
	return li;
};

Widget.prototype.linkDualChart = function(i)
{
	var la = ["","South Indian","East Indian","North Indian"];
	x = 2; y = 3;
	switch(i)
	{
		case 2 : x= 1; break;
		case 3 : x= 1; y=2;break;
	}
	var tpl = '<div class="linkbox ar red pt11 b pr4 av_fa" ><div class="fl" onclick="loadChart('+x+')">'+la[x]+' </div> <div class="fr" onclick="loadChart('+y+')"> '+la[y]+'</div></div>';
	li = new Element('div',{'class':'cp cb',html:tpl}).create();
	li.onclick = function(){ loadWidget('chart',false);};
	return li;
};

Widget.prototype.linkPanchang = function()
{
	var tpl = '<div class="linkbox ar blk pt12 b pr4 av_fa">Today\'s Panchagam<img src="'+srv_root+'images/dbullet_grey.gif" width="10" height="9" class="pl3"/></div>';
	li = new Element('div',{'class':'cp cb',html:tpl}).create();
	li.onclick = function(){ loadWidget('panch',false);};
	return li;
};

Widget.prototype.linkSpeciality = function()
{
	var tpl = '<div class="linkbox ar blk pt12 b pr4 av_fa">Speciality of this day<img src="'+srv_root+'images/dbullet_grey.gif" width="10" height="9" class="pl3"/></div>';
	li = new Element('div',{'class':'cp cb',html:tpl}).create();
	li.onclick = function(){ loadWidget('signf',false);};
	return li;
};

Widget.prototype.linkAstroDay = function()
{
	var tpl = '<div class="linkbox ar blk pt12 b pr4 av_fa">Astroday<img src="'+srv_root+'images/dbullet_grey.gif" width="10" height="9" class="pl3"/></div>';
	li = new Element('div',{'class':'cp cb',html:tpl}).create();
	li.onclick = function(){ loadWidget('astro',false);};
	return li;
};
Widget.prototype.linkFreePredictions = function()
{
	var tpl = '<div class="linkboxrev ar wht pt12 b pr4 av_fa">Free Predictions<img src="'+srv_root+'images/dbullet_white.gif" width="10" height="9" class="pl3"/></div>';
	li = new Element('div',{'class':'cp cb',html:tpl}).create();
	li.onclick = function(){ loadWidget('frpred',false);};
	return li;
};

/*------------------------------------------------------
			JScript Calendar
--------------------------------------------------------*/
/*  month list array*/
var mlist = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var wlist = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
/*	function to pad 0 to the left of a string	*/
function lpad(str){ str = str.replace(' ',''); if(str.length > 0 && str.length < 2) str = '0'+ str; return str;};

/*
	Creates a calendar array for the given month
	of the date. This array is a 7 x 5 matrix
	and the first colum is sunday then monday
	and so on.
*/
var dtpl = '<div class="sp **CL**" onclick="chDate(**IP**)">**DT**</div>';
var av_dtpl = '<td class="**CL**" onclick="chDate(**IP**)"><p>**DT**</p></td>';
function createCalendarFor(sDate)
{
    dateForCal = sDate;
    //console.log('calendar sDate:',sDate, dateForCal);
	var dlist = [31,28,31,30,31,30,31,31,30,31,30,31];
	var date = new Date();
	var day = sDate.split('-')[2];
	var month = parseInt(sDate.split('-')[1]) - 1;
	var year = sDate.split('-')[0];
    slctdMonth = month;
    slctdYear = year;
    curMonth = month;
    curYear = year;
	dlist[1] = isLeapYear(year)? 29 : 28;

	date.setDate(1); date.setMonth(month); date.setFullYear(year);

	var wday = date.getDay();
	wday 		= startDayOfMonth(wday);
	var cal = [	[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0]];

	var dt = 1;
	for(var x=0 ; x<6 ; x++)
	{
		for(var i=wday;i< 7;i++) 
		{
			cal[x][i] = dt;
			dt++;
			if(dt > dlist[month]){x=7; break;}
		}
		wday = 0;
	}
    //console.log(cal);
	return cal;
}
var changeRange = 0;

function createCalendarForMonth(moveTo)
{
    //console.log(dateForCal,moveTo);
    changeRange = changeRange + moveTo;
    sDate = dateForCal;
	var dlist = [31,28,31,30,31,30,31,31,30,31,30,31];
	var date = new Date();
	var day = sDate.split('-')[2];
	var month = parseInt(sDate.split('-')[1]) - 1;
	//var year = sDate.split('-')[0];
	var aMonthValue 	= { 'Jan':1, 'Feb':2, 'Mar':3, 'Apr':4, 'May':5, 'Jun':6, 'Jul':7, 'Aug':8, 'Sep':9, 'Oct':10, 'Nov':11, 'Dec':12 };


	var iMonthValue 	= (moveTo == 1 ? parseInt(aMonthValue[$('#curMonth').html()]) : parseInt(aMonthValue[$('#curMonth').html()]) - 1);

	var month 			= ($('#curMonth').html() ? iMonthValue : parseInt(sDate.split('-')[1]) - 1); 
	var year 			= ($('#curYear').html() ?  $('#curYear').html() : sDate.split('-')[0]); 
	dlist[1] = isLeapYear(year)? 29 : 28;
    /*if(curMonth+changeRange<0){
        year--;
        month=11;
        changeRange=11;
    }
    else if(curMonth+changeRange>11){
        year++;
        month=0;
        changeRange=0;
    }
    else {
        month = month+changeRange;
    }*/

	if(month == 12 && moveTo == 1) {
		year++;
		month=0;
	} else if( (month == 0 || month < 0) && moveTo == -1) {
		year--;
		month=11;
	} else if (moveTo == -1){
		month = month - 1;
	}

    slctdMonth = month;
    slctdYear = year; 
    //console.log(curMonth,changeRange,curMonth+changeRange);
    /*document.getElementById('curYear').innerHTML = year;
    document.getElementById('curMonth').innerHTML = av_getMonthName(month);
    $('.curYear').text(year);
    $('.curMonth').text(av_getMonthName(month));*/
	date.setDate(1); date.setMonth(month); date.setFullYear(year);
	var wday 	= date.getDay();
	wday 		= startDayOfMonth(wday);
	var cal = [	[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0]];

	var dt = 1;
	for(var x=0 ; x<6 ; x++)
	{
		for(var i=wday;i< 7;i++) 
		{
			cal[x][i] = dt;
			dt++;
			if(dt > dlist[month]){x=7; break;}
		}
		wday = 0;
	}
    //console.log(cal);
	//return cal;
    av_modCal(cal);
}

function startDayOfMonth(wday)
{
	var iWday = null;
	if(wday == 0) {
		iWday = 6;
	} else {
		iWday = wday - 1;
	}

	return iWday
}

function isLeapYear(datea)
{
	datea = parseInt(datea);
	return ((datea%4 == 0) ? ((datea%100 != 0) ? true :((datea%400 == 0)?true:false)) : false);
}

/*---------------------------------------------------------
		Errors
-----------------------------------------------------------*/
function error(msg)
{
	////alert(msg);
	av$(targetElementId).clear();
	var tpl ='<div id="av_widget_148" class="ac" style="border:#000 solid 2px; height:308px;">'+
			'<div class="warning"><b>(!)Warning</b></div>'+
			'<div class=" ac" style="height:106px;"><div class="pt12"><br />'+
			'The server is temporarily unavailable due to <strong class="b pt14">maintenance</strong>. <br />'+
			'Please   try again later. </div>'+
			'</div>'+
			'<div class="calnstar_2 ac pt12 b pl3"  >'+
			'Please   try again later. '+
			'</div>'+
			'<div class="shim1px blk"></div>'+
			'<p class="pt14 red b">Thank you for <br />'+
			'your patience</p><div class="av_pt10">'+''+'</div>'+
			'</div>';
	frame = new Element('div',{id:'av_widget_148','class':'',html:tpl}).create();
	av$(targetElementId).instance.appendChild(frame);
}
/*		Util		*/
function getInternetExplorerVersion()
{
  var rv = -1; /* Return value assumes failure.*/
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.av$1 );
  }
  return rv;
}
/* Detect if the browser is IE or not.
 If it is not IE, we assume that the browser is NS. */
var IE = document.all ? true : false;
/*/ If NS -- that is, !IE -- then set up for mouse capture*/
if (!IE) document.captureEvents(Event.MOUSEMOVE);

/*/ Set-up to use getMouseXY function onMouseMove*/
document.onmousemove = getMouseXY;

/*/ Temporary variables to hold mouse x-y pos.s*/
var tempX = 0;
var tempY = 0;
var pMouse = null;

/*/ Main function to retrieve mouse x-y pos.s */

function getMouseXY(e) 
{
  if (IE) 
  { /*/ grab the x-y pos.s if browser is IE*/
    tempX = event.clientX + document.body.scrollLeft;
    tempY = event.clientY + document.body.scrollTop;
  } 
  else 
  {  /*/ grab the x-y pos.s if browser is NS*/
    tempX = e.pageX;
    tempY = e.pageY;
  }  
  /*/ catch possible negative values in NS4*/
  if (tempX < 0){tempX = 0}
  if (tempY < 0){tempY = 0}  
  /*/ show the position values in the form named Show*/
  /*/ in the text fields named MouseX and MouseY*/
  pMouse = {x:tempX,y:tempY};
}
function inArray(el,arr)
{
	return false;
}
function Trimm(str,ln)
{
	return (str.length > ln) ? str.substring(0,(ln-3))+'...' : str;
}

//v9.0 Additional Functions DMV
function av_toggleMenu(el) {
  if(document.getElementById(el).classList.contains("av-hider")) {
      document.getElementById(el).classList.remove("av-hider");
  }
  else {
      document.getElementById(el).classList.add("av-hider");
  }
  if(el=="av-calendar-container") {
      if(!document.getElementById("av-cssmenu").classList.contains("av-hider")) {
          document.getElementById("av-cssmenu").classList.add("av-hider");
      }
  }
  else if(el=="av-cssmenu") {
      if(!document.getElementById("av-calendar-container").classList.contains("av-hider")) {
          document.getElementById("av-calendar-container").classList.add("av-hider");
      }
  }
}
function av_setChartType() {
    var av_slctdType = document.getElementById('av-selectChartType');
    //console.log(av_slctdType.value);
    loadChart(av_slctdType.value);
}
function av_getDayName(el) {
    var av_daySlct = ["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"];
    return av_daySlct[el];
}
function av_getMonthName(el) {
    var av_monthSlct = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return av_monthSlct[el];
}

// Google Places API integration

var placeSearch, autocomplete;
var latitude = null;
var longitude = null;
var deglat = null;
var minlat = null;
var deglong = null;
var minlong = null;
var placename = null;
var regionname = null;
var region_dist = null;
var state = null;
var countryname = null;
var fullplacename = null;
var latdir = null;
var longdir = null;
var tzoname = null;
var componentForm = {
  locality: 'long_name'
};
var av_placeSelect = null;   
function initAutocomplete() {
  av_placeSelect = 0;
  //console.log('initAutocomplete');
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('av-panchangPlace')),
      {types: ['(cities)']}); //geocode,establishment,address,(regions),(cities)

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  $("#locationSetter span:first").html("Loading...");
  autocomplete.addListener('place_changed', fillInAddress);
}

function horoscopeAutocomplete() {
  av_placeSelect = 1;
  //console.log('horoscopeAutocomplete');
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete2 = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('cityofbirthfill')),
      {types: ['(cities)']}); //geocode,establishment,address,(regions),(cities)

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete2.addListener('place_changed', fillInAddress);
}

// [START region_fillform]
var place = null;
function fillInAddress() {
	resetPlace(0);
  // Get the place details from the autocomplete object.
    if(aCurrentLocationResults) {
		place = aCurrentLocationResults[0];
	} else {
		if(autocomplete) {
			place = autocomplete.getPlace();
		}
		else if(autocomplete2) {
			place = autocomplete2.getPlace();
		}
	}
    //console.log(place);
  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
  //document.getElementById('location').innerHTML = (place.geometry.location.lat()+' , '+place.geometry.location.lng());
  latitude = place.geometry.location.lat();
  longitude = place.geometry.location.lng();
  deglat = Math.abs(parseInt(place.geometry.location.lat()));
  minlat = Math.abs(parseInt((latitude % 1)*60));
  deglong = Math.abs(parseInt(place.geometry.location.lng()));
  minlong = Math.abs(parseInt((longitude % 1)*60));
  placename = place.address_components[0].long_name;
  //regionname = place.address_components[2].long_name;
  //countryname = place.address_components[3].long_name;
	if (place.address_components[i].types[0].indexOf("country") == 0){
	countryname = place.address_components[i].long_name;
	country = countryname;
	}
	if(place.address_components[i].types[0].indexOf("administrative_area_level_2") == 0){
	regionname = place.address_components[i].long_name;
	region_dist = regionname;
	}
	if(place.address_components[i].types[0].indexOf("administrative_area_level_1") == 0){
	state = place.address_components[i].long_name;
	statename = state;
	}
	else{
	state = null;
  }}
  
  fullplacename = place.address_components[0].long_name+','+place.address_components[1].long_name+','+place.address_components[2].long_name;
  var geoaddress = place.geometry.location.lat()+' , '+place.geometry.location.lng();
  if(latitude >= 0){
	   latdir = "N";
  }
  else if(latitude < 0){
	   latdir = "S";
  }
  if(longitude >= 0){
	   longdir = "E";
  }
  else if(longitude < 0){
	   longdir = "W";
  }
  if(country == 'India'){
	  tzoname = "Asia/Calcutta";
  }
	else{
  var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "http://report.clickastro.com/tz/index.php?latitude="+latitude+"&longitude="+longitude+"&curl=200",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();
var jsonstring = JSON.stringify(json);
var obj = jQuery.parseJSON(jsonstring);
tzoname = obj.timezone;
//alert(tzoname);
	}
	//checkDstAndSubmit();
 // document.getElementById('location').innerHTML = tzoname;
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
	//document.getElementById('address_new').innerHTML = place.address_components[0].long_name;
  }
  
	if(aCurrentLocationResults) {
		av_newSetPlace();
		aCurrentLocationResults = null;
	} else {
		if(autocomplete) {
			av_newSetPlace();// RECHECK DMV
		}
		else if(autocomplete2) {
			av_setPlace(0);
		}
	}
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  //if (navigator.geolocation) {
    //navigator.geolocation.getCurrentPosition
	(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  //}
}
// [END region_geolocation]

var cAjaxCall = function(url){
	inScript = document.getElementById('inSrcipt');
	//if(inScript) document.head.removeChild(inScript);
	inScript = document.createElement('script');
	inScript.id = 'inScript';
	inScript.src = url;
	document.getElementsByTagName('script')[0].appendChild(inScript);
  }
  var placeList = null;
  function getIt(js){
	placeList = js;
	r = document.getElementById('solr_search_suggest');
	r.innerHTML = "";
	r.style.visibility = 'visible';
	if(js.response.docs.length == 0)
		r.style.visibility = 'hidden';
	for(i =0; i < js.response.docs.length ; i++){
		dt = js.response.docs[i].place_name+', '+js.response.docs[i].region_name+', '+js.response.docs[i].country_name+'';
		document.getElementById('solr_search_suggest').appendChild(el(dt,i));
	}
  }
  function el(s,d){
	  e = document.createElement('a');
	  e.className = 'item';
	  e.href = "javascript:av_setPlace("+d+")";
	  e.innerHTML = s;
	  return e;
  }
  
  /*var SOLR_URL = "http://clickastro.com:8983/solr/citydata/select/?json.wrf=getIt&rows=3&wt=json&q=place_name:";*/
  var SOLR_URL = "http://report.clickastro.com:8080/solr/collection1/select/?json.wrf=getIt&rows=20&wt=json&q=placename:";
  function solrParams(el){
	m_cchild = -1;
	r = document.getElementById('solr_search_suggest');
	r.innerHTML = "";
	r.style.visibility = 'hidden';
	return el.value;
  }
/*  ///////////////////////////////////////////*/
var m_cchild = -1;
var noSolrResponseWaiting = true;
function solrSearchSuggest(evt) 
{
  	/*var city=document.getElementById("m_txtCity").value;*/
	var e= evt.keyCode;

	if(e == 40) /*downarrow*/
	{
		if(m_cchild < document.getElementById('solr_search_suggest').childNodes.length-1){
			if(m_cchild >= 0) document.getElementById('solr_search_suggest').childNodes[m_cchild].className = 'item';
			document.getElementById('solr_search_suggest').childNodes[++m_cchild].className = 'sel';
			document.getElementById('txtCity').value = placeList.response.docs[m_cchild].place_name;
			/*document.getElementById('m_solr_search_suggest').childNodes[m_cchild].innerHTML;*/
		}
	}
	else if(e ==38) /*up arrow*/
	{
		if(m_cchild > 0){
			document.getElementById('solr_search_suggest').childNodes[m_cchild].className = 'item';
			document.getElementById('solr_search_suggest').childNodes[--m_cchild].className = 'sel';
			document.getElementById('txtCity').value = placeList.response.docs[m_cchild].place_name;
			/*document.getElementById('m_solr_search_suggest').childNodes[m_cchild].innerHTML;*/
		}
	}
	else if(e ==13){
		av_setPlace(m_cchild);
	}
	else if(noSolrResponseWaiting){
		var r = document.getElementById('solr_search_suggest');
		if(document.getElementById('txtCity').value.length > 2){
			cAjaxCall(SOLR_URL+solrParams(document.getElementById('txtCity')));
		}
		else{
			r.innerHTML = "";
		}
	}
}
function av_bst(event) {
    var key = event.keyCode;
	if (key==8){
	resetPlace(0);
	}
	}
function resetPlace(i){
	country = '';
	statename = '';
	placename = '';
	deglong = '';
	minlong = '';
	longdir = '';
	deglat = '';
	minlat = '';
	latdir = '';
	region_dist = '';
    if(av_placeSelect) {
        document.frmplaceorder.country.value = "";
        document.frmplaceorder.state.value = "";
        document.frmplaceorder.txt_place_search.value =	"";
        document.frmplaceorder.longdeg.value = "";
        document.frmplaceorder.longmin.value = "";
        document.frmplaceorder.longdir.value = "";
        document.frmplaceorder.latdeg.value = "";
        document.frmplaceorder.latmin.value = "";
        document.frmplaceorder.latdir.value = "";
        document.frmplaceorder.region_dist.value = "";
        document.frmplaceorder.correction.value = "";
        document.frmplaceorder.timezone_name.value = "";
        document.frmplaceorder.timezone.value = "";
    }
} 
function av_setPlace(i){
	//alert(placename);
    //console.log('av_setPlace(',i,'), av_placeSelect: ',av_placeSelect);
	if (av_placeSelect == 0) {
        //console.log(placename,deglong,minlong,longdir,deglat,minlat,latdir,latitude,longitude);
    }
    else {
        document.frmplaceorder.country.value =	country;
        document.frmplaceorder.state.value =	statename;
        /*if(document.frmplaceorder.country.value=='India')
        {
            if(document.frmplaceorder.state.value=='Kerala')
        {
            document.getElementById("chart_style").selectedIndex = 4;
        }
        else if(document.frmplaceorder.state.value=='Tamil Nadu'||document.frmplaceorder.state.value=='Karnataka'||document.frmplaceorder.state.value=='Andhra Pradesh')
        {
            document.getElementById("chart_style").selectedIndex = 1;
        }
        else if(document.frmplaceorder.state.value=='Sikkim'||document.frmplaceorder.state.value=='Odisha'||document.frmplaceorder.state.value=='West Bengal'||document.frmplaceorder.state.value=='Assam')
        {
            document.getElementById("chart_style").selectedIndex = 3;
        } 
          else
        {
            document.getElementById("chart_style").selectedIndex = 2;
        }      
        }*/   
        document.frmplaceorder.txt_place_search.value =	placename;
        document.frmplaceorder.longdeg.value = deglong;
        document.frmplaceorder.longmin.value = minlong;
        document.frmplaceorder.longdir.value = longdir;
        document.frmplaceorder.latdeg.value = deglat;
        document.frmplaceorder.latmin.value = minlat;
        document.frmplaceorder.latdir.value = latdir;
        document.frmplaceorder.region_dist.value = region_dist;
        //document.frmplaceorder.timezone.value = placeList.response.docs[i].time_zone;
        document.frmplaceorder.correction.value = '';
        document.frmplaceorder.timezone_name.value = tzoname;
        if(document.frmplaceorder.country.value == 'India'){
            document.frmplaceorder.correction.value = '0';
            document.frmplaceorder.timezone.value = '05.30E';
        }
        if(document.frmplaceorder.country.value != 'India'){
            checkDstAndSubmit();
        }
    }
} 
var bg = null;
function checkDstAndSubmit(){
	
	dobday = document.frmplaceorder.dobday.value;
	dobmonth = document.frmplaceorder.dobmonth.value;
	dobyear = document.frmplaceorder.dobyear.value;
	tob = document.frmplaceorder.tobhour.value +":"+document.frmplaceorder.tobmin.value;
	tzname = tzoname;
	url =	'http://clickastro.com/astro-campaign/dstcheck.php?dobday='+dobday+'&dobmonth='+dobmonth+'&dobyear='+dobyear+'&tob='+tob+
			'&timezone_name='+tzname+'&callback=vaidateSubmit';

	cAjaxCall(url);
}

function showDSTPrompt(tzone,corr){
	name = document.frmplaceorder.name.value;
	msg = '<div style="border:15px solid #fff;font-size:14px;text-align:center;font-family:Arial">Please confirm whether the time of birth <b>'+
	'</b> is during DST</div><br/><br/>'+
		'<div align="center"><button style="padding:3px;" onclick="javascript:vaidateSubmit(\''+tzone+'\','+corr+
		')">Yes, its during DST </button><br/><br/>'+
		'<button style="padding:3px;" onclick="javascript:vaidateSubmit(\''+tzone+
		'\',0)">No, its during Standard Time</button></div>';

	bg = document.createElement('div');
	document.body.appendChild(bg);
	bg.style.width = '300px';
	bg.style.border = '2px solid #666';
	bg.style.height = '200px';
	bg.style.left = (screen.width - 300)/2;
	bg.style.top = (screen.height - 210) / 2;
	bg.style.background = '#fff';
	bg.style.position =(document.all) ? 'absolute' : 'fixed';
	bg.style.zIndex = 1001;
	bg.innerHTML = '<b>'+msg+'</b>';

}
function vaidateSubmit(tzone,corr,prompt){
	if(prompt == true){
		showDSTPrompt(tzone,corr);
		alert(tzone);
	}
	else{
		if(bg) document.body.removeChild(bg);
		document.frmplaceorder.correction.value = corr;
		document.frmplaceorder.timezone.value = tzone;
	}
}
function urldecode(url) {
  return decodeURIComponent(url.replace(/\+/g, ' '));
}
//var avHoroClientId='IASWIDGET';

function av_initDateVals() {
	  //target.innerHTML = template;
	  f = document.frmplaceorder;
      //console.log(f);
	  d = new Date();
	  f.dobday.selectedIndex = d.getDate()-1; 
	  f.dobmonth.selectedIndex = d.getMonth(); 
	  f.dobyear.selectedIndex = d.getFullYear()-1901-25;
	  f.tobhour.selectedIndex = d.getHours() % 12;
	  f.tobhour.selectedIndex = f.tobhour.selectedIndex == 0 ? 11 : f.tobhour.selectedIndex -1;
      f.tobmin.selectedIndex = d.getMinutes();
	  f.language.value = "Eng";
	  f.chart_style.value = "1";
      //if($("div#avx_widget_148_wid a[href='http://www.astro-vision.com/']").attr('id')) {
      //    avHoroClientId = $("div#avx_widget_148_wid a[href='http://www.astro-vision.com/']").attr('id');
      //}
     //console.log(avHoroClientId);
	  f.clientid.value = avHoroClientId;
}

function validatelang()
{
    if(document.frmplaceorder.country.value=='India')
        {
    if(document.frmplaceorder.language.value=='Mal')
    {
        document.getElementById("chart_style").selectedIndex = 4;
    }
    if(document.frmplaceorder.language.value=='Hin'||document.frmplaceorder.language.value=='Mar')
    {
        document.getElementById("chart_style").selectedIndex = 2;
    }       
    if(document.frmplaceorder.language.value=='Eng'||document.frmplaceorder.language.value=='Tam'||document.frmplaceorder.language.value=='Kan'||document.frmplaceorder.language.value=='Tel')
    {
        document.getElementById("chart_style").selectedIndex = 1;
    }    
          
        }
}

function validateDate(){
	 f = document.frmplaceorder;
	 date = new Date(f.dobyear.options[f.dobyear.selectedIndex].value,f.dobmonth.selectedIndex+1,0);
	 f.dobday.selectedIndex = (f.dobday.selectedIndex > date.getDate()-1) ? date.getDate()-1 : f.dobday.selectedIndex;
	 if(f.timezone.value != '05.30E'){
		checkDstAndSubmit();
	}
 }
 function error(m,e){
	 //e.style.backgroundColor = (!m)? "#fff" : "#f66";
     //console.log(m);
 }
 function av_validate(){
     var gotformdata = $("#frmplaceorder").serialize();
     //console.log(gotformdata);
	 f = document.frmplaceorder;
	 if(f.name.value.length == 0 || f.name.value == 'Name'){
		 return f.name.focus(error('Please Enter your Name',f.name));
	 }
	 else 
		 error(false,f.name);
	 
	 if(! validateEmail(f.email.value)){
		 return f.email.focus(error('Please Enter your (valid)email address',f.email));
	 }
	 else 
		 error(false,f.email);
	 
	 //if(f.txt_place_search.value.length == 0 || f.city.value.length == 0 ){
		// return f.city.focus(error('Please Enter your Place of birth',f.city));
	 //}
	 //else 
		// error(false,f.city);
	 //if(f.chart_style.selectedIndex == 0){
		// return f.chart_style.focus(error('Please select the chart format',f.chart_style));
	// } 
	 //else
		 //error(false,f.chart_style);
	 document.frmplaceorder.submit();
 }
 function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//getIt();

av_imgModder = 0;
function av_imgZoomer() {
    //console.log('imgZoomer loaded',av_imgModder);
    if(av_imgModder%2 == 0) {
        document.getElementById("av-chartImage").style.width = "120%";
        document.getElementById("av-chartImage").style.height = "120%";
        document.getElementById("av-chartImage").style.margin = "-20% 0 0 -10%";
        av_imgModder++;
    }
    else {
        document.getElementById("av-chartImage").style.width = "auto";
        document.getElementById("av-chartImage").style.height = "100%";
        document.getElementById("av-chartImage").style.margin = "0 0 0 0";
        av_imgModder++;
    }
}

function av_newSetPlace() {
    //console.log(placename,deglong,minlong,longdir,deglat,minlat,latdir);
    av_long = deglong+":"+minlong+" "+longdir;
    av_lati = deglat+":"+minlat+" "+latdir;
    parsePlace({cityName: placename, longitude: av_long, latitude: av_lati, timeZone: "05:30 E", timeCorrection: "0"});
}
function av_createCal() {
    //av$(this.targetId+'_content').clear();
    //console.log("av_createCal start",getDateString(curDate));
	var acal = createCalendarFor(getDateString(curDate));
    //console.log(acal, av_dtpl, curDate);
	var y =   '<table class="av-cal">'+
              '<caption>'+
              '  <span class="av-prev" onclick="createCalendarForMonth(-1);"><p>&larr;</p></span>'+
              '  <span class="av-next" onclick="createCalendarForMonth(+1);"><p>&rarr;</p></span><span id="curMonth" class="curMonth" >'+av_getMonthName(curDate.getMonth())+'</span>&nbsp;<span id="curYear" class="curYear">'+curDate.getFullYear()+
              '</span></caption>'+
              '<thead>'+
              '  <tr>'+
              '    <th>Mon</th>'+
              '    <th>Tue</th>'+
              '    <th>Wed</th>'+
              '    <th>Thu</th>'+
              '    <th>Fri</th>'+
              '    <th>Sat</th>'+
              '    <th>Sun</th>'+
              '  </tr>'+
              '</thead>';
	y +=      '<tbody>';
    //console.log(acal, av_dtpl, y);
	for(i=0;i<6;i++)
	{
        y += '<tr>';
		for(j=0;j<7;j++)
		{
			d = (acal[i][j] == 0)? av_dtpl.replace("**DT**","") : av_dtpl.replace("**DT**",lpad(acal[i][j]+''));
			d = d.replace("**CL**",((acal[i][j] == 0)?"av-off":"")+""+((acal[i][j] == curDate.getDate())?" av-active " :""));
			d = d.replace("**IP**",acal[i][j]);
			y += d;
		}
		y += '</tr>';
	}
    y +=     '</tbody>'+
             '</div>';
    //console.log(y);
    document.getElementById("av-calendar-container").innerHTML = y;
}
function av_modCal(acal) {
    //av$(this.targetId+'_content').clear();
    //console.log("av_createCal start",getDateString(curDate));
    //console.log(acal, av_dtpl, curDate);
    //console.log(av_getMonthName(slctdMonth),slctdYear)
    var iYRange = 5;
    if(acal[5][0]) {
    	iYRange = 6;
    }

	var y =   '<table class="av-cal">'+
              '<caption>'+
              '  <span class="av-prev" onclick="createCalendarForMonth(-1);"><p>&larr;</p></span>'+
              '  <span class="av-next" onclick="createCalendarForMonth(+1);"><p>&rarr;</p></span><span id="curMonth" class="curMonth" >'+av_getMonthName(slctdMonth)+'</span>&nbsp;<span id="curYear" class="curYear">'+slctdYear+
              '</span></caption>'+
              '<thead>'+
              '  <tr>'+
              '    <th>Mon</th>'+
              '    <th>Tue</th>'+
              '    <th>Wed</th>'+
              '    <th>Thu</th>'+
              '    <th>Fri</th>'+
              '    <th>Sat</th>'+
              '    <th>Sun</th>'+
              '  </tr>'+
              '</thead>';
	y +=      '<tbody>';
    //console.log(acal, av_dtpl, y);
	for(i=0;i<iYRange;i++)
	{
        y += '<tr>';
		for(j=0;j<7;j++)
		{
			d = (acal[i][j] == 0)? av_dtpl.replace("**DT**","") : av_dtpl.replace("**DT**",lpad(acal[i][j]+''));
			d = d.replace("**CL**",((acal[i][j] == 0)?"av-off":"")+""+((acal[i][j] == curDate.getDate() && curMonth == slctdMonth)?" av-active " :""));
			d = d.replace("**IP**",acal[i][j]);
			y += d;
		}
		y += '</tr>';
	}
    y +=     '</tbody>'+
             '</div>';
    //console.log(y);
    document.getElementById("av-calendar-container").innerHTML = y;
}

function av_setSelectedYear() {
    if (astroData.header.regional.year_caption == "Shakavarsha") {
        document.getElementById('av-selectRegion').value = 'SAK';
    }
    else if (astroData.header.regional.year_caption == "Malayalam") {
        document.getElementById('av-selectRegion').value = 'MAL';
    }
    else if (astroData.header.regional.year_caption == "Tamil") {
        document.getElementById('av-selectRegion').value = 'TAM';
    }
    else if (astroData.header.regional.year_caption == "Telugu") {
        document.getElementById('av-selectRegion').value = 'TEL';
    }
}
function av_setSelectedChart() {
    if(options.chartStyle==1){
        document.getElementById('av-selectChartType').value = 1;
    }
    else if(options.chartStyle==2){
        document.getElementById('av-selectChartType').value = 2;
    }
    else if(options.chartStyle==3){
        document.getElementById('av-selectChartType').value = 3;
    }
}
function av_selectedMenuItem() {
    //console.log(options.initScreen);
    if($("#av-panchang").hasClass("av-active")) {
        $("#av-panchang").removeClass("av-active");
    }
    else if($("#av-astroday").hasClass("av-active")) {
        $("#av-astroday").removeClass("av-active");
    }
    else if($("#av-astrochart").hasClass("av-active")) {
        $("#av-astrochart").removeClass("av-active");
    }
    else if($("#av-horoscope").hasClass("av-active")) {
        $("#av-horoscope").removeClass("av-active");
    }
    
    if (options.initScreen == "panch2" || options.initScreen == "basic") {
        $("#av-panchang").addClass("av-active");
    }
    else if (options.initScreen == "astro2") {
        $("#av-astroday").addClass("av-active");
    }
    else if (options.initScreen == "chart2") {
        $("#av-astrochart").addClass("av-active");
    }
    else if (options.initScreen == "horos2") {
        $("#av-horoscope").addClass("av-active");
    }
    else if (options.initScreen == "about2") {
        $("#av-about").addClass("av-active");
    }
}
var newel ='';
function av_splitSpaceJoiner(el) {
    el = el.split("-");
    el[0] = el[0].replace("am"," am").replace("pm"," pm");
    el[1] = el[1].replace("am"," am").replace("pm"," pm");
    newel = el[0]+"-"+el[1];
    return newel;
}
function resetCalendar() {
    slctdMonth = curMonth;
    slctdYear = curYear;
    slctdDate = curDate;
}
//CSS MODED BY DMV
function measureWidth(el) {
    //console.log(document.getElementById(el).offsetWidth,av_color,av_textcolor);
    var av_parentWidth = document.getElementById(el).offsetWidth;
    if(av_parentWidth) {
        $("#av-aw-panchang-wrapper").css({
            'min-width': '180px', 
            'width': '100%',
            'min-height' : 'auto',
            'height' : 'auto'
        });
        $(".av-aw-panchang-header").css({
            'width': '100%',
            'height' : 'auto'
        });
        $(".av-aw-menu-holder .av-cc-ddl-header").css({
            'height': 'auto'
        });
        $(".av-aw-panchang-holder .av-heading .av-headtext").css({
            'width': '80%'
        });
        $(".av-cc-ddl-header").css({
            'width': '80%',
            'padding': '8px 0 0 0'
        });
        $("#av-panchangPlace").css({
            'width': '60%'
        });
        $(".av-aw-panchang-holder .av-heading .av-headtext").css({
            'margin': '0 2%'
        });
        $(".av-footer").css({
            'text-align': 'center'
        });
        $(".av-gethoroscope-button").css({
            'margin': '0 auto',
            'float': 'right',
            'width' : '85%'
        });
        $(".av-fl").css({
            'float': 'none',
            'margin': '0 auto',
            'text-align' : 'center'
        });
        $(".av-gethoroscope-button:hover").css({
            'box-shadow': '3px 3px 1px #9c9c9c',
            'color': '#FFFFFF',
            'text-decoration': 'none'
        });
        //Custom Color Mechanism v2
        $(".av-clr1Txt").css({
            'color': av_color
        });
        $(".av-clr1Bg, .av-active p, #av-cssmenu ul li.av-active").css({
            'background': av_color
        });
        $(".av-clr2Txt, .av-active p, #av-cssmenu ul li.av-active").css({
            'color': av_textcolor
        });
        $(".av-clr2Bg").css({
            'background': av_textcolor
        });
    }
    if(av_parentWidth <= 300) {
        $(".av-aw-date-holder .av-date-combo").css({
            'width': '70%'
        });
        $(".av-aw-panchang-holder .av-heading .av-headtext").css({
            'width': '65%'
        });
        $(".av-aw-panchang-holder .av-heading .av-headtext").css({
            'font-size': '1em'
        });
        $(".av-aw-panchang-holder .av-content-holder .head-text2, .av-aw-panchang-holder .av-content-holder .head-text2").css({
            'width': '100%',
            'text-align' : 'center'
        });
        $(".av-form-wrapper, .av-form-wrapper select").css({
            'width': '95%',
            'margin' : '2% auto'
        });
        $(".av-fr, .av-fltxt").css({
            'font-size': '1em',
            'text-align' : 'center',
            'width' : '98%'
        });
        $(".av-w50").css({
            'width': '98%',
            'float' : 'none'
        });
        $(".av-w25").css({
            'width': '30%',
            'float' : 'left'
        });
        $(".av-w100 .av-label").css({
            'width': '96%'
        });
        $(".av-aw-panchang-header .head-text1").css({
            'text-align': 'center',
            'font-weight' : 'bold',
            'float': 'none',
            'padding-left': '0'
        });
        $(".av-aw-panchang-holder .av-content-holder .head-text3").css({
            'width': '100%',
            'text-align' : 'center',
            'float': 'none',
            'padding': '1.5% 0'
        });
        $(".av-aw-panchang-header .av-calendar").css({
            'float': 'none',
            'margin' : '0 auto'
        });
        $("#av-aw-panchang-wrapper .av-aw-panchang-holder").css({
            'min-height': '390px'
        });
        $(".av-aw-panchang-holder .av-content-holder .head-text3").css({
            'clear': 'both'
        });
        $(".av-gethoroscope-button").css({
            'float': 'none'
        });
    }
    /*
    if(av_parentWidth <= 350) {
        $("#av-calendar-container").css({
            'left' : '20%'
        });
    }*/
    if(av_parentWidth <= 220) {
        $(".av-cal th, .av-cal td, .av-cal td p").css({
            'width': '25px'
        });
        $(".av-calendar-container, .av-cal").css({
            'width': '220px'
        });
        $(".av-cal caption").css({
            'width': '80%'
        });
    }
}

// change region based on language selected in widget
function selectRegionOnLan() {
	var sLang 		= $('#av-language').val();
	var aSouthIndia = ['Eng', 'Tam', 'Tel', 'Kan'];
	var aNorthIndia = ['Hin', 'Mar', 'Ori'];
	var aEastIndia 	= ['Ben'];
	var aKerala 	= ['Mal'];

	if(sLang) {
		var intVal = aSouthIndia.indexOf(sLang);
		if(intVal > -1) {
			$('#chart_style').val(1);
			return false;
		}
		var intVal = aNorthIndia.indexOf(sLang);
		if(intVal > -1) {
			$('#chart_style').val(2);
			return false;
		}
		var intVal = aEastIndia.indexOf(sLang);
		if(intVal > -1) {
			$('#chart_style').val(3);
			return false;
		}
		var intVal = aKerala.indexOf(sLang);
		if(intVal > -1) {
			$('#chart_style').val(0);
			return false;
		}
	}
}

// location lat and long details
function getLocationAreaDetails(sLocationName) {
	var geocoder =  new google.maps.Geocoder();
	geocoder.geocode( { 'address': sLocationName}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if(results) {
				//var aLocation 	= formatAreaDetails(results);
				aCurrentLocationResults = results;
				$('#av-panchangPlace').val(results[0].formatted_address);
				$('#av-panchangPlace').trigger("change");
				$("#locationSetter span:first").html("Loading...");
				fillInAddress();
				$("#locationSetter span:first").html(results[0].formatted_address);
				return false;
			}
		} else {
			return false;
		}
		return false;
	});
}

function formatAreaDetails(results) {
	var aLocation 	= [];

	aLocation['latitude'] 	= latitude	= results[0].geometry.location.lat();
	aLocation['longitude'] 	= longitude	= results[0].geometry.location.lng();
	aLocation['deglat'] 	= deglat	= Math.abs(parseInt(results[0].geometry.location.lat()));
	aLocation['minlat'] 	= minlat	= Math.abs(parseInt((aLocation['latitude'] % 1)*60));
	aLocation['deglong'] 	= deglong	= Math.abs(parseInt(results[0].geometry.location.lng()));
	aLocation['minlong'] 	= minlong	= Math.abs(parseInt((aLocation['longitude'] % 1)*60));

	if(aLocation['latitude'] >= 0){
		aLocation['latdir'] = latdir = "N";
	}
	else if(aLocation['latitude'] < 0){
		aLocation['latdir'] = latdir = "S";
	}

	if(aLocation['longitude'] >= 0){
		aLocation['longdir'] = longdir = "E";
	}
	else if(aLocation['longitude'] < 0){
		aLocation['longdir'] = longdir = "W";
	}
	placename = results[0].formatted_address;
	//return aLocation;
	av_long 		= aLocation['deglong']+":"+aLocation['minlong']+" "+aLocation['longdir'];
	av_lati 		= aLocation['deglat']+":"+aLocation['minlat']+" "+aLocation['latdir'];
	//parsePlace({cityName: results[0].formatted_address, longitude: av_long, latitude: av_lati, timeZone: "05:30 E", timeCorrection: "0"});
	//$("#locationSetter span:first").html(results[0].formatted_address);
	setTimeout(function(){
		$('#av-panchangPlace').val(results[0].formatted_address);
		$('#av-panchangPlace').trigger("change");
		//initAutocomplete();
		fillInAddress()
		//av_newSetPlace();
	}, 2000);
	return false;
}

//END DMV

setTimeout(function() {
	var jf = document.createElement("script");
	jf.type = "text/javascript";
	jf.src = "https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.js";
	document.body.appendChild(jf);
}, 2000);
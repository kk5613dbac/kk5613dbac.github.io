var resultArray;

var selectCache;

var maxDispNum;

var areaInfoTable;

var shipList;

var ruleList;

var planetList;

var osVer;

function PlatformCheck()
{
	if((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1)
		|| navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0){
		osVer = "smartPhone";
	}else{
		osVer = "pc";
	}

	InitLoadCSS();
}

function InitLoadCSS()
{
	var cssName;
	var rowCnt;

	if(osVer == "pc"){
		cssName = "sample9_css3.css";
		rowCnt = 3;
	}else{
		cssName = "sample10_css3.css";
		rowCnt = 1;
	}

	document.getElementsByName("selectName4")[0].setAttribute('size',rowCnt);
	document.getElementsByName("selectName5")[0].setAttribute('size',rowCnt);
	document.getElementsByName("selectName6")[0].setAttribute('size',rowCnt);
	document.getElementsByName("selectName1")[0].setAttribute('size',rowCnt);

	addStyleSheet(cssName);
}

function GetXMLResponse(docPath,callback)
{
    var xhr = XMLHttpRequestCreate();
    xhr.open("GET", docPath, true);
    xhr.send();
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status === 200){
        callback(xhr.responseXML);
      }
    }
};

function XMLHttpRequestCreate()
{
	try{
		return new XMLHttpRequest();
	}catch(e){}

	try{
		return new ActiveXObject('MSXML2.DOMDocument.6.0');
	}catch(e){}

	return null;
}

function AddAreaTypeList()
{
	GetXMLResponse("map_areainfo.xml",function(xmldoc)
		{
			var hinmeiNode=xmldoc.getElementsByTagName("NAME");
			var select1 = document.getElementsByName("selectName1")[0]; //変数select1を宣言

			// select1.options.length = 0; 選択肢の数がそれぞれに異なる場合、これが重要

			for(var i=0;i<=hinmeiNode.length-1;i++){
				select1.options[i] = new Option(hinmeiNode[i].textContent);
			}

			xmldoc = null;

			if(osVer == "smartPhone"){
				// 項目が空の状態で先にグループを追加すると、以降で追加した項目は強制的にグループに属するものとして扱われる
				// → disable属性で全項目選択不可になる
				var optGrp=document.createElement('optgroup');
				// → setAttributeの第2引数は必須
				optGrp.setAttribute('disabled', 'true');
				// style属性はgetElementsByTagName経由でアクセスしないと適用されない
				document.getElementsByTagName("optgroup")[0].style.display = "none";
				select1.insertBefore(optGrp, select1.firstChild);
			}
		});
}

function AddPlanetList()
{
	GetXMLResponse("map.xml",function(xmldoc)
		{
			planetList = new Array();

			var hinmeiNode=xmldoc.getElementsByTagName("MAPBIG")[0].getElementsByTagName("NAME");
			var select4 = document.getElementsByName("selectName4")[0]; //変数select1を宣言

			// select4.options.length = 0; 選択肢の数がそれぞれに異なる場合、これが重要

			for(var i=0;i<=hinmeiNode.length-1;i++){
				select4.options[i] = new Option(hinmeiNode[i].textContent);
				planetList[i] = new Array();
				planetList[i].push(hinmeiNode[i].parentNode.getElementsByTagName("ID")[0].textContent);
				planetList[i].push(hinmeiNode[i].textContent);
			}

			xmldoc = null;

			if(osVer == "smartPhone"){
				// 項目が空の状態で先にグループを追加すると、以降で追加した項目は強制的にグループに属するものとして扱われる
				// → disable属性で全項目選択不可になる
				var optGrp=document.createElement('optgroup');
				// → setAttributeの第2引数は必須
				optGrp.setAttribute('disabled', 'true');
				// style属性はgetElementsByTagName経由でアクセスしないと適用されない
				document.getElementsByTagName("optgroup")[0].style.display = "none";
				select4.insertBefore(optGrp, select4.firstChild);
			}
		});
}

function AddShipList()
{
	GetXMLResponse("ship.xml",function(xmldoc)
		{
			shipList = new Array();

			var hinmeiNode=xmldoc.getElementsByTagName("NAME");
			var select5 = document.getElementsByName("selectName5")[0]; //変数select1を宣言

			// select5.options.length = 0; 選択肢の数がそれぞれに異なる場合、これが重要

			for(var i=0;i<=hinmeiNode.length-1;i++){
				select5.options[i] = new Option(hinmeiNode[i].textContent);
				shipList.push(hinmeiNode[i].textContent);
			}

			xmldoc = null;

			if(osVer == "smartPhone"){
				// 項目が空の状態で先にグループを追加すると、以降で追加した項目は強制的にグループに属するものとして扱われる
				// → disable属性で全項目選択不可になる
				var optGrp=document.createElement('optgroup');
				// → setAttributeの第2引数は必須
				optGrp.setAttribute('disabled', 'true');
				// style属性はgetElementsByTagName経由でアクセスしないと適用されない
				document.getElementsByTagName("optgroup")[0].style.display = "none";
				select5.insertBefore(optGrp, select5.firstChild);
			}
		});
}

function AddRuleList()
{
	GetXMLResponse("rule.xml",function(xmldoc)
		{
			ruleList = new Array();

			var hinmeiNode=xmldoc.getElementsByTagName("NAME");
			var select6 = document.getElementsByName("selectName6")[0]; //変数select1を宣言

			// select6.options.length = 0; 選択肢の数がそれぞれに異なる場合、これが重要

			for(var i=0;i<=hinmeiNode.length-1;i++){
				select6.options[i] = new Option(hinmeiNode[i].textContent);
				ruleList.push(hinmeiNode[i].textContent);
			}

			xmldoc = null;

			if(osVer == "smartPhone"){
				// 項目が空の状態で先にグループを追加すると、以降で追加した項目は強制的にグループに属するものとして扱われる
				// → disable属性で全項目選択不可になる
				var optGrp=document.createElement('optgroup');
				// → setAttributeの第2引数は必須
				optGrp.setAttribute('disabled', 'true');
				// style属性はgetElementsByTagName経由でアクセスしないと適用されない
				document.getElementsByTagName("optgroup")[0].style.display = "none";
				select6.insertBefore(optGrp, select6.firstChild);
			}
		});
}

function Search()
{
	// ***** デバッグ ***** //
	var startTime = new Date();
	// ******************** //

	selectCache = false;

	document.getElementsByName("button1")[0].disabled="true";

	document.getElementById("showArea").innerHTML="";
	document.getElementById("debugArea").innerHTML="";

	var keyArray = GetSelectedAreaType([
				document.getElementsByName("selectName4")[0],
				document.getElementsByName("selectName5")[0],
				document.getElementsByName("selectName6")[0],
				document.getElementsByName("selectName1")[0]]);

	GetXMLResponse("map.xml",function(xmldoc)
		{
			var xmldoc1 = xmldoc;
			GetXMLResponse("map_custom_master160707.xml",function(xmldoc)
				{
					var xmldoc2 = xmldoc;
					GetXMLResponse("map_areainfo.xml",function(xmldoc)
						{
							var xmldoc3 = xmldoc;

							resultArray = GetResultAreaType(xmldoc1,keyArray,xmldoc2);

							areaInfoTable = GetAreaInfoTable(xmldoc3);

							xmldoc1 = null;
							xmldoc2 = null;
							xmldoc3 = null;

							if(osVer == "pc"){
								makeTable(resultArray);

								addStyleSheet("sample7_css3.css");
							}else{
								makeTable2(resultArray);

								addStyleSheet("sample8_css3.css");
							}

							selectCache = true;

							ChangeMaxDisplayNum();

							// ***** デバッグ ***** //
							var endTime = new Date();
							var msec = endTime - startTime;

							document.getElementById("debugArea").innerHTML+="sampx.jsの処理時間："+ msec + "msec" + "<br>";
							// ******************** //
						});
				});
		});
}

function GetSelectedAreaType(selectBoxArray)
{
	var keyArray = new Array();

	for(var i=0;i<=selectBoxArray.length-1;i++){
		keyArray[i] = new Array();
		for(var j=0;j<=selectBoxArray[i].options.length-1;j++){
			if(selectBoxArray[i].options[j].selected){
				keyArray[i].push(selectBoxArray[i].options[j].text);
			}
		}
	}

	return keyArray;
}

function GetResultAreaType(xmldoc,keyArray,ex_xmldoc)
{
var planetId = new Array();
var planetList = xmldoc.getElementsByTagName("MAPBIG")[0].getElementsByTagName("NAME");

var matchDataList1 = new Array();
var matchDataList2 = new Array();

var keyPlanetLst = keyArray[0];
if(keyPlanetLst.length == 0){
	for(var i=0;i<=document.getElementsByName("selectName4")[0].options.length-1;i++){
		keyPlanetLst.push(document.getElementsByName("selectName4")[0].options[i].text);
	}
}

for(var i=0;i<=keyPlanetLst.length-1;i++){
	for(var j=0;j<=planetList.length-1;j++){
		if(keyPlanetLst[i]==planetList[j].textContent){
			planetId.push("s"+planetList[j].parentNode.getElementsByTagName("ID")[0].textContent);
			break;
		}
	}
}

for(var i=0;i<=planetId.length-1;i++){
	var tmp1 = xmldoc.getElementsByTagName("MAP")[0].getElementsByTagName(planetId[i])[0].getElementsByTagName("DATA");
	var tmp2 = ex_xmldoc.getElementsByTagName("MAP")[0].getElementsByTagName(planetId[i])[0].getElementsByTagName("DATA");
	for(var j=0;j<=tmp1.length-1;j++){
		matchDataList1.push(tmp1[j]);
		matchDataList2.push(tmp2[j]);
	}
}

// ************************************************************************************************************** //

if((keyArray[1].length != 0)&&(matchDataList2.length != 0)){
	var i = 0;
	while(i<=matchDataList2.length-1){
		var tmp = GetShipNameFromID(matchDataList2[i].getElementsByTagName("SHIP1")[0].textContent|0) + "|"
				+ GetShipNameFromID(matchDataList2[i].getElementsByTagName("SHIP2")[0].textContent|0);
		var flag = false;
		for(var j=0;j<=keyArray[1].length-1;j++){
			if(tmp.indexOf(keyArray[1][j])>=0){
				flag = true;
			}
		}
		if(flag == false){
			matchDataList1.splice(i, 1);
			matchDataList2.splice(i, 1);
		}else{
			i++;
		}
	}
}

// ************************************************************************************************************** //

if((keyArray[2].length != 0)&&(matchDataList2.length != 0)){
	var i = 0;
	while(i<=matchDataList2.length-1){
		tmp = matchDataList2[i].getElementsByTagName("RULE")[0].textContent;
		flag = false;
		for(var j=0;j<=keyArray[2].length-1;j++){
			if(tmp.indexOf(keyArray[2][j])>=0){
				flag = true;
			}
		}
		if(flag == false){
			matchDataList1.splice(i, 1);
			matchDataList2.splice(i, 1);
		}else{
			i++;
		}
	}
}

// ************************************************************************************************************** //

if((keyArray[3].length != 0)&&(matchDataList2.length != 0)){
	var i = 0;
	while(i<=matchDataList2.length-1){
		tmp = matchDataList2[i].getElementsByTagName("STAGE")[0].textContent;
		flag = false;
		for(var j=0;j<=keyArray[3].length-1;j++){
			if(tmp.indexOf(keyArray[3][j])==-1){
				flag = true;
			}
		}
		if(flag){
			matchDataList1.splice(i, 1);
			matchDataList2.splice(i, 1);
		}else{
			i++;
		}
	}
}

// ************************************************************************************************************** //

	var resultArray = new Array();

	for(var i=0;i<=matchDataList1.length-1;i++){
		resultArray[i] = new Array();
		resultArray[i].push(String(i+1));

		var pID = matchDataList1[i].parentNode.nodeName.substr(1);
		tmp = xmldoc.getElementsByTagName("MAPBIG")[0].getElementsByTagName("ID");
		for(var j=0;j<=tmp.length;j++){
			if(tmp[j].textContent==pID){
				resultArray[i].push(tmp[j].parentNode.getElementsByTagName("NAME")[0].textContent);
				break;
			}
		}

		resultArray[i].push(matchDataList1[i].getElementsByTagName("NAME")[0].textContent);
		resultArray[i].push(matchDataList2[i].getElementsByTagName("RULE")[0].textContent);
		resultArray[i].push(matchDataList2[i].getElementsByTagName("STAGE")[0].textContent);

		var SHIP1SPEC = GetShipNameFromID(matchDataList2[i].getElementsByTagName("SHIP1")[0].textContent|0)+" ("+
			matchDataList2[i].getElementsByTagName("SHIP1SHOTTYPE")[0].textContent+" "+
			matchDataList2[i].getElementsByTagName("SHIP1SHOT")[0].textContent+"|"+
			matchDataList2[i].getElementsByTagName("SHIP1BOMBTYPE")[0].textContent+" "+
			matchDataList2[i].getElementsByTagName("SHIP1BOMB")[0].textContent+"|"+
			matchDataList2[i].getElementsByTagName("SHIP1ARM")[0].textContent+")";
			resultArray[i].push(SHIP1SPEC);

		var SHIP2SPEC = GetShipNameFromID(matchDataList2[i].getElementsByTagName("SHIP2")[0].textContent|0)+" ("+
			matchDataList2[i].getElementsByTagName("SHIP2SHOTTYPE")[0].textContent+" "+
			matchDataList2[i].getElementsByTagName("SHIP2SHOT")[0].textContent+"|"+
			matchDataList2[i].getElementsByTagName("SHIP2BOMBTYPE")[0].textContent+" "+
			matchDataList2[i].getElementsByTagName("SHIP2BOMB")[0].textContent+"|"+
			matchDataList2[i].getElementsByTagName("SHIP2ARM")[0].textContent+")";
			resultArray[i].push(SHIP2SPEC);

		resultArray[i].push(matchDataList1[i].getElementsByTagName("TSCORE")[0].textContent);
		resultArray[i].push(matchDataList1[i].getElementsByTagName("TNAME")[0].textContent);
		resultArray[i].push(GetShipNameFromID(matchDataList1[i].getElementsByTagName("TSHIP")[0].textContent|0));
		resultArray[i].push(matchDataList1[i].getElementsByTagName("TLOCATION")[0].textContent);
		resultArray[i].push(matchDataList1[i].getElementsByTagName("TDATE")[0].textContent);
	}

	return resultArray;
}

function GetShipNameFromID(shipID)
{
	return shipList[shipID];
}

function makeTable(dataArray)
{
	var fieldArray = ["No.","星系(レベル)","エリア","ルール","エリア構成","機体1(ショット|ボム|アーム)","機体2(ショット|ボム|アーム)","WTS","スコアネーム","使用機体","店","日付"];

	var table = document.createElement("table");

	var row=table.insertRow(-1);
	var column;
	var lnk;

	for(var i=0;i<=fieldArray.length-1;i++){
		column=row.insertCell(-1);
		column.appendChild(document.createTextNode(fieldArray[i]));
	}

	for(i=1;i<=dataArray.length;i++){
		row=table.insertRow(-1);
		for(var j=0;j<=fieldArray.length-1;j++){
			column=row.insertCell(-1);
			if(j==1){
				column.style.color = GetPlanetColorFromName(dataArray[i-1][j]);
				column.setAttribute('id', 'planetName');
				column.appendChild(document.createTextNode(dataArray[i-1][j]));
			}else if(j==4){
				lnk=document.createElement('a');
				column.setAttribute('id', 'area');
				lnk.setAttribute('href','javascript:void(0);');
				lnk.setAttribute("onClick", 'LinkEchoTest(this);');
				lnk.appendChild(document.createTextNode(dataArray[i-1][j]));
				column.appendChild(lnk);
			}else{
				column.appendChild(document.createTextNode(dataArray[i-1][j]));
			}
		}
	}

	document.getElementById("showArea").appendChild(table);
}

function makeTable2(dataArray)
{
	var section;
	var text;
	var tmp1;
	var tmp2;
	var buf;
	var spn;
	var lnk;

	for(var i=1;i<=dataArray.length;i++){
		section = document.createElement("section");
		tmp1 = "";
		tmp2 = "";
		for(var j=0;j<=dataArray[i-1].length-1;j++){
			if((j==0)||(j==3)||(j==5)||(j==6)){
				text=document.createElement('p');
				text.appendChild(document.createTextNode(dataArray[i-1][j]));
				section.appendChild(text);
			}else if(j==1){
				buf = dataArray[i-1][j];
			}else if(j==2){
				tmp1 = dataArray[i-1][j];
				if(j==2){
					text=document.createElement('p');
					spn=document.createElement('span');
					spn.style.color = GetPlanetColorFromName(buf);
					spn.setAttribute('id', 'planetName');
					spn.appendChild(document.createTextNode(buf));
					text.appendChild(spn);
					text.appendChild(document.createTextNode("\u00a0\u00a0" + tmp1));
					section.appendChild(text);
				}
			}else if(j==4){
				buf = dataArray[i-1][j];
				text=document.createElement('p');
				text.setAttribute('id', 'area');
				lnk=document.createElement('a');
				lnk.setAttribute('href','javascript:void(0);');
				lnk.setAttribute("onClick", 'LinkEchoTest(this);');
				lnk.appendChild(document.createTextNode(buf));
				text.appendChild(lnk);
				section.appendChild(text);
			}else if(j>=7){
				tmp2 = tmp2 + dataArray[i-1][j];
				if(j==dataArray[i-1].length-1){
					text=document.createElement('p');
					text.appendChild(document.createTextNode(tmp2));
					section.appendChild(text);
				}else{
					tmp2 = tmp2 + "\u00a0|\u00a0";
				}
			}
		}
		document.getElementById("showArea").appendChild(section);
	}
}

function GetPlanetColorFromName(planetName)
{
	var colorCode;
	var id = "";

	for(var i=0;i<=planetList.length-1;i++){
		if(planetList[i][1]==planetName){
			id = planetList[i][0];
			break;
		}
	}

	if(id!=""){
		switch(id.substr(0,2)){
			case '00':
				return '#ff0000';
				break;
			case '01':
				return '#ff7700';
				break;
			case '02':
				return '#ffdd00';
				break;
			case '03':
				return '#04ff00';
				break;
			case '04':
				return '#00b7ff';
				break;
			case '05':
				return '#000dff';
				break;
			case '06':
				return '#8c00ff';
				break;
		}
	}else{
		return -1;
	}
}

function addStyleSheet(href)
{
	var lnk = document.createElement("link");

	lnk.setAttribute("rel","stylesheet");
	lnk.setAttribute("type","text/css");
	lnk.setAttribute("href",href);

	var hd = document.getElementsByTagName("head")[0];

	hd.appendChild(lnk);
}

function EnableSearchButton()
{
	document.getElementsByName("button1")[0].disabled="";
}

function ChangeMaxDisplayNum()
{
	if(osVer == "pc"){
		ChangeMaxDisplayNum1();
	}else{
		ChangeMaxDisplayNum2();
	}
}

function ChangeMaxDisplayNum1()
{
	if(selectCache){
		ClearPageList();

		maxDispNum = document.getElementsByName("selectName2")[0].value;

		var totalPageNum = Math.ceil((document.getElementById("showArea").getElementsByTagName("table")[0].rows.length-1)/maxDispNum);

		for(var i=0;i<=totalPageNum-1;i++){
			document.getElementsByName("selectName3")[0].options[i] = new Option(i+1);
		}

		ControlDispStatus1();
	}
}

function ChangeMaxDisplayNum2()
{
	if(selectCache){
		ClearPageList();

		maxDispNum = document.getElementsByName("selectName2")[0].value;

		var totalPageNum = Math.ceil((document.getElementById("showArea").getElementsByTagName("section").length-1)/maxDispNum);

		for(var i=0;i<=totalPageNum-1;i++){
			document.getElementsByName("selectName3")[0].options[i] = new Option(i+1);
		}

		ControlDispStatus2();
	}
}

function ClearPageList()
{
	if(document.getElementsByName("selectName3")[0].hasChildNodes()){
		while(document.getElementsByName("selectName3")[0].childNodes.length > 0) {
			document.getElementsByName("selectName3")[0].removeChild(document.getElementsByName("selectName3")[0].firstChild)
		}
	}
}

function ControlDispStatus()
{
	if(osVer == "pc"){
		ControlDispStatus1();
	}else{
		ControlDispStatus2();
	}
}

function ControlDispStatus1()
{
	var currentPage = document.getElementsByName("selectName3")[0].value;

	for(var i=1;i<=document.getElementById("showArea").getElementsByTagName("table")[0].rows.length-1;i++){
		if((i>=maxDispNum*(currentPage-1)+1)&&(i<=maxDispNum*currentPage)){
			// 本来はstyle.display = "block"で良いが、IEではバグで表が崩れる。 //
			document.getElementById("showArea").getElementsByTagName("table")[0].rows[i].style.display = "";
		}else{
			document.getElementById("showArea").getElementsByTagName("table")[0].rows[i].style.display = "none";
		}
	}
}

function ControlDispStatus2()
{
	var currentPage = document.getElementsByName("selectName3")[0].value;

	for(var i=0;i<=document.getElementById("showArea").getElementsByTagName("section").length;i++){
		if((i>=maxDispNum*(currentPage-1))&&(i<=(maxDispNum*currentPage)-1)){
			// 本来はstyle.display = "block"で良いが、IEではバグで表が崩れる。 //
			document.getElementById("showArea").getElementsByTagName("section")[i].style.display = "";
		}else{
			document.getElementById("showArea").getElementsByTagName("section")[i].style.display = "none";
		}
	}
}

function GetAreaInfoTable(xmldoc)
{
	var dataArray = new Array();

	var hinmeiNode=xmldoc.getElementsByTagName("AREA")[0].getElementsByTagName("DATA");

	for(var i=0;i<=hinmeiNode.length-1;i++){

		dataArray[i] = new Array();
		dataArray[i].push(hinmeiNode[i].getElementsByTagName("ID")[0].textContent);
		dataArray[i].push(hinmeiNode[i].getElementsByTagName("NAME")[0].textContent);
		dataArray[i].push(hinmeiNode[i].getElementsByTagName("CATEGORY")[0].textContent);
		dataArray[i].push(hinmeiNode[i].getElementsByTagName("SHOTITEM")[0].textContent);
		dataArray[i].push(hinmeiNode[i].getElementsByTagName("BOMBITEM")[0].textContent);
		dataArray[i].push(hinmeiNode[i].getElementsByTagName("ARMITEM")[0].textContent);
		dataArray[i].push(hinmeiNode[i].getElementsByTagName("SUBBOSS")[0].textContent);

	}

	return dataArray;
}

function LinkEchoTest(clickedText)
{
	var areaInfo = clickedText.innerText.split(" > ");

	var planetName;
	var areaName;

	if(osVer == "pc"){
		planetName = clickedText.parentNode.parentNode.cells[1].innerText;
		areaName = clickedText.parentNode.parentNode.cells[2].innerText;
	}else{
		var tmp = clickedText.parentNode.parentNode.getElementsByTagName("p")[1].innerText.split("  ");
		planetName = tmp[0];
		areaName = tmp[1];
	}

	var winObj = window.open('');
	var docObj = winObj.document;

	docObj.open();
	docObj.write("<html>");
	docObj.write("<head>");
	docObj.write("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">");
	docObj.write("</head>");
	docObj.write("<body>");
	docObj.write("</body>");
	docObj.write("</html>");

	var head = docObj.getElementsByTagName("head")[0];
	var title = docObj.createElement('title');
	title.innerHTML = planetName + " 星系 / " + areaName + " エリア";
	head.appendChild(title);

	var div;
	var span;
	var body = docObj.getElementsByTagName("body")[0];
	var flag;

	var bossCnt = 0;

	for(var i=0;i<=areaInfo.length-1;i++){
		flag = false;
		for(var j=0;j<=areaInfoTable.length-1;j++){
			if(areaInfo[i]==areaInfoTable[j][1]){
				div = docObj.createElement('div');
				div.innerHTML += areaInfo[i];
				div.style.fontSize = '12px';	
				body.appendChild(div);

				div = docObj.createElement('div');

				span = docObj.createElement('span');
				span.setAttribute('id','shot');
				span.innerHTML += '●';
				span.style.color = '#ff0000';
				span.style.fontSize = '32px';
				div.appendChild(span);

				div.innerHTML += areaInfoTable[j][3] + '  ';
				div.style.fontSize = '12px';

				span = docObj.createElement('span');
				span.setAttribute('id','bomb');
				span.innerHTML += '●';
				span.style.color = '#00ff00';
				span.style.fontSize = '32px';
				div.appendChild(span);

				div.innerHTML += areaInfoTable[j][4] + '  ';
				div.style.fontSize = '12px';

				span = docObj.createElement('span');
				span.setAttribute('id','arm');
				span.innerHTML += '●';
				span.style.color = '#0000ff';
				span.style.fontSize = '32px';
				div.appendChild(span);

				div.innerHTML += areaInfoTable[j][5];
				div.style.fontSize = '12px';

				body.appendChild(div);

				flag = true;
			}
		}
			if(flag == false){
				div = docObj.createElement('div');
				div.innerHTML += areaInfo[i];
				div.style.fontSize = '12px';
				body.appendChild(div);

				bossCnt = bossCnt + 1;
			}
			if(i!=areaInfo.length-1){
				div = docObj.createElement('div');
				div.innerHTML += '<br/>';
				div.innerHTML += '↓<br/>';
				div.innerHTML += '<br/>';
				div.style.fontSize = '12px';
				body.appendChild(div);
			}
	}

	docObj.close();
}

function ClearSelection(obj)
{
	obj.parentNode.parentNode.getElementsByTagName("select")[0].selectedIndex = -1;

	EnableSearchButton();
}
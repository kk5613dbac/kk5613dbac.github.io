var resultArray;

var selectCache;

var maxDispNum;

var areaInfoTable;

var shipList;

var ruleList;

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
		});
}

function AddPlanetList()
{
	GetXMLResponse("map.xml",function(xmldoc)
		{
			var hinmeiNode=xmldoc.getElementsByTagName("MAPBIG")[0].getElementsByTagName("NAME");
			var select4 = document.getElementsByName("selectName4")[0]; //変数select1を宣言

			// select4.options.length = 0; 選択肢の数がそれぞれに異なる場合、これが重要

			for(var i=0;i<=hinmeiNode.length-1;i++){
				select4.options[i] = new Option(hinmeiNode[i].textContent);
			}

			xmldoc = null;
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

	var keyArray = GetSelectedAreaType([
				document.getElementsByName("selectName1")[0],
				document.getElementsByName("selectName4")[0],
				document.getElementsByName("selectName5")[0]]);

	GetXMLResponse("map.xml",function(xmldoc)
		{
			var xmldoc1 = xmldoc;
			GetXMLResponse("map_custom_master160707.xml",function(xmldoc)
				{
					var xmldoc2 = xmldoc;
					GetXMLResponse("map_areainfo.xml",function(xmldoc)
						{
							var xmldoc3 = xmldoc;

							resultArray = GetResultAreaType(xmldoc2,keyArray,xmldoc1);

							areaInfoTable = GetAreaInfoTable(xmldoc3);

							xmldoc1 = null;
							xmldoc2 = null;
							xmldoc3 = null;

							makeTable(resultArray);

							addStyleSheet("sample7_css3.css");

							selectCache = true;

							ChangeMaxDisplayNum();

							// ***** デバッグ ***** //
							var endTime = new Date();
							var msec = endTime - startTime;

							document.getElementById("showArea").innerHTML+="sampx.jsの処理時間："+ msec + "msec" + "<br>";
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
	var resultArray = new Array();

	var hinmeiNode=[xmldoc.getElementsByTagName("STAGE")];

	var flag = 0;
	var id = "";
	var l = 0;

	for(var k=0;k<=hinmeiNode.length-1;k++){
		for(var i=0;i<=hinmeiNode[k].length-1;i++){
			flag = 0;
			for(var j=0;j<=keyArray[k].length-1;j++){
				if(hinmeiNode[k][i].textContent.indexOf(keyArray[k][j])==-1){
					flag = -1;
					break;
				}
			}
			if(flag != -1){
				resultArray[l] = new Array();
				resultArray[l].push(hinmeiNode[k][i].textContent);
				resultArray[l] = GetAdditionalInfo(l+1,resultArray[l],hinmeiNode[k][i],ex_xmldoc);
				l = l + 1;
			}
		}
	}

	return resultArray;
}

function GetAdditionalInfo(number,dataArray,node,ex_xmldoc)
{
	dataArray.splice(0,0,String(number));

	// ***** 2つ上の親のタグ名からsを取り除き星系のIDを特定、MAPBIGタグから情報を取得 ***** //
	var pID = node.parentNode.parentNode.nodeName.substr(1);
	var tmp = ex_xmldoc.getElementsByTagName("MAPBIG")[0].getElementsByTagName("ID");
	for(var i=0;i<=tmp.length;i++){
		if(tmp[i].textContent==pID){
			dataArray.splice(1,0,tmp[i].parentNode.getElementsByTagName("NAME")[0].textContent);
			break;
		}
	}
	// ******************** //
	// ***** 2つ上の親のタグ名からグループID、同階層のIDタグからエリアIDを特定、MAPタグから情報を取得 ***** //
	var gID = node.parentNode.parentNode.nodeName;
	var aID = node.parentNode.getElementsByTagName("ID")[0].textContent;
	tmp = ex_xmldoc.getElementsByTagName("MAP")[0].getElementsByTagName(gID)[0].getElementsByTagName("ID");
	for(i=0;i<=tmp.length;i++){
		if(tmp[i].textContent==aID){
			dataArray.splice(2,0,tmp[i].parentNode.getElementsByTagName("NAME")[0].textContent);
			dataArray.splice(7,0,tmp[i].parentNode.getElementsByTagName("TSCORE")[0].textContent);
			dataArray.splice(8,0,tmp[i].parentNode.getElementsByTagName("TNAME")[0].textContent);
			dataArray.splice(9,0,GetShipNameFromID(tmp[i].parentNode.getElementsByTagName("TSHIP")[0].textContent|0));
			dataArray.splice(10,0,tmp[i].parentNode.getElementsByTagName("TLOCATION")[0].textContent);
			dataArray.splice(11,0,tmp[i].parentNode.getElementsByTagName("TDATE")[0].textContent);
			break;
		}
	}

	// ***** ルールの情報を取得 ***** //
	var RULE = node.parentNode.getElementsByTagName("RULE")[0].textContent;
	dataArray.splice(3,0,RULE);
	// ******************** //

	// ***** 機体1･2の名称の情報を取得 ***** //
	// ******************** //

	// ***** 機体1･2(ショット|ボム|アーム)の情報を取得 ***** //
	var SHIP1SPEC = GetShipNameFromID(node.parentNode.getElementsByTagName("SHIP1")[0].textContent|0)+" ("+
		node.parentNode.getElementsByTagName("SHIP1SHOTTYPE")[0].textContent+" "+
		node.parentNode.getElementsByTagName("SHIP1SHOT")[0].textContent+"|"+
		node.parentNode.getElementsByTagName("SHIP1BOMBTYPE")[0].textContent+" "+
		node.parentNode.getElementsByTagName("SHIP1BOMB")[0].textContent+"|"+
		node.parentNode.getElementsByTagName("SHIP1ARM")[0].textContent+")";
	dataArray.splice(5,0,SHIP1SPEC);

	var SHIP2SPEC = GetShipNameFromID(node.parentNode.getElementsByTagName("SHIP2")[0].textContent|0)+" ("+
		node.parentNode.getElementsByTagName("SHIP2SHOTTYPE")[0].textContent+" "+
		node.parentNode.getElementsByTagName("SHIP2SHOT")[0].textContent+"|"+
		node.parentNode.getElementsByTagName("SHIP2BOMBTYPE")[0].textContent+" "+
		node.parentNode.getElementsByTagName("SHIP2BOMB")[0].textContent+"|"+
		node.parentNode.getElementsByTagName("SHIP2ARM")[0].textContent+")";
		dataArray.splice(6,0,SHIP2SPEC);
	// ******************** //

	return dataArray;
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
			if(j==4){
				lnk=document.createElement('a');
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
	if(selectCache){
		ClearPageList();

		maxDispNum = document.getElementsByName("selectName2")[0].value;

		var totalPageNum = Math.ceil((document.getElementsByTagName("table")[0].rows.length-1)/maxDispNum);
		for(var i=0;i<=totalPageNum-1;i++){
			document.getElementsByName("selectName3")[0].options[i] = new Option(i+1);
		}
	}

	ControlDispStatus();
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
	var currentPage = document.getElementsByName("selectName3")[0].value;

	for(var i=1;i<=document.getElementsByTagName("table")[0].rows.length-1;i++){
		if((i>=maxDispNum*(currentPage-1)+1)&&(i<=maxDispNum*currentPage)){
			// 本来はstyle.display = "block"で良いが、IEではバグで表が崩れる。 //
			document.getElementsByTagName("table")[0].rows[i].style.display = "";
		}else{
			document.getElementsByTagName("table")[0].rows[i].style.display = "none";
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
	var planetName = clickedText.parentNode.parentNode.cells[1].innerText;
	var areaName = clickedText.parentNode.parentNode.cells[2].innerText;

	var winObj = window.open('');
	var docObj = winObj.document;

	docObj.open();
	docObj.write("<html>");
	docObj.write("<head>");
	docObj.write("<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">");
	docObj.write("</head>");
	docObj.write("<body>");
	docObj.write("</body>");
	docObj.write("</html>");

	var head = docObj.getElementsByTagName("head")[0];
	var title = docObj.createElement('title');
	title.innerHTML = planetName + " 星系 " + areaName + " エリア";
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
			if(i!=areaInfo.length-1){//
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
// JavaScript Document

function Write_Event () {	
var reqest = new XMLHttpRequest();			
		var Event=document.Do_Events.Text_Events.value;
			reqest.open('POST', '../PHP/Write_Name_to_table_Events.php',false);	
			reqest.setRequestHeader('content-type','application/x-www-form-urlencoded');			
			reqest.onreadystatechange = function () {
			if(reqest.readyState ==4&&reqest.status==200){					
			Answer=reqest.responseText;	   
				} // if  reqest.readyState ==4&&reqest.status==200
		}		//end funct request								
		
		var str ="Name_Event="+Event;																																	
		reqest.send(str);	 	
		var Out=Answer;
		if(Answer==0)		alert ("Запись внесена");			
		if(Answer==1) 	alert ("Ошибка записи");	
		if(Answer==2)		alert ("Такая запись уже есть");	
}

function Read_Events() {
			var length_answer;
			var	Number_Events;
			var Time_Create;
			var Name_Event;
			var reqest = new XMLHttpRequest();	
			reqest.open('POST', '../PHP/Read_from_Name_Events.php',false);	
			reqest.setRequestHeader('content-type','application/x-www-form-urlencoded');				
			reqest.onreadystatechange = function () {
			if(reqest.readyState ==4&&reqest.status==200){					
			Answer=reqest.responseText;		
				var dlina6=Answer.length;	
				var Zam2=Answer.substring(1,(dlina6-1));			// Убираем кв скобки с обеих сторон		
				var Zam3=Zam2.replace	(/"/g,"");					// Убираем все кавычки
				var Zam3=Zam2.split('][');																											// Разбиваем всю посылку на массивы
					Number_Events=Zam3[0].split(",");	
				 	Time_Create=Zam3[2].split(",");					
				 	Name_Event=Zam3[1].split(",");			
  			 		length_answer=Number_Events.length;
				} // if  reqest.readyState ==4&&reqest.status==200
		}		//end funct request								
	
		var str = "0";																																	// Это Логин владельца кабинета
		reqest.send(str);	 	
	
	var TR=document.getElementById("Table_Name_Events").getElementsByTagName("tr");
			tabl=document.getElementById('Table_Name_Events');
			while(tabl.rows.length > 1) {
					tabl.deleteRow(1);
				}	
		
			for(var ttt=0;ttt<length_answer;ttt++)
		{
			addRow_Table ();
		}		
	for(var k=0;k<length_answer;k++)
		{
			var TD=TR[k+1].getElementsByTagName('td');
//			TD[0].style.backgroundColor="#646";
			TD[0].innerText=Number_Events[k];
			TD[1].innerText= Perekodirovka_UTF_JS(Name_Event[k]);
			TD[2].innerText= Time_Create[k];
		}
}

function addRow_Table () {
    var tbody = document.getElementById("Table_Name_Events").getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR")
    var td1 = document.createElement("TD")
    td1.appendChild(document.createTextNode(""))
    var td2 = document.createElement("TD")
    td2.appendChild (document.createTextNode(""))
	  var td3 = document.createElement("TD")
    td3.appendChild(document.createTextNode(""))

    row.appendChild(td1);
    row.appendChild(td2);
	  row.appendChild(td3);
 
    tbody.appendChild(row);
  }
	function Perekodirovka_UTF_JS (txt)     																		// ********************************************  ПЕРЕКОДИРОВКА
	{	
					var txt1="";
					var otv5=txt;
					var n;
						for (var n=0;n<otv5.length;n++)			// Одно  место установки
						{																		//	Начинаем перекодировку из UTF8 в кирилицу
							var txt3=otv5.substr(n,1);
							if (txt3=='\\')
								{																// Есть совпадение		
									var txt2=otv5.substr(n+2,4);
									n=n+5;
									var str7=parseInt(txt2,16);
									var txt4=String.fromCharCode(Number(str7));
									txt1=txt1+txt4;	
								}
							else 	txt1=txt1+otv5.substr(n,1);
						}		
				return txt1;
			}

function myFunc (ev)																										// Выборка из таблицы
{
// 	http://www.cyberforum.ru/javascript/thread1145190.html
var e = ev || window.event; 																			//  || window.event;  - Можно не использовать
obj = e.target || e.srcElement;
if (obj.tagName == 'TABLE') return;
while (obj.tagName != 'TR') obj = obj.parentNode;
var cl = obj.cloneNode (1);
var tbl = document.createElement ('TABLE');
tbl.appendChild (cl);
with (document.getElementById ('myDIV')) innerHTML = '', appendChild (tbl);
}



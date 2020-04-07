//HEXAGONS aren't populating in step detail

//MOBILE DEVICES UPDATE: 
//iPad: Step Detail: iframe is taking up the entire page with long log files. 

// JavaScript Document
var userInput=[];
var id=[];
var div_id=[];
var step_title=[];
var speech_bubble_message=[];
var graphic=[];
var class_name=[];
var log_file=[];
var connection_type=[];
var total_steps;
//this is the number for the array which starts at zero
var step_num=-1;

var explanation=[];
var message_details=[];

var step_color=[];
var curr_color="#000000";
function loadDoc(xml_file_name) {
var xmlDoc_ID=xml_file_name;


//networkID = document.getElementById("network_name").value;
//xmlDoc_ID=networkID+".xml";
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    readXML(this);
    }
  };
  xhttp.open("GET", xmlDoc_ID, true);
  xhttp.send();	
}
	
function readXML(xml) {
var n;

var xmlDoc = xml.responseXML;


var demo = document.getElementById("demo");

	var home_btn = document.getElementById("Home");
	//home_btn.style="opacity: 0.25";
	//home_btn.disabled=true;
	var back_btn = document.getElementById("Previous_Button");
	back_btn.style="opacity: 0.25";
	back_btn.disabled=true;
	var next_button = document.getElementById("Next_Button");
	
	
var c = xmlDoc.getElementsByTagName("MESSAGE");
	total_steps=c.length-1;

	for (n = 0; n <= total_steps; n++) { 
		id[n]=(c[n].getElementsByTagName("ID")[0].childNodes[0].nodeValue); 
		speech_bubble_message[n]=(c[n].getElementsByTagName("SPEECH_BUBBLE")[0].childNodes[0].nodeValue); 
		step_title[n]=(c[n].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue); 
		graphic[n]=(c[n].getElementsByTagName("GRAPHIC")[0].childNodes[0].nodeValue); 
		step_color[n]=(c[n].getElementsByTagName("COLOR")[0].childNodes[0].nodeValue); 
		class_name[n]=c[n].getElementsByTagName("CLASS")[0].childNodes[0].nodeValue; 
		log_file[n]=c[n].getElementsByTagName("LOGFILE")[0].childNodes[0].nodeValue; 
		connection_type[n]=c[n].getElementsByTagName("CONNECTION")[0].childNodes[0].nodeValue;
		div_id[n]=c[n].getElementsByTagName("DIV_ID")[0].childNodes[0].nodeValue;
		explanation[n]=c[n].getElementsByTagName("EXPLANATION")[0].childNodes[0].nodeValue;
		message_details[n]=c[n].getElementsByTagName("MESSAGE_DETAILS")[0].childNodes[0].nodeValue;
		if (div_id[n]=="block"){
			createRectangle(graphic[n], connection_type[n], step_title[n]);
		}
		else{
		createStep(id[n]);	
		}
		
}

}

loadDoc("5G_CALLFLOW_v3.xml");
var blocknum=0;
function createRectangle(graphic, connection_type, step_title){
	
	var listBlock = document.createElement("div");
	listBlock.className=connection_type+"_flow";
	listBlock.style="padding: 5px 0px 20px 8px";

	//listBlock.innerHTML="<span style='color:white'>"+step_title+"</span>";
	if (graphic=="hexagon_02"){
	listBlock.innerHTML = "<svg width='413' height='52' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><defs><clipPath id='hex1'><path d='M717 502 1130 502 1130 554 717 554Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#hex1)' transform='translate(-717 -502)'><path d='M718 528 744 502 744 502 1104 502 1104 502 1130 528 1104 554 1104 554 744 554 744 554Z' fill='#BFBFBF' fill-rule='evenodd'/></g><foreignobject class='node' x='30' y='6' width='350' height='50'><span style='color:white'>"+step_title+"</span></foreignobject></svg>";
		}
		if (graphic=="hexagon_03"){
	listBlock.innerHTML = "<svg width='621' height='52' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><defs><clipPath id='hex2'><path d='M509 502 1130 502 1130 554 509 554Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#hex2)' transform='translate(-509 -502)'><path d='M509 528 535 502 535 502 1104 502 1104 502 1130 528 1104 554 1104 554 535 554 535 554Z' fill='#BFBFBF' fill-rule='evenodd'/></g><foreignobject class='node' x='30' y='6' width='350' height='50'><span style='color:white'>"+step_title+"</span></foreignobject></svg>"
		}

	var demo = document.getElementById("demo");
	demo.appendChild(listBlock);
}

//populate flowchart
function createStep(step_num){

var listRow = document.createElement("div");
var listToggle = document.createElement("div");
var listArrow =document.createElement("div");
	listArrow.className=connection_type[step_num]+"_flow";
	curr_color=step_color[step_num];
var svg_arrow_part2="fill='"+curr_color+"'/></g></svg></svg>";
	if(log_file[step_num]!="none"){
	listToggle.id=step_num;
	listToggle.style="display: none"
	listToggle.className="myDiv";
	listToggle.innerHTML="<iframe id='Div01_iframe' src='"+log_file[step_num]+"' class='myiframe' width='1000px' height='200px'></iframe></div>";
	}
	listRow.id=div_id[step_num];
	listRow.innerText =name[step_num];
	//listRow.className=class_name[step_num]+"_position";
	listRow.className=connection_type[step_num]+"_buttons";
		if(log_file[step_num]!="none"){
	listRow.innerHTML="<button class='button' onclick='toggleLogFile("+listToggle.id+")'>"+view_log+"</button><button class='button' onclick='createStepDetail("+step_num+")'>"+step_title[step_num]+"</button>";
		}
		if(log_file[step_num]==="none"){
			
			listRow.innerHTML="<button class='button' onclick='createStepDetail("+step_num+")'>"+step_title[step_num]+"</button>";
		}
	listArrow.innerHTML=eval(graphic[step_num])+svg_arrow_part2;
	var demo = document.getElementById("demo");
	
	
	demo.appendChild(listRow);
	demo.appendChild(listToggle);
	demo.appendChild(listArrow);
}

//change the iframe source to allow user to load their own logfiles
function changeInput(){	
	//console.log("input this step: "+step_num);
	var currentFile=document.getElementById("fileupload01");
	var fReader = new FileReader();
	fReader.readAsDataURL(currentFile.files[0]);
	fReader.onload = function(event){
	//console.log(event.target.result);
    document.getElementById("Div01_iframe").src = event.target.result;
	//save the user input in an array
	userInput[step_num] = event.target.result;
	//console.log(userInput[step_num]);
}	
}


//display the detailed page for each step
//alignment to "line" then size is based on "arrow" plus number, plus message box class name 
function createStepDetail(step){
	
//calculate height of iframe based on the location of the nav bar
	var element = document.getElementById('nav_bar');
	var positionInfo = element.getBoundingClientRect();
	var stretchFrame = positionInfo.top-410+"px";
	//console.log("nav bar:"+positionInfo.top);
	
//clear the page and reset the scroll bar
	$(document).scrollTop(0);
	var demo = document.getElementById("demo");
	demo.innerHTML = "";
//hide scrolling
	document.body.style.overflow = "hidden";
	
//check to see if the user loaded a file for this step
	var userData=userInput[step];
	//console.log("Step Number= "+step);
	//console.log("User Data= "+userInput[step]);

	
//reset the step number for the back and next buttons
	document.getElementById(step_num);
	step_num=step;
	curr_color=step_color[step_num];
	
//if this is an information block, create the block then leave
if(div_id[step_num]=="block"){
	/*var listBlock = document.createElement("div");
	listBlock.className=class_name[step_num];
	listBlock.innerHTML="<span style='color:white'>"+step_title[step_num]+"</span>";
	demo.appendChild(listBlock);*/
	createRectangle(graphic[step_num], connection_type[step_num], step_title[step_num])
	return;
	}
	var speechDiv=document.createElement("div");
	var explanation_block=document.createElement("div");
	var explanation_txt=document.createElement("div");
	var iframe_block=document.createElement("div");
	iframe_block.className="Log_File_Display";
	iframe_block.style.height=stretchFrame;
	
//check to see if the user has entered a logfile, if so, display that file rather than the default
if(userData != undefined || userData != null){
		//console.log("we have data!");
		iframe_block.innerHTML="<div id='Div01' class='detailDiv'><input type='file' name='fileupload' id='fileupload01' value='fileupload' class='fileupload'><button class='button' onClick='changeInput()'>Submit</button><iframe id='Div01_iframe' src='"+userData+"' class='detailFrame' width='1000px'></iframe></div>";
	}else{
	if (log_file[step_num]=="none"){current_logfile="Drive_Logs/blank.txt"}
	else{
		current_logfile=log_file[step_num];
	}	
	
	iframe_block.innerHTML="<div id='Div01' class='detailDiv'><input type='file' name='fileupload' id='fileupload01' value='fileupload' class='fileupload'><button class='button' onClick='changeInput()'>Submit</button><iframe id='Div01_iframe' src='"+current_logfile+"' class='detailFrame'></iframe></div>";
		}

	explanation_txt.id="Explanation";
	explanation_block.innerHTML="<svg class='Rectangle_1'><rect fill='rgba(241,242,242,1)' id='Rectangle_1' rx='0' ry='0' x='0' y='0' width='1024' height='73'></rect></svg>";
	explanation_txt.innerHTML=explanation[step_num];
	

//populate speech bubble
	if(speech_bubble_message[step_num]!="none"){
	var speechTextDiv=document.createElement("div");
	bubble_class_name=class_name[step_num]+"_bubble";
	speechTextDiv.className=class_name[step_num]+"_bubble";
	speechTextDiv.innerHTML="<span id='speech_bubble_text'>"+speech_bubble_message[step_num]+"</span>";
	speechDiv.innerHTML="<svg class='"+bubble_class_name+"' viewBox='-1094 -14 179 115.001'><path fill='rgba(255,255,255,1)' stroke='rgba(112,112,112,1)' stroke-width='1px' stroke-linejoin='miter' stroke-linecap='butt' stroke-miterlimit='4' shape-rendering='auto' d='M -1094.000366210938 101.0004043579102 L -1094.000366210938 4.287758350372314 L -1020.999633789063 4.287758350372314 L -1008 -14.00040054321289 L -995.0004272460938 4.287758350372314 L -915.0003051757813 4.287758350372314 L -915.0003051757813 101.0004043579102 L -1094.000366210938 101.0004043579102 Z'></path></svg>";
	demo.appendChild(speechDiv);
	demo.appendChild(speechTextDiv);
	}
	
//create arrow and title
	var align_class=connection_type[step_num]+"_align";
	console.log("align message: "+align_class);
	var step_arrow = document.createElement("div");
	//step_arrow.style="top: -15px";
	step_arrow.id=div_id[step_num];
	step_arrow.className=connection_type[step_num]+"_detail";
	
	var svg_arrow_part1=graphic[step_num];
	var svg_arrow_part2="fill='"+curr_color+"'/></g></svg></svg>";
	step_arrow.innerHTML=eval(graphic[step_num])+svg_arrow_part2;

	//add the message details	
	var messageGFX = svg_arrow_part1.substring(0, 8);
	console.log("message type: "+messageGFX);
	var messageBox=document.createElement("div");
	//var messageTextDiv=document.createElement("div");
	//messageBox.className=messageGFX+"_Message_Details_base";
	messageBox.classList.add(messageGFX+"_Message_Details_base", align_class);
	
	//messageBox.innerHTML="<span style='color:white'><b>"+step_title[step_num]+"</b><br>"+message_details[step_num]+"</span>";
	messageBox.innerHTML="<span id=message_text><b>"+step_title[step_num]+"</b><br>"+message_details[step_num]+"</span>";
	//messageBox.className=connection_type[step_num]+"_align";
	//messageTextDiv.innerHTML="<span id='"+class_name[step_num]+"_Message_Details_text'>"+message_details[step_num]+"</span>";
	messageBox.style.backgroundColor=curr_color;
	demo.appendChild(messageBox);
	console.log("Message Box: "+messageBox.className)
	//demo.appendChild(messageTextDiv);

//add all the elements created to the container	
	demo.appendChild(explanation_block);
	demo.appendChild(explanation_txt);
	demo.appendChild(step_arrow); 
	demo.appendChild(iframe_block);
	

	
	enableNavBar();

}
function enableNavBar(){
	document.getElementById(step_num);
	document.getElementById(total_steps);
var disable_next = total_steps;

var home_btn = document.getElementById("Home");
	home_btn.style="opacity: 100%";
	home_btn.disabled=false;
	
var back_btn = document.getElementById("Previous_Button");
	if(step_num<=0){
	back_btn.style="opacity: 0.25";
	back_btn.disabled=true;
		}
	if(step_num>0){
		back_btn.style="opacity: 100%";
		back_btn.disabled=false;
	}

var next_btn = document.getElementById("Next_Button");
	if(step_num>=disable_next){
	next_btn.style="opacity: 0.25";
	next_btn.disabled=true;	
	}
	if(step_num<disable_next){
		next_btn.style="opacity: 100%";
		next_btn.disabled=false;
	}
	
}

function returnHome(){
	document.body.style.overflow = "scroll";
	
	document.getElementById(total_steps);
	document.getElementById(id);
	
	var demo = document.getElementById("demo");
	demo.innerHTML = "";
	var home_btn = document.getElementById("Home");
	home_btn.style="opacity: 0.25";
	home_btn.disabled=true;
	var back_btn = document.getElementById("Previous_Button");
	back_btn.style="opacity: 0.25";
	back_btn.disabled=true;
	var next_btn = document.getElementById("Next_Button");
	next_btn.style="opacity: 100%";
	next_btn.disabled=false;
	
	for (n = 0; n <= total_steps; n++) { 
			if (div_id[n]=="block"){
			createRectangle(graphic[n], connection_type[n], step_title[n]);
		}
		else{
		createStep(id[n]);	
		}
	
		
}
	document.getElementById(step_num);
	//reset step number
	step_num=-1;
}

function toggleLogFile(div_id) {
  var x = document.getElementById(div_id);			
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

var speech_bubble = "<svg class='Speech_Bubble' viewBox='-1094 -14 179 115.001'><path fill='rgba(255,255,255,1)' stroke=r'gba(112,112,112,1)' stroke-width='1px' stroke-linejoin='miter' stroke-linecap='butt' stroke-miterlimit='4' shape-rendering='auto' id='Speech_Bubble' d='M -1094.000366210938 101.0004043579102 L -1094.000366210938 4.287758350372314 L -1020.999633789063 4.287758350372314 L -1008 -14.00040054321289 L -995.0004272460938 4.287758350372314 L -915.0003051757813 4.287758350372314 L -915.0003051757813 101.0004043579102 L -1094.000366210938 101.0004043579102 Z'></path></svg>";

//svg variables

//NOTE: arrows in mobile devices move on scroll. To prevent this, you can take the width and height from the svg and add them to style sheet. However, this causes display issues in the flowchart because of the relative positioning.

var arrow_01_right = "<svg width='210' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='20'><defs><clipPath id='arrow_01_right'><path d='M135 103 345 103 345 138 135 138Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_01_right)' transform='translate(-135 -103)'><path d='M136 119.167 324.371 119.167 324.371 122.833 136 122.833ZM314.294 113 328.008 121 314.294 129C313.419 129.511 312.297 129.215 311.786 128.341 311.276 127.466 311.572 126.343 312.446 125.833L323.446 119.417 323.446 122.584 312.446 116.167C311.572 115.657 311.276 114.534 311.786 113.66 312.297 112.785 313.419 112.49 314.294 113Z'";

var arrow_01_left = "<svg width='210' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='0'><defs><clipPath id='arrow_01_left'><path d='M119 143 329 143 329 177 119 177Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_01_left)' transform='translate(-119 -143)'><path d='M1.00248e-06-1.83333 188.371-1.83323 188.371 1.83344-1.00248e-06 1.83333ZM178.294-8.00016 192.008 0.000104508 178.294 8.00036C177.419 8.51054 176.297 8.21512 175.786 7.34053 175.276 6.46593 175.572 5.34335 176.446 4.83317L187.446-1.58349 187.446 1.5837 176.446-4.83298C175.572-5.34316 175.276-6.46574 175.786-7.34033 176.297-8.21493 177.419-8.51034 178.294-8.00016Z' transform='matrix(-1 -8.74228e-08 -8.74228e-08 1 328 160)'";

var arrow_01_left_dash = "<svg width='219' height='35' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><defs><clipPath id='clip0'><path d='M119 132 338 132 338 167 119 167Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#clip0)' transform='translate(-115 -134)'><path d='M1.04154e-06-2 12-1.99999 12 2.00001-1.04154e-06 2ZM16-1.99999 28-1.99999 28 2.00001 16 2.00001ZM32-1.99998 44-1.99998 44 2.00002 32 2.00002ZM48-1.99997 60-1.99997 60 2.00003 48 2.00003ZM64-1.99997 76-1.99996 76 2.00004 64 2.00003ZM80-1.99996 92-1.99995 92 2.00005 80 2.00004ZM96-1.99995 108-1.99994 108 2.00006 96 2.00005ZM112-1.99994 124-1.99994 124 2.00006 112 2.00006ZM128-1.99993 140-1.99993 140 2.00007 128 2.00007ZM144-1.99992 156-1.99992 156 2.00008 144 2.00008ZM160-1.99992 172-1.99991 172 2.00009 160 2.00008ZM176-1.99991 188-1.9999 188 2.0001 176 2.00009ZM192-1.9999 197.64-1.9999 197.64 2.0001 192 2.0001ZM186.648-8.72746 201.609 0.000104431 186.648 8.72765C185.694 9.28421 184.469 8.96194 183.912 8.00784 183.356 7.05373 183.678 5.8291 184.632 5.27254L196.632-1.72746 196.632 1.72766 184.632-5.27235C183.678-5.82891 183.356-7.05354 183.912-8.00765 184.469-8.96175 185.694-9.28402 186.648-8.72746Z' transform='matrix(-1 -8.74228e-08 -8.74228e-08 1 337.6 150)'";
	
var arrow_01_right_dash = "<svg width='219' height='35' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><defs><clipPath id='arrow_01_right_dash'><path d='M142 159 361 159 361 194 142 194Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_01_right_dash)' transform='translate(-130 -159)'><path d='M142 174 154 174 154 178 142 178ZM158 174 170 174 170 178 158 178ZM174 174 186 174 186 178 174 178ZM190 174 202 174 202 178 190 178ZM206 174 218 174 218 178 206 178ZM222 174 234 174 234 178 222 178ZM238 174 250 174 250 178 238 178ZM254 174 266 174 266 178 254 178ZM270 174 282 174 282 178 270 178ZM286 174 298 174 298 178 286 178ZM302 174 314 174 314 178 302 178ZM318 174 330 174 330 178 318 178ZM334 174 339.64 174 339.64 178 334 178ZM328.648 167.273 343.609 176 328.648 184.728C327.694 185.284 326.469 184.962 325.912 184.008 325.356 183.054 325.678 181.829 326.632 181.273L338.632 174.273 338.632 177.728 326.632 170.728C325.678 170.171 325.356 168.946 325.912 167.992 326.469 167.038 327.694 166.716 328.648 167.273Z'";

var arrow_01_both = "<svg width='226' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='0'><defs><clipPath id='arrow_01_both'><path d='M135 159 361 159 361 193 135 193Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_01_both)' transform='translate(-135 -159)'><path d='M3.9592-2 188.041-1.9999 188.041 2.0001 3.9592 2ZM14.9523 8.72757-0.0092696 1.11116e-07 14.9523-8.72755C15.9064-9.28411 17.131-8.96184 17.6876-8.00773 18.2441-7.05363 17.9218-5.82899 16.9677-5.27243L4.96774 1.72756 4.96774-1.72755 16.9677 5.27245C17.9218 5.82901 18.2441 7.05365 17.6876 8.00775 17.131 8.96185 15.9064 9.28413 14.9523 8.72757ZM177.048-8.72746 192.009 0.000104465 177.048 8.72765C176.094 9.28421 174.869 8.96194 174.312 8.00784 173.756 7.05373 174.078 5.8291 175.032 5.27254L187.032-1.72746 187.032 1.72766 175.032-5.27235C174.078-5.82891 173.756-7.05354 174.312-8.00765 174.869-8.96175 176.094-9.28402 177.048-8.72746Z' transform='matrix(-1 -8.74228e-08 -8.74228e-08 1 344 176)'";
	
var arrow_02_left = "<svg width='431' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='0'><defs><clipPath id='arrow_02_left'><path d='M119 185 550 185 550 220 119 220Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_02_left)' transform='translate(-119 -185)'><path d='M4.66269e-07-1.83333 409.17-1.83323 409.17 1.83344-4.66269e-07 1.83333ZM399.094-8.00016 412.809 0.000104817 399.094 8.00036C398.219 8.51054 397.097 8.21513 396.586 7.34053 396.076 6.46594 396.372 5.34335 397.246 4.83317L408.246-1.58349 408.246 1.5837 397.246-4.83297C396.372-5.34315 396.076-6.46573 396.586-7.34033 397.097-8.21492 398.219-8.51034 399.094-8.00016Z' transform='matrix(-1 -8.74228e-08 -8.74228e-08 1 548.8 202)'";

var arrow_02_left_dash = "<svg width='431' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='10'><defs><clipPath id='arrow_02_left_dash'><path d='M622 120 1053 120 1053 154 622 154Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_02_left_dash)' transform='translate(-640 -120)'><path d='M4.66269e-07-1.83333 11-1.83333 11 1.83334-4.66269e-07 1.83333ZM14.6667-1.83333 25.6667-1.83333 25.6667 1.83334 14.6667 1.83334ZM29.3333-1.83333 40.3333-1.83332 40.3333 1.83334 29.3333 1.83334ZM44-1.83332 55-1.83332 55 1.83335 44 1.83334ZM58.6667-1.83332 69.6667-1.83332 69.6667 1.83335 58.6667 1.83335ZM73.3333-1.83331 84.3333-1.83331 84.3333 1.83335 73.3333 1.83335ZM88-1.83331 99-1.83331 99 1.83336 88 1.83336ZM102.667-1.83331 113.667-1.8333 113.667 1.83336 102.667 1.83336ZM117.333-1.8333 128.333-1.8333 128.333 1.83337 117.333 1.83336ZM132-1.8333 143-1.8333 143 1.83337 132 1.83337ZM146.667-1.8333 157.667-1.83329 157.667 1.83337 146.667 1.83337ZM161.333-1.83329 172.333-1.83329 172.333 1.83338 161.333 1.83337ZM176-1.83329 187-1.83329 187 1.83338 176 1.83338ZM190.667-1.83328 201.667-1.83328 201.667 1.83338 190.667 1.83338ZM205.333-1.83328 216.333-1.83328 216.333 1.83339 205.333 1.83339ZM220-1.83328 231-1.83327 231 1.83339 220 1.83339ZM234.667-1.83327 245.667-1.83327 245.667 1.8334 234.667 1.83339ZM249.333-1.83327 260.333-1.83327 260.333 1.8334 249.333 1.8334ZM264-1.83327 275-1.83326 275 1.8334 264 1.8334ZM278.667-1.83326 289.667-1.83326 289.667 1.83341 278.667 1.8334ZM293.333-1.83326 304.333-1.83326 304.333 1.83341 293.333 1.83341ZM308-1.83325 319-1.83325 319 1.83341 308 1.83341ZM322.667-1.83325 333.667-1.83325 333.667 1.83342 322.667 1.83342ZM337.333-1.83325 348.333-1.83324 348.333 1.83342 337.333 1.83342ZM352-1.83324 363-1.83324 363 1.83343 352 1.83342ZM366.667-1.83324 377.667-1.83324 377.667 1.83343 366.667 1.83343ZM381.333-1.83324 392.333-1.83323 392.333 1.83343 381.333 1.83343ZM396-1.83323 407-1.83323 407 1.83344 396 1.83343ZM399.094-8.00016 412.809 0.000104817 399.094 8.00036C398.219 8.51054 397.097 8.21513 396.586 7.34053 396.076 6.46594 396.372 5.34335 397.246 4.83317L408.246-1.58349 408.246 1.5837 397.246-4.83297C396.372-5.34315 396.076-6.46573 396.586-7.34033 397.097-8.21492 398.219-8.51034 399.094-8.00016Z' transform='matrix(-1 -8.74228e-08 -8.74228e-08 1 1051.8 137)'";

var arrow_02_right = "<svg width='431'  xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='20'><defs><clipPath id='arrow_02_right'><path d='M135 209 566 209 566 243 135 243Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_02_right)' transform='translate(-135 -209)'><path d='M136 224.167 545.17 224.167 545.17 227.833 136 227.833ZM535.094 218 548.808 226 535.094 234C534.219 234.511 533.097 234.215 532.586 233.341 532.076 232.466 532.372 231.343 533.246 230.833L544.246 224.417 544.246 227.584 533.246 221.167C532.372 220.657 532.076 219.534 532.586 218.66 533.097 217.785 534.219 217.49 535.094 218Z'";

var arrow_02_right_dash = "<svg width='431'  xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='10'><defs><clipPath id='arrow_02_right_dash'><path d='M135 278 566 278 566 312 135 312Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_02_right_dash)' transform='translate(-135 -278)'><path d='M136 293.167 147 293.167 147 296.833 136 296.833ZM150.667 293.167 161.667 293.167 161.667 296.833 150.667 296.833ZM165.333 293.167 176.333 293.167 176.333 296.833 165.333 296.833ZM180 293.167 191 293.167 191 296.833 180 296.833ZM194.667 293.167 205.667 293.167 205.667 296.833 194.667 296.833ZM209.333 293.167 220.333 293.167 220.333 296.833 209.333 296.833ZM224 293.167 235 293.167 235 296.833 224 296.833ZM238.667 293.167 249.667 293.167 249.667 296.833 238.667 296.833ZM253.333 293.167 264.333 293.167 264.333 296.833 253.333 296.833ZM268 293.167 279 293.167 279 296.833 268 296.833ZM282.667 293.167 293.667 293.167 293.667 296.833 282.667 296.833ZM297.333 293.167 308.333 293.167 308.333 296.833 297.333 296.833ZM312 293.167 323 293.167 323 296.833 312 296.833ZM326.667 293.167 337.667 293.167 337.667 296.833 326.667 296.833ZM341.333 293.167 352.333 293.167 352.333 296.833 341.333 296.833ZM356 293.167 367 293.167 367 296.833 356 296.833ZM370.667 293.167 381.667 293.167 381.667 296.833 370.667 296.833ZM385.333 293.167 396.333 293.167 396.333 296.833 385.333 296.833ZM400 293.167 411 293.167 411 296.833 400 296.833ZM414.667 293.167 425.667 293.167 425.667 296.833 414.667 296.833ZM429.333 293.167 440.333 293.167 440.333 296.833 429.333 296.833ZM444 293.167 455 293.167 455 296.833 444 296.833ZM458.667 293.167 469.667 293.167 469.667 296.833 458.667 296.833ZM473.333 293.167 484.333 293.167 484.333 296.833 473.333 296.833ZM488 293.167 499 293.167 499 296.833 488 296.833ZM502.667 293.167 513.667 293.167 513.667 296.833 502.667 296.833ZM517.333 293.167 528.333 293.167 528.333 296.833 517.333 296.833ZM532 293.167 543 293.167 543 296.833 532 296.833ZM535.094 287 548.808 295 535.094 303C534.219 303.511 533.097 303.215 532.586 302.341 532.076 301.466 532.372 300.343 533.246 299.833L544.246 293.417 544.246 296.584 533.246 290.167C532.372 289.657 532.076 288.534 532.586 287.66 533.097 286.785 534.219 286.49 535.094 287Z'";

var arrow_03_left = "<svg width='644' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='-10'><defs><clipPath id='arrow_03_left'><path d='M115 340 759 340 759 374 115 374Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_03_left)' transform='translate(-115 -340)'><path d='M135.63 355.167 756 355.167 756 358.833 135.63 358.833ZM145.706 365 131.992 357 145.706 349C146.581 348.49 147.703 348.785 148.214 349.66 148.724 350.534 148.428 351.657 147.554 352.167L136.554 358.584 136.554 355.416 147.554 361.833C148.428 362.343 148.724 363.466 148.214 364.34 147.703 365.215 146.581 365.51 145.706 365Z'";

var arrow_03_right = "<svg width='642' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='10'><defs><clipPath id='arrow_03_right'><path d='M135 314 777 314 777 349 135 349Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_03_right)' transform='translate(-135 -314)'><path d='M136 329.167 756.37 329.167 756.37 332.833 136 332.833ZM746.294 323 760.008 331 746.294 339C745.419 339.511 744.297 339.215 743.786 338.341 743.276 337.466 743.572 336.343 744.446 335.833L755.446 329.417 755.446 332.584 744.446 326.167C743.572 325.657 743.276 324.534 743.786 323.66 744.297 322.785 745.419 322.49 746.294 323Z'";

var arrow_04_both = "<svg width='860' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='5'><defs><clipPath id='arrow_04_both'><path d='M115 398 975 398 975 433 115 433Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#cliparrow_04_both)' transform='translate(-130 -398)'><path d='M135.63 413.167 953.97 413.167 953.97 416.833 135.63 416.833ZM145.706 423 131.992 415 145.706 407C146.581 406.49 147.703 406.785 148.214 407.66 148.724 408.534 148.428 409.657 147.554 410.167L136.554 416.584 136.554 413.416 147.554 419.833C148.428 420.343 148.724 421.466 148.214 422.34 147.703 423.215 146.581 423.51 145.706 423ZM943.894 407 957.608 415 943.894 423C943.019 423.511 941.896 423.215 941.386 422.341 940.876 421.466 941.172 420.343 942.046 419.833L953.046 413.417 953.046 416.584 942.046 410.167C941.172 409.657 940.876 408.534 941.386 407.66 941.896 406.785 943.019 406.49 943.894 407Z'";

var arrow_04_left = "<svg width='845' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='0'><defs><clipPath id='arrow_04_left'><path d='M119 440 964 440 964 474 119 474Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_04_left)' transform='translate(-130 -440)'><path d='M139.63 455.167 961.6 455.167 961.6 458.833 139.63 458.833ZM149.706 465 135.992 457 149.706 449C150.581 448.49 151.703 448.785 152.214 449.66 152.724 450.534 152.428 451.657 151.554 452.167L140.554 458.584 140.554 455.416 151.554 461.833C152.428 462.343 152.724 463.466 152.214 464.34 151.703 465.215 150.581 465.51 149.706 465Z'";

var arrow_04_right = "<svg width='844'  xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='0'><defs><clipPath id='arrow_04_right'><path d='M135 477 979 477 979 511 135 511Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_04_right)' transform='translate(-130 -477)'><path d='M136 492.167 957.97 492.167 957.97 495.833 136 495.833ZM947.894 486 961.608 494 947.894 502C947.019 502.511 945.896 502.215 945.386 501.341 944.876 500.466 945.172 499.343 946.046 498.833L957.046 492.417 957.046 495.584 946.046 489.167C945.172 488.657 944.876 487.534 945.386 486.66 945.896 485.785 947.019 485.49 947.894 486Z'";

var arrow_04_right_dash = "<svg width='843' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='0'><defs><clipPath id='arrow_04_right_dash'><path d='M174 497 1017 497 1017 532 174 532Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_04_right_dash)' transform='translate(-165 -497)'><path d='M174 513 186 513 186 517 174 517ZM190 513 202 513 202 517 190 517ZM206 513 218 513 218 517 206 517ZM222 513 234 513 234 517 222 517ZM238 513 250 513 250 517 238 517ZM254 513 266 513 266 517 254 517ZM270 513 282 513 282 517 270 517ZM286 513 298 513 298 517 286 517ZM302 513 314 513 314 517 302 517ZM318 513 330 513 330 517 318 517ZM334 513 346 513 346 517 334 517ZM350 513 362 513 362 517 350 517ZM366 513 378 513 378 517 366 517ZM382 513 394 513 394 517 382 517ZM398 513 410 513 410 517 398 517ZM414 513 426 513 426 517 414 517ZM430 513 442 513 442 517 430 517ZM446 513 458 513 458 517 446 517ZM462 513 474 513 474 517 462 517ZM478 513 490 513 490 517 478 517ZM494 513 506 513 506 517 494 517ZM510 513 522 513 522 517 510 517ZM526 513 538 513 538 517 526 517ZM542 513 554 513 554 517 542 517ZM558 513 570 513 570 517 558 517ZM574 513 586 513 586 517 574 517ZM590 513 602 513 602 517 590 517ZM606 513 618 513 618 517 606 517ZM622 513 634 513 634 517 622 517ZM638 513 650 513 650 517 638 517ZM654 513 666 513 666 517 654 517ZM670 513 682 513 682 517 670 517ZM686 513 698 513 698 517 686 517ZM702 513 714 513 714 517 702 517ZM718 513 730 513 730 517 718 517ZM734 513 746 513 746 517 734 517ZM750 513 762 513 762 517 750 517ZM766 513 778 513 778 517 766 517ZM782 513 794 513 794 517 782 517ZM798 513 810 513 810 517 798 517ZM814 513 826 513 826 517 814 517ZM830 513 842 513 842 517 830 517ZM846 513 858 513 858 517 846 517ZM862 513 874 513 874 517 862 517ZM878 513 890 513 890 517 878 517ZM894 513 906 513 906 517 894 517ZM910 513 922 513 922 517 910 517ZM926 513 938 513 938 517 926 517ZM942 513 954 513 954 517 942 517ZM958 513 970 513 970 517 958 517ZM974 513 986 513 986 517 974 517ZM990 513 995.641 513 995.641 517 990 517ZM984.648 506.273 999.609 515 984.648 523.728C983.694 524.284 982.469 523.962 981.912 523.008 981.356 522.054 981.678 520.829 982.632 520.273L994.632 513.273 994.632 516.728 982.632 509.728C981.678 509.171 981.356 507.946 981.912 506.992 982.469 506.038 983.694 505.716 984.648 506.273Z'";

var arrow_04_left_dash = "<svg width='846' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><svg x='0'><defs><clipPath id='arrow_04_left_dash'><path d='M157 481 1003 481 1003 515 157 515Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#arrow_04_left_dash)' transform='translate(-170 -481)'><path d='M177.959 496 189.959 496 189.959 500 177.959 500ZM193.959 496 205.959 496 205.959 500 193.959 500ZM209.959 496 221.959 496 221.959 500 209.959 500ZM225.959 496 237.959 496 237.959 500 225.959 500ZM241.959 496 253.959 496 253.959 500 241.959 500ZM257.959 496 269.959 496 269.959 500 257.959 500ZM273.959 496 285.959 496 285.959 500 273.959 500ZM289.959 496 301.959 496 301.959 500 289.959 500ZM305.959 496 317.959 496 317.959 500 305.959 500ZM321.959 496 333.959 496 333.959 500 321.959 500ZM337.959 496 349.959 496 349.959 500 337.959 500ZM353.959 496 365.959 496 365.959 500 353.959 500ZM369.959 496 381.959 496 381.959 500 369.959 500ZM385.959 496 397.959 496 397.959 500 385.959 500ZM401.959 496 413.959 496 413.959 500 401.959 500ZM417.959 496 429.959 496 429.959 500 417.959 500ZM433.959 496 445.959 496 445.959 500 433.959 500ZM449.959 496 461.959 496 461.959 500 449.959 500ZM465.959 496 477.959 496 477.959 500 465.959 500ZM481.959 496 493.959 496 493.959 500 481.959 500ZM497.959 496 509.959 496 509.959 500 497.959 500ZM513.959 496 525.959 496 525.959 500 513.959 500ZM529.959 496 541.959 496 541.959 500 529.959 500ZM545.959 496 557.959 496 557.959 500 545.959 500ZM561.959 496 573.959 496 573.959 500 561.959 500ZM577.959 496 589.959 496 589.959 500 577.959 500ZM593.959 496 605.959 496 605.959 500 593.959 500ZM609.959 496 621.959 496 621.959 500 609.959 500ZM625.959 496 637.959 496 637.959 500 625.959 500ZM641.959 496 653.959 496 653.959 500 641.959 500ZM657.959 496 669.959 496 669.959 500 657.959 500ZM673.959 496 685.959 496 685.959 500 673.959 500ZM689.959 496 701.959 496 701.959 500 689.959 500ZM705.959 496 717.959 496 717.959 500 705.959 500ZM721.959 496 733.959 496 733.959 500 721.959 500ZM737.959 496 749.959 496 749.959 500 737.959 500ZM753.959 496 765.959 496 765.959 500 753.959 500ZM769.959 496 781.959 496 781.959 500 769.959 500ZM785.959 496 797.959 496 797.959 500 785.959 500ZM801.959 496 813.959 496 813.959 500 801.959 500ZM817.959 496 829.959 496 829.959 500 817.959 500ZM833.959 496 845.959 496 845.959 500 833.959 500ZM849.959 496 861.959 496 861.959 500 849.959 500ZM865.959 496 877.959 496 877.959 500 865.959 500ZM881.959 496 893.959 496 893.959 500 881.959 500ZM897.959 496 909.959 496 909.959 500 897.959 500ZM913.959 496 925.959 496 925.959 500 913.959 500ZM929.959 496 941.959 496 941.959 500 929.959 500ZM945.959 496 957.959 496 957.959 500 945.959 500ZM961.959 496 973.959 496 973.959 500 961.959 500ZM977.959 496 989.959 496 989.959 500 977.959 500ZM993.959 496 999.6 496 999.6 500 993.959 500ZM188.952 506.728 173.991 498 188.952 489.272C189.906 488.716 191.131 489.038 191.688 489.992 192.244 490.946 191.922 492.171 190.968 492.728L178.968 499.728 178.968 496.272 190.968 503.272C191.922 503.829 192.244 505.054 191.688 506.008 191.131 506.962 189.906 507.284 188.952 506.728Z'"

var hexagon_02 = "<svg width='332' height='33' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><defs><clipPath id='clip0'><path d='M88 649 420 649 420 682 88 682Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#clip0)' transform='translate(-88 -649)'><path d='M89 665.5 104.5 650 104.5 650 403.5 650 403.5 650 419 665.5 403.5 681 403.5 681 104.5 681 104.5 681Z' fill='#A5A5A5' fill-rule='evenodd'/></g></svg>";

var hexagon_03 = "<svg width='491' height='33' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' overflow='hidden'><defs><clipPath id='clip0'><path d='M90 649 581 649 581 682 90 682Z' fill-rule='evenodd' clip-rule='evenodd'/></clipPath></defs><g clip-path='url(#clip0)' transform='translate(-90 -649)'><path d='M91 665.5 106.5 650 106.5 650 564.5 650 564.5 650 580 665.5 564.5 681 564.5 681 106.5 681 106.5 681Z' fill='#A5A5A5' fill-rule='evenodd'/></g></svg>";

var view_log = "<svg width='30' height='35' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' id='Icons_Document' overflow='hidden'><path d='M23 82 23 14 48 14 48 35 73 35 73 82 23 82ZM54 16.5 66.5 29 54 29 54 16.5ZM54 8 17 8 17 88 79 88 79 30 54 8Z' fill='"+curr_color+"'/><rect x='29' y='45' width='38' height='4' fill='"+curr_color+"'/><rect x='29' y='37' width='13' height='4' fill='"+curr_color+"'/><rect x='29' y='53' width='38' height='4' fill='"+curr_color+"'/><rect x='29' y='61' width='38' height='4' fill='"+curr_color+"'/><rect x='29' y='69' width='38' height='4' fill='"+curr_color+"'/></svg>";

var load_log="<svg viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' id='Icons_Paper' overflow='hidden'><path d='M23 82 23 14 51 14 51 35 73 35 73 82 23 82ZM57 16.5 69.5 29 57 29 57 16.5ZM57 8 17 8 17 88 79 88 79 30 57 8Z' fill='"+curr_color+"'/></svg>";

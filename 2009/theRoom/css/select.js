/*
Editable select
Copyright (C) September 2005  DTHMLGoodies.com, Alf Magne Kalleland

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

Dhtmlgoodies.com., hereby disclaims all copyright interest in this script
written by Alf Magne Kalleland.

Alf Magne Kalleland, 2006
Owner of DHTMLgoodies.com
	
------------------------
strongly modified by Nick	
------------------------
*/	

	
var selectControls = {
	
	arrowImage : 'images/arrow.png'	// Regular arrow
	,arrowImageOver : 'select/i/select_arrow_over.gif'	// Mouse over
	,arrowImageDown : 'select/i/select_arrow_down.gif'	// Mouse down
	,selectBoxIds : 0
	,currentlyOpenedOptionBox : false
	,editableSelect_activeArrow : false
	,activeOption : ''
	,modifiedControls : []   //  newNumerciId => control
	,editableSelect_activeArrow : false
	,currentlyOpenedOptionBox : false
	
	,modifySelect : function(selectControlId)
	{
		var selectControl = document.getElementById(selectControlId);
		if (!selectControl)
			return;
		
		var options = [], values=[];
		for (var i=0; i<selectControl.options.length; i++)
		{
			options[options.length] = selectControl.options[i].text;
			values[values.length] = selectControl.options[i].value;
		}
		
		var dest = document.createElement('input');
		dest.value = selectControl.options[selectControl.options.selectedIndex].text;
		var parent = selectControl.parentNode;
		parent.insertBefore(dest,selectControl);
		
		dest.className='selectBoxInput';		
		var div = document.createElement('DIV');
		div.style.styleFloat = 'left';
		div.style.width = dest.offsetWidth + 16 + 'px';
		div.style.position = 'relative';
		div.id = 'selectBox' + this.selectBoxIds;
		var parent = dest.parentNode;
		parent.insertBefore(div,dest);
		div.appendChild(dest);	
		div.className='selectBox';
		div.style.zIndex = 10000 - this.selectBoxIds;

		var img = document.createElement('IMG');
		img.src = selectControls.arrowImage;
		img.className = 'selectBoxArrow';
		
		img.onmouseover = img.onmouseout = selectControls.imgOver;
		
		img.onclick = selectControls.selectBox_showOptions;
		img.id = 'arrowSelectBox' + this.selectBoxIds;

		div.appendChild(img);
		
		var optionDiv = document.createElement('DIV');
		optionDiv.id = 'selectBoxOptions' + this.selectBoxIds;
		optionDiv.className='selectBoxOptionContainer';
		optionDiv.style.width = div.offsetWidth-2 + 'px';
		div.appendChild(optionDiv);
		
		if(navigator.userAgent.indexOf('MSIE')>=0){
			var iframe = document.createElement('<IFRAME src="about:blank" frameborder=0>');
			iframe.style.width = optionDiv.style.width;
			iframe.style.height = optionDiv.offsetHeight + 'px';
			iframe.style.display='none';
			iframe.id = 'selectBoxIframe' + this.selectBoxIds;
			div.appendChild(iframe);
		}
		
		// creating options
		var optionsTotalHeight = 0;
		var optionArray = new Array();
		for(var no=0;no<options.length;no++){
			var anOption = document.createElement('DIV');
			anOption.innerHTML = options[no];
			anOption.className='selectBoxAnOption';
			anOption.onclick = this.selectOptionValue;
			anOption.style.width = optionDiv.style.width.replace('px','') - 2 + 'px'; 
			anOption.onmouseover = selectControls.highlightSelectBoxOption;
			optionDiv.appendChild(anOption);	
			optionsTotalHeight = optionsTotalHeight + anOption.offsetHeight;
			optionArray.push(anOption);
		}
		if(optionsTotalHeight > optionDiv.offsetHeight){				
			for(var no=0;no<optionArray.length;no++){
				optionArray[no].style.width = optionDiv.style.width.replace('px','') - 22 + 'px'; 	
			}	
		}		
		optionDiv.style.display='none';
		optionDiv.style.visibility='visible';
		
		// storing and hiding source select control
		this.modifiedControls[this.selectBoxIds] = selectControl;
		selectControl.style.display='none';
		this.selectBoxIds ++;
	}
	
	// modifies all select controls on the page.
	// If optional 1st argument (Array of IDs) is provided, only these
	// controls are modified
	,modifySelects : function()
	{
		var i;
		var arg_sc = '';
		var all_sc = document.getElementsByTagName('SELECT');
		
		if (arguments.length > 0)
			if (typeof(arguments[0]) == 'object')
				arg_sc = '#' + arguments[0].join('#') + '#';
				
		for (i=0; i<all_sc.length; i++)
			if (all_sc[i].id)
				if (arg_sc != '')
				{
					if (arg_sc.indexOf('#'+all_sc[i].id+'#') >= 0)
						this.modifySelect(all_sc[i].id);
				}
				else
					this.modifySelect(all_sc[i].id);
	}
	
	,selectBox_showOptions : function()
	{
		if(selectControls.editableSelect_activeArrow && selectControls.editableSelect_activeArrow!=this)
			selectControls.editableSelect_activeArrow.src = selectControls.arrowImage;
		
		selectControls.editableSelect_activeArrow = this;
		
		var numId = this.id.replace(/[^\d]/g,'');
		var optionDiv = document.getElementById('selectBoxOptions' + numId);
		if(optionDiv.style.display=='block'){
			optionDiv.style.display='none';
			if(navigator.userAgent.indexOf('MSIE')>=0)document.getElementById('selectBoxIframe' + numId).style.display='none';
			this.src = selectControls.arrowImageOver;	
		}else{			
			optionDiv.style.display='block';
			if(navigator.userAgent.indexOf('MSIE')>=0)document.getElementById('selectBoxIframe' + numId).style.display='block';
			this.src = selectControls.arrowImageDown;	
			if(selectControls.currentlyOpenedOptionBox
				&& selectControls.currentlyOpenedOptionBox!=optionDiv)
				selectControls.currentlyOpenedOptionBox.style.display='none';	
			
			selectControls.currentlyOpenedOptionBox = optionDiv;			
		}
	}

	,selectOptionValue : function()
	{
		var parentNode = this.parentNode.parentNode;
		var textInput = parentNode.getElementsByTagName('INPUT')[0];
		textInput.value = this.innerHTML;
		this.parentNode.style.display='none';
		var numericId = parentNode.id.replace(/[^\d]/g,'');
		
		//  selecting value in hidden true control
		// and executing onchange() if specified
		var c = selectControls.modifiedControls[numericId];
		var si = c.options.selectedIndex;
		for (var i=0; i<c.options.length; i++)
			if (c.options[i].text == textInput.value)
			{
				selectControls.modifiedControls[numericId].options.selectedIndex = i;
				if (selectControls.modifiedControls[numericId].onchange)
					if (i != si)
						setTimeout(function(){selectControls.modifiedControls[numericId].onchange();},1);
			}
		
		document.getElementById('arrowSelectBox' + numericId).src = selectControls.arrowImageOver;
		
		if(navigator.userAgent.indexOf('MSIE')>=0)
			document.getElementById('selectBoxIframe' + numericId).style.display='none';
		
	}
	
	,imgOver : function()
	{
		if(this.src.indexOf(selectControls.arrowImage)>=0){
			this.src = this.src.replace(selectControls.arrowImage,selectControls.arrowImageOver);	
		}else{
			this.src = this.src.replace(selectControls.arrowImageOver,selectControls.arrowImage);
		}
	}
	
	,highlightSelectBoxOption : function()
	{
		if(this.style.backgroundColor=='#316AC5'){
			this.style.backgroundColor='';
			this.style.color='';
		}else{
			this.style.backgroundColor='#316AC5';
			this.style.color='#FFF';			
		}	
		
		if(selectControls.activeOption){
			selectControls.activeOption.style.backgroundColor='';
			selectControls.activeOption.style.color='';			
		}
		selectControls.activeOption = this;
	}

};

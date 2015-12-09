/* global global */
/* global nw */
/* global vsprintf */
/* global dev_output_form */
/* global Lockr */
/* global LZString */
/* global Nedb */

"use strict";

// Global Variables
	_g.animate_duration_delay = 320;
	_g.inputIndex = 0;
	_g.lang = 'zh_cn';
	_g.joint = '・';
	_g.isNWjs = (typeof node != 'undefined' || typeof nw != 'undefined')
	_g.isClient = _g.isNWjs ? true : false;
	_g.defaultHqLv = 90;
	_g.shipMaxLv = 155; // Ship.lvlMax
	
	function eventName(event, name){
		name = name ? ('.' + name) : ''
		if( _g.event[event] )
			return _g.event[event].split(' ').map(function(value){
				return value + name
			}).join(' ')
		return event + name
	}

	_g.updateDefaultHqLv = function(val){
		val = parseInt(val) || _g.defaultHqLv
		if( val <= 0 )
			val = _g.defaultHqLv
		if( val != Lockr.get('hqLvDefault', _g.defaultHqLv) ){
			Lockr.set('hqLvDefault', val)
			clearTimeout(_g.delay_updateDefaultHqLv)
			_g.delay_updateDefaultHqLv = setTimeout(function(){
				$body.trigger('update_defaultHqLv', [val])
				clearTimeout(_g.delay_updateDefaultHqLv)
				_g.delay_updateDefaultHqLv = null
			}, 200)
		}
	};

	_g.statSpeed = {
		5: 	'低速',
		10: '高速'
	};
	_g.statRange = {
		1: 	'短',
		2: 	'中',
		3: 	'长',
		4: 	'超长'
	};
	_g.textRank = {
		1:	'|',
		2:	'||',
		3:	'|||',
		4:	'\\',
		5:	'\\\\',
		6:	'\\\\\\',
		7:	'》'
	};
	_g.getStatSpeed = function( speed ){
		return _g.statSpeed[parseInt(speed)]
	};
	_g.getStatRange = function( range ){
		return _g.statRange[parseInt(range)]
	};



// locale object
	var _l = {};



// String
	String.prototype.printf = function() {
		if( typeof vsprintf != 'undefined' )
			return vsprintf(this, Array.prototype.slice.call(arguments));
		return this;
	};



// main badge
	_g.badge = function( cont, t ){
		if( typeof t == 'string' )
			t = t.toLowerCase()
		switch(t){
			case 'error':
				return _g.badgeError(cont)
				break;
			default:
				return _g.badgeMsg(cont)
				break;
		}
	};
	_g.badgeMsg = function( cont ){
		_frame.dom.layout.attr('data-msgbadge', cont)
		clearTimeout( this.timeout_badgeMsg_hiding )
		this.timeout_badgeMsg_hiding = setTimeout(function(){
			_frame.dom.layout.removeAttr('data-msgbadge')
			delete _g.timeout_badgeMsg_hiding
		}, 3000)
	};
	_g.badgeError = function( cont ){
		_frame.dom.layout.attr('data-errorbadge', cont)
		clearTimeout( this.timeout_badgeError_hiding )
		this.timeout_badgeError_hiding = setTimeout(function(){
			_frame.dom.layout.removeAttr('data-errorbadge')
			delete _g.timeout_badgeError_hiding
		}, 3000)
	};



// main
	_g.pageChangeBefore = function(){
		_frame.dom.mobilemenu.prop('checked', false)
	}


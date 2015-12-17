innerMetods = (function(){
	return {
		send: function (form) {
			console.log('Отпраляем!!!');
			$.ajax({
				action:"",
				metod: 'post',
				data: $(form).serialize(),
				success: function (text) {
					if(text === 'Принято')
						1//выводим сообщение об успехе
				},
				error: function (error) {
					console.log(error);
					//выводим сообщение об ошибке
				}
			});
		},
		showError: function (el,className,position,message){
			$(el).wrap('<div class="error '+className+'"></div>');
			$('<div class="error-message">'+message+'</div>').appendTo($(el).parent()).css(position,$(el).innerWidth()+7);
			$(el).css('box-shadow','0 0 5px 0 red');
		},
		setUpListenersForInput: function (input){
			$(input).on('keyup', function(){
				$(event.target).unwrap('div');
				$(event.target).siblings('.error-message').remove();
				$(event.target).focus();
				$(event.target).off('keyup');
				$(event.target).css('box-shadow','none')
			})
		},
		setUpListenersForInputFile: function (input){
			$(input).on('change', function(){
				var label = document.getElementsByClassName('fake-input');
				$(document.getElementsByClassName('fake-input')).unwrap('div');
				$(label).siblings('.error-message').remove();
				$(event.target).focus();
				$(label).css('box-shadow','none');
				$(event.target).off('change');
				$(label).html($(event.target).val()+'<div class="cloud-box"></div>');
			})
		}
	}
})();

addProjectModule = (function(){
	var popup = $('.popup'),
		addButton = $('#add-project'),
		exitButton = $('#exit'),
		label = $(document.getElementsByClassName('fake-input'));

	function _setUpListenersForAddProject(){
		addButton.on('click', function(){
			popup.fadeIn();
		});
		exitButton.on('click',function(){
			popup.fadeOut();
		})
		$(add_project_form).on('submit',function(){
			if(_validateAddProjectForm()) innerMetods.send();
			return false;
		});

		$(in_img).on('change', function(){
			$(label).html(($(event.target).val()||'Загрузите изображение')+'<div class="cloud-box"></div>');
		});
	}

	function _validateAddProjectForm(){
		if(proj_name.value === '' && !$(proj_name).parent().hasClass('error')){
			innerMetods.showError(proj_name,'error-l','right','введите название');
			innerMetods.setUpListenersForInput(proj_name);
		}
		if(in_img.value === '' && !$('.fake-input').parent().hasClass('error')){
			innerMetods.showError(document.getElementsByClassName('fake-input'),'error-l','right','добавьте картинку');
			innerMetods.setUpListenersForInputFile(in_img);
		}
		if(proj_url.value === '' && !$(proj_url).parent().hasClass('error')){
			innerMetods.showError(proj_url,'error-l','right', 'введите адрес');
			innerMetods.setUpListenersForInput(proj_url);
		}
		if(proj_descript.value === '' && !$(proj_descript).parent().hasClass('error')){
			innerMetods.showError(proj_descript,'error-l','right','введите описание');
			innerMetods.setUpListenersForInput(proj_descript);
		}
		if(document.getElementsByClassName('error')[0] != undefined)
			return false;
		else
			return true;
	}

	return {
		init: function(){
			_setUpListenersForAddProject();
		}
	}
})();
	

//------------------------------------feedback----------------------------------------------------
feedbackFormValidateModule = (function(){

	function _setUpListenersForFeedback(){
		$(feedback).on('submit',function(){
			if(_validateFeedback()) innerMetods.send();
			return false;
		});
	}
	function _validateFeedback(){
		if(user_name.value === '' && !$(user_name).parent().hasClass('error')){
			innerMetods.showError(user_name,'error-l','right','введите имя');
			innerMetods.setUpListenersForInput(user_name);
		}
		if(email.value === '' && !$(email).parent().hasClass('error')){
			innerMetods.showError(email,'error-r','left','введите e-mail');
			innerMetods.setUpListenersForInput(email);
		}
		if(message.value === '' && !$(message).parent().hasClass('error')){
			innerMetods.showError(message,'error-l textarea','right', 'ваш вопрос');
			innerMetods.setUpListenersForInput(message);
		}
		if(code.value === '' && !$(code).parent().hasClass('error')){
			innerMetods.showError(code,'error-r marg-b25','left','код капчи');
			innerMetods.setUpListenersForInput(code);
		}
		if(document.getElementsByClassName('error')[0] != undefined)
			return false;
		else 
			return true;
	}


	return {
		init: function(){
			_setUpListenersForFeedback();
		}
	}
})();
//-------------------------------------init-------------------------------------------------------
	if(document.getElementById('feedback') != null)
		feedbackFormValidateModule.init();
	else
		addProjectModule.init();
	$('input','textarea').placeholder();
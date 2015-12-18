innerMetods = (function(){
	return {
		send: function (form) {
			$(form).html('<button type="reset" id="exit" class="exit-button"></button><div class="success"><span>Ура!!!</span><p>Проект успешно добавлен</p></div>');
			$.ajax({
				action: "addproj.php",
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
			$('<div class="error-message">'+message+'</div>')
				.appendTo($(el).parent())
				.css( position, $(el).innerWidth()+7 );
		},

		setUpListenersForInput: function (input){
			$(input).on('keyup', function(){
				$(this).unwrap('div');
				$(this).siblings('.error-message').remove();
				$(this).focus();
				$(this).off('keyup');
			})
		},

		setUpListenersForInputFile: function (input){
			$(input).on('change', function(){
				var label = $('.fake-input');
				label.unwrap('div');
				label.siblings('.error-message').remove();
				$(this).focus();
			})
		}
	}
})();

addProjectModule = (function(){
	var popup = $('.popup'),
		addButton = $('#add-project'),
		exit = $('#exit, .cover'),
		label = $('.fake-input');

	function _setUpListenersForAddProject(){
		addButton.on('click', function(){
			popup.fadeIn();
		});
		exit.on('click',function(e){
			popup.fadeOut();
		});
		$(add_project_form).on('submit',function(){
			if(_validateAddProjectForm()){ 
				innerMetods.send(this);
				$('#exit').on('click',function(e){
					$('.popup').fadeOut();
				});
			}
			return false;
		});

		$(add_project_form.in_img).on('change', function(){
			label.html(($(event.target).val()||'Загрузите изображение')+'<div class="cloud-box"></div>');
		});
	}

	function _validateAddProjectForm(){
		var valid = true;

		if((add_project_form.proj_name.value === '' || (add_project_form.proj_name.value ===  "Введите название" && !Modernizr.placeholder)) && !$(add_project_form.proj_name).parent().hasClass('error')){
			innerMetods.showError(add_project_form.proj_name,'error-l','right','введите название');
			innerMetods.setUpListenersForInput(add_project_form.proj_name);
			valid = false;
		}
		if(add_project_form.in_img.value === '' && !$('.fake-input').parent().hasClass('error')){
			innerMetods.showError($('.fake-input'),'error-l','right','добавьте картинку');
			innerMetods.setUpListenersForInputFile(add_project_form.in_img);
			valid = false;
		}
		if((add_project_form.proj_url.value === '' || (add_project_form.proj_url.value === 'Добавьте ссылку'  && !Modernizr.placeholder)) && !$(add_project_form.proj_url).parent().hasClass('error')){
			innerMetods.showError(add_project_form.proj_url,'error-l','right', 'введите адрес');
			innerMetods.setUpListenersForInput(add_project_form.proj_url);
			valid = false;
		}
		if((add_project_form.proj_descript.value === '' || (add_project_form.proj_descript.value ===  "Пара слов о Вашем проекте" && !Modernizr.placeholder)) && !$(add_project_form.proj_descript).parent().hasClass('error')){
			innerMetods.showError(add_project_form.proj_descript,'error-l','right','введите описание');
			innerMetods.setUpListenersForInput(add_project_form.proj_descript);
			valid = false;
		}
		return valid;
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
		var valid = true;

		if((feedback.user_name.value === '' || (feedback.user_name.value === "Как к Вам обращаться" && !Modernizr.placeholder)) && !$(feedback.user_name).parent().hasClass('error')){
			innerMetods.showError(feedback.user_name,'error-l','right','введите имя');
			innerMetods.setUpListenersForInput(feedback.user_name);
			valid = false;
		}
		if((feedback.email.value === '' || (feedback.email.value === 'Куда мне писать' && !Modernizr.placeholder))  && !$(feedback.email).parent().hasClass('error')){
			innerMetods.showError(feedback.email,'error-r','left','введите e-mail');
			innerMetods.setUpListenersForInput(feedback.email);
			valid = false;
		}
		if((feedback.message.value === '' || (feedback.message.value === 'Кратко в чем суть' && !Modernizr.placeholder))  && !$(feedback.message).parent().hasClass('error')){
			innerMetods.showError(feedback.message,'error-l textarea','right', 'ваш вопрос');
			innerMetods.setUpListenersForInput(feedback.message);
			valid = false;
		}
		if((feedback.code.value === '' || (feedback.code.value === 'Введите код' && !Modernizr.placeholder))  && !$(feedback.code).parent().hasClass('error')){
			innerMetods.showError(feedback.code,'error-r marg-b25','left','код капчи');
			innerMetods.setUpListenersForInput(feedback.code);
			valid = false;
		}
		return valid;
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

	$('input, textarea').placeholder();
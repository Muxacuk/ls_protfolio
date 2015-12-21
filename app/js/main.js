innerMetods = (function(){
	return {
		send: function (form) {
			$.ajax({
				action: "",
				metod: 'post',
				data: $(form).serialize(),
				success: function (text) {
					if(text === 'Принято')
						success();
				},
				error: function (error) {
					console.log(error);
					//выводим сообщение об ошибке
				}
			});

			function success(){
				successMessage = $('</button><div class="success input"><span>Ура!!!</span><p>Проект успешно добавлен</p></div>');
				successMessage.insertAfter('#exit');
				$(form).children('input,textarea').each(function(){
					this.value="";
				});
				$('.fake-input').html('Загрузите изображение <i class="cloud-box"></i>');
			}
			success();
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
			})
		},

		removeErrors: function(){
			$($('.error').children()).unwrap('div')
			$('.error-message').remove();
			$('input, textarea').off('keyup');
		}
	}
})();

addProjectModule = (function(){
	var popup = $('.popup'),
		addButton = $('#add-project'),
		exit = $('#exit, .cover'),
		label = $('.fake-input');
		formBody = $('#add_project_form').children();

	function _setUpListenersForAddProject(){

		addButton.on('click', function(){
			$(add_project_form).children().show();
			$('.success').remove();
			innerMetods.removeErrors();
			$('input, textarea').placeholder();
			popup.fadeIn();
		});

		exit.on('click',function(e){
			popup.fadeOut();
		});

		$('#exit').on('click',function(e){
			$('.fake-input').html('Загрузите изображение <div class="cloud-box"></div>');
		});
		
		$('.in_img').on('change', function(){
				var label = $('.fake-input');
				$('.fake-input').html((event.target.value || 'Загрузите изображение')+'<div class="cloud-box"></div>');
			})
		$(add_project_form).on('submit',function(e){
			if(_validateAddProjectForm()){ 
				formBody.hide();
				exit.show();
				innerMetods.send(this);
			}
			e.preventDefault();
			return false;
		});

	}

	function _validateAddProjectForm(){
		if((add_project_form.proj_name.value === '' || (add_project_form.proj_name.value ===  "Введите название" && !Modernizr.placeholder)) && !$(add_project_form.proj_name).parent().hasClass('error')){
			innerMetods.showError(add_project_form.proj_name,'error-l','right','введите название');
			innerMetods.setUpListenersForInput(add_project_form.proj_name);
		}
		if(add_project_form.in_img.value === '' && !$('.fake-input').parent().hasClass('error')){
			innerMetods.showError($('.fake-input'),'error-l','right','добавьте картинку');
			innerMetods.setUpListenersForInputFile(add_project_form.in_img);
		}
		if((add_project_form.proj_url.value === '' || (add_project_form.proj_url.value === 'Добавьте ссылку'  && !Modernizr.placeholder)) && !$(add_project_form.proj_url).parent().hasClass('error')){
			innerMetods.showError(add_project_form.proj_url,'error-l','right', 'введите адрес');
			innerMetods.setUpListenersForInput(add_project_form.proj_url);
		}
		if((add_project_form.proj_descript.value === '' || (add_project_form.proj_descript.value ===  "Пара слов о Вашем проекте" && !Modernizr.placeholder)) && !$(add_project_form.proj_descript).parent().hasClass('error')){
			innerMetods.showError(add_project_form.proj_descript,'error-l','right','введите описание');
			innerMetods.setUpListenersForInput(add_project_form.proj_descript);
		}
		if($('.error')[0] != undefined )
			return false;
		return true
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

		$('.reset').on('click',function () {
			innerMetods.removeErrors();
			$('input, textarea').placeholder();
		})
	}
	function _validateFeedback(){

		if((feedback.user_name.value === '' || (feedback.user_name.value === "Как к Вам обращаться" && !Modernizr.placeholder)) && !$(feedback.user_name).parent().hasClass('error')){
			innerMetods.showError(feedback.user_name,'error-l','right','введите имя');
			innerMetods.setUpListenersForInput(feedback.user_name);
		}

		if((feedback.email.value === '' || (feedback.email.value === 'Куда мне писать' && !Modernizr.placeholder))  && !$(feedback.email).parent().hasClass('error')){
			innerMetods.showError(feedback.email,'error-r','left','введите e-mail');
			innerMetods.setUpListenersForInput(feedback.email);
		}

		if((feedback.message.value === '' || (feedback.message.value === 'Кратко в чем суть' && !Modernizr.placeholder))  && !$(feedback.message).parent().hasClass('error')){
			innerMetods.showError(feedback.message,'error-l textarea','right', 'ваш вопрос');
			innerMetods.setUpListenersForInput(feedback.message);
		}

		if((feedback.code.value === '' || (feedback.code.value === 'Введите код' && !Modernizr.placeholder))  && !$(feedback.code).parent().hasClass('error')){
			innerMetods.showError(feedback.code,'error-r marg-b25','left','код капчи');
			innerMetods.setUpListenersForInput(feedback.code);
		}

		if($('.error')[0] != undefined )
			return false;
		return true
	}

	return {
		init: function(){
			_setUpListenersForFeedback();
			$('input, textarea').placeholder();
		}
	}
})();
//-------------------------------------init-------------------------------------------------------
	if(document.getElementById('feedback') != null)
		feedbackFormValidateModule.init();
	else
		addProjectModule.init();

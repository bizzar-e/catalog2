<!-- (!) cutted mark -->

function con2 (argument) {
		
}

/* 
	20_05_14
	Переработка отработчика завершения запроса ajax

	21_05_14
	Вроде корректировка была удачной, свернуто ~ 500 строк, но теперь перестала 
	работать саблаймовская функция С+m от самых внешний скобок, т.е. быть
	может нема корректности
	UPD - Все в порядке, корректная работа C+m возможна только в документах без фолдинга
	активного кода

*/
	$(document).ajaxComplete(function(event, xhr, settings) {
		// $( ".con" ).append( ">>>> " + settings.url );
		if (/load_uni.pl/m.test(settings.url)) { // (1-1)

		$( ".con2" ).append( ">>>> load_uni executed <br/>" );


		// Обновление пользовательского выбора по корзине (набор отмеченных пряжек)
		/*
			Построение набора пряжки по полученному хешу из ls. Каждой пряжке входящей в набор 
			подсвечиваем иконку корзины
		*/
		for(var key in hash) {
						// $('#wrk_area').append('<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">СУПЕРЦЕНА</span></div><div id="block_b"><div id="block_b_img" class="lit_e"></div></div><div id="block_c"><img src="img/cat/rabochaya/' + k + '.png" alt=""></div><div id="block_d"><div id="w_close"></div><div id="block_d_hollow"></div><div id="block_d_basket"></div></div><div id="block_e"><span id="cat_name">' + k + '</span><img id="more" src="img/blocks/marks/p_more.png"></div></div>');
			/*
			$('#wrk_area').append(key + '<br/>');
			$('#wrk_area').append(key + '<br/>');
			*/
			// $('div#wrap_cont_m3').find('span#cat_name').eq(1).each(function () {
			
			// $('div#wrap_cont_m3').find('span#cat_name').each(function () {
			$('div#wrap_cont_m3').find('div#block_c img').each(function () {
			// Корректировка подгрузки пряжки по src


				// $(this).css('background', 'yellow'); // :)
				// $(this).addClass('wrappedElement');
				// $(this).remove();
				
				// a = $(this).html(); // Устарело
				a = $(this).attr('src');

				var expr = new RegExp(key, 'im');
				// var regex = '/' + a + '/gi';
				// if (/i.FM-01481-08-7P/m.test(a)) {
				if (expr.test(a)) {
				// if (regex.test(a)) {
					// $(this).addClass('wrappedElement');
					// $(this).css('background', 'white'); // :)
					$(this).parent().parent().find('div#block_d_basket').css('opacity','1');

				}
			});

		} // for(var key in hash)

		/*
			Привязка события click к кнопке корзины в каталоге
		*/
	 	$('div#block_d_basket').bind('click', function() {
			      		// $(this).css("opacity","1");
      		// a = $(this).parent().parent().find('span#cat_name').eq(1).html();
      		a = $(this).parent().parent().find('div#block_c img').attr('src');

      		inBasket = false; // Пряжка уже в наборе?
 			
 			// Определяем, есть ли пряжка в наборе
      		for( var key in hash ) {
				var expr = new RegExp(key, 'im');
				// $('.con2').prepend('a> ' + a + 'key> ' + key +'<br/>');

				if (expr.test(a)) {
				    // $('.con2').append('Эта пряжка уже в ls!' +'<br/>');
				    inBasket = true;
				    // Повторый выбор пряжки удаляет ее из набора
				    delete hash[a]; 				// Удаляем логически
				   	$(this).css('opacity','0.2');	// И визуально

					// Get the size of an object
					var bsize = Object.size(hash); 

					// $('.con2').append('Пряжка ' + a + ' удалена. Размер корзины: ' + bsize + '<br/>');


			    } 
			}

			
			// Пряжки еще нет в наборе, добавляем
			if (inBasket==false) {
				hash[a] = a;
				
				// Get the size of an object
				var bsize = Object.size(hash); 

				// $('.con2').append('Пряжка ' + a + ' добавлена. Размер корзины: ' + bsize + '<br/>');

				// Перманентно подсвечиваем пряжку
				$(this).css('opacity','1');


			}

      		
			// В конце обработчика сбрасываем измененный набор в ls
			localStorage.as_01 = "";
			localStorage.as_01 = hashToStr(hash); // Их хеша в строку, а из строки обратно в ls
			// Обновляем счетчик пряжки в корзине
			var bsize = Object.size(hash); 
			$('div#basket_count').html(bsize);


  		});


	 	/* Секция работы с подсказками для старого каталога */
		// [fold~ UFDX]
		h = $('div#cat_hint_but');
		if (h.length >= 1) {
			// Если подсказки уже отрисованы, то не рисуем их снова
			// $('.con2').append('B<br/>');
		}
		else {
						// Ветка рисования подсказок при нажатии на кнопку подсказок
			// $('.con2').append('C Ветка отрисовки подсказок<br/>');

			/*
				Инициализация и чтение опций на предмет работы 
			*/
			var cl_opt = localStorage.getItem('as_options');

			/* Почему-то это место на дев-машине работает коряво */

			if ((cl_opt=='')||(cl_opt==null)) {
			// if (false) {
				// $('#d1_vhist #d1_b').append('Нет данных о просмотрах!<br/>');
			// $('.con2').append('D ls по подсказкам еще не определена<br/>');

				// // // Перерисовка после построения
				// // this.d1_vhist_refresh(); 

				// Опции еще не заданы
				/*
					Если затирать as_options, то подсказки раз через раз будут отображаться
					localStorage.as_options = "";
				*/
				/* А если так, то подсказки будут всегда */
				localStorage.as_options = "";
				localStorage.as_options = 'hints:1';
				// $('.con2').append('Инициализация ls опций подсказок (hints = true) <br/>');

			}
			else {

		///*				
				// $('.con2').append('E Ветка включения/отключения подсказок<br/>');

				// Принудительное отключение подсказок
				localStorage.as_options = "";
				localStorage.as_options = 'hints:1';

				// localStorage.as_id = "";
				// localStorage.as_id = 'AAA';
				var cl_id = localStorage.getItem('as_id');
				// $('.con2').append('id = ' + cl_id + '<br/>');
				if (cl_id=="AAA") {
					// Принудительное отключение подсказок для машины AAA
					// localStorage.as_options = "";
					localStorage.as_options = 'hints:1';					
					// $('.con2').append('E1 Принудительное отключение подсказок для dev-машины<br/>');

				}

				// Опции указаны, читаем
				var opt = cl_opt.split(':');
				// $('.con2').append('hints = ' + opt[1] + '<br/>');
				
				/*
					Ветка отрисовка подсказок или отключения, в случае, когда их еще нет на странице
				*/
				if (opt[1]==1) {
				// if (true) {
					/* Модификация кода, для работы в новом дизайне */
					// $('div#sideLeft').append('<div id="hint_button" class="hint_dis"></div>');
					
					// $('div#cat_hint_but').addClass('hint_en');
					$('div#cat_hint_but').addClass('hint_dis');

					// Рисуем в первый раз подсказки
					/*
						UPD После переверстки 960 работает коряво нужно поправить двойную отрисовку
					*/
					// if ()
				///*
					if ($('div#hint1').length==0) {

					// Отключение подсказок
					// $('div#sideLeft').append('<div id="hint1"></div>');
						

						$('div#hint1').bind( 'click', side_color_sel_click); // Открыть палитру 
					
						/*
							Вторая, самая капризная подсказка
							Прикручиваем к film, а потом вычисляем смещение по высоте блока филм
						*/
				/*
					// Временное отключение внедрения и просчета второй подсказки
					// [fold~ D8hy]
				*/						
					$('div#basket_wrap').append('<div id="hint3"></div>');
					    
					}
				//*/

					// $('div#hint_button').bind('click', function() {
					$('div#cat_hint_but').bind('click', function() {
						// [fold~ ehSp]
						// Показать подсказки
						if ($(this).hasClass('hint_en')) { 
							// $('.con2').append('hint_en-1<br/>');

							// Рисуем подсказки только если они были удалены функцией remove()
							// [fold~ JS4Q]
							// Показать подсказки
							$('div#hint1').css('visibility', 'visible');
							$('div#hint3').css('visibility', 'visible');

							// Анимация кнопки управления подсказками
							// [fold~ rMcm]
				      		$('div#img_hint_but').css('background', 'url(../img/common/catalog/basket/q_on.png)');
				      		$('div#img_hint_but').css('background-size', '100%');

				      		// Смена поведения кнопкой управления подсказками
				      		$(this).removeClass('hint_en');
				      		$(this).addClass('hint_dis');

							$('.con2').append('hint_en-2<br/>');
							return;
						}

			      		// Убрать подсказки
						if ($(this).hasClass('hint_dis')) {
							// $('.con2').append('hint_dis<br/>');
							/*							
				      		$('div#hint1').remove();
				      		$('div#hint3').remove();
							*/				      	
							$('div#hint1').css('visibility', 'hidden');
							$('div#hint3').css('visibility', 'hidden');

				      		// Анимация кнопки управления подсказками
							// [fold~ V8oQ]
				      		$('div#img_hint_but').css('background', 'url(../img/common/catalog/basket/q_off.png)');
				      		$('div#img_hint_but').css('background-size', '100%');

				      		// Смена поведения кнопкой управления подсказками
				      		$(this).removeClass('hint_dis');
				      		$(this).addClass('hint_en');

							// $('.con2').append('hint_dis-2<br/>');
							return;
						}	
			  		});
				} // if 1
		//*/
			} // else dev-machine
		} // else ?

		/*
			Отрисовка подсказок. Происходит проверка нет ли их сейчас на экране, чтобы не рисовать их повторно
		*/
		// [fold~ g82B]
		/*
			Расчеты для работы семафора. Перебираем все секции frame, определяем габариты и тип кадра.
			Прибавляем высоту каждого кадра, чтобы получить абсолютное смещение для каждого элемента.
		*/
		// [fold~ Skz2]
		/*
			08_11_13 Нужно откорректировать семафор, а то он брешет дико ...
			// [fold~ JmUC]
		*/

		/*
		// Какие-то старые куски кода
		// [fold~ BnSb]
		*/
		// [fold~ xBo7]

		// Внедрение блока semafor - ярлыка для отображения имени секции
		if ($('div#semafor').size()==0) { // Если метка еще не определена
			/*			
			// Отключение семафора
			$('body').append('<div id="semafor" class="s_floating"></div><br/>');
			*/		
		}
///*
		fix_semafor();
//*/

		/*
		// Ляпанина по плавающему окну (plashka)
		// [fold~ eMp1]
		*/

		/* Пересчет позиции семафора при скроллинге */
		// [fold~ oxD8]
		$(function(){
			$(window).scroll(function() {
				/*
					Вывод информации о текущем смещении страницы в счетчик сбоку страницы
				*/	
				var offset 	= $(document).scrollTop();

				/*
					Доп. модиф. кода для учитывания момента, после которого нужно скрыть пульт
				*/
				// Устаревшие фрагменты кода
				// [fold~ poTu]
				/*
					Сверяем значение текущего смещения со значениями из хеша, начиная с младшего
				*/
				// var offset 	= 4100;
				var cnt 	= 0;
				var x = {}; // Инициализация хеша
				for(var key in fr_hash) { 
					cnt++; // Какой ключ по счету?
					/*	
						Тут надо отстроить поведение семафора путем правки значения offset, т.к. 
						offset расчитывается от верхней кромки экрана
						Т.е. offset + 300?
					*/
					corr = offset - 320;
					// if (key>offset) {
					if (key>corr) {
					// [fold~ rFhH]
						// Меняем картинку в семафоре
						if (fr_hash[key]=="regular") 	{ $('div#semafor').css('background','url(../img/common/catalog/banner_regular.png)') }
						if (fr_hash[key]=="regular") 	{ $('div#semafor').css('background-size','100%') }
						if (fr_hash[key]=="super") 		{ $('div#semafor').css('background','url(../img/common/catalog/banner_super.png)') }
						if (fr_hash[key]=="super") 		{ $('div#semafor').css('background-size','100%') }
						if (fr_hash[key]=="zakaz") 		{ $('div#semafor').css('background','url(../img/common/catalog/banner_zakaz.png)') }
						if (fr_hash[key]=="zakaz") 		{ $('div#semafor').css('background-size','100%') }

						break;
					}
				};
				// [fold~ pNx4]
			});
		});
	
	/*
		08_11_13, ночь
		Правки по вопросу "черные квадраты"
	*/
	// [fold~ nPZu]
	var x = 4; // Кол-во пряжек в ряд в каталоге

		// Секция обработки нового дизайна

		// Бирка сбоку с отображением имени секции
		// (?)
		// $('body').append('');

		/*
			Удаление пустых секций (описание)
			// [fold~ pOnW]
		*/
		$('div#frame').each(function () {
			// a = $(this).find('#wrap_cont_m3').size();
			a = $(this).children('#wrap_cont_m3').size();
			if (a == 0) {$(this).remove();}
			// $('.con2').append(a + '<br/>');
		});

		// Корректное место для пересчета переключений семафора по классам
/*
		// w, отключение
		recalc_semafor();
*/
		// Раскрашивание. Если секция относится к типу super или zakaz, то расцвечиваем ее в более серый цвет
		// [fold~ VLjS]
		/* Альтернативное решение для iPad */
		// [fold~ mgAv]
		$('div#frame').each(function () {
		// [fold~ nss5]
				/*
					05_02_15
					Проблемы с черными квадратами на iPad/iPhone (описание)
					// [fold~ H57M]
				*/
				var res = 0; // Предварительная инициализация перед каждой итерацией
				// [fold~ WACA]
    			if ($(this).hasClass('regular')) {
				// [fold~ x3ZK]
    				// Нахождение числа блоков, которыми нужно дополнить секцию до кратности 4
    				// Вычисляем число блоков и если число не кратно  4, то бополняем

    				// w рабочий вариант для десктопов
    				// cnt = $(this).find('div#wrap_cont_m3').size();
    				cnt = $(this).children('div#wrap_cont_m3').size();
					// [fold~ V8Hx]
					if ((cnt % x) == 0) {
						// $('.con2').append("БЕЗ ОСТАТКА<br/>");

						// Комментарий по поводу правок
						// [fold~ dwfV]
					}
					else {
						n = cnt / x | 0; // Такое вот хитрое бинарное извлечение целой части деления
						// $('.con2').append("n " + n + ", ");
						res = (n+1)*x - cnt;
						// $('.con2').append("дополнить " + res + "<br/>");
					}
					// [fold~ y6Td]
						for (var i = 0; i < res; i++) {
							$(this).append('<div id="wrap_cont_m3_hollow"></div>');
							// $('.con2').prepend(i + " ");
						};
						// $('.con2').append("<br/>");
						res = 0; // Сбрасываем счетчик дополнения
					
					// (!) Правка с заменой children в данном случае не дает желаемого результата
    				// $(this).children('div#block_a').css("background","#9b9b9b");

    				$(this).contents('div#block_a').css("background","#5a5a5a");
    				$(this).contents('div#block_b').css("background","#5a5a5a");
	    			$(this).contents('div#block_d').css("background","#5a5a5a");
	    			$(this).contents('div#block_e').css("background","#5a5a5a");
	    			$(this).contents('div#wrap_cont_m3_hollow').css("background","#5a5a5a");
    			}
    			// alert(32);
		});

		$('div#frame').each(function () {
		res = 0; // Похоже сбрасывать нужно перед каждым блоком?
    			if ($(this).hasClass('super')) {
    				// $('.con2').append("Обработка super<br/>");

			// alert(33);
    				// Нахождение числа блоков, которыми нужно дополнить секцию до кратности 4
    				// cnt  = $(this).find('div#wrap_cont_m3').size();
    				cnt  = $(this).children('div#wrap_cont_m3').size();
					// $('.con2').append("cnt = " + cnt + ", ");
					if ((cnt % x) != 0) {
						n = cnt / x | 0; // Такое вот хитрое бинарное извлечение целой части деления
						res = (n+1)*x - cnt;
					}
					// $('.con2').append("res "+ res + ", ");

					for (var i = 0; i < res; i++) {$(this).append('<div id="wrap_cont_m3_hollow"></div>');};
					res = 0; // Сбрасываем счетчик дополнения

    				$(this).find('div#block_a').css("background","#747474");
    				$(this).find('div#block_b').css("background","#747474");
	    			$(this).find('div#block_d').css("background","#747474");
	    			$(this).find('div#block_e').css("background","#747474");
	    			$(this).find('div#wrap_cont_m3_hollow').css("background","#747474");
	    		}
		});

		$('div#frame').each(function () {
		res = 0; // Похоже сбрасывать нужно перед каждым блоком?

    			if ($(this).hasClass('zakaz')) {
    				// $('.con2').append("Обработка zakaz<br/>");

    				// Нахождение числа блоков, которыми нужно дополнить секцию до кратности 4
    				// cnt  = $(this).find('div#wrap_cont_m3').size();
    				cnt  = $(this).children('div#wrap_cont_m3').size();
					if ((cnt % x) != 0) {
						n = cnt / x | 0; // Такое вот хитрое бинарное извлечение целой части деления
						res = (n+1)*x - cnt;
					}
					for (var i = 0; i < res; i++) {$(this).append('<div id="wrap_cont_m3_hollow"></div>');};
					res = 0; // Сбрасываем счетчик дополнения

    				$(this).find('div#block_a').css("background","#9b9b9b");
    				$(this).find('div#block_b').css("background","#9b9b9b");
	    			$(this).find('div#block_d').css("background","#9b9b9b");
	    			$(this).find('div#block_e').css("background","#9b9b9b");
	    			$(this).find('div#wrap_cont_m3_hollow').css("background","#9b9b9b");
    			}
		});

		/* Что-то от механизма обработки возврата */

			if (isBack == "") {}
			else { window.scrollTo(0, scroll); }

			localStorage.as_back_scroll = "0";

			// (!) Хак, подводка раздела хольнитенов к заданному виду
			// UPD (!) Это еще актуально?!
			if (pryajka_type=='holnitenu') {
				// alert(1);
				
				// $('div#wrap_cont').eq(10).remove();
				// $('div#wrap_cont').eq(10).remove();

				a = $('div#wrap_cont').eq(10).detach();
				b = $('div#wrap_cont').eq(10).detach();

				$('div#bline').eq(0).append('<div id="wrap_cont_hollow"></div>');
				$('div#bline').eq(0).append('<div id="wrap_cont_hollow"></div>');

				// $('<div id="wrap_cont_hollow"></div>').insertAfter($('div#wrap_cont').eq(9)); // Тоже верно

				$('div#bline').eq(0).append(a);				
				$('div#bline').eq(0).append(b);				

			}

			// Всем картинкам-указателям установить обработчик - выбор палитры
		 	$('img#clink').each(function () {
		 		// $('this').remove();
		 		$(this).bind('click', function() {
					$('div#side_color_sel').trigger('click');

					// ToDo
						// - Включить обработку
						// - Изменить цветовую отрисовку для корректоной работы алгоритма

				});
		 	});
		 	// И дополнительно для второй картинки
		 	$('img#p1').each(function () {
		 		// $('this').remove();
		 		$(this).bind('click', function() {
					$('div#side_color_sel').trigger('click');
				});
		 	});

		  // (!) Зачем это было? 
		  // (!) UPD Актуально?

			if (pryajka_type=='holnitenu') {
				$('div#bline').eq(1).find("div#wrap_cont").remove();
			}

			// Эксперименты разные
// [fold~ adxK]


/*
	Вычисление границы, после которой должнен скрываться HUD в блоке обрабоке
	ниже. Также устаревшая обработка для каталога 1 версии
*/
	try {
		var pnt1=$('#footer').get(0).getBoundingClientRect();
		$('.con2').append('footer top: ' + pnt1.top + '<br/>');
	}
	catch (e) {}

///*
		// Пока дисайблим
	try {

		var pnt2=$('#film').get(0).getBoundingClientRect();
		$('.con2').append('film bot: ' + pnt2.bottom + '<br/>');
	}
	catch (e) {}

		// var pnt3=$('#box_a2').get(0).getBoundingClientRect();
		// $('.con2').append('box_a2 bot: ' + pnt3.bottom + '<br/>');
		
		// Смещение после которого пульт и прочая обвязка должна скрываться
		// hold_pult = pnt1.top + 800;
		hold_pult = pnt2.bottom - 300; // - 100; // + 800;
		
		// hold_pult = pnt3.bottom; // + 800;
//*/

/* 
	Сокрытие пульта и проч. элементов при достижении дна области контента
	Фрагмент для старого каталога, больше не нужен
*/
$(window).scroll(function() {

				// Текущее смещение
				var offset 	= $(document).scrollTop();

				// Фиксация пульта
				if (offset > hold_pult) {
					// $('#sideLeft').css('visibility', 'hidden');

///*
					// Предварительный рабочий вариант
					$('#box_a2').css('visibility', 'hidden');

					$('#basket_wrap').css('visibility', 'hidden');
					$('#semafor').css('visibility', 'hidden');
//*/
					// [fold~ 8mWm]
				}

				// Восстановление поведения пульта
				if (offset < hold_pult) {

///*
					// Рабочий вариант
					$('#box_a2').css('visibility', 'visible');
					$('#basket_wrap').css('visibility', 'visible');
					$('#semafor').css('visibility', 'visible');
//*/
					// [fold~ nMpz]
				}
}); // $(window).scroll(function()


// (!!) Два нижеследующих блока нужно будет протестировать в составе catalog2
// вроде как одно и тоже делаю, но почему-то оба активны
	/* Высплывающее меню сверху, актуально */
	 $(function() {
				
	 	est_pos = $('#long_block #film').position().top;

		var offset = $("#stripe").offset(); // запоминаем первоначальные отсупы
		$(window).scroll(function() { // во время скроллинга
			// if ($(window).scrollTop() > 700) { // Если скроллинг больше первоначальной позиции
			if (est_pos > -700) { // Если скроллинг больше первоначальной позиции
			// $("#stripe").stop().animate({marginTop: $(window).scrollTop() - offset.top}); // увиличиваем отступ сверху
				$("#stripe").stop().animate({marginTop: 90}, 50); // увиличиваем отступ сверху
			}else{
				$("#stripe").stop().animate({marginTop: 0 }, 50); // Иначе отступ нулевой
			}
		});
		

	});

	// (!) Не нужно ли это перенести в куда-то в иное место?
	/* Реакция на прокрутку "длинного блока" ? */
	$(function(){
	  $('div#long_block').scroll(function(){
		
		    var aTop = $('#ad').height();
		    // if($(this).scrollTop()>=aTop){
		    if($(this).scrollTop()>=500){
		        // alert('ad just passed.');
		        $('.con3').append("ad just passed. : " + $(this).scrollTop() + " ~ " + aTop + "<br/>");

		        $("#stripe").stop().animate({marginTop: 90}, 50); // увиличиваем отступ сверху
		    }
		    else {
				$("#stripe").stop().animate({marginTop: 0 }, 50); // Иначе отступ нулевой
			}
		  });
		  

	});

} // if(/load_uni/) (1-2)


/* --- --- --- --- --- */

		/* Скрипт загрузки результатов запроса по контенту */
		if (/get_stats.pl/m.test(settings.url)) {

			/*
				Опрос схемы загрузки 
			*/
			stat_reg = $('li#stat_reg').size();
			stat_sup = $('li#stat_sup').size();
			stat_zak = $('li#stat_zak').size();
			
			// $('.con2').html('');
			// $('.con2').html("stat_reg: " + stat_reg + " stat_reg: " + stat_sup + " stat_zak: " + stat_zak + "<br/>");
			$('.con2').append("stat_reg: " + stat_reg + " stat_reg: " + stat_sup + " stat_zak: " + stat_zak + "<br/>");

			// Из конт. #film переносим инф. li в консоль
			$('#film li.info').appendTo('.con2');

			// После загрузки информации помещаем ее в соотв. переменную
			portions = parseInt(ajax_data);

			// Объясняющие комменты
			// [fold~ h8fM]
			$('.con2').append("portions: " + portions + "<br/>");

		} // if(/get_stats/)


			// $('.con2').append("stat_reg: " + stat_reg + " stat_reg: " + stat_sup + " stat_zak: " + stat_zak + "<br/>");


		/* Загрузка порции контента в суперблок #film */
		if (/load_portion.pl/m.test(settings.url)) {

			// $('#film').append('<div id="ad2"></div>');
			// $('#film').append('<div id="more_but2">ПОКАЗТЬ ЕЩЕ</div>');

			// Информация из перловки
			$('div#perl').appendTo('.con2');


			$('div#more_but2').bind('click', function() {
				$(this).remove();

				a1 = "rabochaya_xx_xx"; a2 = "arg2_JS";
				ajax4("load_portion.pl", a1, a2, $('div#film'));
			});		


	 /* Реакция на прокрутку "длинного блока" */
// Копия из load_uni
$(function(){
  $('div#long_block').scroll(function(){
    var aTop = $('#ad').height();
    // if($(this).scrollTop()>=aTop){
    if($(this).scrollTop()>=500){
        // alert('ad just passed.');
        // $('.con3').append("ad just passed. : " + $(this).scrollTop() + " ~ " + aTop + "<br/>");

        $("#stripe").stop().animate({marginTop: 90}, 50); // увиличиваем отступ сверху
    }
    else {
		$("#stripe").stop().animate({marginTop: 0 }, 50); // Иначе отступ нулевой
	}

  });
});

// [fold~ w6wr]

///*
/*
	Детектирование дна проктутки блока film, наступает когда сколл достигает 
	~последних пряжек. Затем событие должно анбиндиться и загружается 
	дополнительная порция пряжки
*/
	$(function(){
	  $('div#long_block').scroll(function(){
	    // $('.con3').append(" pos. : " + ($(this).scrollTop() + 150) + "<br/>");

	    if (($(this).scrollTop() + 150 ) > ($('div#film').height() - 100)){
	        // $('.con3').append("pos - near bottom<br/>");

	        // Инструкция, отключающая функцию детекта дна при первом срабатывании
	        $('div#long_block').unbind('scroll');

	    // (~2) Точка порционной загрузки
	        // Запрос на получение следующей порции контента
	        // a2 - номер порции

	        $('.con3').append('Порция номер: ' + cur_portion + " порций " + portions + "<br/>");

			if (cur_portion < portions-1) {
				cur_portion++;
	        	a1 = "rabochaya_xx_xx"; a2 = cur_portion;
				ajax4("load_portion.pl", a1, a2, $('div#film'));
			}
			else {$('.con3').append('Порция номер: ' + cur_portion + " - Больше нет! <br/>");}

	    }
	  });
	});
//*/

// check if a user has scrolled to the bottom
// [fold~ pHW9]




/* Кусок по черным квадратам из load_uni */

	var x = 4; // Кол-во пряжек в ряд в каталоге

		// Секция обработки нового дизайна

		// Бирка сбоку с отображением имени секции
		// (?)
		// $('body').append('');

		/*
			Удаление пустых секций (описание)
			// [fold~ pOnW]
		*/
		$('div#frame').each(function () {
			// a = $(this).find('#wrap_cont_m3').size();
			a = $(this).children('#wrap_cont_m3').size();
			if (a == 0) {$(this).remove();}
			// $('.con2').append(a + '<br/>');
		});

		// Корректное место для пересчета переключений семафора по классам
/*
		// w, отключение
		recalc_semafor();
*/
		// Раскрашивание. Если секция относится к типу super или zakaz, то расцвечиваем ее в более серый цвет
		// [fold~ VLjS]
		/* Альтернативное решение для iPad */
		// [fold~ mgAv]
		$('div#frame').each(function () {
		// [fold~ nss5]
				/*
					05_02_15
					Проблемы с черными квадратами на iPad/iPhone (описание)
					// [fold~ H57M]
				*/
				var res = 0; // Предварительная инициализация перед каждой итерацией
				// [fold~ WACA]
    			if ($(this).hasClass('regular')) {
				// [fold~ x3ZK]
    				// Нахождение числа блоков, которыми нужно дополнить секцию до кратности 4
    				// Вычисляем число блоков и если число не кратно  4, то бополняем

    				// w рабочий вариант для десктопов
    				// cnt = $(this).find('div#wrap_cont_m3').size();
    				cnt = $(this).children('div#wrap_cont_m3').size();
					// [fold~ V8Hx]
					if ((cnt % x) == 0) {
						// $('.con2').append("БЕЗ ОСТАТКА<br/>");

						// Комментарий по поводу правок
						// [fold~ dwfV]
					}
					else {
						n = cnt / x | 0; // Такое вот хитрое бинарное извлечение целой части деления
						// $('.con2').append("n " + n + ", ");
						res = (n+1)*x - cnt;
						// $('.con2').append("дополнить " + res + "<br/>");
					}
					// [fold~ y6Td]
						for (var i = 0; i < res; i++) {
							$(this).append('<div id="wrap_cont_m3_hollow"></div>');
							// $('.con2').prepend(i + " ");
						};
						// $('.con2').append("<br/>");
						res = 0; // Сбрасываем счетчик дополнения
					
					// (!) Правка с заменой children в данном случае не дает желаемого результата
    				// $(this).children('div#block_a').css("background","#9b9b9b");

    				$(this).contents('div#block_a').css("background","#5a5a5a");
    				$(this).contents('div#block_b').css("background","#5a5a5a");
	    			$(this).contents('div#block_d').css("background","#5a5a5a");
	    			$(this).contents('div#block_e').css("background","#5a5a5a");
	    			$(this).contents('div#wrap_cont_m3_hollow').css("background","#5a5a5a");
    			}
    			// alert(32);
		});

		$('div#frame').each(function () {
		res = 0; // Похоже сбрасывать нужно перед каждым блоком?
    			if ($(this).hasClass('super')) {
    				// $('.con2').append("Обработка super<br/>");

			// alert(33);
    				// Нахождение числа блоков, которыми нужно дополнить секцию до кратности 4
    				// cnt  = $(this).find('div#wrap_cont_m3').size();
    				cnt  = $(this).children('div#wrap_cont_m3').size();
					// $('.con2').append("cnt = " + cnt + ", ");
					if ((cnt % x) != 0) {
						n = cnt / x | 0; // Такое вот хитрое бинарное извлечение целой части деления
						res = (n+1)*x - cnt;
					}
					// $('.con2').append("res "+ res + ", ");

					for (var i = 0; i < res; i++) {$(this).append('<div id="wrap_cont_m3_hollow"></div>');};
					res = 0; // Сбрасываем счетчик дополнения

    				$(this).find('div#block_a').css("background","#747474");
    				$(this).find('div#block_b').css("background","#747474");
	    			$(this).find('div#block_d').css("background","#747474");
	    			$(this).find('div#block_e').css("background","#747474");
	    			$(this).find('div#wrap_cont_m3_hollow').css("background","#747474");
	    		}
		});

		$('div#frame').each(function () {
		res = 0; // Похоже сбрасывать нужно перед каждым блоком?

    			if ($(this).hasClass('zakaz')) {
    				// $('.con2').append("Обработка zakaz<br/>");

    				// Нахождение числа блоков, которыми нужно дополнить секцию до кратности 4
    				// cnt  = $(this).find('div#wrap_cont_m3').size();
    				cnt  = $(this).children('div#wrap_cont_m3').size();
					if ((cnt % x) != 0) {
						n = cnt / x | 0; // Такое вот хитрое бинарное извлечение целой части деления
						res = (n+1)*x - cnt;
					}
					for (var i = 0; i < res; i++) {$(this).append('<div id="wrap_cont_m3_hollow"></div>');};
					res = 0; // Сбрасываем счетчик дополнения

    				$(this).find('div#block_a').css("background","#9b9b9b");
    				$(this).find('div#block_b').css("background","#9b9b9b");
	    			$(this).find('div#block_d').css("background","#9b9b9b");
	    			$(this).find('div#block_e').css("background","#9b9b9b");
	    			$(this).find('div#wrap_cont_m3_hollow').css("background","#9b9b9b");
    			}
		});

		/* Что-то от механизма обработки возврата */

			if (isBack == "") {}
			else { window.scrollTo(0, scroll); }

			localStorage.as_back_scroll = "0";

			// (!) Хак, подводка раздела хольнитенов к заданному виду
			// UPD (!) Это еще актуально?!
			if (pryajka_type=='holnitenu') {
				// alert(1);
				
				// $('div#wrap_cont').eq(10).remove();
				// $('div#wrap_cont').eq(10).remove();

				a = $('div#wrap_cont').eq(10).detach();
				b = $('div#wrap_cont').eq(10).detach();

				$('div#bline').eq(0).append('<div id="wrap_cont_hollow"></div>');
				$('div#bline').eq(0).append('<div id="wrap_cont_hollow"></div>');

				// $('<div id="wrap_cont_hollow"></div>').insertAfter($('div#wrap_cont').eq(9)); // Тоже верно

				$('div#bline').eq(0).append(a);				
				$('div#bline').eq(0).append(b);				

			}



		} // if(/load_portion/)


/* --- --- --- --- */


		if (/load_sizes.pl/m.test(settings.url)) {
			/*
				Дополнительные обработчики событий для диалога "Подробнее", которые
				срабатывают после загрузки ростовки
			*/

			/*
				После загрузки ростовки нужно подкрасить блок текущего размера пряжки
			*/
			// $('.con2').append("Текущий размер = " + h_arr[5] + '<br/>');
			// Найти нужный размер в ростовке и раскрасить метку
			$('div#sizes_el_mark').each(function () {
				// Опредение размера для текущего элемента ростовки
				var a = $(this).html().replace(/(\d+)(.*)/g, "$1"); // Опред. размер текущего эл. ростовки

				// $('.con2').html('');
				$('.con3').append("Разм. рост. = " + a + '<br/>');


				/* 
					Теперь нужно определить какой размер является текущим
				*/

				prjagka_data = localStorage.getItem('as_var_selected_prjagka');

				// 0 				  1           2        3       4
				// full               type        nom      size    col
				// i.FM-01496-08-1V ; rabochaya ; 01496  ;  08  ;  1V
				b = prjagka_data.split(";");
				cur_size = b[3];
				$('.con3').append("Текущий размер " + a + '<br/>');

				if (cur_size==a) {
					// $('.con2').append("Найдено соотв., размер= " + a + '<br/>');	
					$(this).css('border', '3px solid red');
				}
			});	

			$('div#sizes_el_img, div#sizes_el_mark').bind('click', function() {
			    // img/cat/rabochaya/i.FM-01496-12-1V.png
			    src = $(this).parent().find('img').attr('src');
			    // $('.con2').html('');
			    $('.con2').append("this scr = " + src + '<br/>');
				/*
				    Правим ls
					Изменение строки с данными о выбранной пряжке
				*/				
				// Разбор деталей по пряжке и формирование информации для диал. "Подробнее"
				// img/cat_large/rabochaya/i.FM-01496-08-1V.png
				a = src.split("/");
				// i.FM-01496-08-1V.png
				a = a[a.length - 1];
				a = a.split(".");
				// i.FM-01496-08-1V
				a = a[0] + "." + a[1];
				b = a.split('-');
				// full               type        nom    		  size    col
				// i.FM-01496-08-1V ; rabochaya ; 01496  		;  08  ;  1V
				a = a + ";" + pryajka_type + ";" + b[1] + ";" + b[2] + ";" + b[3];

				cur_size = b[2];

				localStorage.as_var_selected_prjagka = "";
				localStorage.as_var_selected_prjagka = a;
				/*
					В соотв. с измен. строкой меняем характеристики в диалоге "Подробнее"
				*/

				$('.con2').append('"CURRENT" : ' + a +  '<br/>');

				// Перекраска блока выделением
				/* Подмазываем нужную метку */
				$('div#sizes_el_mark').css('border', '1px solid black')
				$(this).parent().find('#sizes_el_mark').css('border', '3px solid red');
				$('.con3').append('изменен на : ' + cur_size +  '<br/>');

				a = $('div#ind_pryajka_m2').find('div#pr_block_c img').attr('src');
				$('.con3').append('IND src : ' + a +  '<br/>');

				/* 
					Разобрать и пересобрать src для IND, изменив размер
				*/
				// img/cat_large/rabochaya/i.FM-01496-08-1V.png
				// 0                  1     2  3  
				// img/cat/kolca/i.FM-04820-15-01V.png

				b = a.split('-');
				res = b[0] + "-" + b[1] + "-" + cur_size + "-" + b[3];

				$('.con3').html('');
				$('.con3').append('IND src : ' + res +  '<br/>');

				$('div#ind_pryajka_m2').find('div#pr_block_c img').attr('src', res);

			}); // $('div#sizes_el_img, div#sizes_el_mark').bind()
		} // if(/load_sizes/)

	}); // ajaxComplete 'load_uni.pl'

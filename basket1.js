// Скрипт для обработки Тимуркиной корзины - УЖЕ НЕТ


// Модификация метода из-за некроссбраузерности
function browser()
{
    var ua = navigator.userAgent;
    
    if (ua.search(/MSIE/) > 0) 		return 'Internet Explorer';
    if (ua.search(/Firefox/) > 0) 	return 'Firefox';
    if (ua.search(/Opera/) > 0) 	return 'Opera';
    if (ua.search(/Opera/) > 0) 	return 'Opera';
    if (ua.search(/Chrome/) > 0) 	return 'Google Chrome';
    if (ua.search(/Safari/) > 0) 	return 'Safari';
    if (ua.search(/Konqueror/) > 0) return 'Konqueror';
    if (ua.search(/Iceweasel/) > 0) return 'Debian Iceweasel';
    if (ua.search(/SeaMonkey/) > 0) return 'SeaMonkey';
    
    // Браузеров очень много, все вписывать смысле нет, Gecko почти везде встречается
    if (ua.search(/Gecko/) > 0) return 'Gecko';

    // а может это вообще поисковый робот
    return 'Search Bot';
}




/*
	Возврат из корзины так, как это происходит с индивидуальной страницы

	Че-та не работает
*/

var loaded = false;

// Переопределение кнопки назад
window.onload = function () {
    if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {

        	// alert(browser());

        	// Обработка кнопки назад исключительно для FF
        	if (browser() == 'Firefox') {
            	history.pushState('newjibberish', null, null);
	            tp = localStorage.getItem('as_var_type');
				localStorage.as_back_info = "";
				localStorage.as_back_info = tp;
				window.location="catalog2.html";
        	}
        	if (browser() == 'Search Bot') {
            	history.pushState('newjibberish', null, null);
	            tp = localStorage.getItem('as_var_type');
				localStorage.as_back_info = "";
				localStorage.as_back_info = tp;
				window.location="catalog2.html";
        	}

		    if (!loaded) {
		        loaded = true;
		        return;
		    } else {
		        // run your stuff...
		        // alert("back?");

            	history.pushState('newjibberish', null, null);
            // Handle the back (or forward) buttons here
            // Will NOT handle refresh, use onbeforeunload for this.
            


	            tp = localStorage.getItem('as_var_type');
	            // alert('back, type: ' + tp);

				localStorage.as_back_info = "";
				localStorage.as_back_info = tp;

				// alert(localStorage.getItem('as_back_info'))
				window.location="catalog2.html";

				// alert("bb");

    		}
        };
    }
}



/* Переменная для хран. данных о клиенте */
// Добавим еще разок, что-то не очень/ если заход не через каталог
ls_var = localStorage.getItem('as_client_info'); // Информация о клиенте
if (typeof ls_var == 'undefined' || ls_var == null) { localStorage.as_client_info = ""; }

/* Определим новую переменную для хранения истории заказов */
ls_var = localStorage.getItem('as_zhist_info'); // Информация о проведенных заказах
if (typeof ls_var == 'undefined' || ls_var == null) { localStorage.as_zhist_info = ""; }

/* История просмотров */
ls_var = localStorage.getItem('as_vhist_info'); // Информация о проведенных заказах
if (typeof ls_var == 'undefined' || ls_var == null) { localStorage.as_vhist_info = ""; }

/* Сформированная таблица для передачи далее на печать или pdf */
ls_var = localStorage.getItem('as_basket_table'); // Информация о проведенных заказах
if (typeof ls_var == 'undefined' || ls_var == null) { localStorage.as_basket_table = ""; }


// Дополнительные функции 
/*
	Определение размера ассоциативного массива (хеша)
	http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
*/
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

$(document).ready(function(){
		// $('body').prepend('jQ!');

	/* Секция определений и инициализации */
	// Для целей отладки
///*
	$("head").append('<style type="text/css" media="all"> .redBorder, .wrappedElement {border: 1px solid red;}</style>');
	$('body').append('<div class="con2"></div>'); // Консоль
// 	$('head').append('<style>.key_1 {background: none repeat scroll 0 0 #CCeeff;border: 1px dashed #999999;font-family: "courier new";overflow: hidden;padding: 5px 10px;white-space: nowrap;width: 70px; height: auto; margin-bottom: 2px;position: fixed; left: 5px; top: 200px;}</style>');
// 	$('head').append('<style>.key_1:hover {background: none repeat scroll 0 0 #AAACCC;border: 1px dashed #999999;font-family: "courier new";overflow: hidden;padding: 5px 10px;white-space: nowrap;width: 70px; height: auto; margin-bottom: 2px;position: fixed; left: 5px; top: 200px;}</style>');
// 	$('body').append('<div class="key_1" flag="">key_1</div>');
//*/


	/* Подключение кастомного скролла к области прокрутки */
	$("div#bsk_block_A").mCustomScrollbar({
			verticalScroll:true
	});
	


/*	
	$('#wrk_area').append('<div id="wrap_cont"><div id="container"> <div id="line1"> <img src="img/blocks/marks/p_new.png" style="visibility: hidden;"> </div> <div id="line2"> <img src="img/blocks/marks/p_akciya.png" style="visibility: hidden;"> <img src="img/cat/rabochaya/i.FM-01496-08-04.png"> <img src="img/blocks/marks/p_podzakaz.png" style="visibility: hidden;"> </div> <div id="line3"> <span id="name">i.FM-01496-08-04</span> <img src="img/blocks/marks/p_cube.png" style="visibility: hidden;"> </div> <img style="visibility: hidden;" id="more" src="img/blocks/marks/p_more.png"> </div><div id="wc_keyz"></div><div id="wc_zakaz"><div id="wc_but_1"></div><div id="wc_but_2"></div></div></div>');

	// Кнопка заказ, вызов отрисовки диалога заказ из плагина aux_3.js
	$('div#wc_but_1').each(function () {
		$(this).bind('click', function() {
		  $(this).draw_zakaz();
		});
	});

	// $('body').draw_zakaz();
*/

// Управление формой Тимура
	
	// Отсекаем лишние контейнеры
	$('div#wrapper').slice(1,10).remove();

	// $('.con2').append("AAA<br/>");



// Создание переменной в ls, когда она еще не определена (~w)
var ls = localStorage.getItem('as_01');
// if (typeof sideBar !== 'undefined' && sideBar !== null) {
if (typeof ls == 'undefined' || ls == null) { 			// && isBack !== null) {
	// alert('sideBar is undef');
	localStorage.as_01 = "";
	// alert(1);
/*	
	$('.con2').append("Тип переменной ls: " + typeof ls + "<br/>");
	$('.con2').append("Переменная ls активирована<br/>");
*/	
}
else {
/*	$('.con2').append("Переменная ls уже была ранее определена, тип: " + typeof ls + "<br/>");*/
}


// Тестирование работы с хешами
/*
	var hash1 = {"element1": "value2",
    	       "element2": "value2",
        	   "testK": "testValue"};

	$('body').prepend(hash1['testK'] + '<br/>');
*/

// Использование синтаксиса препроцессора

	// Дополнительные функции
	function hashToStr(hash)
	{
	    var arr = [];
	    for (var key in hash) { arr.push(hash[key]); }
	    str = arr.join(" ");
	    return str;
	}	

/*
	Определение размера ассоциативного массива (хеша)
	http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
*/
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
/*
	// В этом уже нет необходимости
	// Помещам список пряжки в ls        // I.FM-0506-08-7P.png 
	str = "i.FM-01481-08-1V i.FM-0506-08-1V i.FM-0506-08-7P i.FM-0551-08-1V i.FM-01496-08-01";
	localStorage.as_01 = "";
	localStorage.as_01 = str;
*/
	/*
		Загрузка набора отобранной пряжки из ls при каждом входе в каталог
	*/

	// Инициализация массива и хеша, т.к. они не определяются без хотя бы одного значения
	var arr 		= []; 
	var hash 		= {};
	var cur_vhist 	= []; // Массив текущего просмотра пряжки, получ. при входе в корзину

	// Извлекаем массив пряжки из ls
	a = localStorage.getItem('as_01');
	if (a!="") {
		arr = a.split(' ');
	}
	else { /*$('.con2').append('ls: пусто!' + "<br/>");*/ }
/*
	var bsize = Object.size(hash); 
	$('.con2').append('1 - hash size ' + bsize + '<br/>');
*/
	var length = arr.length, element = null;
    // $('.con2').append('Длина массива: ' + length + "<br/>");
	for (var i = 0; i < length; i++) {
		element = arr[i];
		hash[element] = element; // Импортируем массив в хеш
	} 

	var bsize = Object.size(hash); // Определение размера корзины 
		// $('.con2').append('Размер хеша: ' + bsize + "<br/>");

	if (bsize>0) {
		// Отрисовка набора пряжки по полученному хешу из ls
		for(var k in hash) {
			// $('.con2').append('k: ' + k + "<br/>");
			// $('#wrk_area').append('<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">СУПЕРЦЕНА</span></div><div id="block_b"><div id="block_b_img" class="lit_e"></div></div><div id="block_c"><img src="img/cat/rabochaya/' + k + '.png" alt=""></div><div id="block_d"><div id="w_close"></div><div id="block_d_hollow"></div><div id="block_d_basket"></div></div><div id="block_e"><span id="cat_name">' + k + '</span><img id="more" src="img/blocks/marks/p_more.png"></div></div>');
			// $('#bsk_block_A').append('<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">СУПЕРЦЕНА</span></div><div id="block_b"><div id="block_b_img" class="lit_e"></div></div><div id="block_c"><img src="img/cat/rabochaya/' + k + '.png" alt=""></div><div id="block_d"><div id="w_close"></div><div id="block_d_hollow"></div><div id="block_d_basket"></div></div><div id="block_e"><span id="cat_name">' + k + '</span><img id="more" src="img/blocks/marks/p_more.png"></div></div>');

			// Вот такой способ получения имени пряжки в голову пришел
			// img/cat/rabochaya/i.FM-01481-08-7P.png
			pr_name = k.split('/');
			pr_name.reverse(); // Теперь i.FM-01481-08-7P.png - это первый элемент
			/*
				Осталось только убрать расширение (позже...)
			*/

			/*								#5A5A5A  #9B9B9B 	#747474
				Определение секции пряжки (regular, zakaz, super)
			*/
			var section_type = 'regular';
			if (/faro(?!_)/m.test(k)) section_type = 'zakaz';
			if (/faro_super/m.test(k)) section_type = 'super';
			
			// Отладка по типу пряжки
			// $('.con2').append(section_type + '<br/>');
			

			// $('.con2').append(pr_name[0] + pr_name[1] + '<br/>');

			aaa = pr_name[0].replace(/(.*?)(\.png)/g, "$1"); // Отсекаем хвост

			// $('#bsk_block_A').append('<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">В НАЛИЧИИ</span></div><div id="block_b"><div id="block_b_img" class="lit_e"></div></div><div id="block_c"><img src="' + k + '" alt=""></div><div id="block_d"><div id="w_close"></div><div id="block_d_hollow"></div><div id="block_d_basket"></div></div><div id="block_e"><span id="cat_name">' + pr_name[0] + '</span><img id="more" src="img/blocks/marks/p_more.png"></div></div>');
			
/*
			// Новый фрагмент
			$('#bsk_block_A').append('<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">В НАЛИЧИИ</span></div><div id="block_b"><div id="block_b_img" class="lit_e"></div></div><div id="block_c"><img src="' + k + '" alt=""></div><div id="block_d"><div id="w_close"></div><div id="block_d_hollow"></div><div id="block_d_basket"></div></div><div id="block_e"><span id="cat_name">' + aaa + '</span><img id="more" src="img/blocks/marks/p_more.png"></div></div>');
*/			
			$('div#scroll_zone').append('<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">В НАЛИЧИИ</span></div><div id="block_b"><div id="block_b_img" class="lit_e"></div><div id="w_section_type"></div></div><div id="block_c"><img src="' + k + '" alt=""></div><div id="block_d"><div id="w_close"></div><div id="block_d_hollow"></div><div id="block_d_basket"></div></div><div id="block_e"><span id="cat_name">' + aaa + '</span><img id="more" src="img/blocks/marks/p_more.png"></div></div>');
			

			/*
				История просмотров.
				При каждом входе в корзину проходим массив vhist и определяем есть новые пряжки, 
				если есть - вносим. Такми образом даже удаленная пряжка будет попадать сюда
				Ключи из хеша, суть пряжки, вносим в историю
				Добавляем к истории просмотров время
			*/
			var now = moment();
			/*	
				now хранится как 1387205119563
			*/
			var vh_rec = k + ':' + now;
			// $('.con2').append("Время: " + now.format('dddd, MMMM DD YYYY, h:mm:ss') + '<br/>');
			// $('.con2').append("> " + vh_rec + '<br/>');
			// cur_vhist.push(k); // Только путь к каждой пряжке
			cur_vhist.push(vh_rec); // Путь + время


			if (section_type=='zakaz') {
				// Только что созданный блок подкрашиваем в цвет секции (категории)
				$('div#wrap_cont_m3').last().find('div#block_a, div#block_b, div#block_d, div#block_e').css('background', '#9B9B9B');
				$('div#wrap_cont_m3').last().find('span#cat_name').eq(0).html('ПОД ЗАКАЗ');
///*
				// Замена картинки типа секции пряжки 
				// $('div#wrap_cont_m3').last().find('div#w_section_type').css('background', 'url(../img/common/catalog/basket/icon_3.png)')
				// $('div#wrap_cont_m3').last().find('div#w_section_type').css('background-size', '100%')
				$('div#wrap_cont_m3').last().find('div#w_section_type').css('background', 'url(../img/common/catalog/basket/icon_3.png)')
				$('div#wrap_cont_m3').last().find('div#w_section_type').css('background-size', '100%')
//*/
			}
			if (section_type=='super') {
				// Только что созданный блок подкрашиваем в цвет секции (категории)
				$('div#wrap_cont_m3').last().find('div#block_a, div#block_b, div#block_d, div#block_e').css('background', '#747474');
				$('div#wrap_cont_m3').last().find('span#cat_name').eq(0).html('СУПЕРЦЕНА');
///*
				// Замена картинки типа секции пряжки 
				$('div#wrap_cont_m3').last().find('div#w_section_type').css('background', 'url(../img/common/catalog/basket/icon_2.png)')
				$('div#wrap_cont_m3').last().find('div#w_section_type').css('background-size', '100%')
//*/
			}

		}
		// Скрываем значек корзины в контейнере пряжки
		$('div#block_d_basket').css('visibility', 'hidden');
	}

	/* Отладка: просмотр содержимого cur_vhist */
	// for (var i = 0; i < cur_vhist.length; i++) { $('.con2').append('cur_vhist > ' + cur_vhist[i] + "<br/>"); }

	/*
		История просмотров
		Теперь полученный массив надо сравнить с накопленным
	*/
	vhist_ls_str 		= localStorage.getItem('as_vhist_info');
	var vhist_hash 		= {};
	var new_vhist_arr	= []; // Для новых элементов истории
	var vhist_arr		= []; 
	if (vhist_ls_str=='') {
		// Массив истории пока пуст
		// вносим значения из полученного при загрузке

		localStorage.as_vhist_info = "";
		localStorage.as_vhist_info = cur_vhist.join(' ');
	}
	else {
		// Уже есть содержимое в переменной просмотров, поэтому
		// надо проверить нет ли у нас новой пряжки в наборе, которая еще не была в просмотре
		/*
			Пока история безусловная, только по уникальной пряжке. Далее надо будет вносить еще и 
			время добавления пряжки в пределах дня и проверять уникальность в пределах месяца... что-то такое
		*/

		/*
			Извлекаем историю и помещ. в массив для проверки
			UPD Теперь нужно извлекать с учетом формата
			Путькпряжке:время Путькпряжке:время Путькпряжке:время ...
		*/
		// vhist_arr = vhist_ls_str.split(' ');
		vhist_date_arr = vhist_ls_str.split(' '); // Массив значений Путькпряжке:время

		for (var i = 0; i < vhist_date_arr.length; i++) {
			cur_el = vhist_date_arr[i].split(':');
			vhist_arr.push(cur_el[0]); // В массив только путь к пряжке
			// $('.con2').append('$: ' + cur_el[0] + " " + cur_el[1] + "<br/>");
		}
		/*

		*/

		// for (var i = 0; i < vhist_arr.length; i++) { $('.con2').append('vhist_arr (ls) > ' + vhist_arr[i] + "<br/>"); }

			// Массив истории просмотров преобразуем в хеш
		var length = vhist_arr.length, element = null;
	    // $('.con2').append('Длина массива: ' + length + "<br/>");
		for (var i = 0; i < length; i++) {
			// element = arr[i]; // (!)
			element = vhist_arr[i];
			vhist_hash[element] = element; // Импортируем массив в хеш
		} 
		/*
			Ошибка! В хеш попадают совсем не те значения!
		var hsize = Object.size(vhist_hash);
		$('.con2').append('Размер хеша: ' + hsize + "<br/>");
	
		for(var k in vhist_hash) { $('.con2').append('%' + vhist_hash[k] + " ") }; $('.con2').append('<br/>'); // Проверка
		*/


		// Теперь нужно сравнить хеш истории и текущий массив просмотров
		// cur_vhist, совершая проход по его значениям			
		// var length = cur_vhist.length
		// $('.con2').append('Длина массива: ' + length + "<br/>");
		for (var i = 0; i < cur_vhist.length; i++) {
			// element = arr[i];
			/* 
				UPD Переделка сравения с учетом хранения информации о времени
			*/
			// element = cur_vhist[i];
			cur_el = cur_vhist[i].split(':');
			element = cur_el[0];
				// $('.con2').append('element: ' + element + "<br/>");
			// if (vhist_hash.hasOwnProperty(element)) {
			if (element in vhist_hash) {
				// $('.con2').append('Элемент ' + element + " есть в истории<br/>");
			}
			else {
				// $('.con2').append('Элемент ' + element + " еще не сохранен в истории<br/>");
				// Необходимо добавить такой элемент в историю просмотров
				// new_vhist_arr.push(element);
				new_vhist_arr.push(element + ':' + cur_el[1]); // Перепаковываем с меткой времени 
				// $('.con2').append('Новые элем.: ' + element + "<br/>");
			}
		} // for 
		
		/*
			UPD Эта ветвь должна исполняться только если new_vhist_arr
			содержит хотя бы один элемент
		*/
		// if (new_vhist_arr.length > 0) {
			// Обход массива текущего просмотра завершен, теперь нужно в ls сохранить
			// старые значения + новые
			/*
				На стеке есть статья на эту тему
				http://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript
				Но так как массивы у нас не содержать повторяющися элементов в виду проверки выше,
				то их можно просто слить
			*/
					// Добавлять не vhist_arr, кот. исп. для сравнения, а vhist_date_arr
			// var vhist_all_arr = vhist_arr.concat(new_vhist_arr);
			var vhist_all_arr = vhist_date_arr.concat(new_vhist_arr);

			for (var i = 0; i < vhist_all_arr.length; i++) {
				// $('.con2').append('vhist_all_arr > ' + vhist_all_arr[i] + "<br/>");
			};

			// Финальный штрих, вносим элементы в обратно в ls
			localStorage.as_vhist_info = "";
			localStorage.as_vhist_info = vhist_all_arr.join(' ');
		// } // if (new_vhist_arr.length > 0)
	} // Работа по обработке истории просмотров



    // for(var k in hash) { $('.con2').append('%' + hash[k] + " ") }; $('.con2').append('<br/>'); // Проверка
	
	// Активировать кнопки удаления пряжки из набора
	$('div#wrap_cont_m3').find('div#w_close').addClass('active');

	// Назначить обработчик для кнопки удаления из набора #w_close
	$('div#w_close').bind('click', function() {
		$('.con2').append("#w_close click<br/>");
		$(this).parent().parent().remove();

		// Определить имя элемента
		/*
			Теперь удаление не работает, т.к. изменился формат хеша - теперь там путь
			UPD Исправил, теперь работает
		*/
		// name = $(this).parent().parent().find('span#cat_name').eq(1).html();
		name = $(this).parent().parent().find('#block_c img').attr('src');
		$('.con2').append("name " + name + '<br/>'); 		

		// $('.con2').append('Имя текущего компонента: ' + name + "<br/>"); 

		// Кроме визуального удаления пряжки также необходимо удалить ее из набора
		delete hash[name];

		// $('.con2').append("> " + hashToStr(hash) + '<br/>'); 		

		// Их хеша в строку, а из строки обратно в ls
		localStorage.as_01 = "";
		localStorage.as_01 = hashToStr(hash);

		// Проверка корректности записи в ls
		a = localStorage.getItem('as_01');
		// $('body').append("ls> " + a + '<br/>'); 	
	}); // $('div#w_close').bind



	/*
		Нижний блок корзины
		Пока только макет
	*/
		// $('div#wrk_area').append('<div id="print_block"></div>');
/*
		$('div#wrk_area').append('<div id="bsk_A"></div>');
		$('div#wrk_area').append('<div id="bsk_B"></div>');
		$('div#bsk_B').append('<div id="bsk_zakaz_but"></div>');
		// $('div#wrk_area').append('<hr/>');
		$('div#wrk_area').append('<div id="bsk_C"></div>');

		$('div#bsk_C').append('<div id="bsk_hist_but"></div>');

		// Кнопка печати страницы
		$('div#bsk_A').append('<div id="bask_print_but"></div>');
		$('div#bsk_A').append('<span id="bsk_label">НА СТРАНИЦУ ПЕЧАТИ</span>');
		$('div#bsk_С').append('<span id="bsk_label2">ИСТОРИЯ ЗАКАЗОВ</span>');

		$('div#bask_print_but, span#bsk_label').bind('click', function() {
    		window.location = "basket-print.html"
  		});
*/
	/*
		Изменяем стиль отображения каждой пряжки, чтобы внедрить поле кол-ва
		block_e
	*/
	$('div#wrap_cont_m3').each(function () {
///*		// Коррекция под 960
		
		/*
			(!) Относительное смещение подписи пряжки к input левее. Замена на children
			результата не дает. А просто find на айпаде правит только первый элемент. Т.е.
			работает не с коллекцией, а лишь с одним элементом
		*/
		$(this).find('span#cat_name').eq(1).css('width', '100px');
		// $(this).children('span#cat_name').eq(1).css('width', '100px');



//*/
		// $(this).find('span#cat_name').eq(1).css('background', 'yellow');

		/*
			UPD iOS iPad делают проблему, создавая для кажого элемента корзины по куче инпутов.
			Все это происходит из-за find, который нужно заменять на children

		*/

		// $(this).find('div#block_e').append('<div id="num_sel"><input id="i_col" placeholder="1000" type="number" min="1" pattern="\\d{1,6}" autofocus="autofocus"></input></div>')
		$(this).children('div#block_e').append('<div id="num_sel"><input id="i_col" placeholder="1000" type="number" min="1" pattern="\\d{1,6}" autofocus="autofocus"></input></div>')
	});

	// Перевод фокуса на следующий элемент, если нажат RET
	$('input#i_col').keyup(function(e) {
	    if(e.which == 13) {
	        // alert('You pressed enter!');
	    	// $(this).next().focus();
	    	// a = $(this).parent().parent().parent().next().find('div#block_c img').attr('src'); // Указывает на след. блок
	    	a = $(this).parent().parent().parent().next().find('input#i_col').focus();
	    	// $('.con2').append("a " + a + '<br/>');
	    }		
	});


	/*
		(!)
		Раком становиться футер
		Корректировка против правил, только для этой страницы и на js. 
		Это хуйня и надо переделать шаблон страницы, отделить стили корзины в
		отдельный файл.
	*/
	$('div#footer').css('float', 'left');
	$('div#footer').css('width', '100%'); /* iPad это будет обрезать */


	/* 
		Тестирование кастомного скроллинга 
		UPD - Нихуя не работает
	*/
	// $('.scroller').baron();


	
	/*
		Работа с диалогами
	*/
	// $('body').draw_zakaz();
	
	// $('body').d1_zhist(); // Активация











	/*
		Формирование таблицы с заказанной пряжкой
	*/
	function table_to_send () {
	/*
		Считывание данных в корзине и формирование таблицы
	*/		
		// Проверка введенности данных в форме заказа, если нет - пишем об этом
		var cl_data = localStorage.getItem('as_client_info');
		

		if ((cl_data=='')||(cl_data==null)) {
			$('.con2').append('Нет данных о заказчике, печать невозможна!<br/>');
		}
		else {
			$('.con2').append('Формирование данных<br/>');


					/* Извлекаем информацию о клиенте из ls */
			cl_inf = cl_data.split('::');

			var r_fio   		= cl_inf[0] 			// ФИО или ТМ
			var r_region 		= cl_inf[1]			 	// Адрес (Город)
			var r_send_service 	= cl_inf[2] 			// Служба доставки
			var r_phone_recive	= cl_inf[3] 			// Телефон получателя
			var r_phone_cont	= cl_inf[4] 			// Телефон контактного лица

			now = new Date();

			// $('div#sec_page').append('<br/><h1>Сформированные данные</h1><br/>');
/*	
			$('div#sec_page').append('<h3>Заказ оформлен на сайте www.artstep.com.ua</h3>');
			$('div#sec_page').append('Заказчик: ' + r_fio + ' , ' + r_region + '<br/>');
			$('div#sec_page').append('Дата: ' + now + '<br/><br/>');
*/
			var zakaz_head = 	'<h3>Заказ оформлен на сайте www.artstep.com.ua</h3>' + 
								'Заказчик: ' + r_fio + ' , ' + r_region + '<br/>' +
								// 'Дата: ' + now + '<br/><br/>';
								'Дата: ' + now + '<br/>' + 
								// '<span id="hidID" style="visibility:visible;">id-001</span>' + 
								'<span id="hidID" >id-001</span>' + 
								'<br/>';
			/*
				Внедрить скрытое поле-идентификатор заказа?
				<span id="hidID" style="visibility:visible;">id-001</span>
			*/

			// $('.con2').append("zh:<br/> " + zakaz_head + '<br/>');

			var cnt 		 = 1; // Счетчик пряжки в заказе
/*			
			var nomenclature = 'i.FM-01496-08-04';
			var col_vo		 = 1000;
			// шт./тыс. пока не указываются
*/
			/*
				Перебираем пряжку в корзине и заносим ее в таблицу
			*/

			// Шапка таблицы
			// var table = '<table id="bask-print"> <tr> <td> <span id="rec" class="sp1">№ п/п</span> </td> <td> <span id="rec" class="sp1">Товар</span> </td> <td> <span id="rec" class="sp2">Кол-во</span> </td> </tr>';
			var table = zakaz_head + '<table id="bask-print"> <tr> <td> <span id="rec" class="sp1">№ п/п</span> </td> <td> <span id="rec" class="sp1">Товар</span> </td> <td> <span id="rec" class="sp2">Кол-во</span> </td> </tr>';
			// $('div#sec_page').append('<table id="bask-print"> <tr> <td> <span id="rec" class="sp1">№ п/п</span> </td> <td> <span id="rec" class="sp1">Товар</span> </td> <td> <span id="rec" class="sp2">Кол-во</span> </td> </tr>');

			$('div#wrap_cont_m3').each(function () {
				var nomenclature = $(this).find('span#cat_name').eq(1).html();
				// var col_vo 		 = $(this).find('div#num_sel').html();
				var col_vo 		 = $(this).find('div#num_sel input#i_col').val();

				// Если ячейка не менялась, то присваиваем значение по умолчанию
				// ax = typeof col_vo;
				// alert(ax);
				if (col_vo == '') col_vo = 1;
				// $('.con2').append("col_vo > " + col_vo + '<br/>');

				// Очередная строка таблицы
				// $('div#sec_page').append('<tr><td> <span id="rec" class="sp1">' + cnt + '</span></td><td><span id="rec" class="sp3">' + nomenclature + '</span></td><td><span id="rec" class="sp1">' + col_vo + '</span></td><td><span id="rec" class="sp1">шт.</span></td></tr>');
				table = table + '<tr><td> <span id="rec" class="sp1">' + cnt + '</span></td><td><span id="rec" class="sp3">' + nomenclature + '</span></td><td><span id="rec" class="sp1">' + col_vo + '</span></td><td><span id="rec" class="sp1">шт.</span></td></tr>';

				cnt++;
			});

			// Закрываем таблицу
			// $('div#sec_page').append('</table>');
			table = table + '</table>';
/*
			// Публикуем таблицу
			$('div#sec_page').append(table);
*/
			return table;
		} // else 
} // table_to_send






///*
	// Актуализация диалогов на ресайзе
	$(window).resize(function() {
		$.fn.d1_zhist_refresh();
		// $.fn.report_zakaz_refresh();
		$.fn.dial_zakaz_refresh();
	});
//*/




	/*
		Привязка событий к кнопкам
	*/
	/* Вернуться в каталог */
	$('div#bsk_back_but').bind('click', function() {
		/*
			Будет ли это работать аналогично возврату с инд. стр.?
		*/

		// Не айс
		// history.back(-1);


        tp = localStorage.getItem('as_var_type');
		localStorage.as_back_info = "";
		localStorage.as_back_info = tp;

		window.location="catalog2.html";
	});
	/* Оформить заказ */

/*
	e = jQuery.Event("keydown");
	// fake = $.extend({}, e, {which: 61, ctrlKey: true});
	fake = $.extend({}, e, {which: 116, ctrlKey: true});
*/	
	$('div#bsk_zakaz_but').bind('click', function() {
		// Вызов диалога заполнения данных по клиенту
///*
		$('body').draw_zakaz();
		$.fn.dial_zakaz_refresh();

//*/
		// $('body').trigger(fake);
		// $('body').transition({ scale: ($('body').css('scale')-0.3) });
		// $("DIV#bsk_zakaz_but").trigger(fake);
		// $("DIV#bsk_zakaz_but").trigger(fake);
	});
	/* Распечатать */
	$('div#bsk_print_but').bind('click', function() {

		// Формируем таблицу на основе пряжки в корзине
		localStorage.as_basket_table = "";
		localStorage.as_basket_table = table_to_send();
		// $('.con2').append("table > " + table_to_send() + '<br/>');

		table = localStorage.getItem('as_basket_table');

		$('.con2').append("table > " + table + '<br/>');


		window.location = "basket-print.html"
	});
	/* Отправить */


	/*
		Делаем кнопку отправить заказ белой, если данные не введены 
	*/
	// Проверка введенности данных в форме заказа, если нет - пишем об этом
	var cl_data = localStorage.getItem('as_client_info');
	
	if ((cl_data=='')||(cl_data==null)) {
		$('.con2').append('Нет данных о заказчике, печать невозможна!<br/>');
		
		$('div#bsk_send_but').find('span').css('color', 'white');
		$('div#bsk_send_but').bind('click', function() {
			alert('Сначала нужно оформить заказ!');
		});
	}

	else {
	$('div#bsk_send_but').bind('click', function() {
		// alert("Ваш заказ отправлен на почту ArtStep!");

			// Восстанавливаем цвет, если он таки установлен
			$('div#bsk_send_but').find('span').css('color', 'black');

		/*
			Отправка заказа на почту order@artstep.com.ua
			Импортировано из модуля aux_3.js
		*/

			url_ = '/cgi-bin/' + "mail_ex_2.pl";
			// url_ = '/cgi-bin/' + "mail_ex_3.pl"; // Отладка
			// a1 = "<html><head><title></title></head><body><table><tr><td>AAA</td><td>BBB</td><td>CCC</td></tr><tr><td>21</td><td>22</td><td>23</td></tr></table></body></html>";

			// Формирование строки с отчетом по заказу
			a1 = '<html><head><title></title></head><body>' + table_to_send() + '</body></html>';
			// a1 = mail_rep;

			dt = "username=" + "AAA" + "&password=" + a1 + "&note=" + "a2";
	        jQuery.ajax({
	          type: "POST", url: url_, data: dt,
	          success: function(data){
	          		
	          		/*
	          			В случае успешной отсылки заказа необходимо внести его в историю заказов
	          			UPD Пока просто формируем заглушку
	          		*/
///*	          	
					/*
						Алгоритм простой, но состоит из n-го числа шагов и я думаю, его можно 
						несколько обобщить для будущего использования
						Что-то типа add_el(separator, ls_var);
					*/
///*					
					now = new Date();	
  					$('.con2').append("История:<br/>");
	          		// Извлекаем историю
	          		var cl_zhist = localStorage.getItem('as_zhist_info');
  					$('.con2').append("d1: <cl_zhist> " + cl_zhist + '<br/>');
	          		// Разбираем
	          		cl_zhist_arr = cl_zhist.split('::');
  					$('.con2').append("d2: Считано элементов истории<cl_zhist_arr> " + cl_zhist_arr.length + '<br/>');
	          		// Добавляем новую запись в историю
	          		/*
	          			UPD Теперь нужно еще и сохранять таблицу сформированного заказа
	          			Формат now: 'Tue Nov 19 2013 17:27:44 GMT+0200'
	          		*/
	          		var tab = table_to_send();
	          		// cl_zhist_arr.push(now);
	          		cl_zhist_arr.push(now + "@:" + tab);

  					$('.con2').append("d3: Стало элементов истории<cl_zhist_arr> " + cl_zhist_arr.length + '<br/>');

	          		// Снова собираем в строку 
	          		cl_zhist = cl_zhist_arr.join('::');
  					$('.con2').append("d4: <cl_zhist> " + cl_zhist + '<br/>');
	          		// Вносим запись обратно в ls
	          		localStorage.as_zhist_info = "";
  					localStorage.as_zhist_info = cl_zhist;



//*/


//*/
	          		alert("Заказ отправлен!");
	          		// $('.con2').html("<h6>perl> " + data + '<br/></h6>');
	          		$('.con2').append("<h6> отчет> " + data + '<br/></h6>');
	     		}

/*
	     	,error: function(xhr, status, error) {
 				 var err = eval("(" + xhr.responseText + ")");
  					// alert(err.Message);
				}
*/
	        })



	});
}

	/* Очистить (корзину) */
	$('div#bsk_clear_but').bind('click', function() {
		$('div#wrap_cont_m3').remove();
		localStorage.as_01 = "";
	});
	/* История заказов */
	$('div#bsk_zhist_but').bind('click', function() {
		$('body').d1_zhist(); // Активация


	});
	/* История просмотров */
	$('div#bsk_vhist_but').bind('click', function() {
		/* Пока просто дублирует историю заказов */
		$('body').d1_vhist(); // Активация

	});

	/* Моя кабина */
	$('div#bsk_cabine_but').bind('click', function() {
		// $('div#wrap_cont_m3').remove();
		// localStorage.as_01 = "";
		window.location = "my_cabinet2.html";
	});


	/*
		Тестирование библиотеки momentum.js (дата/время)
	*/
/*	
	var halloween = moment([2011, 9, 31]); // October 31st
	moment.lang('ru');
	// console.log(halloween.fromNow());
	$('.con2').append("Время: " + halloween.fromNow() + '<br/>');
	// 16 дней назад

	var now = moment();
	moment.lang('ru');
	console.log(now.format('dddd, MMMM DD YYYY, h:mm:ss'));
	// вторник, ноябрь 15 2011, 3:31:03
	$('.con2').append("Время: " + now.format('dddd, MMMM DD YYYY, h:mm:ss') + '<br/>');
	$('.con2').append("Время: " + now.format('DD MM YY, hh:mm') + '<br/>');
	$('.con2').append("Время: " + now.format('DD MMM YY, hh:mm') + '<br/>');
	$('.con2').append("Время: " + now.format('DD MMMM YY, hh:mm') + '<br/>');
*/

// 1387212060 16-12-13 16_40
// 1387205119563
// 1387205119563

// 1387205119561
/*
	var day = moment(1387205119561);
	$('.con2').append("Время: " + day.format('DD MMM YY, hh:mm') + '<br/>');

*/

	// Перевод движка moment.js на русский язык
	moment.lang('ru');

	
	// Проверка содержимого истории заказов
/*
	var cl_zhist = localStorage.getItem('as_zhist_info');
	cl_zhist_arr = cl_zhist.split('::');
	
	$('.con2').append(">: " + cl_zhist_arr[0] + '<br/>');
	$('.con2').append(">: " + cl_zhist_arr[1] + '<br/>');
	$('.con2').append(">: " + cl_zhist_arr[2] + '<br/>');

	var cl_zhist = localStorage.getItem('as_zhist_info');
*/

	/*
		Эксперименты по библиотеке underscore.js
		Заменить самопальные определения? типа Object.size?
	*/
	a = _.size(hash); // Работает без вопросов...
	$('.con2').append("a>: " + a + '<br/>');

	// Повторить анонимную функцию n-раз
	_(5).times(function () {$('.con2').append("a>: " + a + '<br/>');})
	

	/*
		Новая придумка - кнопки истории в корзине не нужны - отключим пока
	*/
	$('#bsk_zhist_but, #bsk_vhist_but').css('visibility', 'hidden');


	
	// $('body').append('AVVVA<br/>');

	// e = jQuery.Event("keydown");
	// fake = $.extend({}, e, {which: 61, ctrlKey: true});
	// $("DIV#bsk_zakaz_but").trigger(fake);


});

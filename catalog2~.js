<!-- #!meta_prepros -->

/*
	Скрипт для нового движка по дизайну-960
	13_02_14
*/

/*
	Инициализация констант
*/

// 01_01 02_1V 03_7P 04_07 05_04 06_04K 08_S1 09_09 
// 10_S2 11_01V 12_271 13_80S 14_80 15_87S 16_87 
// 17_169 18_185 19_5021 20_24 21_103 
col_hash = {};
col_hash['01'] = '01_01';
col_hash['1V'] = '02_1V';
col_hash['7P'] = '03_7P';
col_hash['07'] = '04_07';
col_hash['04'] = '05_04';

col_hash['04K'] = '06_04K';
col_hash['S1'] = '08_S1';
col_hash['09'] = '09_09';
col_hash['S2'] = '10_S2';
col_hash['01V'] = '11_01V';

col_hash['271'] = '12_271';
col_hash['80S'] = '13_80S';
col_hash['80'] = '14_80';
col_hash['87S'] = '15_87S';
col_hash['87'] = '16_87';

col_hash['169'] = '17_169';
col_hash['185'] = '18_185';
col_hash['5021'] = '19_5021';
col_hash['24'] = '20_24';
col_hash['103'] = '21_103';
// col_hash['xx'] = 'xx';
col_hash['xx'] = '03_7P';
col_hash['06'] = '22_06';
col_hash['08'] = '23_08';


// Объявление констант
var IS_CON = "1"; // Вывод в консоль = true


// Объявление глобальных переменных
var ajax_data 				= null; // Глобальная переменная для хранения результата запроса ajax к серверу
var pryajka_type  			= "rabochaya"; // Тип пряжки, который задается в палитре типов фурнитуры
var pryajka_color 			= "04"		 // По умолчанию черный

var filter_chain 			= ""; // Список фильтра


filter_chain = pryajka_type + '_' + 'xx' + '_' + pryajka_color;

var is_dial_zakaz_palitra   = 0; // Существует ли в диалоге заказ палитра?
var dial_zakaz_pos_top		= 0; // Сохранение текущей координаты top для анимации перемещения диалога



// Предварительная инициализация и опрос локалстораджа на предмет существования переменной 
// для отработки логики возврата с индивидуальной страницы
// localStorage.as_back_info = "";

// var sideBar = localStorage.getItem('Sidebar');
var isBack = localStorage.getItem('as_back_info');
// if (typeof sideBar !== 'undefined' && sideBar !== null) {
if (typeof isBack == 'undefined' || isBack == null) { 			// && isBack !== null) {
	// alert('sideBar is undef');
	localStorage.as_back_info = "";
	// alert(1);
}
else {
	// alert(2);
	// alert('Correct, isBack defined');
	// localStorage.Sidebar = "";
}


var b_col = localStorage.getItem('as_back_col');

// alert(b_col);
if (typeof b_col == 'undefined') { 			// && isBack !== null) {
	// alert('sideBar is undef');
	localStorage.as_back_col = "";
	// alert(1);
}
else {
	// alert('Correct, isBack defined');
	// localStorage.Sidebar = "";
	// alert(2);
}

var ls_var = '';
/* Иниц. переменной для интеркоммуникации с индивидуальной страницей */
ls_var = localStorage.getItem('as_hist'); // Информация о переходе
if (typeof ls_var == 'undefined' || ls_var == null) { localStorage.as_hist = ""; }

/* Переменная для хран. состояния меню - начальное, открыто литье, откр. штамп. */
ls_var = localStorage.getItem('as_menu_state'); // Информация о сост.
if (typeof ls_var == 'undefined' || ls_var == null) { localStorage.as_menu_state = "initial_state"; }

/* Переменная для хран. данных о клиенте */
ls_var = localStorage.getItem('as_client_info'); // Информация о клиенте
if (typeof ls_var == 'undefined' || ls_var == null) { localStorage.as_client_info = ""; }

/* Идентификатор клиента, reserved */
ls_var = localStorage.getItem('as_id');
if (typeof ls_var == 'undefined' || ls_var == null) { localStorage.as_id = ""; }

/* Новая переменная, для работы диалога "Подробнее" */
ls_var = localStorage.getItem('as_var_selected_prjagka');
if (typeof ls_var == 'undefined' || ls_var == null) { 
		// localStorage.as_var_selected_prjagka = ""; 
		// Значение при инициализации переменной (по умолчанию) для диалога "Подробнее"
		localStorage.as_var_selected_prjagka = ""; 
		localStorage.as_var_selected_prjagka = "i.FM-01496-08-1V;rabochaya;01496;08;1V"; 
}

/* Опции */
/*
	Пока для исключения работы подсказок
*/
ls_var = localStorage.getItem('as_options');
if (typeof ls_var == 'undefined' || ls_var == null) { localStorage.as_options = ""; }

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
/*
	Преобразование содержимого хеша в строку
*/
function hashToStr(hash)
{
    var arr = [];
    for (var key in hash) { arr.push(hash[key]); }
    str = arr.join(" ");
    return str;
}	


// $(document).on("click",function(){
//     alert('I am jQuery version: '+$.fn.jquery);
// });

// Глобальные переменные 
var portions = 0; // Кол-во порций для текущего типа пряжки
var cur_portion = 0; // Счетчик текущей порции


$(document).ready(function(){
// [fold~ 4wfR]
	
	// $('body').prepend(col_hash['7P'] + '<br/>');
	// $('body').prepend('jjj<br/>');

	$('body').append('<div class="con2"></div>');
	// Вспомогательная
	$('body').append('<div class="con3"></div>');

/* This way will allow scrollable elements while still preventing the overscroll in the browser itself */
/*
// На айпаде этот кусок запрещает какие-либо скроллинги вообще, приложение становится статичным
$(function() {
    document.addEventListener("touchmove", function(e){ e.preventDefault(); }, false);
});

*/



//uses document because document will be topmost level in bubbling
/*
$(document).on('touchmove', function(e){
  e.preventDefault();
});

//uses body because jquery on events are called off of the element they are
//added to, so bubbling would not work if we used document instead.

// $('body').on('touchstart','.scrollable', function(e) {
$('#long_block').on('touchstart','.scrollable', function(e) {
  if (e.currentTarget.scrollTop === 0) {
    e.currentTarget.scrollTop = 1;
  } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
    e.currentTarget.scrollTop -= 1;
  }
});

//prevents preventDefault from being called on document if it sees a scrollable div

// $('body').on('touchmove','.scrollable',function(e) {
$('#long_block').on('touchmove','.scrollable',function(e) {
  e.stopPropagation();
});

*/

/*
	Переопределение событий для iOS меняет стиль отображения для iPad-a, 
	страница масштабируется по-другому

	Тем секциям, которые должны двигаться нужно присвоить класс scrollable
	<div id="div_ic_block_A" class="scrollable">
*/

// Disable overscroll / viewport moving on everything but scrollable divs
 $('body').on('touchmove', function (e) {
         if (!$('.scrollable').has($(e.target)).length) e.preventDefault();
 });

	/*
		Секция инициализации переменных ls
	*/
	// Для диалога подробнее
	localStorage.as_var_selected_prjagka = "";
	localStorage.as_var_selected_prjagka = "i.FM-01496-08-1V;rabochaya;01496;08;1V";



/*
	$('head').append('<style>.key_1 {background: none repeat scroll 0 0 #CCeeff;border: 1px dashed #999999;font-family: "courier new";overflow: hidden;padding: 5px 10px;white-space: nowrap;width: 70px; height: auto; margin-bottom: 2px;position: fixed; left: 15px; top: 50px;}</style>');
	$('head').append('<style>.key_1:hover {background: none repeat scroll 0 0 #AAACCC;border: 1px dashed #999999;font-family: "courier new";overflow: hidden;padding: 5px 10px;white-space: nowrap;width: 70px; height: auto; margin-bottom: 2px;position: fixed;}</style>');
	$('body').append('<div class="key_1" flag="">key_1</div>');

// Определение событий
	$('.key_1').bind( 'click', key_1_clk);
*/


	function key_1_clk () {
		$('.con2').html('');
		$('.con2').append('key_1_click()<br/>');


		$('div#frame').each(function (i, el) {
/*			
			a = $(this).find('#wrap_cont_m3').size();
			if (a == 0) {$(this).remove();}
			$('.con2').append(a + '<br/>');
*/

			// a = $(el).find('#wrap_cont_m3').size();
			// if (a == 0) {$(el).remove();}
			// $('.con2').append(i + '<br/>');
			
			$('.con2').append(i + " " + $(this).attr('class') + " ");

			// Работает для десктопа
			$('.con2').append($(this).find('#wrap_cont_m3').size() + '<br/>');

			// Работает для десктопа и айпада
			$('.con2').append($(this).children('#wrap_cont_m3').size() + '<br/>');

		});

	}

/* Функция выясняет в каком браузере запущен сайт */
function browser()
{	
	// [fold~JcGH]
}

	// Инициализация корзины

	localStorage.as_var_3 = "0"; // Переменная в котрой хранится информация о кол-ве заказанных пряжек






	/*
		Модифицированная кнопка вверх
	*/
		//  div#sideLeft
		//  div#box_a1 
		//  div#pan_a
	// jQuery('div#box_a1').append('<div class="button-up" style="display: none;opacity: 1.0;width: 55px; margin-left: -50px; /* height:100%;*/ position: fixed; top: 500px; /* left: 10px; top: 500px; border-radius: 15px;*/ cursor: pointer;text-align: center;line-height: 30px;color: #black;font-weight: bold; font-size: 16pt;"><img src="img/common/up_cat.png"/></div>');
			//div#box_a1
	jQuery('div#box_a3').append('<div class="button-up"><img src="img/common/up_cat.png"/></div>');
	
	jQuery (window).scroll (function () {
	if (jQuery (this).scrollTop () > 400) {
	jQuery ('.button-up').fadeIn();
	} else {
	jQuery ('.button-up').fadeOut();
	}
	});

	jQuery('.button-up').click(function(){
	jQuery('body,html').animate({
	scrollTop: 0
	}, 800);
	return false;
	});

	jQuery('.button-up').hover(function() {
	jQuery(this).animate({
	'opacity':'1',
	// }).css({'background-color':'#e7ebf0','color':'#6a86a4'}); // Полупрозрачный блок
	}).css({'color':'#6a86a4'});
	}, function(){
	jQuery(this).animate({
	// 'opacity':'1'
	'opacity':'0.7'
	// }).css({'background':'none','color':'#d3dbe4'});;
	}).css({'color':'#d3dbe4'});;
	});





/*
	ВОЗВРАТ
*/


/*
	Обработка возвратов с индивидуальной страницы
	UPD
		На самом деле это более важный фрагмент кода, чем казалось ранее. 
		Возврат - это отдельное событие, отличное от перезагрузки страницы
		isBack - переменная ls as_back_info, которая задатся на инд. стр. 
		в случае нажатия клавиши "назад" в браузере
*/

/*
	if (isBack !== null) {
		alert('isBack: ' + isBack);
	}
	else {
		alert('isBack empty');
	}

*/

	// alert('isBack: ""' + isBack);
	/* Ветка, которая определят как мы попали в каталог - по F5 или возвратом с индивидуальной страницы */
	if (isBack == "") {
		// alert('isBack: ""' + isBack);
		/* 
			Инициализация сайта, возврата не было
		*/
		
		cat_1_click_first(); // Загружаем первый лист пряжки

		/*
			Записываем состояние меню - начальное
			хотя так не верно..
		*/


///*		
		localStorage.as_menu_state = "";
		localStorage.as_menu_state = "initial_state";

		var mstate = localStorage.getItem('as_menu_state');
		$('.con2').append('"state" : ' + mstate +  '<br/>');

//*/
	}
	else
	// if (isBack !== "") // Если с индивидуальной страницы передана переменная возврата, то загрузить нужную пряжку
	{
		// alert('isBack val: ' + isBack);	

		clear_cat(); // Очистка таблицы перед загрузкой

		// $('#film').remove(); // $('#sblock').remove();
		// $("table#tbl_cat tr").remove();
		// $('img#button_foot').css("visibility","hidden"); // Запрещаем кнопку показать еще


		// (!) Засада - нужно дополнительно сохранять состояние селектора палитры...
		// И имя категории
		
/*		
		// Похоже этот фрагмент вызывает сдвиг подсказки
		// Сброс маркера цвета в палитре
		// Не, не он, но будем грузить цвет по новому
		$('div#side_color_sel img').remove(); 
*/

		// $("table#tbl_cat tr").remove();
		$('#film').remove(); // $('#sblock').remove();
		// $("table#tbl_cat").remove();
		// $('img#button_foot').remove();




		// decor kolca peretyagki holnitenu blochka krjuchki
		pryajka_type = isBack; // Устанавливаем тип выбранной пряжки

///*		
		// И этот хак вызывает глюк - сдвиг hint1
		// $('div#side_cat_name').html(''); // (!) Блин, очередной хак

		
		/*
			Вообще-то тут надо написать полноценную функцию по преобразованию 
			типа пряжки в русское название. Тип пряжки должен считываться только из БД, 
			чтобы в дальнейшем можно было править только одно место
		*/

		// if 

		// $('.con2').append('тип пряжки : _' + pryajka_type +  '_<br/>');

		// rabochaya // [fold~ t8P8]

		if (pryajka_type == 'rabochaya') 	var 	tname = 'Рабочая';
		if (pryajka_type == 'peretyagki') 			tname = 'Перетяжки';
		if (pryajka_type == 'decor')	 			tname = 'Декор';
		if (pryajka_type == 'holnitenu')	 		tname = 'Хольнитены';
		if (pryajka_type == 'blochka')	 			tname = 'Блочки';
		if (pryajka_type == 'kolca')	 			tname = 'Кольца';
		if (pryajka_type == 'krjuchki')	 			tname = 'Крючки';
		if (pryajka_type == 'petli')	 			tname = 'Петли';
		if (pryajka_type == 'podsnurovki')	 		tname = 'Подшнуровки';
		if (pryajka_type == 'rabochaya-sh')	 		tname = 'Рабочая';
		if (pryajka_type == 'peretyagki-decor')		tname = 'Декоративные перетяжки';
		if (pryajka_type == 'peretyagki-mokasin')	tname = 'Мокасиновые перетяжки';
		if (pryajka_type == 'nakonechniki')			tname = 'Наконечники';



		$('div#side_cat_name').html(tname);	// Восстанавливаем имя категории
//*/		
		// ToDo
			// - Добавить возврат по цвету


		b_col = localStorage.getItem('as_back_col');
		$('.con2').append('Возврат : _' + b_col +  '_<br/>');



///*		
		

		if (b_col=='01')	 p_col = '01_01';
		if (b_col=='1V')	 p_col = '02_1V';
		if (b_col=='7P') 	 {
			$('.con2').append('ветка 0<br/>');
			p_col = '03_7P';
		}
		if (b_col=='04') 	 p_col = '05_04';
		if (b_col=='04K') 	 p_col = '06_04K';

		if (b_col=='S1') 	 p_col = '08_S1';
		if (b_col=='09') 	 p_col = '09_09';
		if (b_col=='S2') 	 p_col = '10_S2';
		if (b_col=='01V') 	 p_col = '11_01V';
		if (b_col=='271') 	 p_col = '12_271';

		if (b_col=='80S') 	 p_col = '13_80S';
		if (b_col=='80') 	 p_col = '14_80';
		if (b_col=='87S') 	 p_col = '15_87S';
		if (b_col=='87') 	 p_col = '16_87';
		if (b_col=='169') 	 p_col = '17_169';

		if (b_col=='185') 	 p_col = '18_185';
		if (b_col=='5021') 	 p_col = '19_5021';
		if (b_col=='24') 	 p_col = '20_24';
		if (b_col=='103') 	 p_col = '21_103';

		// alert(typeof b_col);
		// alert('bcol ' + b_col);

		if (b_col == '' || b_col==null) {
			$('.con2').append('ветка 1<br/>');
			b_col = "04"; p_col = "05_04";
		}

		// Сука, заебала эта переменная .)
		/*
			Обраружил ошибку, вместо p_col - pcol
			if (typeof pcol === 'undefined') {

			Все заработало
		*/
		if (typeof p_col === 'undefined') {
			$('.con2').append('ветка 2<br/>');
    		// variable is undefined
			b_col = "04"; p_col = "05_04";
		}


		$('.con2').append('pcol : ' + p_col +  '<br/>');
		// // if (b_col== defined &&p_col==defined) {
		// }
		// else {
		// }
	

		/*
			Очередной прикол с hint1 сдвигается на 12-15 пикселей вверх при возврате с инд. станицы
			Почему не ясно. Правим вручную
		*/
		// $('div#hint1').css('top', "-100px");

		var tsrc = 'img/palitra/' + p_col +'.png';
		$('div#side_color_sel').find('img').attr('src', tsrc);
		// $('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' + p_col +'.png"></img>');
		
		// $('div#side_color_sel span').html('<b>' + pryajka_color + '</b>');
		$('div#side_color_sel span').html(b_col);

//*/

		a1 = pryajka_type + "_xx_" + b_col;


		// alert(a1);

		// a1 = "rabochaya_08-10-12_xx"; a2 = "";	dest = $('table#tbl_cat');
		// a1 = "rabochaya_xx_xx"; 


		scroll = localStorage.getItem('as_back_scroll');

		// Окончание обработки кнопки "Назад"
		localStorage.as_back_info 	= "";
		localStorage.as_back_col 	= "";
		// localStorage.as_back_scroll = "";

		/*
			Обработка состояния меню
		*/						
		mstate = localStorage.getItem('as_menu_state');
		$('.con2').append('"state" : ' + mstate +  '<br/>');

		/*
			Утерян фрагмент, который отвечал за корректное сохранение состояния меню. 
			Повторное проектирование
			Здесь был кусок, который в зависимости от типа as_menu_state отрисовывал нужное состояние меню
		*/

		if (mstate=='opened_lit_e') {
			$('.con2').append(' Восстановление литья<br/>');

		$( "#mount_1" ).css('background','url(../img/backp_2.png) repeat'); // Установить у подложки фон, чтобы она была видна при анимации
		// $( "#menu_wrap" ).css('height', '750px'); // Чтобы отъехал каталог с пряжкой				
		// $( "#menu_wrap" ).css('height', '750px'); // Чтобы отъехал каталог с пряжкой				
		$( "#menu_wrap" ).css('height', '481px'); // Чтобы отъехал каталог с пряжкой				
		$( "#mount_2" ).remove();
		// $( "#mount_1" ).css('height', '700px');
		$( "#mount_1" ).css('height', '449px');
		// $( "#mount_1" ).css('width', '1000px');		
		$( "#mount_1" ).css('width', '640px');		


		$( "#mount_1" ).html('<div id="cat_menu_lit"><div id="menu_lit_e"><div id="m_1"><div id="zag_lit"><img id="lit" src="img/l.png"><p id="p_12">ЛИТЬЕ</p></div></div><div id="m_2"><div id="m_block"><div id="menuitem_1" class="m_pic"></div><div class="b-cat-title2">РАБОЧАЯ</div></div> <div id="m_block"><div id="menuitem_2" class="m_pic"></div><div class="b-cat-title2">ДЕКОР</div></div> <div id="m_block"><div id="menuitem_3" class="m_pic"></div><div class="b-cat-title2">КОЛЬЦА</div></div> <div id="m_block"><div id="menuitem_4" class="m_pic"></div><div class="b-cat-title2">ПЕРЕТЯЖКИ</div></div> <div id="m_block"><div id="menuitem_5" class="m_pic"></div><div class="b-cat-title2">ДЕКОРАТИВНЫЕ ПЕРЕТЯЖКИ</div></div>  <div id="m_block"><div id="menuitem_6" class="m_pic"></div><div class="b-cat-title2">БЛОЧКИ</div></div> <div id="m_block"><div id="menuitem_7" class="m_pic"></div><div class="b-cat-title2">ПЕТЛИ</div></div> <div id="m_block"><div id="menuitem_8" class="m_pic"></div><div class="b-cat-title2">КРЮЧКИ</div></div> <div id="m_block"><div id="menuitem_9" class="m_pic"></div><div class="b-cat-title2">ХОЛЬНИТЕНЫ</div></div> <div id="m_block"><div id="menuitem_10" class="m_pic"></div><div class="b-cat-title2">КНОПКИ</div></div>  <div id="m_block"><div id="menuitem_11" class="m_pic"></div><div class="b-cat-title2">МОКАСИНОВЫЕ ПЕРЕТЯЖКИ</div></div> <div id="m_block"><div id="menuitem_12" class="m_pic"></div><div class="b-cat-title2">ПОДШНУРОВКИ</div></div> <div id="m_block"><div id="menuitem_13" class="m_pic"></div><div class="b-cat-title2">БРЕНДЫ</div></div> <div id="m_block"><div id="menuitem_14" class="m_pic"></div><div class="b-cat-title2">НАКОНЕЧНИКИ</div></div> <div id="m_block"><div id="menuitem_15" class="m_pic"></div><div class="b-cat-title2">РАЗНОЕ</div></div></div></div><div id="anilink_1"> <img src="img/anilink_1.png" alt="" /></div></div>');


		bind_lit_e(); // Привязка событий к меню "Литье"
		
		$('#anilink_1').bind('click', function() { $('#mount_1').hide().fadeOut(250, show_toggle_menu_1);});
		} // Восстановление литья

		if (mstate=='opened_sht') {
			$('.con2').append(' Восстановление штамповки<br/>');
		
		/*
			??? Разворачивание меню сразу после инициализации сайта при возврате 
		*/


		$( "#mount_2" ).css('background','url(../img/backp_2.png) repeat');
		// $( "#menu_wrap" ).css('height', '550px'); // Чтобы отъехал каталог с пряжкой				
		$( "#menu_wrap" ).css('height', '352px'); // Чтобы отъехал каталог с пряжкой				
		$( "#mount_1" ).remove();		
		// $( "#mount_2" ).css('height','500px');
		$( "#mount_2" ).css('height','320px');
		// $( "#mount_2" ).css('width','1000px');
		$( "#mount_2" ).css('width','650px');


		$( "#mount_2" ).html('<div id="cat_menu_sht"> <div id="menu_sht"> <div id="m_1"> <div id="zag_lit"> <img id="lit" src="img/sh.png"> <p id="p_12">ШТАМПОВКА</p> </div> </div> <div id="m_2"> <div id="m_block"> <div id="menuitem_1_sh" class="m_pic"> </div> <div class="b-cat-title2">РАБОЧАЯ</div> </div> <div id="m_block"> <div id="menuitem_2_sh" class="m_pic"> </div><div class="b-cat-title2">ДЕКОР</div> </div> <div id="m_block"><div id="menuitem_3_sh" class="m_pic"> </div> <div class="b-cat-title2">ЛЮВЕРСЫ</div> </div> <div id="m_block"> <div id="menuitem_4_sh" class="m_pic"></div><div class="b-cat-title2">ХОЛЬНИТЕН</div> </div> <div id="m_block"><div id="menuitem_5_sh" class="m_pic"></div> <div class="b-cat-title2">БЛОЧКА</div> </div> <div id="m_block"> <div id="menuitem_6_sh" class="m_pic"> </div> <div class="b-cat-title2">ПЕТЛИ</div> </div> <div id="m_block"> <div id="menuitem_7_sh" class="m_pic"> </div><div class="b-cat-title2">КРЮЧКИ</div> </div> <div id="m_block"><div id="menuitem_8_sh" class="m_pic"> </div> <div class="b-cat-title2">ПЕРЕТЯЖКИ</div> </div> <div id="m_block"> <div id="menuitem_9_sh" class="m_pic"></div><div class="b-cat-title2">РАЗНОЕ</div> </div> </div> </div> <div id="anilink_2"> <img src="img/anilink_2.png" alt="" /></div> </div>');

		$('#anilink_2').bind('click', function() { $('#mount_2').hide().fadeOut(300, show_toggle_menu_2);});

		// (#!_check) Унифицировать и не дублировать код по сто раз
			// Дефолтная загрузка
		/* 
			(!) Ошибка какая-то?! Тут же должна быть по кнопке анилинк-2 загрузка наоборот, литья?
		*/		


/*		
		clear_cat(); 
		$('#film').remove(); 
		// $("table#tbl_cat tr").remove(); $('img#button_foot').remove();
		pryajka_type = "rabochaya_sh"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Штамповка');	
		a1 = "rabochaya-sh_xx_xx"; a2 = "";	dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);
*/

		/*
			Все верно, вверху была ошибочная загрузка, теперь работает корректно
		*/

			// Грузим то же, что и по умолчанию в литье
			clear_cat(); // Очистка таблицы перед загрузкой

			$('#film').remove(); // $('#sblock').remove();
// [fold~ YiM0]
			/*
				Правка цвета по умолчанию на 7P, для отображения на F5 двух цветов, 7P и 01V
			*/
			$('div#side_color_sel img').remove(); 
			$('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '03_7P' +'.png"></img>');
			$('div#side_color_sel span').html('7P');


			// decor kolca peretyagki holnitenu blochka krjuchki
			pryajka_type = "rabochaya"; // Устанавливаем тип выбранной пряжки
			$('div#side_cat_name').html('Рабочая');

			// $('body').append('анилинк-2 click<br/>');
		
			// a1 = "rabochaya_08-10-12_xx"; a2 = "";	dest = $('table#tbl_cat');
			// a1 = "rabochaya_xx_xx"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');
///*			
			// a1 = "rabochaya_xx_7P"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');

			/* Будет два цвета, как при инициализации */
			a1 = "rabochaya_xx_xx"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');

			ajax4("load_uni.pl", a1, a2, dest);
//*/





		// $('html, body').animate({scrollTop: 600}, 800); // К каталогу

		/* Это уже третий раз! */
		// $('html, body').animate({scrollTop: 600}, 400); // К каталогу
		// $('html, body').animate({scrollTop: 138}, 400); // К каталогу
		// $('body').prepend('sh_load()<br/>');

/*
		// Экспериментальная загрузка штампованной рабочей пряжки
// [fold~ UDgg]
*/





		} // Восстановление штамповки

		a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');
		ajax4("load_uni.pl", a1, a2, dest);
	}



/*
	КОНЕЦ ВОЗВРАТА
*/

// AJAX

	/*
		Похоже это место, где происходит биндинг реакции на нажатие клавиши
		на контейнере пряжки в каталоге
	*/

	function bind_content (a_obj) {
// [fold~ ixMq]
			$(a_obj).bind( 'mouseover', container_mouseover);
			$(a_obj).bind( 'mouseout', container_mouseout);
			$(a_obj).bind( 'click', container_click);

			function container_mouseover () { $("#more", this).css("visibility","visible"); }
			function container_mouseout ()  { $("#more", this).css("visibility","hidden"); }

			function container_click () {

				// $('body').prepend('click<br/>');
// [fold~ Ggj2]
				/*
					Что-то этот фрагмент кода перестал корректно работать...
				*/
// [fold~ 8D5D]
					el = $(this).attr('id'); // Номенклатура выбранной пряжки
					$('.con2').append('"el" : ' + el +  '<br/>');

					/* Название текущей секции - regular, zakaz, super */
					el1 = $(this).parent().find('span').eq(0).text(); // Название секции, тока по-русски (В НАЛИЧИИ, ...)
					$('.con2').append('"el1" : ' + el1 +  '<br/>');
					
					/* Путь к изображению пряжки */
					src = $(this).find('img').attr('src'); // 
					$('.con2').append('"src" : ' + src +  '<br/>');

					/* Номенклатура */
					el  = $(this).parent().find('span').eq(1).text(); // Номенклатура выбранной пряжки

				$('.con2').append('"el" : ' + el +  '<br/>');
					s_arr = el.split('-'); // s_arr[3] = цвет

				localStorage.as_back_col = "";
				localStorage.as_back_col = s_arr[3];
// [fold~ tOr1]
				localStorage.as_var_2 = "";
// [fold~ HiiO]
				localStorage.as_var_2 = '<div id="wrap_cont_m3">' + $(this).parent().html() + '</div>';

				localStorage.as_var_type = pryajka_type;

				// Сохраняем позицию проктутки для последующего возврата в эту позицию
				localStorage.as_back_scroll = "";
				
				$('.con2').html('');

				var s = window.pageYOffset;
// [fold~ O9vT]
				localStorage.as_back_scroll = $(document).scrollTop();
// [fold~ DQyF]
				$('.con').append('localStorage: ' + localStorage.getItem('as_var_2') +'<br/>');

				// a = $(this).parent().parent().find('div#hs img#ico').attr('src');
/*				
				a = $(this).parent().parent().parent().find('div#hs img#ico').attr('src');
				
				b_id = $(this).parent().parent().attr('id');
				b_cl = $(this).parent().parent().attr('class');

				$('.con2').prepend('b_id > ' + b_id + ' b_cl > ' + b_cl + '<br/>');
// [fold~ 0rs3]

				$('.con2').prepend('a > ' + a + '<br/>');
*/
				/*
					UPD Старое определение типа теперь через отдельную переменную
					внутри кода, а не через ls

					(!) Уже не работает, что-то изменилось в верстке и фрагмент по которому 
					шло определение отсутствует. Но зато у фреймов теперь есть классы
				*/
				var as_section_type = $(this).parent().parent().attr('class');;

/*
				if (/instock/m.test(a)) {
					// $('body').prepend('Наша пряжка' +'<br/>');
					$('.con2').prepend('Наша пряжка' +'<br/>');
					localStorage.as_section_type = "";
					localStorage.as_section_type = 'regular';
					// alert(localStorage.getItem('as_section_type'));

					as_section_type = 'regular';
				} 

				if (/ico_zakaz\.png/m.test(a)) {
					// $('body').prepend('Под заказ' +'<br/>');
					$('.con2').prepend('Под заказ' +'<br/>');
					localStorage.as_section_type = "";
					localStorage.as_section_type = 'zakaz';
					// alert(localStorage.getItem('as_section_type'));

					as_section_type = 'zakaz';
				} 

				if (/ico_zakaz_price\.png/m.test(a)) {
					// $('body').prepend('Суперцена' +'<br/>');
					$('.con2').prepend('Суперцена' +'<br/>');
					localStorage.as_section_type = "";
					localStorage.as_section_type = 'super';
					// alert(localStorage.getItem('as_section_type'));

					as_section_type = 'super';
				} 
*/				
// [fold~ MCVo]

				localStorage.as_hist = "";
				// localStorage.as_hist = 'as_hist_def_value';
				/*
					Формируем список информации, которую надо передать на следующую страницу
					1 	- Страница, с которой совершен переход
					2 	- Глобальное имя категории меню, которое было запущено (литье/штамповка)
					2.1 - В каком состоянии находится меню - ф5, открыто литье, открыта штамповка
						- Имя выбранной пряжки
						- Полное имя пряжки (el (из спана), хотя оно тоже может быть усеченным)
						- Высчитать scr img - чтобы было проще показывать картинку
						- Зарезервированная поле - какая-то дополнительная информация ('reserved')
					3 	- Тип выбранной пряжки
					4 	- Цвет в котором отображается пряжка
					5 	- Смещение экрана

					6 	- Предыдущее значение истории (перенести в отдельную переменную?)
				*/
															// i.FM 	   -	0551             08               1V
				// localStorage.as_hist = 'catalog:' + 'lit-e:' + s_arr[0] + '-' + s_arr[1] + ':' + s_arr[2] + ':' + s_arr[3];
				localStorage.as_hist = 'catalog:' + 'lit-e:' + el + ':' + src + ':' + s_arr[0] + '-' + s_arr[1] + ':' + s_arr[2] + ':' + s_arr[3];
				
				
				// $('.con2').append('"src" : ' + src +  '<br/>');

				// Терерь этот переход уже не нужен
				// window.location="page_d1.html";


				/*
					Точка прявязки поведения для каждой пряжки каталога

				*/
				$('.con2').append('"src" : ' + src +  '<br/>');

// [fold~ Bs5T]


				/* 
					Новый вариант для отображения отдельной пряжки
					Просто меняем пока картинку в детализации

					1 Вносим данные в ls, которые затем будут использоваться при построении 
					диалога "Подробнее"
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
				// full               type        nom      size    col
				// i.FM-01496-08-1V ; rabochaya ; 01496  ;  08  ;  1V
				a = a + ";" + pryajka_type + ";" + b[1] + ";" + b[2] + ";" + b[3];


				// $('.con2').append('"LAST" : ' + a[a.length - 1] +  '<br/>');
				$('.con2').append('"LAST" : ' + a +  '<br/>');

				// Переопределям инф. о пряжке в ls для посл. чтения диалогом "Подробнее"
				localStorage.as_var_selected_prjagka = "";
				localStorage.as_var_selected_prjagka = a;
				


			  	if ((pryajka_type == 'rabochaya')&&(as_section_type == 'regular')) {	

			  		$('.con2').append('Рабочая' + '<br/>');
			  		$('.con2').append('Секция: ' + as_section_type + '<br/>');


			  		//  0   1   2 ...
			  		 // img/cat/rabochaya/i.FM-01481-08-1V.png
			  		 // Для переделка на большую пряжку нужно заменить cat на cat_large

			  		 /* 
			  		 	Нужон апдейтик, если здесь нет большой фотографии пряжки, пусть остается старая
			  		 	Как проверить?

			  		 	(!)UPD Что это ветка не работает?
			  		 */
			  		 /* Проверка, существует ли файл с изо 360х360 */

					// The "callback" argument is called with either true or false
					// depending on whether the image at "url" exists or not.

///*
					large_src_arr = src.split('/');
					large_src_arr[1] = 'cat_large';
					large_src = large_src_arr.join('/');
					$('.con2').append('src' + large_src + '<br/>');
//*/

					src = large_src;	
					// $('#pr_block_c img').attr('src', src);
		  		}
		  		// else {
		  		// 	$('#pr_block_c img').attr('src', src);
		  		// }

		  		$('#pr_block_c img').attr('src', src);

			}
	}


	a = localStorage.getItem('asVar_first_visit_');
	if (a==null) {
		//$('body').prepend('null<br/>');
		localStorage.asVar_first_visit_ = '1';
		//side_color_sel_click
		
		$('div#side_color_sel').trigger('click');

		pryajka_type = 'rabochaya'; //(!) ??? При самом первом запуске
		// alert('col');
		// $('div.col_menu_el').trigger('click');

	}
	/*
	a = localStorage.getItem('asVar_first_visit')
	if (a==0) {
		$('body').prepend('Первое посещение<br/>');
	}
	if (a==1) {
		$('body').prepend('Не первое посещение<br/>');
	}
	*/





/*
	Раздел описания функций
*/
		// Рефакторинг с использ. зн. по умолч. (Возврат результата без обработки в плече success)
		// Возврат результатов return
	function ajax4 (script_name, arg1, arg2, dest, is_con) { // Выводить ли результат в консоль?
	    var username = 'username';
	    var password = arg1;
	    var note     = arg2;
// [fold~ Gx9n]
	    is_con = is_con || 0;// если is_con не указан при вызове ф., то ему будет присвоено значение 0
	    url_ = '/cgi-bin/' + script_name;
	    // $('.con').append(note + '<br/>');
	    $('.con').append(script_name + ' >> ' + arg1 + '<br/>');
// [fold~ KphE]
		$.ajax({
		type: "GET",
// [fold~ v9sc]
		url: url_, // URL of the Perl script
// [fold~ WgXG]
		contentType: "text/html; charset=utf-8",
// [fold~ ljrv]
		dataType: "text html", 
		// send username and password as parameters to the Perl script
		data: "username=" + username + "&password=" + password + "&note=" + note,
		// script call was *not* successful
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
// [fold~ 5DPj]
		  $('.con2').append("XMLHttpRequest: " + XMLHttpRequest.responseText + "<br/>textStatus: " + textStatus + "<br/>errorThrown: " + errorThrown + '<br/>');
// [fold~ x776]
		}, // error 
// [fold~ RThL]
		success: function(data){
// [fold~ r3Rp]
			ajax_data = data; // Помещение ответа в глобальную переменную
			
			if (is_con) {$('.con2').append(data + '<br/>');} // Отладка
			else 		{
// [fold~ iF3D]
				$('.con2').append("SUCCS. COMPL. " + script_name + "<br/>");
				/*
					Дополнительно определяем сущ. ли элемент назначения
				*/
					// dest.append(ajax_data);
				if (dest.length) {
					dest.append(ajax_data);
				}
				else {
					$('.con2').append('dest is not founded!' + '<br/>');
				}
// [fold~ xbcT]
				/*
					Привязка реакции на нажатие ЛКМ на контейнере пряжки в каталоге
				*/
				// a_obj = dest.find('div#wrap_cont_m3');
				a_obj = dest.find('div#block_c');

			/* r? Нет определения */	
				bind_content(a_obj);
			}
// [fold~ fBr0]

			// Если контейнер существует
			if ($('#boxes_area').length) {
				// Передаем результат работы скрипта в окно вывода
				$('div#box_b textarea').val(data);
			} // is(#boxes_area)?
		} // success
		}); // ajax

	} // ajax4()





	// Возврат результата в переменную
	function ajax7 (script_name, arg1, arg2) {
	    var username = 'username'; var password = arg1; var note = arg2;
	    $('.con').append(script_name + ' >> ' + arg1 + '<br/>');
		$.ajax({
		type: "GET", url: '/cgi-bin/' + script_name,
		contentType: "text/html; charset=utf-8", dataType: "text html", 
		data: "username=" + username + "&password=" + password + "&note=" + note,
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
		  $('.con2').append("XMLHttpRequest: " + XMLHttpRequest.responseText + "<br/>textStatus: " + textStatus + "<br/>errorThrown: " + errorThrown + '<br/>'); },
		success: function(data){
			// (!) Бля, нужно передавать не через агрумент, а в глобальную переменную сразу
			ajax_data = data; // Помещение ответа в глобальную переменную
			
			// $('.con2').append("AJAX7, " + script_name + " res: " + data + "<br/>");
			$('.con2').append("AJAX7, " + script_name + " res: " + ajax_data + "<br/>");

		} // success
		}); // ajax
	} // ajax7()




/* Добавить какую-то кнопку, которая бы стартовала запрос по умолчанию загрузки рабочей пряжки */
	// Окно поиска
 	// $('body').append('<div id="search"><input /></div>');
 	$('div#ssearch').append('<div id="search"><input type=search /><div id="search_but"></div>');
	
	// Навигация
	// $('#breadcrumbs').append('<span id="bc1">ЛИТЬЕ </span>');

/* Действия по умолчанию */







	/* Безусловный вывод в рабочую область */
/*	
// Отключено, так как восстановлена обычная функциональность
// [fold~ eimh]
*/

// Обработка пунктов меню

	function cat_1_click () {
		$('#film').remove(); // $('#sblock').remove();

			$('div#side_color_sel img').remove(); 
			$('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '03_7P' +'.png"></img>');
			$('div#side_color_sel span').html('7P');


			// decor kolca peretyagki holnitenu blochka krjuchki
			pryajka_type = "rabochaya"; // Устанавливаем тип выбранной пряжки
			$('div#side_cat_name').html('Рабочая');
		
			// a1 = "rabochaya_08-10-12_xx"; a2 = "";	dest = $('table#tbl_cat');
			// a1 = "rabochaya_xx_xx"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');
			
			//a1 = "rabochaya_xx_7P"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');
			a1 = "rabochaya_xx_xx"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');

			// Место, в котором отключается загрузка по умолчанию (рабочая пряжка)

///*
			ajax4("load_uni.pl", a1, a2, dest);
//*/


		// $('html, body').animate({scrollTop: 600}, 800); // К каталогу
} // cat_1_click ()


/* Загрузка по умолчанию */

		// Для первой загрузки
	function cat_1_click_first () {

// [fold~ zzsa]

///*

/*
	Поскольку на данный момент (25_06_13) работа по брендам еще не окончена, есть
	возможность задействовать переход на бренды, заменив его на переход на хольнитены
	из категорий "крючки", "петли". Для этого отключаем в brand.js (искать по id="ab3")
*/


		flag_brand = localStorage.getItem('as_flag_brand');
			// alert(flag_brand);

		// if (flag_brand=='1') {
		if ((flag_brand=='1')&&(0)) { // Временно отключаем
			// alert(11);
			localStorage.as_flag_brand = "";

			clear_cat(); // Очистка таблицы перед загрузкой

			$('#film').remove(); // $('#sblock').remove();
// [fold~ kTKV]

	/* 
		(!) Подразобраться с этой никогда не рабочей веткой. Зачем была нужна
	*/
			// decor kolca peretyagki holnitenu blochka krjuchki
			pryajka_type = "holnitenu"; // Устанавливаем тип выбранной пряжки
			$('div#side_cat_name').html('Хольнитены');
		
			// a1 = "rabochaya_08-10-12_xx"; a2 = "";	dest = $('table#tbl_cat');
			a1 = "holnitenu_xx_xx"; a2 = "";	dest = $('div#wrk_area');
			ajax4("load_uni.pl", a1, a2, dest);

			// $('html, body').animate({scrollTop: 600}, 800); // К каталогу
		}
		else {

		// В этой ветке грузиться содержимое по умолчанию

			clear_cat(); // Очистка таблицы перед загрузкой

			/*
				В целях порционной загрузки необходимо существование суперблока
				при старте каталога, поэтому эту инструкцию нужно отключить
			*/
			// $('#film').remove();



// [fold~ YiM0]
			/*
				Правка цвета по умолчанию на 7P, для отображения на F5 двух цветов, 7P и 01V
			*/
			$('div#side_color_sel img').remove(); 
			$('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '03_7P' +'.png"></img>');
			$('div#side_color_sel span').html('7P');


			// decor kolca peretyagki holnitenu blochka krjuchki
			pryajka_type = "rabochaya"; // Устанавливаем тип выбранной пряжки
			$('div#side_cat_name').html('Рабочая');
		
			// a1 = "rabochaya_08-10-12_xx"; a2 = "";	dest = $('table#tbl_cat');
			// a1 = "rabochaya_xx_xx"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');
			
			//a1 = "rabochaya_xx_7P"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');
			
			/*
				В целях тестирования 
			*/

			a1 = "rabochaya_xx_xx"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');

			/*
				Для отработки порционной загрузки пряжки переделываем 
				запуск по умочанию на кольца
			*/
			// a1 = "kolca_xx_xx"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');

			// Место, в котором отключается загрузка по умолчанию (рабочая пряжка)

///*
			// (! Отключение каталога)
			// ajax4("load_uni.pl", a1, a2, dest);
			


			/*
				Запрос с скрипту, который выдает статистику по запрашиваемому контенту
			*/
			// Если закомментировать, то по умолчанию ничего не будет грузиться
			// ajax4("get_stats.pl", a1, a2, dest);
			
			// Получение кол-ва уникальных размеров - по сути блоков rsz
			// На основании этой информации можно формировать запросы к серверу на 
			// получение разных порций контента
			// ajax4("get_stats.pl", a1, a2, $('.con2'));

			// Кол-во порций
			// ajax7("get_stats.pl", a1, a2, portions);
			ajax7("get_stats.pl", a1, a2);
			// $('.con2').append("portions: " + portions + '<br/>');

			// $min_ident = $m_num if $first_run == 0; $first_run++;
			// if (once_1) {alert(1); once_1++}

///* // Заготовка функции, которая исполняется только раз. Для получения инф. от get_stats
// http://stackoverflow.com/questions/3678628/javascript-run-once-without-booleans
function once_1(){
   // overwrite this function, so it will be executed only once
   once_1 = Function("");
   // real code below
   // alert("Hi!");
   ajax4("get_stats.pl", a1, a2, $('.con2'));
}
//*/

		/* Порции */

			// Загрузка порции контента в суперблок #film
		// (~1) Стартовая точка
			// Работа со счетчиком порций
			cur_portion++;

			a1 = "rabochaya_xx_xx"; a2 = cur_portion;
			ajax4("load_portion.pl", a1, a2, $('div#film'));
			// ajax4("load_portion.pl", a1, a2, $('.con2'));


			$('.con2').append('<div id="but_portion">more</div>');

			$('#but_portion').bind('click', function() {
				$('.con2').append('more click - деактивирована<br/>');

/*
		// Отключаю, теперь лишнее
		// (~1.1) Дополнительная точка
				// Работа со счетчиком порций
				cur_portion++;

				a1 = "rabochaya_xx_xx"; a2 = cur_portion;
				ajax4("load_portion.pl", a1, a2, $('div#film'));
*/
  			});



//*/
		}
//*/
	}



	function fade_click () {
		$('div#col_menu').toggle(); $('div.fade').toggle();

		// $('div#div_ic_block_C').bind('click', pult_click);
		// $('div#cheek_upper').trigger('click');
	}

/*
	Палитра
	Привязка событий палитры, отрисовка
*/

	// $('div#side_color_sel, div#side_col_anchor').bind( 'click', side_color_sel_click); 

	function side_color_sel_click () { // Подсвечивание палитры
		// $('.con2').append('side_color_sel_click()<br/>');
		//$('div#cat_menu').addClass('wrappedElement');
//		$('div#cat_menu').clone().appendTo('div#cat_menu');
		//$('div#content').addClass('wrappedElement');

		if (!($('div#col_menu').length)) { // Если элемента еще нет - создаем
			
			// $('div#cheek_upper, div#cheek_lower').unbind('click');
			
				// Первоначальная инициализация палитры
			//$('<div id="col_menu"></div>').insertBefore($('div#cat_menu'));

			/*
				Добавим-ка убирание подсказки
				UPD: Какого-то юга срабатывает только один раз...
				Отключу пока
			*/
			// $('div#hint1').remove();

			$('body').append('<div id="col_menu"></div>'); 

				// Заполение палитры элементами (цветами)
			// $('div#col_menu').append('<div class="col_menu_el"><img src="img/palitra/01_01.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/02_1V.png" /><span>1V (темный никель) (nickel black vacuum)</span></div> <div class="col_menu_el"><img src="img/palitra/03_7P.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/04_07.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/05_04.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/06_04K.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/07_87S.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/08_87.png" /><span>87 (Черный мат)<br/> (black mat)</span></div> <div class="col_menu_el"><img src="img/palitra/09_S1.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/10_09.png" /><span>09 (золото антик) (antique gold)</span></div> <div class="col_menu_el"><img src="img/palitra/11_S2.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/12_01V.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/13_80S.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/14_80.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/15_0.png" /><span></span></div> <div class="col_menu_el"><img src="img/palitra/16_271.png" /><span>iGF 03220</span></div>');
// Cтарая 20-элементная палитра
			// $('div#col_menu').append('<div class="col_menu_el"><img src="img/palitra/01_01.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/02_1V.png" /><span>1V (темный никель) (nickel black vacuum)</span></div><div class="col_menu_el"><img src="img/palitra/03_7P.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/04_07.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/05_04.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/06_04K.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/07_S1.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/08_09.png" /><span>87 (Черный мат)<br/> (black mat)</span></div> <div class="col_menu_el"><img src="img/palitra/09_S2.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/10_01V.png" /><span>09 (золото антик) (antique gold)</span></div> <div class="col_menu_el"><img src="img/palitra/11_271.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/12_80S.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/13_80.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/14_87S.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/15_87.png" /><span></span></div> <div class="col_menu_el"><img src="img/palitra/16_169.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/17_185.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/18_5021.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/19_24.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/20_103.png" /><span>iGF 03220</span></div>');

// "Новая" палитра, 21 элемент
			// $('div#col_menu').append('<div class="col_menu_el"><img src="img/palitra/01_01.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/02_1V.png" /><span>1V (темный никель) (nickel black vacuum)</span></div><div class="col_menu_el"><img src="img/palitra/03_7P.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/04_07.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/05_04.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/06_04K.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/07_.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/08_S1.png" /><span>87 (Черный мат)<br/> (black mat)</span></div> <div class="col_menu_el"><img src="img/palitra/09_09.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/10_S2.png" /><span>09 (золото антик) (antique gold)</span></div> <div class="col_menu_el"><img src="img/palitra/11_01V.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/12_271.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/13_80S.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/14_80.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/15_87S.png" /><span></span></div> <div class="col_menu_el"><img src="img/palitra/16_87.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/17_169.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/18_185.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/19_5021.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/20_24.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/21_103.png" /><span>iGF 03220</span></div>');
// "Еще более новая" палитра, 22 элемента
			$('div#col_menu').append('<div class="col_menu_el"><img src="img/palitra/01_01.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/02_1V.png" /><span>1V (темный никель) (nickel black vacuum)</span></div><div class="col_menu_el"><img src="img/palitra/22_06.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/23_08.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/03_7P.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/04_07.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/05_04.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/06_04K.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/08_S1.png" /><span>87 (Черный мат)<br/> (black mat)</span></div> <div class="col_menu_el"><img src="img/palitra/09_09.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/10_S2.png" /><span>09 (золото антик) (antique gold)</span></div> <div class="col_menu_el"><img src="img/palitra/11_01V.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/12_271.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/13_80S.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/14_80.png" /><span>iGF 03220</span></div> <div class="col_menu_el"><img src="img/palitra/15_87S.png" /><span></span></div> <div class="col_menu_el"><img src="img/palitra/16_87.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/17_169.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/18_185.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/19_5021.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/20_24.png" /><span>iGF 03220</span></div><div class="col_menu_el"><img src="img/palitra/21_103.png" /><span>iGF 03220</span></div>');
			

			$('div#col_menu').append('<a href="http://ral.ru/classic_colours" target="_blank"><div id="ral"></div><a/>');
				// Переименование каждого цвета в соотв. с именем файла
			$('div.col_menu_el').each(function(index) {
				// Получаем из имени файла название цвета "img/palitra/01_01.png" - "01"

				// alert(3);
				color = $(this).find('img').attr("src").replace(/(.*?)(_(.+))(\.png)/mg, "$3");
				
				if (color!=0) { // Пропуская пустой цвет (0)
					$(this).find('span').text(color);
					$(this).bind( 'click', col_click_uni);
				}
				//$('.con').append(index + ": " + col + '<br/>');
			});


			/*
				Модификация от 03_02_14 - добавляются два цвета 06 - черный никель и 08 - красное золото
				Выходит 22 цвет (пустое место заполняется новым цветом)
			*/


				// Добавление описания цветов
			$('div.col_menu_el').each(function(index) {

				if (index==0) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(серебро)<br/>(silver)";
					txt += "<br/>(серебро)";
					a.html(txt);
				}
				if (index==1) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(темный никель)<br/>(nikel black vacuum)";
					// txt += "<br/>(темный никель)<br/>(nikel black vacuum)";
					txt += "<br/>(темный никель)";
					a.html(txt);
				}
				if (index==2) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(темный никель)<br/>(nikel black vacuum)";
					// txt += "<br/>(темный никель)<br/>(nikel black vacuum)";
					txt += "<br/>(чеерный никель)";
					a.html(txt);
				}
				if (index==3) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(темный никель)<br/>(nikel black vacuum)";
					// txt += "<br/>(темный никель)<br/>(nikel black vacuum)";
					txt += "<br/>(красное золото)";
					a.html(txt);
				}
				if (index==4) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(белое VIP золото)<br/>(white gold VIP)";
					txt += "<br/>(белое VIP золото)";
					a.html(txt);
				}
				if (index==5) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(золото)<br/>(gold)";
					txt += "<br/>(золото)";
					a.html(txt);
				}
				if (index==6) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(фуме антик)<br/>(antique gunmetal-grey)";
					txt += "<br/>(фуме антик)";
					a.html(txt);
				}
				if (index==7) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(фуме темный мат)<br/>(gunmetal-grey dark mat)";
					txt += "<br/>(фуме темный мат)";
					a.html(txt);
				}
					/* 
					// Старый фрагмент для пустой позиции в палитре

				if (index==8) { // Пустой элемент
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					txt = "";
					a.html(txt);

					$(this).unbind();
					$(this).removeClass("col_menu_el").addClass('col_menu_el_dummy');

				}
					*/
				if (index==8) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(золото VIP сатин)<br/>(sateen gold VIP)";
					txt += "<br/>(золото VIP сатин)";
					a.html(txt);
				}
				if (index==9) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(золото антик)<br/>(antique gold)";
					txt += "<br/>(золото антик)";
					a.html(txt);
				}
				if (index==10) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(серебро VIP сатин)<br/>(sateen silver VIP)";
					txt += "<br/>(серебро VIP сатин)";
					a.html(txt);
				}
				if (index==11) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(серебро винтаж)<br/>(silver vintage)";
					txt += "<br/>(серебро винтаж)";
					a.html(txt);
				}
				if (index==12) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(фуме серый мат)<br/>(gunmetal-grey mat)";
					txt += "<br/>(фуме серый мат)";
					a.html(txt);
				}
				if (index==13) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(белый VIP лак)<br/>(white polish VIP)";
					txt += "<br/>(белый VIP лак)";
					a.html(txt);
				}
				if (index==14) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(белый мат)<br/>(white mat)";
					txt += "<br/>(белый мат)";
					a.html(txt);
				}
				if (index==15) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(черный VIP лак)<br/>(black polish VIP)";
					txt += "<br/>(черный VIP лак)";
					a.html(txt);
				}
				if (index==16) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(чёрный мат)<br/>(black mat)";
					txt += "<br/>(чёрный мат)";
					a.html(txt);
				}
				if (index==17) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(красный)<br/>(red)";
					txt += "<br/>(красный)";
					a.html(txt);
				}
				if (index==18) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(синий)<br/>(blue)";
					txt += "<br/>(синий)";
					a.html(txt);
				}
				if (index==19) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(зелёный)<br/>(green)";
					txt += "<br/>(зелёный)";
					a.html(txt);
				}
				if (index==20) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(желтый)<br/>(yellow)";
					txt += "<br/>(желтый)";
					a.html(txt);
				}
				if (index==21) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(коричневый)<br/>(brown)";
					txt += "<br/>(коричневый)";
					a.html(txt);
				}
				if (index==22) {
					a = $(this).find('span');   txt = a.text(); // Получаем имя цвета
					// txt += "<br/>(коричневый)<br/>(brown)";
					txt += "<br/>(коричневый)";
					a.html(txt);
				}
			});


			key_1_click(); // Уточнение координат для вновь построенной палитры

			// Затенение
			$('body').append('<div class="fade"></div>');
			$('.fade').bind( 'click', fade_click);

			// UPD Если отрисована палитра, то нужно отключить сворачивание пульта
			// $('div#div_ic_block_C').bind('click', pult_click);

			$('div#col_menu').toggle(); $('div.fade').toggle();} // Однократно, для нейтрализ. эффекта следующего тоггла
		else { // Произошло нажатие, но палитра уже есть
			// Возвращаем привязку к "щекам"
/*
var events = $._data( $("div#cheek_upper")[0], "events" );
if(events.indexOf("click") == -1) {
  // $(".someOtherSelector").click(function(){
  //   alert('some other action');
  // });
		  	$('div#cheek_lower, div#cheek_upper').bind('click', pult_click);
}
else {
	$('.con2').append('Уже есть события<br/>');
}			
*/

// $('div#cheek_upper').each(function(){
//     console.log($._data(this, "events"));
//     $('.con2').append('Уже есть события +' +  $._data(this, "events") + '<br/>');
// });

		}	
		$('div#col_menu').toggle(); $('div.fade').toggle();

		// // UPD А если снова исчезла, то включить триггер пульта снова
		// if ((!($('div#col_menu').length)) && ($('div#pult_wrap').hasClass('p_on'))) {
		// 	$('div#div_ic_block_C').bind('click', pult_click);
		// }

	}


	function col_click_uni () { // Универсальная функция на любой цвет
		// alert(4);
		// Получаем из имени файла название цвета "img/palitra/01_01.png" - "01" (чистый индекс цвета)
		pryajka_color = $(this).find('img').attr("src").replace(/(.*?)(_(.+))(\.png)/mg, "$3");
		// Получ. назв. цвета "img/palitra/01_01.png" - "01_01" (как в файловой системе)
		pryajka_color_ = $(this).find('img').attr("src").replace(/(.*?)(a\/(.+))(\.png)/mg, "$3");

		// Изменяем цвет пряжки в пульте с соотв. с польз. выбором
		$('div#side_color_sel img').remove(); 
		$('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  pryajka_color_ +'.png"></img>');
		// $('div#side_color_sel span').html('<b>' + pryajka_color + '</b>');
		$('div#side_color_sel span').html(pryajka_color);
		$('div#col_menu').toggle(); $('div.fade').toggle();
		
		// $('.con').append('img/palitra/' +  pryajka_color_ + '.png<br/>');



		// Новая прорисовка
		clear_cat(); // Очистка таблицы перед загрузкой

		$('#film').remove(); // $('#sblock').remove();
		// $("table#tbl_cat tr").remove();
		// // $('img#button_foot').css("visibility","hidden"); // Запрещаем кнопку показать еще
		// $('img#button_foot').remove();

		// // decor kolca peretyagki holnitenu blochka krjuchki
		// pryajka_type = "rabochaya"; // Устанавливаем тип выбранной пряжки
		// $('div#side_cat_name').html('Рабочая');

		// a1 = pryajka_type + "_xx_" + pryajka_color; a2 = "";	dest = $('table#tbl_cat');
		a1 = pryajka_type + "_xx_" + pryajka_color; a2 = "";	dest = $('#wrk_area');

		// alert(a1);
		ajax4("load_uni.pl", a1, a2, dest);

/*
		// Навигация
		$('#bc2').remove();
		if (pryajka_type=="rabochaya") {
			$('#breadcrumbs').append('<span id="bc2">- РАБОЧАЯ </span>');
		}
		if (pryajka_type=="decor") {
			$('#breadcrumbs').append('<span id="bc2">- ДЕКОР </span>');
		}
		
		$('#breadcrumbs').append('<span id="bc3">' + pryajka_color + '</span>');
*/
	}




	/* Секция общих функции */
	function clear_cat () {
		//$('.con').append('key_1_click()<br/>');
//		$('td#two').slice(0,1).html("");
		// $('td#two').html("");
		//$('td#one').slice(3,10).remove(); // Убираем планшетки размеров > <h1>12</h1> MM		
		//$('td#two').slice(3,10).remove(); // Убираем планшетки размеров > <h1>12</h1> MM
		// $('tr#uni').slice(0,25).remove(); // Убираем планшетки размеров > <h1>12</h1> MM

		// Для работы с подсветкой размеров еще немного кода...
		$('#sz_1').css("color","black");
		$('#sz_2').css("color","black");
		$('#sz_3').css("color","black");
		$('#sz_4').css("color","black");

/*
		// (!) Хак, для отработки ошибки с повотором td#one rotate 90
		if (pryajka_type != "rabochaya") {
			// $('body').prepend('cat_img_1_click()<br/>');
			alert(pryajka_type);
		}
*/
	}


/*
	Небольшой фиксик для ie 
	Съезжают заголовки "Литье / Штамповка" при инициализации меню

	Присваиваем класс с фиксом
	.ie_menu_fix
*/
	if (browser()=='Internet Explorer') {
		$('div#cat_menu_1').find('p#p_1').addClass('ie_menu_fix');
		$('div#cat_menu_2').find('p#p_2').addClass('ie_menu_fix');
	}



/*

*/



/*
	cat 		- имя категории
	aux_nfo 	- доп. информация (имя на русском)
	
	col 		- цвет
	size		- размер
	
	scroll 		- куда подкрутить после выбора нужного фрагмента

	Задать специальный хеш, в котором указать соот. цветов в директории цветам в палитре

	03_7P -> 7P

	Далее этот цвет максимально унифицированно использовать в теле функции
*/
// (!)
	// Забава в том, что события выстреливают сразу, таким образом не понятно, как передавать 
	// агрументы в функцию, но не запускать ее к выполнению тотчас
	// Поэтому придется все-таки вводить промежуточные функции, которые при выхове будут передавать
	// параметры для cat_click_uni
	function cat_u4 () { cat_click_uni('peretyagki', 'Перетяжки', 'xx', 'xx', '500'); }
	function cat_u5 () { cat_click_uni('peretyagki-decor', 'Декоративные перетяжки', 'xx', 'xx', '500'); }
	function cat_u6 () { cat_click_uni('blochka', 'Блочки', 'xx', 'xx', '500'); }
	function cat_u7 () { cat_click_uni('petli', 'Петли', 'xx', 'xx', '500'); }
	function cat_u8 () { cat_click_uni('krjuchki', 'Крючки', 'xx', 'xx', '500'); }
	function cat_u9 () { cat_click_uni('holnitenu', 'Хольнитены', 'xx', 'xx', '500'); }
	// function cat_u10 () { cat_click_uni('', 'Кнопки', 'xx', 'xx', '500'); }
	function cat_u11 () { cat_click_uni('peretyagki-mokasin', 'Мокасиновые перетяжки', 'xx', 'xx', '500'); }
	function cat_u12 () { cat_click_uni('podsnurovki', 'Подшнуровки', 'xx', 'xx', '500'); }
	function cat_u13 () { cat_click_uni('brands', 'Бренды	', 'xx', 'xx', '500'); }
	function cat_u14 () { cat_click_uni('nakonechniki', 'Наконечники', 'xx', 'xx', '500'); }
	// function cat_u15 () { cat_click_uni('', 'Разное', 'xx', 'xx', '500'); }

	function cat_click_uni (cat, aux_nfo, col, size, scroll) {
		// Заготовка универсальной функции загрузки
/*
		i_arr = aux_nfo.split('_');
		$('body').prepend('cat: ' + cat + ' aux_nfo: ' + i_arr[0] + ' col: ' + col 
						+ ' size: ' + size + ' scroll: ' + scroll + '<br/>');
		$('body').append('col_dir: ' + col_hash[col] + '<br/>');
*/
		
		// $('body').prepend('cat 5<br/>');

		// Сброс маркера цвета в палитре
		$('div#side_color_sel img').remove(); 
		$('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  col_hash[col] +'.png"></img>');
		// $('div#side_color_sel span').html('01V');
		$('div#side_color_sel span').html(col);

		$('#film').remove(); // Очистка области вывода

		// decor kolca peretyagki holnitenu blochka krjuchki
		pryajka_type = cat; // Устанавливаем тип выбранной пряжки
		// $('div#side_cat_name').html('Кольца');
		$('div#side_cat_name').html(aux_nfo);
		
		// a1 = cat + '_' + col + '_' + size;
		a1 = cat + '_' + 'xx' + '_' + 'xx';
		// a1 = "kolca_xx_xx"; 

		$('body').prepend(a1);
		a2 = "";	dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);

		// $('html, body').animate({scrollTop: scroll}, 800); // К каталогу	
}


	// Декор decor
	function cat_2_click () {

		clear_cat(); // Очистка таблицы перед загрузкой

		// Сброс маркера цвета в палитре
		$('div#side_color_sel img').remove(); 
		$('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '11_01V' +'.png"></img>');
		// $('div#side_color_sel span').html('<b>' + pryajka_color + '</b>');
		$('div#side_color_sel span').html('01V');


		$('#film').remove(); // $('#sblock').remove();
		// $("table#tbl_cat tr").remove();
		// $('td#one').html(""); $('tr#two').remove(); $('tr#three').remove();
		// $('img#button_foot').css("visibility","hidden"); // Запрещаем кнопку показать еще
		// $('img#button_foot').remove();

		// decor kolca peretyagki holnitenu blochka krjuchki
		pryajka_type = "decor"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Декор');
	
		a1 = "decor_xx_xx"; a2 = "";	dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);

		// Навигация
		// $('#bc2').remove();
		// $('#breadcrumbs').append('<span id="bc2">- ДЕКОР </span>');



/*
// Старая рабочая ветка
		clear_cat(); // Очистка таблицы перед загрузкой
		// Переписываем колонку размеров - универсальная
		$('td#one').html(""); $('tr#two').remove(); $('tr#three').remove();

if ($('td#one').length == 1) {
	// alert(1);
	$('td#one').css("transform", "none")
	$('td#one').css("-moz-transform", "none")
	$('td#one').css("-o-transform", "none")
	$('td#one').css("-webkit-transform", "none")
}

		$('img#button_foot').css("visibility","hidden"); // Запрещаем кнопку показать еще
		// rabochaya decor kolca peretyagki holnitenu blochka krjuchki
		// a1 = "blochka_xx_xx"; a2 = "";	dest = $('td#two').slice(0,1);
		pryajka_type = "decor"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Декор');

		a1 = "decor_xx_xx"; a2 = "";	dest = $('td#two').slice(0,1);
		ajax4("load_uni.pl", a1, a2, dest);
		// $('html').animate( { scrollTop: destination }, 1100 );
							// {смещение},  {за время}
*/
		// $('html, body').animate({scrollTop: 600}, 800); // К каталогу

	}



		// Грузится зеленая рабочая пряжка вместо колец
		// Третья категория, кольца
	function cat_3_click () {
		//$('body').prepend('cat_3_click()<br/>');

		clear_cat(); // Очистка таблицы перед загрузкой

		// Сброс маркера цвета в палитре
		$('div#side_color_sel img').remove(); 
		// $('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '11_01V' +'.png"></img>');
		$('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '11_01V' +'.png"></img>');
		// $('div#side_color_sel span').html('<b>' + pryajka_color + '</b>');
		// $('div#side_color_sel span').html('01V');
		$('div#side_color_sel span').html('01V');

/*		// Сброс маркера цвета в палитре
		$('div#side_color_sel img').remove(); 
		$('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '05_04' +'.png"></img>');
		// $('div#side_color_sel span').html('<b>' + pryajka_color + '</b>');
		$('div#side_color_sel span').html('04');
*/

		$('#film').remove(); // $('#sblock').remove();

		// decor kolca peretyagki holnitenu blochka krjuchki
		pryajka_type = "kolca"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Кольца');
	
		a1 = "kolca_xx_xx"; a2 = "";	dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);

		// $('html, body').animate({scrollTop: 600}, 800); // К каталогу
	}

	// Перетяжки peretyagki
	function cat_4_click () {

// Новая отрисовка
		clear_cat(); // Очистка таблицы перед загрузкой

		// Сброс маркера цвета в палитре
		$('div#side_color_sel img').remove(); 
		$('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '11_01V' +'.png"></img>');
		// $('div#side_color_sel span').html('<b>' + pryajka_color + '</b>');
		$('div#side_color_sel span').html('01V');


		$('#film').remove(); // $('#sblock').remove();
		// decor kolca peretyagki holnitenu blochka krjuchki
		pryajka_type = "peretyagki"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Перетяжки');
										// dest = $('table#tbl_cat');
		a1 = "peretyagki_xx_xx"; a2 = "";	dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);

		// $('html, body').animate({scrollTop: 600}, 800); // К каталогу

	}



	function sz_1_click () {

		// Новая прорисовка
		clear_cat(); // Очистка таблицы перед загрузкой

		$('#film').remove(); // $('#sblock').remove();
		$("table#tbl_cat tr").remove();
		// $('img#button_foot').css("visibility","hidden"); // Запрещаем кнопку показать еще
		$('img#button_foot').remove();

		// a1 = pryajka_type + "_08-09-11-12-13-14_" + pryajka_color; a2 = "";	dest = $('table#tbl_cat');
							// "Все размеры, c 08 по 40-й"
		a1 = pryajka_type + "_08-40_" + pryajka_color; a2 = "";	dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);


		$(this).css("color", "red"); // Подсветка текущего выбора
/*	
		clear_cat();



		// Мастырка для пустых блоков в каталоге по рабочке - Обратная операция $('tr#three').remove();
		if ($('td#two').length == '2') {
			$('<tr id="three"><td id="two"></td><td id="one"></td></tr>').insertAfter('tr#two');
		}
		if ($('td#two').length == '1') {
			$('<tr id="two"><td id="two"></td><td id="one"></td></tr><tr id="three"><td id="two"></td><td id="one"></td></tr>').insertAfter('tr#one');
		}


		// Переписываем колонку размеров
		$('td#one').html("");
		$('td#one').slice(0,1).html("<h1>08</h1> MM");
		$('td#one').slice(1,2).html("<h1>10</h1> MM");
		$('td#one').slice(2,3).html("<h1>12</h1> MM");


		// rabochaya decor kolca peretyagki holnitenu blochka krjuchki
		// a1 = "blochka_xx_xx"; a2 = "";	dest = $('td#two').slice(0,1);
		pryajka_type = "rabochaya"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Рабочая');


		a1 = pryajka_type + "_08_" + pryajka_color;
		// a1 = "rabochaya_08_xx"; 
		a2 = "";	dest = $('td#two').slice(0,1);
		ajax4("load_uni.pl", a1, a2, dest);
		
		a1 = pryajka_type + "_10_" + pryajka_color;
		// a1 = "rabochaya_10_xx"; 
		a2 = "";	dest = $('td#two').slice(1,2);
		ajax4("load_uni.pl", a1, a2, dest);

		a1 = pryajka_type + "_12_" + pryajka_color;
		// a1 = "rabochaya_12_xx"; 
		a2 = "";	dest = $('td#two').slice(2,3);
		ajax4("load_uni.pl", a1, a2, dest);

			$('img#button_foot').css("visibility","hidden");
*/

	}

	function sz_2_click () {

		// Новая прорисовка
		clear_cat(); // Очистка таблицы перед загрузкой

		$('#film').remove(); // $('#sblock').remove();
		$("table#tbl_cat tr").remove();
		// $('img#button_foot').css("visibility","hidden"); // Запрещаем кнопку показать еще
		$('img#button_foot').remove();

		// a1 = pryajka_type + "_15-16-17-18-19-20-21-22-23-24-25_" + pryajka_color; a2 = "";	dest = $('table#tbl_cat');
		a1 = pryajka_type + "_08-14_" + pryajka_color; a2 = "";	dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);

		$(this).css("color", "red"); // Подсветка текущего выбора
/*
		clear_cat();


		// Мастырка для пустых блоков в каталоге по рабочке - Обратная операция $('tr#three').remove();
		if ($('td#two').length == '2') {
			$('<tr id="three"><td id="two"></td><td id="one"></td></tr>').insertAfter('tr#two');
		}
		if ($('td#two').length == '1') {
			$('<tr id="two"><td id="two"></td><td id="one"></td></tr><tr id="three"><td id="two"></td><td id="one"></td></tr>').insertAfter('tr#one');
		}



		// Переписываем колонку размеров
		$('td#one').html("");
		$('td#one').slice(0,1).html("<h1>14</h1> MM");
		$('td#one').slice(1,2).html("<h1>16</h1> MM");
		$('td#one').slice(2,3).html("<h1>18</h1> MM");


		// rabochaya decor kolca peretyagki holnitenu blochka krjuchki
		// a1 = "blochka_xx_xx"; a2 = "";	dest = $('td#two').slice(0,1);
		pryajka_type = "rabochaya"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Рабочая');

		a1 = pryajka_type + "_14_" + pryajka_color;
		// a1 = "rabochaya_14_xx"; 
		a2 = "";	dest = $('td#two').slice(0,1);
		ajax4("load_uni.pl", a1, a2, dest);

		a1 = pryajka_type + "_16_" + pryajka_color;
		// a1 = "rabochaya_16_xx"; 
		a2 = "";	dest = $('td#two').slice(1,2);
		ajax4("load_uni.pl", a1, a2, dest);

		a1 = pryajka_type + "_18_" + pryajka_color;
		// a1 = "rabochaya_18_xx"; 
		a2 = "";	dest = $('td#two').slice(2,3);
		ajax4("load_uni.pl", a1, a2, dest);

			$('img#button_foot').css("visibility","hidden");

*/
	}

	function sz_3_click () {
		
		// Новая прорисовка
		clear_cat(); // Очистка таблицы перед загрузкой

		$('#film').remove(); // $('#sblock').remove();
		$("table#tbl_cat tr").remove();
		// $('img#button_foot').css("visibility","hidden"); // Запрещаем кнопку показать еще
		$('img#button_foot').remove();

		a1 = pryajka_type + "_15-25_" + pryajka_color; a2 = "";   dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);

		$(this).css("color", "red"); // Подсветка текущего выбора
/*
		clear_cat();


		// Мастырка
		if ($('td#two').length == '1') {
			$('<tr id="two"><td id="two"></td><td id="one"></td></tr><tr id="three"><td id="two"></td><td id="one"></td></tr>').insertAfter('tr#one');
		}


		// Переписываем колонку размеров
		$('td#one').html("");
		$('td#one').slice(0,1).html("<h1>20</h1> MM");
		$('td#one').slice(1,2).html("<h1>22</h1> MM");

// Этих размеров в базе нет

		// Переписываем колонку размеров - универсальная
		// $('td#one').html(""); $('tr#two').remove(); $('tr#three').remove();
		$('tr#three').remove();

		// $('td#one').slice(2,3).html("<h1>24</h1> MM");


		// rabochaya decor kolca peretyagki holnitenu blochka krjuchki
		// a1 = "blochka_xx_xx"; a2 = "";	dest = $('td#two').slice(0,1);
		pryajka_type = "rabochaya"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Рабочая');

		a1 = pryajka_type + "_20_" + pryajka_color;
		// a1 = "rabochaya_20_xx"; 
		a2 = "";	dest = $('td#two').slice(0,1);
		ajax4("load_uni.pl", a1, a2, dest);

		a1 = pryajka_type + "_22_" + pryajka_color;
		// a1 = "rabochaya_22_xx"; 
		a2 = "";	dest = $('td#two').slice(1,2);
		ajax4("load_uni.pl", a1, a2, dest);


			$('img#button_foot').css("visibility","hidden");
*/

	}

	function sz_4_click () {

		// Новая прорисовка
		clear_cat(); // Очистка таблицы перед загрузкой

		$('#film').remove(); // $('#sblock').remove();
		$("table#tbl_cat tr").remove();
		// $('img#button_foot').css("visibility","hidden"); // Запрещаем кнопку показать еще
		$('img#button_foot').remove();

		a1 = pryajka_type + "_26-40_" + pryajka_color; a2 = "";   dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);

		$(this).css("color", "red"); // Подсветка текущего выбора
/*
		clear_cat();


		// Мастырка для пустых блоков в каталоге по рабочке - Обратная операция $('tr#three').remove();
		if ($('td#two').length == '2') {
			$('<tr id="three"><td id="two"></td><td id="one"></td></tr>').insertAfter('tr#two');
		}


		// Переписываем колонку размеров
		$('td#one').html("");
		$('td#one').slice(0,1).html("<h1>30</h1> MM");
		$('td#one').slice(1,2).html("<h1>28</h1> MM");
		$('td#one').slice(0,3).html("<h1>30</h1> MM");

		$('tr#two').remove(); $('tr#three').remove();



		// rabochaya decor kolca peretyagki holnitenu blochka krjuchki
		// a1 = "blochka_xx_xx"; a2 = "";	dest = $('td#two').slice(0,1);
		pryajka_type = "rabochaya"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Рабочая');
		a1 = pryajka_type + "_30_" + pryajka_color;
		// a1 = "rabochaya_30_xx"; 
		a2 = "";	dest = $('td#two').slice(0,1);
		ajax4("load_uni.pl", a1, a2, dest);

			$('img#button_foot').css("visibility","hidden");
*/

	}


	//
	$('div#sz_1').bind( 'click', sz_1_click);
	$('div#sz_2').bind( 'click', sz_2_click);
	$('div#sz_3').bind( 'click', sz_3_click);
	$('div#sz_4').bind( 'click', sz_4_click);



 	// Интерактивность пульта
 		// Псевдокнопка "Выбрать тип"
 	$('div#side_cat_anchor, div#side_cat_name').bind('click', function() {
		$('html,body').animate( { scrollTop: 0 }, 100 );


		/* Эффект промаргивания меню при нажатии на кнопку типа пряжки */
		$('#mount_1').animate({'opacity':'0.2'}).animate({'opacity':'1'})
		$('#mount_2').animate({'opacity':'0.2'}).animate({'opacity':'1'})

	});
 		// Псевдокнопка "Брендирование"
 	$('div#side_but_2_anchor').bind('click', function() {
		// $('html,body').animate( { scrollTop: 0 }, 100 );
		window.location="uslugi1.html";
	});
 		// Псевдокнопка "Брендирование"
 	$('li#print_link').bind('click', function() {
		window.location="print1.html";
	});




 	// Поиск по номенклатуре


	$('div#search input').bind('keydown', function (event) {
    //	$('.con').append('> input keydown <br/>');
 		//$('body').unbind();
	
		var c = event.keyCode;
	    var ctrlDown = event.ctrlKey;

	    /*
	    // Check for Alt+Gr (http://en.wikipedia.org/wiki/AltGr_key)
	    if (ctrlDown && evt.altKey) return true
		*/

		/*
	    // Check for ctrl+c, v and x
	    else if (ctrlDown && c==67) return false // c
	    else if (ctrlDown && c==86) return false // v
	    else if (ctrlDown && c==88) return false // x
	    */
		if (c==13) {
			$('.con').append('ENTER pressed <br/>');



			// Секция для разбора параметров команды, если ком. была введ с аргум. cmd [param1,...]

			

			// Считывание команды из командной строки
			a = $('div#search input').val();
			$('.con').append(a + ' <br/>');
			$('div#search input').val(""); // Стирание введеной команды
			
			$('.con').html(""); // Стирание введеной команды


			// $('#wrk_area').prepend("AAA");

			// Старый вариант кода
			localStorage.as_search = "";
			localStorage.as_search = a;
//			window.location="search.html";



/* 
 //Устаревшая версия
		clear_cat(); // Очистка таблицы перед загрузкой

		$("table#tbl_cat tr").remove();
		$('img#button_foot').remove(); // Запрещаем кнопку показать еще

		// decor kolca peretyagki holnitenu blochka krjuchki
		pryajka_type = "search"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Поиск');
	
		// a1 = "rabochaya_08-10-12_xx"; a2 = "";	dest = $('table#tbl_cat');
		// a1 = "brands_xx_xx"; a2 = "";	dest = $('table#tbl_cat');
		// ajax4("load_uni.pl", a1, a2, dest);


	
			// Новый вариант, с результатами в каталог
			ajax5("search.pl", a, "arg2");

		$('html, body').animate({scrollTop: 600}, 800); // К каталогу
*/

		// Свежий вариант, с выводом в каталог в sblock
			clear_cat(); // Очистка таблицы перед загрузкой
			$('#film').remove(); // $('#sblock').remove(); $("table#tbl_cat").remove(); $('img#button_foot').remove();

			pryajka_type = "search"; // Устанавливаем тип выбранной пряжки
			$('div#side_cat_name').html('Результаты поиска');
		
			ajax4("search.pl", a, "", $('div#wrk_area'));

			// $('html, body').animate({scrollTop: 600}, 800); // К каталогу



		// Нерабочая ветка кода (копипаста)
			params = a.split(' '); // Разделение входящих параметров

			a = params.shift(); // Имя команды сбрасываем в а, а параметры остаются в params

			/*
			// Обход foreach(), выводит любые параменты, заданные через пробел в консоль отладки
			for (var key in params) {
				var val = params[key];
				//alert (key+' = '+val);
				$('.con').append(key + ' = ' + val +'<br/>');
			}
			//*/
			
		   		// "Болванка" команды, параметры доступны в массиве params
			if (a=='cmd') {
				$('.con').append('CMD cmd exec! <br/>');
				$('.con').append('param1: ' + params[0] + '<br/>');
			}


			// Синтаксический разбор введенных комманд
				// Запуск скрипта на сервере, преобразование in-out
			if ((a=='run')||(a=='r')) { 
				$('.con').append('RUN cmd exec! <br/>');

					// Проверка, существует ли область, для которой необход. выполнить команду
				if ($('#boxes_area').length) {
					//$('.con').append('boxes_area exist <br/>');
					
					// Получение текста в области ввода in (box_a)
					a = $('div#box_a textarea').val();
					//$('div#box_a textarea').val("");

					//$('.con').append('<hr/>'+ a +'<br/><hr/><br/>');

					// Отсылка содержимого in perl-скрипту
						//0:/sym2/cgi-bin/coords/script/perl/
//					ajax2("coords/script/perl/in_out_1.pl", "password", a);

					// Экранирование содержимого запроса (GET?) для передачи в скрипт perl
						// Нестандартная замена по типу мнемоник html
					a2 = a.replace(/;/g,   "^!tchz"); // Экранирование точки с запятой
					a2 = a2.replace(/#/g,  "^!resh"); // Решетки
					a2 = a2.replace(/\t/g, "^!tab");  // "\t"
					a2 = a2.replace(/\n/g, "^!ret");  // "\n"


					$('.con').append('<hr/>'+ a +'<br/><hr/><br/>');
					$('.con').append('<hr/>'+ a2 +'<br/><hr/><br/>');

					//ajax2("coords/script/perl/in_out_1.pl", a, ""); // a = in
					ajax2("coords/script/perl/in_out_2.pl", a2, ""); // a = in




				} // is(#boxes_area)?
				else {
					$('.con').append('Zigog: #boxes_area not defined! <br/>');
				}

			}
				// Переопределение имени скрипта, который надо зачитать с сервера
			if ((a=='ren')||(a=='ren')) {
				$('.con').append('REN cmd exec! <br/>');

				if ($('#boxes_area').length) {
					//$('.con').append('boxes_area exist <br/>');
					//$('div#ini_area span:first').addClass('wrappedElement');
					a = $('div#ini_area span:first').html();
					
					$('.con').append('ini = ' + a + ' <br/>');

					//ToDo

						// - Парсинг того, что через пробел (аргумент команды)
						// - Где-то решалось, но как?

				} // is(#boxes_area)?
				else {
					$('.con').append('Zigog: #boxes_area not defined! <br/>');
				}				
			}



			if (a=='fff') {
				$('.con').append('fff cmd exec! <br/>');
			}
			if (a=='AAA') {
				$('.con').append('AAA cmd exec! <br/>');
			}
			/*
			if (a=='r') {
				$('.con').append('RUN cmd exec! <br/>');

			}
			*/

		}


		if (ctrlDown && c==67) {
			$('.con').append('ctrl + c <br/>');
		}
		if (ctrlDown && c==13) {
			$('.con').append('ctrl + enter <br/>');

			/*
			a = $('div#txtIn input').html();
			$('div#wrk_area').append(a + '<br/>');
			a = $('div#txtIn input').text();
			$('div#wrk_area').append(a + '<br/>');
			*/
			
			a = $('div#txtIn input').val();
			$('div#txtIn input').val("");
			
			//$('div#wrk_area').append('<div id="note_2">' + a + '</div>');

			// do_ajax_4 Добавлние новой заметки
			res = ajax2("do_ajax_4.pl", null , a); // "null" в данном случае - заглушка
			$('#wrk_area').append(res);

		}
 	});

// Поиск
// Добавляем обработчики завершения ajax-запросов по поиску

	// Окончание обработки search.pl
	$(document).ajaxComplete(function(event, xhr, settings) {
		// $( ".con" ).append( ">>>> " + settings.url );
		if (/search.pl/m.test(settings.url)) {
		// $('#wrk_area').prepend('BBB');	

			// function container_mouseover () {
			// 	$("#more", this).css("visibility","visible");
			// }

			// function container_mouseout () {
			// 	$("#more", this).css("visibility","hidden");
			// }

			/*
				Убираем семафор. Неясно только как его потом взад восстаналивать
			*/
			$('#semafor').css('visibility', 'hidden');



			$('#wrk_area #container').bind("mouseover", function() {
				$("#more", this).css("visibility","visible");				
			});
			$('#wrk_area #container').bind("mouseout", function() {
				$("#more", this).css("visibility","hidden");				
			});

			$('#wrk_area #container').bind('click', container_s_click);


			// Нормализация блоков

			$('div#frame').each(function () {
				res = 0; // Похоже сбрасывать нужно перед каждым блоком?
				// Дублирование
				var x = 4; // Кол-во пряжек в ряд в каталоге
				// Нахождение числа блоков, которыми нужно дополнить секцию до кратности 4
				cnt  = $(this).find('div#wrap_cont_m3').size();
				// $('.con2').append("cnt = " + cnt + ", ");
				if ((cnt % x) != 0) {
					n = cnt / x | 0; // Такое вот хитрое бинарное извлечение целой части деления
					res = (n+1)*x - cnt;
				}
				// $('.con2').append("res "+ res + ", ");

				for (var i = 0; i < res; i++) {$(this).append('<div id="wrap_cont_m3_hollow"></div>');};
				res = 0; // Сбрасываем счетчик дополнения
			});
			/* Раскраска */
			$('div#wrap_cont_m3').each(function () {
				if ($(this).hasClass('regular')) {
					$(this).find('div#block_a').css("background","#5a5a5a");
					$(this).find('div#block_b').css("background","#5a5a5a");
	    			$(this).find('div#block_d').css("background","#5a5a5a");
	    			$(this).find('div#block_e').css("background","#5a5a5a");
	    			// $(this).find('div#wrap_cont_m3_hollow').css("background","#5a5a5a");
	    		}
				if ($(this).hasClass('super')) {
					$(this).find('div#block_a').css("background","#747474");
					$(this).find('div#block_b').css("background","#747474");
	    			$(this).find('div#block_d').css("background","#747474");
	    			$(this).find('div#block_e').css("background","#747474");
	    			// $(this).find('div#wrap_cont_m3_hollow').css("background","#747474");
	    		}
				if ($(this).hasClass('zakaz')) {
					$(this).find('div#block_a').css("background","#9b9b9b");
					$(this).find('div#block_b').css("background","#9b9b9b");
	    			$(this).find('div#block_d').css("background","#9b9b9b");
	    			$(this).find('div#block_e').css("background","#9b9b9b");
	    			// $(this).find('div#wrap_cont_m3_hollow').css("background","#9b9b9b");
	    		}
			});			




			// $('#wrk_area').append("111");

/*
// Старая ветка
			// $( ".con" ).append( "<h3>" + "search" + "</h3>");

			// // Корректировка стилей (из-за отсутств. search.css)
			// $('div#search_res span').each(function ()	 {
			// 	$(this).css("color","blue");
			// 	$(this).css("cursor","pointer");
			// });



		// 	// Обработчик событий для каждого элемента поиска
		// if ($('div#search_res span').length() <= 20) {


			$('div#search_res span').bind('click', function() {
				$('.con').append($(this).html() + "<br/>");
				ajax5("load_one.pl", "", $(this).html()); // Поиск выбранной из списка пряжки в базе
			});

			$('div#search_res span').trigger('click');

			// Перемещение результатов запроса из консоли в раб. обл.
			// $('div#search_res').appendTo('#wrk_area');



			// $('div#search_res span').css("margin-top","20px");

			// $('div#search_res div#container').bind( 'click', container_click);
			// $('div#search_res div#container').addClass('wrappedElement');

			// Запрос на поиск завершен, очищаем поле вывода
			clear_cat(); // Очистка таблицы перед загрузкой

			// Переписываем колонку размеров - универсальная
			$('td#one').html(""); $('tr#two').remove(); $('tr#three').remove();
			$('img#button_foot').css("visibility","hidden"); // Запрещаем кнопку показать еще


*/




		}
	});



	// Поиск, определение собятия по щелчку на кнопке
	// $('div#search').bind('click', function() {
	$('div#search #search_but').bind('click', function() {
		// $('body').append('AAA');
			a = $('div#search input').val();
		if (a != "") {
			// Считывание команды из командной строки
			//$('body').append(a + ' <br/>');
			$('div#search input').val(""); // Стирание введеной команды

			// Старый вариант кода
			localStorage.as_search = "";
			localStorage.as_search = a;

/*
			// Уже устаревший // Новый вариант, с результатами в каталог
			ajax5("search.pl", a, "arg2");
*/
			
			clear_cat(); // Очистка таблицы перед загрузкой
			$('#film').remove(); // $('#sblock').remove(); $("table#tbl_cat").remove(); $('img#button_foot').remove();

			pryajka_type = "search"; // Устанавливаем тип выбранной пряжки
			$('div#side_cat_name').html('Результаты поиска');
		
			ajax4("search.pl", a, "", $('div#wrk_area'));

			// $('html, body').animate({scrollTop: 600}, 800); // К каталогу

		}	
	});


/* Конец обработки поиска */


/* Просчет семафора? */

	/* Глобальная видимость? */
var fr_hash 	= {}; // frames_hash, хеш кадров
function recalc_semafor () {
		// Очистка хеша на случай перезапуска
		for(var key in fr_hash) { delete fr_hash[key]; }

		var fr_offset   = 0; // Может начинать надо не с нуля?
		// var fr_offset   = 150; // Значение для свернутого меню
		var fr_offset   = -100; // Значение для свернутого меню

		var mstate = localStorage.getItem('as_menu_state')
		// if (mstate=='initial_state') fr_offset = 150;
		if (mstate=='initial_state') fr_offset = -100;
		// if (mstate=='opened_lit_e')  fr_offset = 350;
		if (mstate=='opened_lit_e')  fr_offset = 50;

		/* Отстроить пока нет возможности */
		if (mstate=='opened_sht') 	 fr_offset = 150;


		// $('.con2').append('recalc: ' + mstate + " " + fr_offset + "<br/>");
		// $('.con2').append('cur_state: ' + mstate + "<br/>");
		// $('.con2').append('cur_fr_off: ' + fr_offset + "<br/>");

		$('div#frame').each(function () {
			fr_offset += parseInt($(this).css('height'));
			fr_class   = $(this).attr('class');
			// $('.con2').append(fr_offset + " " + fr_class + "<br/>");

			//	Создаем хеш для хранения таблицы смещений и соотв. расположенных по этому адресу кадров - reg, sup, zak

			// fr_hash[fr_offset] = "aa"; //fr_class.toString();

			fr_hash[fr_offset] = fr_class;
		});
		
		// Отладка
/*
		// for(var key in fr_hash) { $('.con2').append(key + " : " + fr_hash[key] + "<br/>") }; // Проверка хеша
		// Списком
		// for(var key in fr_hash) { $('.con2').append(key + " : " + fr_hash[key] + " ") }; // Проверка хеша

		var loop = 0;
		for(var key in fr_hash) {
			++loop; 
			$('.con2').append(key + " : " + fr_hash[key] + ", ") 
	
			if (loop > 3) { $('.con2').append(" ...<br/>"); break; } 
		}; // Проверка хеша
			$('.con2').append('frame len: ' + $('div#frame').length + "<br/>");
			$('div#frame').each(function () {
					fr_class   = $(this).attr('class');
					$('.con2').append(fr_class + ", ");
			});
			$('.con2').append("<br/>__________________________<br/>");
*/
	} // recalc_semafor
/* Конец просчет семафора? */

// Привязка событий

function bind_lit_e () {
	// Привязка событий к новому меню, раздел "Литье"
/*	
	$('img#img_cat_lit_1' ).bind( 'click',  cat_1_click );
	$('img#img_cat_lit_2' ).bind( 'click',  cat_2_click );
	$('img#img_cat_lit_3' ).bind( 'click',  cat_3_click);
	$('img#img_cat_lit_4' ).bind( 'click',  cat_4_click );
	$('img#img_cat_lit_5' ).bind( 'click',  cat_2_click );
	$('img#img_cat_lit_6' ).bind( 'click',  cat_2_click );
	$('img#img_cat_lit_7' ).bind( 'click',  cat_10_click );
	$('img#img_cat_lit_8' ).bind( 'click',  cat_5_click );
	$('img#img_cat_lit_9' ).bind( 'click',  cat_9_click );
	$('img#img_cat_lit_10').bind( 'click',  cat_5_click);
	$('img#img_cat_lit_11').bind( 'click',  cat_7_click);
	$('img#img_cat_lit_12').bind( 'click',  cat_8_click);
	$('img#img_cat_lit_13').bind( 'click',  cat_9_click);
	$('img#img_cat_lit_14').bind( 'click',  cat_6_click);
	$('img#img_cat_lit_15').bind( 'click',  cat_2_click);
*/
	$('div#menuitem_1' ).bind( 'click',  cat_1_click );
	$('div#menuitem_2' ).bind( 'click',  cat_2_click );
	$('div#menuitem_3' ).bind( 'click',  cat_3_click);
	$('div#menuitem_4' ).bind( 'click',  cat_4_click );
	
	// Эксперимент
	// function cat_click_uni (cat, aux_nfo, col, size, scroll)
	// $('div#menuitem_5' ).bind( 'click',  cat_click_uni('peretyagki', 'РАБОЧАЯ', '07', '20', '500'));
	// $('div#menuitem_5' ).bind( 'click',  cat_click_uni('rabochaya', 'РАБОЧАЯ', 'xx', 'xx', '500'));
	
	// Запуск универсальной функции загрузки через функцию-обертку
	$('div#menuitem_5' 	).bind( 'click',  cat_u5 );
	$('div#menuitem_6' 	).bind( 'click',  cat_u6 );
	$('div#menuitem_7' 	).bind( 'click',  cat_u7 );
	$('div#menuitem_8' 	).bind( 'click',  cat_u8 );
	$('div#menuitem_9' 	).bind( 'click',  cat_u9 );
	// $('div#menuitem_10' ).bind( 'click',  cat_u10);
	$('div#menuitem_11' ).bind( 'click',  cat_u11);
	$('div#menuitem_12' ).bind( 'click',  cat_u12);
	$('div#menuitem_13' ).bind( 'click',  cat_u13);
	$('div#menuitem_14' ).bind( 'click',  cat_u14);
	// $('div#menuitem_15' ).bind( 'click',  cat_u15);

/*	
	$('div#menuitem_5' ).bind( 'click',  cat_11_click );
	$('div#menuitem_6' ).bind( 'click',  cat_7_click );
	$('div#menuitem_7' ).bind( 'click',  cat_8_click );
	$('div#menuitem_8' ).bind( 'click',  cat_9_click );
	$('div#menuitem_9' ).bind( 'click',  cat_6_click );
	// $('div#menuitem_10').bind( 'click',  cat_5_click); // Кнопки
	$('div#menuitem_11').bind( 'click',  cat_12_click); // Мокасинов. перет.
	$('div#menuitem_12').bind( 'click',  cat_10_click);
	$('div#menuitem_13').bind( 'click',  cat_5_click);
	$('div#menuitem_14').bind( 'click',  cat_13_click); // Наконечники
	// $('div#menuitem_15').bind( 'click',  cat_2_click); // Разное
*/

	/* Устанавливаем состояние меню */
///*
	localStorage.as_menu_state = "";
	localStorage.as_menu_state = "opened_lit_e";
	$( ".con2" ).append( "STATE: Lit-e" + "<br/>");
//*/	
	recalc_semafor(); // Пересчет семаформа
}


// Пробная анимация меню каталога

/*
	Анимация меню литья
*/
	// function runEffect() 	{ $( ".effect" ).effect( 'clip', {}, 800, callback ); };
	function runEffect() 	{ $( ".effect" ).effect( 'clip', {}, 500, callback ); };

	function callback() 	{ $( ".effect" ).remove(); runEffect2(); };

	function runEffect2() {
		// $( ".effect2" ).hide().fadeOut(500); // Скрыть правую часть меню (штамповку)		
		$( ".effect2" ).hide().fadeOut(300); // Скрыть правую часть меню (штамповку)		
		$( "#mount_1" ).css('background','url(../img/backp_2.png) repeat'); // Установить у подложки фон, чтобы она была видна при анимации
		// $( "#menu_wrap" ).animate({height: 750}, 200); // Чтобы отъехал каталог с пряжкой				
		
		// $( "#menu_wrap" ).animate({height: 750}, 100); // Чтобы отъехал каталог с пряжкой				
		$( "#menu_wrap" ).animate({height: 481}, 100); // Чтобы отъехал каталог с пряжкой				
		$( "#mount_2" ).remove();
		// $( "#mount_1" ).animate({width: 1000}, 500)
		
		// $( "#mount_1" ).animate({width: 1000}, 200)
		$( "#mount_1" ).animate({width: 640}, 200)
					   // .animate({height: 700}, 600, callback2);
		
					   // .animate({height: 700}, 300, callback2);
					   .animate({height: 449}, 300, callback2);
		// $( "#mount_1" ).animate({width: 1000}, 200)
		// 			   // .animate({height: 700}, 600, callback2);
		// 			   .animate({height: 700}, 300, callback2);
	};

	function callback2() {
		$( ".effect2" ).remove(); // Удаляем исходный контейнер с левым меню
		setTimeout(function() {
/*
	Ветка литья при загрузке сайта
*/
// [fold~ N9Hq]
// [fold~ tslf]
// [fold~ LDtK]
		$( "#mount_1" ).html('<div id="cat_menu_lit"><div id="menu_lit_e"><div id="m_1"><div id="zag_lit"><img id="lit" src="img/l.png"><p id="p_12">ЛИТЬЕ</p></div></div><div id="m_2"><div id="m_block"><div id="menuitem_1" class="m_pic"></div><div class="b-cat-title2">РАБОЧАЯ</div></div> <div id="m_block"><div id="menuitem_2" class="m_pic"></div><div class="b-cat-title2">ДЕКОР</div></div> <div id="m_block"><div id="menuitem_3" class="m_pic"></div><div class="b-cat-title2">КОЛЬЦА</div></div> <div id="m_block"><div id="menuitem_4" class="m_pic"></div><div class="b-cat-title2">ПЕРЕТЯЖКИ</div></div> <div id="m_block"><div id="menuitem_5" class="m_pic"></div><div class="b-cat-title2">ДЕКОРАТИВНЫЕ ПЕРЕТЯЖКИ</div></div>  <div id="m_block"><div id="menuitem_6" class="m_pic"></div><div class="b-cat-title2">БЛОЧКИ</div></div> <div id="m_block"><div id="menuitem_7" class="m_pic"></div><div class="b-cat-title2">ПЕТЛИ</div></div> <div id="m_block"><div id="menuitem_8" class="m_pic"></div><div class="b-cat-title2">КРЮЧКИ</div></div> <div id="m_block"><div id="menuitem_9" class="m_pic"></div><div class="b-cat-title2">ХОЛЬНИТЕНЫ</div></div> <div id="m_block"><div id="menuitem_10" class="m_pic"></div><div class="b-cat-title2">КНОПКИ</div></div>  <div id="m_block"><div id="menuitem_11" class="m_pic"></div><div class="b-cat-title2">МОКАСИНОВЫЕ ПЕРЕТЯЖКИ</div></div> <div id="m_block"><div id="menuitem_12" class="m_pic"></div><div class="b-cat-title2">ПОДШНУРОВКИ</div></div> <div id="m_block"><div id="menuitem_13" class="m_pic"></div><div class="b-cat-title2">БРЕНДЫ</div></div> <div id="m_block"><div id="menuitem_14" class="m_pic"></div><div class="b-cat-title2">НАКОНЕЧНИКИ</div></div> <div id="m_block"><div id="menuitem_15" class="m_pic"></div><div class="b-cat-title2">РАЗНОЕ</div></div></div></div><div id="anilink_1"> <img src="img/anilink_1.png" alt="" /></div></div>');
		
			$( "#mount_1" ).hide().fadeIn();
			bind_lit_e(); // Привязка событий к меню "Литье"
			// $('#anilink_1').bind('click', function() { $('#mount_1').hide().fadeOut(500, show_toggle_menu_1);});
			$('#anilink_1').bind('click', function() { $('#mount_1').hide().fadeOut(250, show_toggle_menu_1);});

			// Немного скрываем шапку сайта
			// $('html, body').animate({scrollTop: 138}, 800); // К каталогу
		
		// }, 500 );
		}, 250 );
	};
	// Анимация перехода из меню литье в меню штамповка
	function show_toggle_menu_1 (argument) {
		$( "#mount_1" ).remove();
		$('#menu_wrap').append('<div id="mount_2"></div>');
		// $( "#mount_2" ).css("width","1000px");
		$( "#mount_2" ).css("width","640px");
		// $( "#mount_2" ).css("height","501px");
		$( "#mount_2" ).css("height","320px");
		
		// $( "#menu_wrap" ).animate({height: 550}, 200); // Чтобы приехал каталог с пряжкой				
		$( "#menu_wrap" ).animate({height: 353}, 200); // Чтобы приехал каталог с пряжкой				
		$( "#mount_2" ).css("background","url(../img/backp.png) repeat");
		
/*
		// Старая версия штамповки
		$( "#mount_2" ).html('<div id="cat_menu_sht"> <div id="zag_sht"> <img id="sht" src="img/sh.png"> <p id="p_21">ШТАМПОВАННАЯ ФУРНИТУРА</p> </div> <table id="tbl_sht"> <tbody> <tr> <td> <div class="cat-img-wrap"> <img id="img_cat_lit_1" src="img/sht/2_1.png" num="1"/> </div> <span style="visibility: visible;" class="b-cat-title2">РАБОЧАЯ</span> </td> <td> <div class="cat-img-wrap"> <img id="img_cat_lit_2" src="img/sht/2_2.png" num="2"/> </div> <span style="visibility: visible;" class="b-cat-title2">ДЕКОР</span> </td> <td> <div class="cat-img-wrap"> <img id="img_cat_lit_3" src="img/sht/2_3.png" num="3"/> </div> <span style="visibility: visible;" class="b-cat-title2">ЛЮВЕРСЫ</span> </td> <td> <div class="cat-img-wrap"> <img id="img_cat_lit_4" src="img/sht/2_4.png" num="4"/> </div> <span style="visibility: visible;" class="b-cat-title2">ХОЛЬНИТЕН</span> </td> <td> <div class="cat-img-wrap"> <img id="img_cat_lit_5" src="img/sht/2_5.png" num="5"/> </div> <span style="visibility: visible;" class="b-cat-title2">БЛОЧКА</span> </td> </tr> <tr> <td> <div class="cat-img-wrap"> <img id="img_cat_lit_6" src="img/sht/2_6.png" num="6"/> </div> <span style="visibility: visible;" class="b-cat-title2">ПЕТЛИ</span> </td> <td> <div class="cat-img-wrap"> <img id="img_cat_lit_7" src="img/sht/2_7.png" num="7"/> </div> <span style="visibility: visible;" class="b-cat-title2">КРЮЧКИ</span> </td> <td> <div class="cat-img-wrap"> <img id="img_cat_lit_8" src="img/sht/2_8.png" num="8"/> </div> <span style="visibility: visible;" class="b-cat-title2">ПЕРЕТЯЖКИ</span> </td> <td> <div class="cat-img-wrap"> <img id="img_cat_lit_9" src="img/sht/2_9.png" num="9"/> </div> <span style="visibility: visible;" class="b-cat-title2">РАЗНОЕ</span> </td> </tr> </tbody> </table><div id="anilink_2"><img src="img/anilink_2.png" alt="" /></div></div>');
*/

		// $( "#mount_2" ).html('');
		$( "#mount_2" ).html('<div id="cat_menu_sht"> <div id="menu_sht"> <div id="m_1"> <div id="zag_lit"> <img id="lit" src="img/sh.png"> <p id="p_12">ШТАМПОВКА</p> </div> </div> <div id="m_2"> <div id="m_block"> <div id="menuitem_1_sh" class="m_pic"> </div> <div class="b-cat-title2">РАБОЧАЯ</div> </div> <div id="m_block"> <div id="menuitem_2_sh" class="m_pic"> </div><div class="b-cat-title2">ДЕКОР</div> </div> <div id="m_block"><div id="menuitem_3_sh" class="m_pic"> </div> <div class="b-cat-title2">ЛЮВЕРСЫ</div> </div> <div id="m_block"> <div id="menuitem_4_sh" class="m_pic"></div><div class="b-cat-title2">ХОЛЬНИТЕН</div> </div> <div id="m_block"><div id="menuitem_5_sh" class="m_pic"></div> <div class="b-cat-title2">БЛОЧКА</div> </div> <div id="m_block"> <div id="menuitem_6_sh" class="m_pic"> </div> <div class="b-cat-title2">ПЕТЛИ</div> </div> <div id="m_block"> <div id="menuitem_7_sh" class="m_pic"> </div><div class="b-cat-title2">КРЮЧКИ</div> </div> <div id="m_block"><div id="menuitem_8_sh" class="m_pic"> </div> <div class="b-cat-title2">ПЕРЕТЯЖКИ</div> </div> <div id="m_block"> <div id="menuitem_9_sh" class="m_pic"></div><div class="b-cat-title2">РАЗНОЕ</div> </div> </div> </div> <div id="anilink_2"> <img src="img/anilink_2.png" alt="" /></div> </div>');
		
		$( "#mount_2" ).hide().fadeIn();		
	//	(!) Тут должна быть привязка событий для штамповки


		/* 
			(?) Вроде бы корректное место для подгрузки штамповки при нажатии на кнопку анилинк-1 
			UPD Загрузка штамповки при нажатии на кнопку анилинк-1, состояние сайта - f5	
		*/

///*
		clear_cat(); // Очистка таблицы перед загрузкой

		// Сброс маркера цвета в палитре
		// $('div#side_color_sel img').remove(); 
		// $('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '11_01V' +'.png"></img>');
		// $('div#side_color_sel span').html('01V');

		// Сброс маркера цвета в палитре
		// $('div#side_color_sel img').remove(); 
		// $('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '05_04' +'.png"></img>');
		// $('div#side_color_sel span').html('04');


		$('#film').remove();

		pryajka_type = "rabochaya_sh"; $('div#side_cat_name').html('Штамповка');
	
		a1 = "rabochaya-sh_xx_xx"; a2 = "";	dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);

		// $('html, body').animate({scrollTop: 138}, 800); // К каталогу
//*/

		/* Состояние меню, анилинк */
		localStorage.as_menu_state = "";
		localStorage.as_menu_state = "opened_sht";
		recalc_semafor(); // Пересчет семаформа



		// Событие для штамповки
		$('#anilink_2').bind('click', function() { $('#mount_2').hide().fadeOut(500, show_toggle_menu_2);});
	}

	function show_toggle_menu_2 (argument) {
		$( "#mount_2" ).remove();
		$('#menu_wrap').append('<div id="mount_1"></div>');
		$( "#mount_1" ).css("width","640px");
		// $( "#mount_1" ).css("width","1000px");
		
		/*(!) Похоже тут ошибка - должно быть 449 */
		// $( "#mount_1" ).css("height","481px");
		$( "#mount_1" ).css("height","449px");
		// $( "#mount_1" ).css("height","750px");
		// $( "#menu_wrap" ).animate({height: 750}, 200); // Чтобы приехал каталог с пряжкой				
		$( "#menu_wrap" ).animate({height: 481}, 200); // Чтобы приехал каталог с пряжкой				
		$( "#mount_1" ).css("background","url(../img/backp.png) repeat");
		
/*
	Ветка при переходе из штамповки в литье

	UPD При нажатии на кнопку анилинк-2 происходит переход в литье
*/
			// Грузим то же, что и по умолчанию в литье
			clear_cat(); // Очистка таблицы перед загрузкой

			$('#film').remove(); // $('#sblock').remove();
// [fold~ YiM0]
			/*
				Правка цвета по умолчанию на 7P, для отображения на F5 двух цветов, 7P и 01V
			*/
			$('div#side_color_sel img').remove(); 
			$('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '03_7P' +'.png"></img>');
			$('div#side_color_sel span').html('7P');


			// decor kolca peretyagki holnitenu blochka krjuchki
			pryajka_type = "rabochaya"; // Устанавливаем тип выбранной пряжки
			$('div#side_cat_name').html('Рабочая');

			// $('body').append('анилинк-2 click<br/>');
		
			// a1 = "rabochaya_08-10-12_xx"; a2 = "";	dest = $('table#tbl_cat');
			// a1 = "rabochaya_xx_xx"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');
///*			
			// a1 = "rabochaya_xx_7P"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');

			/* Будет два цвета, как при инициализации */
			a1 = "rabochaya_xx_xx"; a2 = "";	dest = $('div#wrk_area'); //dest = $('table#tbl_cat');

			ajax4("load_uni.pl", a1, a2, dest);
//*/
			// $('body').append('анилинк-2 click<br/>');

			// $('html, body').animate({scrollTop: 138}, 800); // К каталогу

		/* Состояние меню, анилинк */
		localStorage.as_menu_state = "";
		localStorage.as_menu_state = "opened_lit_e";
		recalc_semafor(); // Пересчет семаформа


// [fold~ Ljm7]			
// [fold~ WI9z]
// [fold~ QVnM]
		$( "#mount_1" ).html('<div id="cat_menu_lit"><div id="menu_lit_e"><div id="m_1"><div id="zag_lit"><img id="lit" src="img/l.png"><p id="p_12">ЛИТЬЕ</p></div></div><div id="m_2"><div id="m_block"><div id="menuitem_1" class="m_pic"></div><div class="b-cat-title2">РАБОЧАЯ</div></div> <div id="m_block"><div id="menuitem_2" class="m_pic"></div><div class="b-cat-title2">ДЕКОР</div></div> <div id="m_block"><div id="menuitem_3" class="m_pic"></div><div class="b-cat-title2">КОЛЬЦА</div></div> <div id="m_block"><div id="menuitem_4" class="m_pic"></div><div class="b-cat-title2">ПЕРЕТЯЖКИ</div></div> <div id="m_block"><div id="menuitem_5" class="m_pic"></div><div class="b-cat-title2">ДЕКОРАТИВНЫЕ ПЕРЕТЯЖКИ</div></div>  <div id="m_block"><div id="menuitem_6" class="m_pic"></div><div class="b-cat-title2">БЛОЧКИ</div></div> <div id="m_block"><div id="menuitem_7" class="m_pic"></div><div class="b-cat-title2">ПЕТЛИ</div></div> <div id="m_block"><div id="menuitem_8" class="m_pic"></div><div class="b-cat-title2">КРЮЧКИ</div></div> <div id="m_block"><div id="menuitem_9" class="m_pic"></div><div class="b-cat-title2">ХОЛЬНИТЕНЫ</div></div> <div id="m_block"><div id="menuitem_10" class="m_pic"></div><div class="b-cat-title2">КНОПКИ</div></div>  <div id="m_block"><div id="menuitem_11" class="m_pic"></div><div class="b-cat-title2">МОКАСИНОВЫЕ ПЕРЕТЯЖКИ</div></div> <div id="m_block"><div id="menuitem_12" class="m_pic"></div><div class="b-cat-title2">ПОДШНУРОВКИ</div></div> <div id="m_block"><div id="menuitem_13" class="m_pic"></div><div class="b-cat-title2">БРЕНДЫ</div></div> <div id="m_block"><div id="menuitem_14" class="m_pic"></div><div class="b-cat-title2">НАКОНЕЧНИКИ</div></div> <div id="m_block"><div id="menuitem_15" class="m_pic"></div><div class="b-cat-title2">РАЗНОЕ</div></div></div></div><div id="anilink_1"> <img src="img/anilink_1.png" alt="" /></div></div>');
		
		$( "#mount_1" ).hide().fadeIn();		
		bind_lit_e(); // Привязка событий к меню "Литье"

		// Событие для литья
		$('#anilink_1').bind('click', function() { $('#mount_1').hide().fadeOut(500, show_toggle_menu_1);});
	}


	// Старт анимации меню литья при щелчке по левой панели стартового меню
	$('div#cat_menu_1').bind('click', function() {
		runEffect();
	});




/*
	Анимация меню штамповки
*/

	// function runEffect_a() 	{ $( ".effect2" ).effect( 'clip', {}, 800, callback_a ); };
	function runEffect_a() 	{ $( ".effect2" ).effect( 'clip', {}, 500, callback_a ); };
	function callback_a() 	{ $( ".effect2" ).remove(); runEffect2_a(); };

	function runEffect2_a() {
		// $( ".effect" ).hide().fadeOut(500); // Скрыть правую часть меню (штамповку)		
		$( ".effect" ).hide().fadeOut(300); // Скрыть правую часть меню (штамповку)		
		
		// $( "#mount_2" ).css('background','url(../img/backp_2.png) repeat'); // Установить у подложки фон, чтобы она была видна при анимации
		// $( "#menu_wrap" ).animate({height: 550}, 200); // Чтобы отъехал каталог с пряжкой				
		$( "#menu_wrap" ).animate({height: 353}, 200); // Чтобы отъехал каталог с пряжкой				
		$( "#mount_1" ).remove();		

		$( "#mount_2" )
					   // .animate({left: 0}, 500)
					   // .animate({left:'-=100px'}, 500)
					   .animate({left:'-=100px'}, 300)
					   .css('background','url(../img/backp_2.png) repeat')
					   // .animate({width: 1000}, 500)
					   // .animate({width: 1000}, 300)
					   .animate({width: 640}, 300)
					   // .animate({height: 500}, 200, callback2_a );
					   .animate({height: 320}, 200, callback2_a );
	};

///*
	function callback2_a() {
		$( ".effect" ).remove(); // Удаляем исходный контейнер с левым меню
		setTimeout(function() {

			$( "#mount_2" ).html('<div id="cat_menu_sht"> <div id="menu_sht"> <div id="m_1"> <div id="zag_lit"> <img id="lit" src="img/sh.png"> <p id="p_12">ШТАМПОВКА</p> </div> </div> <div id="m_2"> <div id="m_block"> <div id="menuitem_1_sh" class="m_pic"> </div> <div class="b-cat-title2">РАБОЧАЯ</div> </div> <div id="m_block"> <div id="menuitem_2_sh" class="m_pic"> </div><div class="b-cat-title2">ДЕКОР</div> </div> <div id="m_block"><div id="menuitem_3_sh" class="m_pic"> </div> <div class="b-cat-title2">ЛЮВЕРСЫ</div> </div> <div id="m_block"> <div id="menuitem_4_sh" class="m_pic"></div><div class="b-cat-title2">ХОЛЬНИТЕН</div> </div> <div id="m_block"><div id="menuitem_5_sh" class="m_pic"></div> <div class="b-cat-title2">БЛОЧКА</div> </div> <div id="m_block"> <div id="menuitem_6_sh" class="m_pic"> </div> <div class="b-cat-title2">ПЕТЛИ</div> </div> <div id="m_block"> <div id="menuitem_7_sh" class="m_pic"> </div><div class="b-cat-title2">КРЮЧКИ</div> </div> <div id="m_block"><div id="menuitem_8_sh" class="m_pic"> </div> <div class="b-cat-title2">ПЕРЕТЯЖКИ</div> </div> <div id="m_block"> <div id="menuitem_9_sh" class="m_pic"></div><div class="b-cat-title2">РАЗНОЕ</div> </div> </div> </div> <div id="anilink_2"> <img src="img/anilink_2.png" alt="" /></div> </div>');

			$( "#mount_2" ).hide().fadeIn();
			// bind_lit_e(); // Привязка событий к меню "Литье"

			// $('#anilink_2').bind('click', function() { $('#mount_2').hide().fadeOut(500, show_toggle_menu_2);});
			$('#anilink_2').bind('click', function() { $('#mount_2').hide().fadeOut(300, show_toggle_menu_2);});



///*
	// (?!) WTF
			// Дефолтная загрузка
		clear_cat(); $('#film').remove(); // $("table#tbl_cat tr").remove(); $('img#button_foot').remove();
		pryajka_type = "rabochaya_sh"; // Устанавливаем тип выбранной пряжки
		$('div#side_cat_name').html('Штамповка');	
		a1 = "rabochaya-sh_xx_xx"; a2 = "";	dest = $('#wrk_area');
		ajax4("load_uni.pl", a1, a2, dest);
		// $('html, body').animate({scrollTop: 600}, 800); // К каталогу

//*/

	/* Это уже третий раз! */
		// $('html, body').animate({scrollTop: 600}, 400); // К каталогу
		// $('html, body').animate({scrollTop: 138}, 400); // К каталогу
		// $('body').prepend('sh_load()<br/>');


		/* Состояние меню */
		localStorage.as_menu_state = "";
		localStorage.as_menu_state = "opened_sht";
		recalc_semafor(); // Пересчет семаформа


/*
		// Экспериментальная загрузка штампованной рабочей пряжки
		$('div#menu_wrap').find('img').eq(1).bind('click', function() {
			// $('body').prepend('sh<br/>');

			$('body').prepend('Экспериментальная штамповка ()<br/>');

			clear_cat(); // Очистка таблицы перед загрузкой
			// Сброс маркера цвета в палитре
			// $('div#side_color_sel img').remove(); 
			// $('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '11_01V' +'.png"></img>');
			// $('div#side_color_sel span').html('01V');

			// Сброс маркера цвета в палитре
			// $('div#side_color_sel img').remove(); 
			// $('div#side_color_sel div.cat-img-wrap').append('<img height="100" width="100" src="img/palitra/' +  '05_04' +'.png"></img>');
			// $('div#side_color_sel span').html('04');

			$('#film').remove();
			// $("table#tbl_cat tr").remove();
			// $('img#button_foot').remove();

			// decor kolca peretyagki holnitenu blochka krjuchki
			pryajka_type = "rabochaya_sh"; // Устанавливаем тип выбранной пряжки
			$('div#side_cat_name').html('Штамповка');
		
			a1 = "rabochaya-sh_xx_xx"; a2 = "";	dest = $('#wrk_area');
			ajax4("load_uni.pl", a1, a2, dest);

			// $('html, body').animate({scrollTop: 600}, 800); // К каталогу
			// Немного скрываем шапку сайта
			$('html, body').animate({scrollTop: 138}, 800); // К каталогу

			$('body').prepend('sh_load()<br/>');
		});
*/



		}, 500 );
	};
//*/


	// Старт анимации меню штамповки при щелчке по правой панели стартового меню
	$('div#cat_menu_2').bind('click', function() {
		runEffect_a();		
	});

/* Конец анимации главного меню */



	/* Уточнение координат палитры при масштабировании и отрисовке */
	function key_1_click () {
//		$('.con').append('key_1_click()<br/>');
		//clear_cat();

//		var br=this.getBoundingClientRect()
		//$('.con')
		//this = $('.con');
//		var br=this.getBoundingClientRect();
		// ToDo 1) Переделать в виде отдельной функции 2) Оптимизировать
		// Переопределение пульта в новые координаты при масштабировании

		// var br=$('#cat_menu').get(0).getBoundingClientRect();
/*
		// (!)
		// Ветка с уточением пульта, уже не работает
		var br=$('#header').get(0).getBoundingClientRect();

		// var br2=$('#sideLeft').get(0).getBoundingClientRect();
		var br2=$('#sideLeft').get(0).getBoundingClientRect();
		//alert("Top:"+br.top+", Left:"+br.left+", Right:"+br.right+", Bottom:"+br.bottom
		str = "Top:"+br.top+", Left:"+br.left+", Right:"+br.right+", Bottom:"+br.bottom;	
		str2 = "Top:"+br2.top+", Left:"+br2.left+", Right:"+br2.right+", Bottom:"+br2.bottom;	
		// $('.con').append(str+'<br/>');
		// $('.con').append(str2+'<br/>');
		len = br2.right - br2.left 
		// $('.con').append("len: " + len +'<br/>')
		res = br.left - len - 5;
		// $('.con').append("res: " + res +'<br/>')
		res.toString();
		$('#sideLeft').css("left", res);
		$('#search').css("left", res + 45); //div пульта шире
*/

		$('.con2').html('');
		/*
			Поскольку пульта уже нет, то уточенние по гориз. нужно делать по другому объекту
		*/
		// Премещение палитры к пульту
		// var br2=$('#sideLeft').get(0).getBoundingClientRect(); // Почему надо второй раз???
		
		if ($('#col_menu').length) {
			// Коорд. обертки нового пульта
			var br2=$('#pult_outer').get(0).getBoundingClientRect();	
			// Коорд. палитры
			var br1=$('#col_menu').get(0).getBoundingClientRect();
			pal_len = br1.left - br1.right;

			// + x смещение от пульта
			// tmp = br2.right + 50; tmp.toString();
			tmp = br2.left + pal_len - 5; tmp.toString();
			$('.con2').append(br2.left + "<br/>");	
			// $('body').prepend(br2.right + "<br/>");	
			// $('.con').append($('#col_menu').css("left") + "<br/>");	
			$('#col_menu').css("left", tmp);
			// $('.con').append($('#col_menu').css("left") + "<br/>");			

			// Корректировка по вертикали, + y - смещение сверху
			tmp = br2.top - 10; tmp.toString();
			$('#col_menu').css("top", tmp);
		}
	}


	/*
		Пересчет позиции семафора при масштабировании

		Определям координаты шапки сайта и по ним ориентируем метку #semafor.
		Результат работы функции getBoundingClientRect() нужно вручную приводить
		к строковому типу
	*/
	function fix_semafor () { // Уточнение координат метки #semafor сбоку ленты каталога
		var br=$('#header').get(0).getBoundingClientRect();
		res = br.right - 1;   res.toString();
		$('#semafor').css("left", res);

		// var br=$('#header').get(0).getBoundingClientRect();
		// res = br.top + 570;   res.toString();
		// $('.button-up').css("top", res);
	}

	/*
		Пересчет пульта к середине 
	*/
function fix_center_pult () {
		/* Корректировка по центру */
		$('.con2').prepend('fix pult'  +'<br/>');
		el = $('div#pult');
	    var wwidth  = (window.innerWidth > 0) ? window.innerWidth : screen.width; /* iPadобразно */
		var wheight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
		var cH = parseInt(el.css("height")); // Уточняем габариты блока
		var cW = parseInt(el.css("width"));

	 	var mW = wwidth  / 2 - cW / 2; // Находим лев. верхн. точку, учитыв. габар. объекта
	 	var mH = wheight / 2 - cH / 2;

	 	var mW = wwidth  / 2;
	 	var mH = wheight / 2;

	 	/* 
	 		Небольшая корректировка из-за смещения несимметричности экрана
	 	*/
		mH -= 150;	 	
	 	
	 	el.css("top",  mH);
}

/*	
	Корректирока по высоте пульта, когда он раскрыт	
	UPD Нужно пропорционально экрану корректировать высоту "щек"
*/
function fix_center_pult_inner () {
		/* Корректировка по центру */
		$('.con2').prepend('fix pult_outer'  +'<br/>');

		el2 = $('div#cheek_upper');
		el3 = $('div#cheek_lower');
		cheek_lower_height = parseInt(el2.css("height"));
		cheek_upper_height = parseInt(el3.css("height"));
		pult_height 	   = parseInt(el.css("height"));

		el = $('div#pult_outer');
	    // var wwidth  = (window.innerWidth > 0) ? window.innerWidth : screen.width; /* iPadобразно */
		var wheight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

		// $('.con2').prepend('wheight ' + wheight +'<br/>');
		// $('.con2').prepend('rea ' + (wheight - pult_height) +'<br/>');
		cheeks_new_height = (wheight - pult_height - 150) / 2; 
		el2.css("height",  cheeks_new_height);
		el3.css("height",  cheeks_new_height);
		// $('.con2').prepend('cheeks_new_height ' + cheeks_new_height +'<br/>');

		var cH = parseInt(el.css("height")); // Уточняем габариты блока
		// var cW = parseInt(el.css("width"));

	 	// var mW = wwidth  / 2 - cW / 2; // Находим лев. верхн. точку, учитыв. габар. объекта
	 	// var mt = (wheight - cH) / 2 * -1;
	 	var mt = (wheight - cH) / 2;


	 	/*$('.con2').prepend('wheight> ' + wheight + 'mt> ' + mt +'<br/>');*/
	 	// $('.con2').prepend('cH> ' + cH +'<br/>');
	 	// $('.con2').prepend('mt> ' + mt +'<br/>');

	 	// var mW = wwidth  / 2;
	 	// var mH = wheight / 2;

	 	/* 
	 		Небольшая корректировка из-за смещения несимметричности экрана
	 	*/
		// mt -= 200;	

		// Из-за глюков в стилях
		// mt += 20; 	
	 	
	 	// el.css("margin-top",  mt);


	 	// el.css("top",  mt);


}



	// Центровка при старте страницы
	fix_center_pult();

/* Реакция на масштабирование окна */
	$(window).resize(function() {
// [fold~ V9Je]
		
		// Исправл. коорд. плав. элем. по отнош. к кат. при масштабир. сайта
/*
		// (!)  Коррекция пульта, но теперь она не актулальна
*/

/*		if (!($('div#col_menu').length)) {}
		else 
*/			
		key_1_click();	// ok



/*
		// Временное отключение
		fix_semafor();
*/
		fix_center_pult();

		// Корректировка отступа от верха при масштабировании
		fix_center_pult_inner();
/*
		// (!) Диалоговая система в каталоге уже давно неактивна
		// Позиционир. диал. окон при масштаб. окна браузера
		$.fn.dial_zakaz_refresh();
		$.fn.report_zakaz_refresh();
*/

		// Устаревший фрагмент времен эпопеи с крбчками и петлями
// [fold~ 8GoS]


	});



/* 
	20_05_14
	Переработка отработчика завершения запроса ajax
*/
	$(document).ajaxComplete(function(event, xhr, settings) {
		// $( ".con" ).append( ">>>> " + settings.url );
		if (/load_uni.pl/m.test(settings.url)) {

		$( ".con2" ).append( ">>>> load_uni executed <br/>" );


		// Обновление пользовательского выбора по корзине (набор отмеченных пряжек)
		/*
			Построение набора пряжки по полученному хешу из ls. Каждой пряжке входящей в набор 
			подсвечиваем иконку корзины
		*/
		for(var key in hash) {
			// [fold~h44s]
		} // for(var key in hash)

		/*
			Привязка события click к кнопке корзины в каталоге
		*/
	 	$('div#block_d_basket').bind('click', function() {
		// [fold~2vSS]
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
		} // else 

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
		$('body').append('');

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
		recalc_semafor();

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



/* Высплывающее меню сверху */
	 $(function() {
		// [fold~gLwU]
	});

// (!) Не нужно ли это перенести в куда-то в иное место?
	 /* Реакция на прокрутку "длинного блока" */
$(function(){
  $('div#long_block').scroll(function(){
// [fold~YYjp]
});

		} // if(/load_uni/)

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
		


		// $('body').append("CORRECT<br/>");

	}); // ajaxComplete 'load_uni.pl'





// Работа с корзиной

// Корзина
	// $("body").append('<a href="basket.html"><div id="basket_wrap"><div id="basket"><div id="basket_reg"> REG </div></div><div id="basket_count">0</div></div></a>');

	// $("div#pan_c").append('<a href="basket1.html"><div id="basket_wrap"><div id="basket"><div id="basket_reg"></div></div><div id="basket_count">0</div></div></a>');
	
	// $("div#pan_c").append('<div id="basket_wrap"><div id="basket"><a href="my_cabinet2.html"><div id="basket_reg"></div></a></div><a href="basket1.html"><div id="basket_count">0</div></a><div id="basket_undebox"></div></div>');
	$("div#bite1").append('<div id="basket_wrap"><div id="basket"><a href="my_cabinet2.html"><div id="basket_reg"></div></a></div><a href="basket1.html"><div id="basket_count">0</div></a><div id="basket_undebox"></div></div>');



	/*
		Надпиcи о регистрации в корзине
	*/
	$('div#basket_reg').append('<a href="my_cabinet2.html"><span id=bsk_line_1>ВОЙТИ</span><span id=bsk_line_2>в личный кабинет</span></a>');

/*	
	// Кнопки переносятся 
	$('div#basket_undebox').append('<div id="cat_down_but" class="but_box sfix"><div id="img_down_but" class="but_img"></div><span class="but_title fix_01">СКАЧАТЬ<br/>КАТАЛОГ</span></div>');
	$('div#basket_undebox').append('<div id="cat_hint_but" class="but_box sfix"><div id="img_hint_but" class="but_img"></div><span class="but_title">ПОДСКАЗКА</span></div>');

*/
	$('div#but_cont').append('<div id="cat_down_but" class="but_box sfix"><div id="img_down_but" class="but_img"></div><span class="but_title fix_01">СКАЧАТЬ<br/>КАТАЛОГ</span></div>');
	$('div#but_cont').append('<div id="cat_hint_but" class="but_box sfix"><div id="img_hint_but" class="but_img"></div><span class="but_title">ПОДСКАЗКА</span></div>');


	/* События при нажатии на кнопки под корзиной */
	/* Скачать каталог */
	$('div#cat_down_but').bind('click', function() {
		window.location = "print1.html"
	});

	/* Подсказка */
	$('div#cat_down_but').bind('click', function() {
		window.location = "print1.html"
	});



	/*
		Это для корректности работы с ls
	*/
	// Создание переменной в ls, когда она еще не определена (~w)
	var ls = localStorage.getItem('as_01');
	// if (typeof sideBar !== 'undefined' && sideBar !== null) {
	if (typeof ls == 'undefined' || ls == null) { 			// && isBack !== null) {
		// alert('sideBar is undef');
		localStorage.as_01 = "";
		// alert(1);
		$('.con2').append("Тип переменной ls: " + typeof ls + "<br/>");
		$('.con2').append("Переменная ls активирована<br/>");
	}
	else { /*$('.con2').append("Переменная ls уже была ранее определена, тип: " + typeof ls + "<br/>");*/ }

	/*
		Загрузка набора отобранной пряжки из ls при каждом входе в каталог
	*/

	// Инициализация массива и хеша, т.к. они не определяются без хотя бы одного значения
	var arr 	= []; 
	var hash 	= {};

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
	// Определение списка пряжки в хеш
	var length = arr.length, element = null;
    // $('.con2').append('Длина массива: ' + length + "<br/>");
	for (var i = 0; i < length; i++) {
		element = arr[i];
		hash[element] = element; // Импортируем массив в хеш
	} 

	var bsize = Object.size(hash); 
	$('div#basket_count').html(bsize);

/*
	$('.con2').append('2 - hash size ' + bsize + '<br/>');

	for(var k in hash) { $('.con2').append('%' + hash[k] + " ") }; $('.con2').append('<br/>'); // Отобр. сод. ls для корз.
*/

/* Конец - Большой сырой кусок из старого каталога */




/* 
	Каталог + индивидуальная, 
	секция обработчиков событий
*/



	/*
		Привязка событий для пульта-палитры
	*/
	// $('div.pal_col').bind('click', function() {
	
function dial_pal_click() { 
		 // $(this).remove();
		/*
			Как быть с историей?
			Как быть с загрузкой неактивных цветов?
		*/

		a = $('div#ind_pryajka_m2').find('div#pr_block_c img').attr('src');
   	 	// $('.con2').append('cur: ' + a + "<br/>");
   	 	// Найти цвет this
   	 	pal_col_name = $(this).parent().find('div#pal_col_name').text();
   	 	// $('.con2').append('cur_col: ' + pal_col_name + "<br/>");
   	 	// Сменить разобрав имя текущей пряжки

		/*	
			Определяем постоянное имя текущей пряжки, разбираем для последующей подстановки размера
		*/
		el = $('div#ind_pryajka_m2').find('div#pr_block_c img');
		a_src = el.attr('src');
/*	
				(-)	0                      1 	 2  3 
					img/cat/rabochaya/i.FM-01496-08-1V.png
									  i.FM-01496-08-1V-44x44.png
*/		

		/*
			Отсечь регуляркой .png
			Сплит по '/' Затем реверс - номенклатура теперь первая
			Сплит по '-', цвет - эл. arr[3], пересобрать массив с любым кол-вом эл.
			заменить 
		*/
		a_src = a_src.replace(/(.*?)(\.png)/g, "$1"); // Отсекаем хвост

		// Сплит по '/'
		a_arr = a_src.split('/');

										// Последний эл. массива - номенклатура
   	 	$('.con2').append('@a last: ' + a_arr[a_arr.length-1] + "<br/>");

   	 	// Разбираем номенклатуру
   	 	b_arr = a_arr[a_arr.length-1].split('-');
   	 	b_arr[3] = pal_col_name; // Меняем на выбранный цвет
   	 	//res = b_arr.join('-'); // Сливаем массив в строку
   	 	a_arr[a_arr.length-1] = b_arr.join('-'); // Сливаем массив в строку
   	 	//$('.con2').append('res: ' + res + "<br/>");
   	 	res = a_arr.join('/'); // Сливаем конечную строку
   	 	$('.con2').append('res: ' + res + "<br/>");

   	 	res = res + '.png' // Возвращаем хвост


   	 	/*
   	 		Велосипед
   	 		(!) Доработка из-за рагульных пряжек. Мера временная .), возможны косяки
   	 		по добавлению/извлечению пряжки из корзины, поскольку привязываемся к имени пряжки

   	 		Проверка по цвету и типу (только для рабочей, только для неосновных цветов)

   	 		Работает, но по сути пиздец.
   	 	*/
   	 	$('.con2').html('');
		// $('.con2').append('curr src: ' + res + 'col: ' + pal_col_name + "<br/>");
		// $('.con2').append('a_src: ' + a_arr[2] + "<br/>");

		/*	
			Правка ориг. скрипта с инд. страницы
		*/

		// if (a_arr[2]=='rabochaya') {
		if (pryajka_type=='rabochaya') {
			if (pal_col_name=='01' || pal_col_name=='1V' || pal_col_name=='7P') {
			// if (pal_col_name=='01' || pal_col_name=='1V' || pal_col_name=='7P' || pal_col_name=='271') {
				$('.con2').append('Титульный цвет: ' + pal_col_name + "<br/>");

				/* 
					(!)
					Еще и тут нужен допил, из-за того, что после первого нажатия на нетитульный цвет
					теряем титульные цвета - это пиздец!
				*/
				$('.con2').append('RES: ' + res + "<br/>");
				//  0   1         2         3         
				//  img/cat_large/rabochaya/i.FM-01481-08-04K.png
				r1_arr = res.split('/');
				r1_arr[1] = 'cat_large';
				res = r1_arr.join('/');
			}
			else {
				/*
					Цвет не титульный, надо снова его сделать не large
				*/
				$('.con2').append('RES: ' + res + "<br/>");
				//  0   1         2         3         
				//  img/cat_large/rabochaya/i.FM-01481-08-04K.png
				r1_arr = res.split('/');
				r1_arr[1] = 'cat';
				res = r1_arr.join('/');
			}
		}


   	 	el.attr('src', res); // Меняем пряжку

   	 	/* Поменять характеристики */
/*
   	 	a = $('#ibA_c').html();
		// res = a.replace(/(Цвет:\s)(.*?)(\s<br\/>)/ig, "$1-CC-$3");   	 	

   	 	// Меняем цвет
		// var repl = "$1"
		res = a.replace(/(Цвет:\s)(.*?)(\s?<br)/g, "$1" + pal_col_name + "$3");   	 	
		// console.log(a);
		// console.log(res);
		$('#ibA_c').html(res);
*/
   	 	/* Перезагрузить ростовку */
   	 	$('div#sizes_el_wrap').remove(); // Очистка поля загрузки
	

   	 	/*
   	 		(!) Не совсем прозрачно теперь выходит извлечение информации о пряжке.
   	 		Нижеследующий фрагмент необходимо заменить на что-то универсальное
   	 	*/

		prjagka_data = localStorage.getItem('as_var_selected_prjagka');

		// 0 				  1           2        3       4
		// full               type        nom      size    col
		// i.FM-01496-08-1V ; rabochaya ; 01496  ;  08  ;  1V
		b = prjagka_data.split(";");
		// (!) Уже в который раз!
		c = b[0].split("-");
		// i.FM-01496
		name = c[0] + "-" + c[1]; // Получение полного имени

		a1 = pryajka_type + "_" + name + "_"+ pal_col_name;
		$('.con3').append(a1 + '<br/>');
		
		a2 = "";	dest = $('div#balance');
		ajax4("load_sizes.pl", a1, a2, dest);

	} // dial_pal_click()






// Обработчик нажатия кнопки вверх
$('div#proto_up_button').bind('click', function() {
// [fold~ QMNd]
	// w w/o animation
	// $('#long_block').get(0).scrollTop = $('#long_block #film').position().top



	est_pos = $('#long_block #film').position().top
	jQuery('#long_block').animate({ scrollTop: est_pos }, 800);

	// ?
	$('div#counter_1').html(est_pos); // Отладка
});




/* 
		Анимация построена на предложениях (под катом)
// [fold~ Fwbw]
*/
	// $('div#div_ic_block_C').unbind('click');
	function pult_click() { // Подсвечивание палитры
// [fold~UZ7r]
	} // pult_click()

// Инициализация пульта
$('div#pult_wrap').addClass('p_off'); // По умолчанию  пульт закрыт

// Сам пульт
// $('div#pult, div#div_ic_block_C').bind('click', pult_click);
$('div#div_ic_block_C').bind('click', pult_click);


// $('#pult_col_img').bind('click', side_color_sel_click);
// $('div#p_col_block').bind('click', side_color_sel_click);

// Нижняя "щека" для закртытия пульта 
// $('div#cheek_lower, div#cheek_upper').bind('click', pult_click);

// [fold~ 5QSz]
// [fold~ jSeb]
/*
	Привязка событий по пульту - открытие палитры
*/
// $('div#p_col_block').bind( 'click', side_color_sel_click);
// [fold~ OIZo]

/*
	Активация диалога "Подробнее"
	UPD Дополнительно предварительно задвигаем пульт, если он выдвинут
*/
/* Активация расширенной информации по выбранной пряжке ("Подробнее") */
$('div#ic_more_but, div#pr_block_c img').bind('click', function() {
	
	// Однократное создание диалога "Подробнее"
	if (!($('div#dial_more').length)) { // Если элемента еще нет - создаем
		// [fold~hz7C]
	}
	else { // Если уже есть, нужно убрать
		// [fold~lT7M]
	}	

});

/*
	Для целей разработки делает выдвигаем пульт при загрузке страницы
*/
// $('div#div_ic_block_C').trigger('click');

// $('div#ic_more_but').trigger('click'); // Нарисовать диалог "Подробнее"





}); // document.complete

/* Описания различных регулярок */
// [fold~ wig3]
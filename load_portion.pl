#!/usr/bin/perl -w

# aaa`

# Срипт порционной загрузки пряжки по rsz-блокам
# Принимает в качестве аргумента номер интересующего блока.
# Суперблок #film не генерируется


# Скрипт получения доп. информации о запрошенном 
# контенте на основании load_uni.pl
# Должен выдавать информацию в духе 10/2/4 reg/sup/zak

use CGI;

use CGI::Carp qw(fatalsToBrowser set_message); # Вывод ошибок в браузер
BEGIN { # Скомпилировать немедленно, до разбора остального кода
	sub handle_errors {my $msg = shift; print "<h1>Zigog!</h1><br/>"; print "<h2>@: $msg</h2><br/>";}
	set_message(\&handle_errors);}

print "Content-Type: text/html\n\n"; # Указание MIME-типа при передаче информации

my $cgi = CGI->new;
#my $username = $cgi->param("username");
my $arg1 = $cgi->param("password");   	# arg1
my $arg2 = $cgi->param("note");			# arg2


open DEBUG, '>', 'load_portion.log' or die $!;
print DEBUG "arg1: $arg1 \r\n\r\narg2: $arg2\r\n\r\n";

# Отчет о номере загружаемой порции
# print qq(<div id="perl">$arg2<\/div>);


# $arg1 = 'blochka_20_01V';
# $arg1 = 'blochka_xx_01V';
#$arg1 = 'blochka_xx_xx';

@a = split('_',$arg1);

($cattype,$size,$color) = @a;

# print $cattype, $color, $size, "<br/>";
print DEBUG $cattype, $color, $size, "\r\n\r\n";

# if ($size eq "xx") 	   {$size_mask = '(.*)'};

# if ($size =~ m/-/m) {@u_sz = split('-',$size);} # Размер задан перечислением

# Работа по диапазонам
if ($size =~ m/-/m) {
	@u_sz = split('-',$size); # Извлекаем диапазон из строки

	# Первое и последнее число в переданной строке - границы диапазона, для кот необх получить размеры.
	# Таким образом "08-30" означает цепь размеров 08,09,n+1,...,30
	$min = $u_sz[0]; # print $min."<br/>";
	$max = $u_sz[$#u_sz]; # print $max."<br/>";
	@u_sz = (); # Знвчения получены, обнуляем массив размеров
	for ($i=$min;$i<=$max;$i++) {
		# $result = sprintf("%08d", $number);
		# Заменяет отсутствующие знаковые позиции нулями "9 = 09"
		$res = sprintf("%02d", $i);
		# print $res;
		push(@u_sz, $res);
	}
	#print "\n", @u_sz;
} # Размер задан перечислением



# if ($size =~ m/\d+/)   {$size_mask = $size};
# if ($color eq "xx")    {$color_mask = '(.*)'};
if ($color =~ m/\d+/)  {$color_mask = $color};




#$cattype = "blochka";
$absImg = "/home/er191922/public_html/xckd5a/img/cat/$cattype/";                 # sym1
@list = glob "$absImg*.*";	# Сканирование каталога


foreach (@list) {
	
	$_ =~ s/$absImg//gm; # Убираем название директории

	

	# Выбираем размер пряжки
	# if ($_ =~ s/(.*-$arg1-.*)/$1/gm) {push @size , $_;}
	if ($_ =~ s/(.*-$size_mask-.*)/$1/gm) {push @size , $_;}

};

	# # Отладка
	# print "$absImg*.*<br/>";
	# print "list items: ".scalar@list."<br/>";
	# print @list;
	# print "size mask: .*-$size_mask-.*<br/>";
	# print "size items: ".scalar@size."<br/>";
	# print "col mask: .*-$color_mask<br/>";





$absImg = "/home/er191922/public_html/xckd5a/img/cat/$cattype/";                





  #     CCCCCC                                                                              
  #   CC      CC                                                                            
  #   CC      CC                                                                      tt    
  # CC                                  rr        rr        eeee      nn  nnnnnn      tt    
  # CC            uuuu    uuuu    rrrrrr  rrrrrrrr  rr    ee    ee  nnnnnn      nn  tttttttt
  # CC              uu      uu      rr        rr        ee      ee    nn        nn    tt    
  # CC              uu      uu      rr        rr        eeeeeeeeee    nn        nn    tt    
  # CC              uu      uu      rr        rr        ee            nn        nn    tt    
  #   CC      CCCC  uu      uu      rr        rr        ee            nn        nn    tt    
  #   CC      CC    uu    uuuu      rr        rr          ee    ee    nn        nn    tt    
  #     CCCCCC        uuuu    uu  rrrrrr    rrrrrr          eeee    nnnnnn    nnnnnn    tttt






# # Универсальный алгоритм разбора контента (для редизайна)
# if ($cattype eq 'rabochaya' | $cattype eq 'kolca' | $cattype eq 'holnitenu'  | $cattype eq 'podsnurovki' | $cattype eq 'peretyagki' | $cattype eq 'blochka' | $cattype eq 'decor' && 1) {
if ($cattype eq 'rabochaya' | $cattype eq 'kolca' | $cattype eq 'nakonechniki' | $cattype eq 'peretyagki-mokasin' | $cattype eq 'peretyagki-decor'  | $cattype eq 'krjuchki' | $cattype eq 'petli' | $cattype eq 'holnitenu'  | $cattype eq 'podsnurovki' | $cattype eq 'peretyagki' | $cattype eq 'blochka' | $cattype eq 'decor' && 1) {
# if ($cattype eq 'holnitenu'  | $cattype eq 'podsnurovki' | $cattype eq 'peretyagki' | $cattype eq 'blochka' | $cattype eq 'decor' && 1) {

	print DEBUG $cattype, "\r\n\r\n";

	# Получение полного списка цветов в базе	
	@list = glob "$absImg*.*";	# Сканирование каталога
	foreach (@list) {s/$absImg//gm;} # Убираем название директории

	# Переопределение набора на произвольный
	if ($cattype eq 'holnitenu' && 1) {if ($color eq "xx") {$color =  "01V";}

		# (!) Отключаем. потому как в хольнитенах какие-то сложности с отображением
		# @list = qw(i.RM-020-00-01V-OT.png i.RM-030-00-01V-OT.png T.RM-33-00-01V-OT.png T.RM-34-00-01V-OT.png i.RM-020-00-01V-OO.png i.RM-020-00-01V-OO.png i.RM-020-00-01V-OO.png T.RM-33-00-1V-OO.png i.RM-036-00-01V-OT.png i.RM-037-00-01V-OT.png i.RM-036-00-1V-OO.png i.RM-037-00-01V-OO.png);
		# Пересобираем исходный список, учитывая заданный цвет
		
# Разбор по цвету?!
		# ! Мастырка отсекающая часть цветов
		if ($color =~ m/01|1V|01V|04|7P|09|87|271/gm) {
				# print "Color match , $color <br/>";	
			foreach (@list) {
				@a = split("-", $_);
				$str = $a[0]."-".$a[1]."-".$a[2]."-".$color."-".$a[4];
				push(@b, $str);
			} @list = @b;
			# foreach (@list) {print; print "<br/>"}
		} 
	}
	
	# Установки цвета
	if ($color eq "xx") { # Если цвет выборки не указан
		$start_color = "04"; # Для неопределенных случаев

		# if ($cattype eq 'rabochaya')   {$start_color =  "04";}
		# if ($cattype eq 'rabochaya')   {$sec_color 	 = "1V"}

		if ($cattype eq 'rabochaya')   {$start_color =  "7P";}
		if ($cattype eq 'rabochaya')   {$sec_color 	 =  "1V";}


		if ($cattype eq 'peretyagki')  {$start_color = "01V";}

		if ($cattype eq 'decor')       {$start_color = "01V";}
		# if ($cattype eq 'decor')       {$start_color = "7P";}
		# if ($cattype eq 'decor')       {$sec_color 	 = "1V";}


		if ($cattype eq 'holnitenu')   {$start_color =  "xx";}
		if ($cattype eq 'blochka')     {$start_color = "01V";}
		if ($cattype eq 'kolca')       {$start_color = "01V";}
		if ($cattype eq 'podsnurovki') {$start_color = "01V";}
		
		# rabochaya peretyagki decor holnitenu blochka kolca podsnurovki rabochaya-sh peretyagki-decor peretyagki-mokasin nakonechniki
		# Новые категории
		# Эти категории представлены только заказом, поэтому эти установки до лампочки
		if ($cattype eq 'peretyagki-decor') {$start_color = "7P";}
		if ($cattype eq 'peretyagki-mokasin') {$start_color = "7P";}
		if ($cattype eq 'nakonechniki') {$start_color = "7P";}
	}
	else {$start_color = $color;}


	print DEBUG $start_color, "\r\n\r\n";


	# Выбрать только нужный размер/цвет ($2 - размер $3 - цвет) 
	# i.FM-04820 -15    -80S       .png
	# (.*)       -(\d+) -(\d+\w?) (.*)
	if ($start_color ne "xx") { 
		foreach (@list) {
			$tmp = $_; $tmp =~ s/(.*?-((\d|\^|_)+))-(\d+)-((\d+|\w)\w?)(-\w+)?(\.png)/$5/mg; # $5 - цвет
			# if ($tmp eq $start_color) {
			if ($tmp eq $start_color | $tmp eq $sec_color) { # Криво, для штамповки выводи вообще все цвета

				push(@clist,$_);
			}
		} @list = @clist;
	}

	# Построение списка представленных размеров
	# @u_sz - или все существ. или отбор заданных в соотв. с существ.

	# (!) Мастырка
	# Добавление размеров из заказной пряжки, т.е. мы сканируем директории заказной пряжки, 
	# так как она не попадает при выборке основного контента
	$zakaz_firm1 = "faro";
	$absImg1 = "/home/er191922/public_html/xckd5a/img/cat/$cattype/$zakaz_firm1/";
	@flist = glob "$absImg1*.*";	# Сканирование каталога
	foreach (@flist) {s/$absImg1//gm;} # Убираем название директории

	# print "faro--------------------------<br/>";
	@slist = @list; # Новый массив, только для целей расчета уникальных размеров
	foreach (@flist) {
		# print $_,"<br/>";
		push(@slist, $_);
	}
	# print "our---------------------------<br/>";
	# foreach (@list) {
	# 	print $_,"<br/>";
	# }



	if ($size eq "xx") { # Если размер выборки не указан
		# Выборка по базе из существующих размеров
		foreach (@slist) {
			# $tmp = $_; $tmp =~ s/(.*?-((\d|\^|_)+))-(\d+)-((\d+|\w)\w?)(-\w+)?(\.png)/$4/mg; # $4 - размер
			# Разбор сплитом, не регуляркой
			@a = split("-", $_);
			# push(@sz,$tmp);
			push(@sz,$a[2]); # $a[2] - размер
			# print $a[2], "<br/>";
		} @u_sz = sort grep {! $tmp{$_}++ } @sz; # Только уникальные размеры
	}
	else {		
		foreach (@slist) { # Формирование массива существующих размеров
			# $tmp = $_; $tmp =~ s/(.*?-((\d|\^|_)+))-(\d+)-((\d+|\w)\w?)(-\w+)?(\.png)/$4/mg; # $4 - размер
			# Разбор сплитом, не регуляркой
			@a = split("-", $_);
			# push(@sz,$tmp);
			push(@sz,$a[2]); # $a[2] - размер
		} @ex_sz = sort grep {! $tmp{$_}++ } @sz; # Только уникальные размеры

		my %hash = map {$_ => 1} @ex_sz; # convert array to a hash with the array elements as the hash keys and the values are simply 1
		
		foreach (@u_sz) {			
			if (defined $hash{$_}) { # check if the hash contains $match
			    push(@t, $_); # Заносим в массив непустой размер
			}   
		}   @u_sz = @t;   # Преобразуем исходный массив
	}

	# foreach (@u_sz) {print $_," ";}
	foreach (@u_sz) {print DEBUG $_," ";}
	print DEBUG "\r\n\r\n";	
	# @u_sz = ("18","20","22"); # Указание списка произвольных размеров
	# push(@u_sz, "35");

# Разбор пряжки по секциям (regular, super, zakaz)
	
	# Отключаем вывод суперблока 
	# print qq(<div id="film">); # Начало суперблока

	# @u_sz = ("18","20","22"); # Указание списка произвольных размеров
	# @u_sz = ("18","20"); # Указание списка произвольных размеров
	# @u_sz = ("18"); # Указание списка произвольных размеров

print DEBUG "Размер массива u_sz: ", scalar @u_sz, "\r\n\r\n";	

	# Исходя из номера запрошенной порции делаем срез массива @u_sz
	# Выбираем из списка доступных размеров, тот, что соотв. запрош. порции
	$portion_num = $arg2;

print DEBUG "Номер порции: ", $arg2, "\r\n\r\n";	
	
	$p_sz = $u_sz[$portion_num];
	@u_sz = ();
	push(@u_sz, $p_sz);

print DEBUG "Размер массива u_sz: ", scalar @u_sz, "\r\n\r\n";	
	foreach (@u_sz) {print DEBUG $_," ";}
	print DEBUG "\r\n\r\n";	

	# Проход по всем уникальным размерам
	# (Генератор блоков rsz)
	foreach (@u_sz) {
		$cur_sz = $_; # Текущий размер


# regular
		# Начало секции "regular"
		print qq(<div id="frame" class="regular">); # Присваиваем секции класс
		# Заголовок секции - "В наличии (regular)"

		# Вывод информации о размере секции
		if ($cur_sz eq "00") {print qq(<div id="frame_title"><div id="f_size"><\/div><div id="f_check"><img id="p1" src="img/common/catalog/check.png" /><\/div><div id="f_logo"><img src="img/common/catalog-new/section_regular.png" alt=""><\/div><\/div>);}
		else {
			print qq(<div id="frame_title"><div id="f_size"><h2>$cur_sz<\/h2><br\/>mm<\/div><div id="f_check"><img id="p1" src="img/common/catalog/check.png" /><\/div><div id="f_logo"><img src="img/common/catalog-new/section_regular.png" alt=""><\/div><\/div>);
		}

		
		# $reg_cnt = 0; # Счетчик пряжки на очередной интерации

		foreach (@list) {
			$tmp = $_; $tmp =~ s/(.*?-((\d|\^|_)+))-(\d+)-((\d+|\w)\w?)(-\w+)?(\.png)/$4/mg; # $4 - размер
			# Для выбора отдельной пряжки	
			$tmp1 = $_; $tmp1 =~ s/(.*)(\.png)/$1/mg;
			
			# Выборка по текущему размеру
			if ($tmp eq $cur_sz) {
				push(@res,$_);
		
				$span_name = $_;		
				$span_name =~ s/\^/&frasl;/gm; # Преобразование крышки ^ в "/" переименованием в безоп. html-мнемонику
				$span_name =~ s/(.*)(\.png)/$1/gm;
				
				# Сокрытие длинных названий - пока только тест
				@tail = split("-", $span_name);				
				$cut_out = join('*', @tail);

				# Рабочий вывод для регулярной пряжки
				$_ =~ s/(.*)/<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">В НАЛИЧИИ<\/span><\/div><div id="block_b"><div id="block_b_img" class="lit_e"><\/div><\/div><div id="block_c"><img src="img\/cat\/$cattype\/$1" alt=""><\/div><div id="block_d"><div id="w_close"><\/div><div id="block_d_hollow"><\/div><div id="block_d_basket"><\/div><\/div><div id="block_e"><span id="cat_name">$span_name<\/span><img id="more" src="img\/blocks\/marks\/p_more.png"><\/div><\/div>/m;	
				
				# Что-то показывает
				# $_ = qq(<li id="stat_reg">) . $span_name . "</li><br/>";

				# $reg_cnt++;
				
				# C усечением названия
				# $_ =~ s/(.*)/<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">В НАЛИЧИИ<\/span><\/div><div id="block_b"><div id="block_b_img" class="lit_e"><\/div><\/div><div id="block_c"><img src="img\/cat\/$cattype\/$1" alt=""><\/div><div id="block_d"><div id="w_close"><\/div><div id="block_d_hollow"><\/div><div id="block_d_basket"><\/div><\/div><div id="block_e"><span id="cat_name">$cut_out<\/span><img id="more" src="img\/blocks\/marks\/p_more.png"><\/div><\/div>/m;	
				
				$all .= $_;
			}
			print $all; $all = "";
		} # Конец построения секции "regular"

			# Отладка			
		# print qq(<li id="stat_reg" class="info">Пряжки обычной: $reg_cnt</li><br/>);
		
		print qq(<\/div>); # Конец отдельной секции

		# if ($cur_sz eq "00") {
		# 	$tmp1 = '<div id="hs"><img id="ico" src="img/common/catalog/ico/ico_instock.png" /><h3 id="p1" class="nw">ПАЛИТРА ЦВЕТА</h3><img id="clink" src="img/common/catalog/palette_icon.png" /><h3  id="p1" class="col_red nw">ЦВЕТА В НАЛИЧИИ</h3><img id="p1" src="img/common/catalog/check.png" />&;AAA</div>'.$all;
		# 	$tmp1 =~ s/(&;AAA)/<div id="bline_size"><\/div>/m;
		# }
		# else {
		# 	$tmp1 = '<div id="hs"><img id="ico" src="img/common/catalog/ico/ico_instock.png" /><h3 id="p1" class="nw">ПАЛИТРА ЦВЕТА</h3><img id="clink" src="img/common/catalog/palette_icon.png" /><h3  id="p1" class="col_red nw">ЦВЕТА В НАЛИЧИИ</h3><img id="p1" src="img/common/catalog/check.png" />&;AAA</div>'.$all;
		# 	$tmp1 =~ s/(&;AAA)/<div id="bline_size"><h2>$cur_sz<\/h2><br\/>mm<\/div>/m;
		# }
		
		# print $tmp1.'</div>';


# super
		# Начало секции "super"
		print qq(<div id="frame" class="super">); # Присваиваем секции класс
		# Заголовок секции - "В наличии (super)"
		# print qq(<div id="frame_title"><div id="f_size">f_size<\/div><div id="f_logo"><img src="img/common/catalog-new/section_super.png" alt=""><\/div><\/div>);

		# Вывод информации о размере секции
		if ($cur_sz eq "00") {print qq(<div id="frame_title"><div id="f_size"><\/div><div id="f_logo"><img src="img/common/catalog-new/section_super.png" alt=""><\/div><\/div>);}
		else {
			print qq(<div id="frame_title"><div id="f_size"><h2>$cur_sz<\/h2><br\/>mm<\/div><div id="f_logo"><img src="img/common/catalog-new/section_super.png" alt=""><\/div><\/div>);
		}



		$zakaz_firm = "faro_super";
		$absImg = "/home/er191922/public_html/xckd5a/img/cat/$cattype/$zakaz_firm/";
		@chain = glob "$absImg*.*";	# Сканирование каталога

		foreach (@chain) {s/$absImg//gm;} # Убираем название директории

		# foreach (@chain) {print $_, "<br/>";}

		foreach (@chain) { # Отбор по размеру и цвету
			@a = split("-", $_);
			# Когда файл оканч. цветом (а не характер. 7P-10x12), то хвост - 7P.png! < Необход. отсеить
			$a[3] =~ s/(.*)(\.png)/$1/gm;

			# # Сортировка по цвету для заказной пряжки отключена	
			# if ($color eq "xx") {$zcol = "04";}
			# else				{$zcol = $color;}

			# if (($a[2] eq $cur_sz)&&($a[3] eq $zcol)) {push(@b, $_);}; 

			if ($a[2] eq $cur_sz) {push(@b, $_);}; 
		} @chain = @b; @b = ();

		# # Если пряжки в таком размере нет
		# $arr_len = @chain;
		# if ($arr_len==0) {$all .= '<img src="img/common/catalog/out_of_stock.png"></img>';}


		$reg_cnt = 0; # Счетчик пряжки на очередной интерации

		foreach (@chain) {
			$span_name = $_;		

				# Исправление переноса /R
				if ($span_name =~ m/\^/) {
					# $span_name = AAA . $span_name;

					# Пересборка подписи с добавлением <br/> после слешей .../R .../2P для корректного переноса
					# иначе браузер переносит не в том месте (т.е. сразу после слеша и иногда не делает этого!)
					@x = split('-', $span_name);
					$s_name = $x[0]."-".$x[1]."<br/>-".$x[2]."-".$x[3]."-".$x[4]; #."-".$x[5];
					
					# Отключаем эту фишку пока...
					# $span_name = $s_name;

				} 
			$span_name =~ s/\^/&frasl;/gm; # Преобразование крышки ^ в "/" переименованием в безоп. html-мнемонику
			$span_name =~ s/(.*)(\.png)/$1/gm;
					
			# Усечение названия
			$slen = length $span_name;
			if ($slen >= 20) {
				# $span_name .= " * $slen";
				$shortened = substr($span_name, 0, 20);
				$span_name = $shortened . "...";
			}

			$_ =~ s/(.*)/<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">СУПЕРЦЕНА<\/span><\/div><div id="block_b"><div id="block_b_img" class="lit_e"><\/div><\/div><div id="block_c"><img src="img\/cat\/$cattype\/$zakaz_firm\/$1" alt=""><\/div><div id="block_d"><div id="w_close"><\/div><div id="block_d_hollow"><\/div><div id="block_d_basket"><\/div><\/div><div id="block_e"><span id="cat_name">$span_name<\/span><img id="more" src="img\/blocks\/marks\/p_more.png"><\/div><\/div>/m;
			# Отладка
			# $_ = qq(<li id="stat_sup">) . $span_name . "</li><br/>";


			# $reg_cnt++; #Счет пряжек внутри секции

			$all .= $_;
			print $all; $all = "";
		} @chain = (); 

			# Отладка
		# print qq(<li id="stat_sup" class="info">Пряжки супер: $reg_cnt</li><br/>);

		print qq(<\/div>); # Конец построения секции "super"



# zakaz
		# Начало секции "zakaz"
		print qq(<div id="frame" class="zakaz">); # Присваиваем секции класс

		# (!) w/o 'f_size'
		if ($cur_sz eq "00") {print qq(<div id="frame_title"><div id="f_size"><\/div><div id="f_logo"><img src="img/common/catalog-new/section_zakaz.png" alt=""><\/div><\/div>);}
		else {
			print qq(<div id="frame_title"><div id="f_size"><h2>$cur_sz<\/h2><br\/>mm<\/div><div id="f_logo"><img src="img/common/catalog-new/section_zakaz.png" alt=""><\/div><\/div>);
		}


		$zakaz_firm = "faro";
		$absImg = "/home/er191922/public_html/xckd5a/img/cat/$cattype/$zakaz_firm/";
		@chain = glob "$absImg*.*";	# Сканирование каталога

		foreach (@chain) {s/$absImg//gm;} # Убираем название директории

		# foreach (@chain) {print $_, "<br/>";}

		foreach (@chain) { # Отбор по размеру и цвету
			@a = split("-", $_);
			# Когда файл оканч. цветом (а не характер. 7P-10x12), то хвост - 7P.png! < Необход. отсеить
			$a[3] =~ s/(.*)(\.png)/$1/gm;

			# # Сортировка по цвету для заказной пряжки отключена	
			# if ($color eq "xx") {$zcol = "04";}
			# else				{$zcol = $color;}

			# if (($a[2] eq $cur_sz)&&($a[3] eq $zcol)) {push(@b, $_);}; 

			if ($a[2] eq $cur_sz) {push(@b, $_);}; 
		} @chain = @b; @b = ();

		# # Если пряжки в таком размере нет
		# $arr_len = @chain;
		# if ($arr_len==0) {$all .= '<img src="img/common/catalog/out_of_stock.png"></img>';}

		# $reg_cnt = 0; # Счетчик пряжки на очередной интерации

		foreach (@chain) {
			$span_name = $_;		

				# Исправление переноса /R
				if ($span_name =~ m/\^/) {
					# $span_name = AAA . $span_name;

					# Пересборка подписи с добавлением <br/> после слешей .../R .../2P для корректного переноса
					# иначе браузер переносит не в том месте (т.е. сразу после слеша и иногда не делает этого!)
					@x = split('-', $span_name);
					$s_name = $x[0]."-".$x[1]."<br/>-".$x[2]."-".$x[3]."-".$x[4]; #."-".$x[5];
					
					# Отключаем эту фишку пока...
					# $span_name = $s_name;



				} 
			$span_name =~ s/\^/&frasl;/gm; # Преобразование крышки ^ в "/" переименованием в безоп. html-мнемонику
			$span_name =~ s/(.*)(\.png)/$1/gm;

			# Усечение названия
			$slen = length $span_name;
			if ($slen >= 20) {
				# $span_name .= " * $slen";
				$shortened = substr($span_name, 0, 20);
				$span_name = $shortened . "...";					}

			$_ =~ s/(.*)/<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">ПОД ЗАКАЗ<\/span><\/div><div id="block_b"><div id="block_b_img" class="lit_e"><\/div><\/div><div id="block_c"><img src="img\/cat\/$cattype\/$zakaz_firm\/$1" alt=""><\/div><div id="block_d"><div id="w_close"><\/div><div id="block_d_hollow"><\/div><div id="block_d_basket"><\/div><\/div><div id="block_e"><span id="cat_name">$span_name<\/span><img id="more" src="img\/blocks\/marks\/p_more.png"><\/div><\/div>/m;
			# Отладка
			# $_ = qq(<li id="stat_zak">) . $span_name . "</li><br/>";

			# $reg_cnt++; #Счет пряжек внутри секции

			$all .= $_;
			print $all; $all = "";
		} @chain = (); 

			# Отладка
		# print qq(<li id="stat_zak" class="info">Пряжки заказ: $reg_cnt</li><br/>);

		print qq(<\/div>); # Конец построения секции "zakaz"
		
} 

	# Отключаем
	# Конец суперблока
	# print qq(<\/div>);


} # Универсальный алгоритм разбора контента (для редизайна)




























# # Универсальный алгоритм разбора контента (для редизайна)
# if ($cattype eq 'rabochaya_sh' | $cattype eq 'kolca' | $cattype eq 'holnitenu'  | $cattype eq 'podsnurovki' | $cattype eq 'peretyagki' | $cattype eq 'blochka' | $cattype eq 'decor' && 1) {
if ($cattype eq 'rabochaya-sh'  && 1) {

	# print $cattype, $color, $size, "<br/>";

# use Cwd; print  Cwd::abs_path(), "<br/>"; # Получение абсолютного пути на сервере
	# $cattype = 'rabochaya_sh';
	# $absImg = "/home/er191922/public_html/xckd5a/img/cat_sh/$cattype/$zakaz_firm/";

	# /home/er191922/domains/artstep.com.ua/public_html/xckd5a/img/cat_sh/rabochaya_sh/regular/
	# $absImg = "/home/er191922/public_html/xckd5a/img/cat_sh/$cattype/regular/";
	$absImg = "/home/er191922/domains/artstep.com.ua/public_html/xckd5a/img/cat_sh/rabochaya_sh/regular/";

	# Получение полного списка цветов в базе	
	@list = glob "$absImg*.*";	# Сканирование каталога
	foreach (@list) {s/$absImg//gm;} # Убираем название директории

	# foreach (@list) { print $_, "color", $color, "<br/>"; }


	# Переопределение набора на произвольный
	if ($cattype eq 'holnitenu' && 1)    {if ($color eq "xx")	{$color = "01V";}
	# if ($cattype eq 'rabochaya-sh' && 1) {if ($color eq "xx") 	{$color = "1V"; }

		@list = qw(i.RM-020-00-01V-OT.png i.RM-030-00-01V-OT.png T.RM-33-00-01V-OT.png T.RM-34-00-01V-OT.png i.RM-020-00-01V-OO.png i.RM-020-00-01V-OO.png i.RM-020-00-01V-OO.png T.RM-33-00-1V-OO.png i.RM-036-00-01V-OT.png i.RM-037-00-01V-OT.png i.RM-036-00-1V-OO.png i.RM-037-00-01V-OO.png);
		# Пересобираем исходный список, учитывая заданный цвет
		
# Разбор по цвету?!
		# ! Мастырка отсекающая часть цветов
		if ($color =~ m/01|1V|01V|04|7P|09|87|271/gm) {
				# print "Color match , $color <br/>";	
			foreach (@list) {
				@a = split("-", $_);
				$str = $a[0]."-".$a[1]."-".$a[2]."-".$color."-".$a[4];
				push(@b, $str);
			} @list = @b;
			# foreach (@list) {print; print "<br/>"}
		} 
	}
	

	# Установки цвета
	if ($color eq "xx") { # Если цвет выборки не указан
		$start_color = "04"; # Для неопределенных случаев
		if ($cattype eq 'rabochaya')   {$start_color =  "04";}
		if ($cattype eq 'peretyagki')  {$start_color = "01V";}
		if ($cattype eq 'decor')       {$start_color = "01V";}
		if ($cattype eq 'holnitenu')   {$start_color =  "xx";}
		if ($cattype eq 'blochka')     {$start_color = "01V";}
		if ($cattype eq 'kolca')       {$start_color = "01V";}
		if ($cattype eq 'podsnurovki') {$start_color = "01V";}
		if ($cattype eq 'rabochaya-sh'){$start_color =  "1V";}
		if ($cattype eq 'rabochaya-sh'){$sec_color   =  "04";}
	}
	else {$start_color = $color;}

	# if ($color eq "7P") { # Сдвоенные цвета
	# 	if ($cattype eq 'rabochaya')   {$start_color =  "7P";}
	# 	if ($cattype eq 'rabochaya')   {$sec_color   =  "1V";}
	# }

	# Выбрать только нужный размер/цвет ($2 - размер $3 - цвет) 
	# i.FM-04820 -15    -80S       .png
	# (.*)       -(\d+) -(\d+\w?) (.*)
	if ($start_color ne "xx") { 
		foreach (@list) {
			$tmp = $_; $tmp =~ s/(.*?-((\d|\^|_)+))-(\d+)-((\d+|\w)\w?)(-\w+)?(\.png)/$5/mg; # $5 - цвет
			# if ($tmp eq $start_color || $sec_color) { # Криво, для штамповки выводи вообще все цвета
			if ($tmp eq $start_color | $tmp eq $sec_color) { # Криво, для штамповки выводи вообще все цвета
				push(@clist,$_);
			}
		} @list = @clist;
	}

	# Построение списка представленных размеров
	# @u_sz - или все существ. или отбор заданных в соотв. с существ.

	# (!) Мастырка
	# Добавление размеров из заказной пряжки, т.е. мы сканируем директории заказной пряжки, 
	# так как она не попадает при выборке основного контента
	$zakaz_firm1 = "faro";
	$absImg1 = "/home/er191922/public_html/xckd5a/img/cat/$cattype/$zakaz_firm1/";
	@flist = glob "$absImg1*.*";	# Сканирование каталога
	foreach (@flist) {s/$absImg1//gm;} # Убираем название директории

	# print "faro--------------------------<br/>";
	@slist = @list; # Новый массив, только для целей расчета уникальных размеров
	foreach (@flist) {
		# print $_,"<br/>";
		push(@slist, $_);
	}
	# print "our---------------------------<br/>";
	# foreach (@list) {
	# 	print $_,"<br/>";
	# }



	if ($size eq "xx") { # Если размер выборки не указан
		# Выборка по базе из существующих размеров
		foreach (@slist) {
			# $tmp = $_; $tmp =~ s/(.*?-((\d|\^|_)+))-(\d+)-((\d+|\w)\w?)(-\w+)?(\.png)/$4/mg; # $4 - размер
			# Разбор сплитом, не регуляркой
			@a = split("-", $_);
			# push(@sz,$tmp);
			push(@sz,$a[2]); # $a[2] - размер
			# print $a[2], "<br/>";
		} @u_sz = sort grep {! $tmp{$_}++ } @sz; # Только уникальные размеры
	}
	else {		
		foreach (@slist) { # Формирование массива существующих размеров
			# $tmp = $_; $tmp =~ s/(.*?-((\d|\^|_)+))-(\d+)-((\d+|\w)\w?)(-\w+)?(\.png)/$4/mg; # $4 - размер
			# Разбор сплитом, не регуляркой
			@a = split("-", $_);
			# push(@sz,$tmp);
			push(@sz,$a[2]); # $a[2] - размер
		} @ex_sz = sort grep {! $tmp{$_}++ } @sz; # Только уникальные размеры

		my %hash = map {$_ => 1} @ex_sz; # convert array to a hash with the array elements as the hash keys and the values are simply 1
		
		foreach (@u_sz) {			
			if (defined $hash{$_}) { # check if the hash contains $match
			    push(@t, $_); # Заносим в массив непустой размер
			}   
		}   @u_sz = @t;   # Преобразуем исходный массив
	}

	# foreach (@u_sz) {print $_," ";}
	# @u_sz = ("18","20","22"); # Указание списка произвольных размеров
	# push(@u_sz, "35");

# Разбор пряжки по секциям (regular, super, zakaz)

	# print qq(<div id="perl">AAA_perl_AAA<\/div>);
	
	print qq(<div id="film">); # Начало суперблока

	# Проход по всем уникальным размерам
	foreach (@u_sz) {
		$cur_sz = $_; # Текущий размер


# regular
		# Начало секции "regular"
		print qq(<div id="frame" class="regular">); # Присваиваем секции класс
		# Заголовок секции - "В наличии (regular)"

		# Вывод информации о размере секции
		if ($cur_sz eq "00") {print qq(<div id="frame_title"><div id="f_size"><\/div><div id="f_check"><img id="p1" src="img/common/catalog/check.png" /><\/div><div id="f_logo"><img src="img/common/catalog-new/section_regular.png" alt=""><\/div><\/div>);}
		else {
			print qq(<div id="frame_title"><div id="f_size"><h2>$cur_sz<\/h2><br\/>mm<\/div><div id="f_check"><img id="p1" src="img/common/catalog/check.png" /><\/div><div id="f_logo"><img src="img/common/catalog-new/section_regular.png" alt=""><\/div><\/div>);
		}

		foreach (@list) {
			$tmp = $_; $tmp =~ s/(.*?-((\d|\^|_)+))-(\d+)-((\d+|\w)\w?)(-\w+)?(\.png)/$4/mg; # $4 - размер
			# Для выбора отдельной пряжки	
			$tmp1 = $_; $tmp1 =~ s/(.*)(\.png)/$1/mg;
			
			# Выборка по текущему размеру
			if ($tmp eq $cur_sz) {
				push(@res,$_);
		
				$span_name = $_;		
				$span_name =~ s/\^/&frasl;/gm; # Преобразование крышки ^ в "/" переименованием в безоп. html-мнемонику
				$span_name =~ s/(.*)(\.png)/$1/gm;
				# Сокрытие длинных названий
				@tail = split("-", $span_name);

				# Для выбора отдельной пряжки
				# Пряжкам T.FM_SEM-40 присавиваем атрибут "Под заказ"
				# if ($tmp1 =~ m/T.FM_SEM-40/m) {
				if (0) {
					# Контент
					$_ =~ s/(.*)/<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">В НАЛИЧИИ<\/span><\/div><div id="block_b">b<\/div><div id="block_c"><img src="img\/cat\/$cattype\/$1" alt=""><\/div><div id="block_d">d<\/div><div id="block_e"><span id="cat_name">$span_name<\/span><\/div><\/div>/m;	
					$all .= $_; next;
				}						

				# $_ =~ s/(.*)/<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">В НАЛИЧИИ<\/span><\/div><div id="block_b">b<\/div><div id="block_c"><img src="img\/cat\/$cattype\/$1" alt=""><\/div><div id="block_d">d<\/div><div id="block_e"><span id="cat_name">$span_name<\/span><\/div><\/div>/m;	
				


				# $_ =~ s/(.*)/<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">В НАЛИЧИИ<\/span><\/div><div id="block_b"><div id="block_b_img" class="lit_e"><\/div><\/div><div id="block_c"><img src="img\/cat\/$cattype\/$1" alt=""><\/div><div id="block_d"><div id="block_d_hollow"><\/div><div id="block_d_basket"><\/div><\/div><div id="block_e"><span id="cat_name">$span_name<\/span><img id="more" src="img\/blocks\/marks\/p_more.png"><\/div><\/div>/m;	
				$_ =~ s/(.*)/<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">В НАЛИЧИИ<\/span><\/div><div id="block_b"><div id="block_b_img" class="shtamp"><\/div><\/div><div id="block_c"><img src="img\/cat_sh\/rabochaya_sh\/regular\/$1" alt=""><\/div><div id="block_d"><div id="block_d_hollow"><\/div><div id="block_d_basket"><\/div><\/div><div id="block_e"><span id="cat_name">$span_name<\/span><img id="more" src="img\/blocks\/marks\/p_more.png"><\/div><\/div>/m;	
				

				$all .= $_;
			}
			print $all; $all = "";
		} # Конец построения секции "regular"
		print qq(<\/div>); # Конец отдельной секции

		# if ($cur_sz eq "00") {
		# 	$tmp1 = '<div id="hs"><img id="ico" src="img/common/catalog/ico/ico_instock.png" /><h3 id="p1" class="nw">ПАЛИТРА ЦВЕТА</h3><img id="clink" src="img/common/catalog/palette_icon.png" /><h3  id="p1" class="col_red nw">ЦВЕТА В НАЛИЧИИ</h3><img id="p1" src="img/common/catalog/check.png" />&;AAA</div>'.$all;
		# 	$tmp1 =~ s/(&;AAA)/<div id="bline_size"><\/div>/m;
		# }
		# else {
		# 	$tmp1 = '<div id="hs"><img id="ico" src="img/common/catalog/ico/ico_instock.png" /><h3 id="p1" class="nw">ПАЛИТРА ЦВЕТА</h3><img id="clink" src="img/common/catalog/palette_icon.png" /><h3  id="p1" class="col_red nw">ЦВЕТА В НАЛИЧИИ</h3><img id="p1" src="img/common/catalog/check.png" />&;AAA</div>'.$all;
		# 	$tmp1 =~ s/(&;AAA)/<div id="bline_size"><h2>$cur_sz<\/h2><br\/>mm<\/div>/m;
		# }
		
		# print $tmp1.'</div>';


# # super
# 		# Начало секции "super"
# 		print qq(<div id="frame" class="super">); # Присваиваем секции класс
# 		# Заголовок секции - "В наличии (super)"
# 		# print qq(<div id="frame_title"><div id="f_size">f_size<\/div><div id="f_logo"><img src="img/common/catalog-new/section_super.png" alt=""><\/div><\/div>);

# 		# Вывод информации о размере секции
# 		if ($cur_sz eq "00") {print qq(<div id="frame_title"><div id="f_size"><\/div><div id="f_logo"><img src="img/common/catalog-new/section_super.png" alt=""><\/div><\/div>);}
# 		else {
# 			print qq(<div id="frame_title"><div id="f_size"><h2>$cur_sz<\/h2><br\/>mm<\/div><div id="f_logo"><img src="img/common/catalog-new/section_super.png" alt=""><\/div><\/div>);
# 		}



# 		$zakaz_firm = "faro_super";
# 		$absImg = "/home/er191922/public_html/xckd5a/img/cat/$cattype/$zakaz_firm/";
# 		@chain = glob "$absImg*.*";	# Сканирование каталога

# 		foreach (@chain) {s/$absImg//gm;} # Убираем название директории

# 		# foreach (@chain) {print $_, "<br/>";}

# 		foreach (@chain) { # Отбор по размеру и цвету
# 			@a = split("-", $_);
# 			# Когда файл оканч. цветом (а не характер. 7P-10x12), то хвост - 7P.png! < Необход. отсеить
# 			$a[3] =~ s/(.*)(\.png)/$1/gm;

# 			# # Сортировка по цвету для заказной пряжки отключена	
# 			# if ($color eq "xx") {$zcol = "04";}
# 			# else				{$zcol = $color;}

# 			# if (($a[2] eq $cur_sz)&&($a[3] eq $zcol)) {push(@b, $_);}; 

# 			if ($a[2] eq $cur_sz) {push(@b, $_);}; 
# 		} @chain = @b; @b = ();

# 		# # Если пряжки в таком размере нет
# 		# $arr_len = @chain;
# 		# if ($arr_len==0) {$all .= '<img src="img/common/catalog/out_of_stock.png"></img>';}

# 		foreach (@chain) {
# 			$span_name = $_;		

# 				# Исправление переноса /R
# 				if ($span_name =~ m/\^/) {
# 					# $span_name = AAA . $span_name;

# 					# Пересборка подписи с добавлением <br/> после слешей .../R .../2P для корректного переноса
# 					# иначе браузер переносит не в том месте (т.е. сразу после слеша и иногда не делает этого!)
# 					@x = split('-', $span_name);
# 					$s_name = $x[0]."-".$x[1]."<br/>-".$x[2]."-".$x[3]."-".$x[4]; #."-".$x[5];
# 					$span_name = $s_name;
# 				} 
# 			$span_name =~ s/\^/&frasl;/gm; # Преобразование крышки ^ в "/" переименованием в безоп. html-мнемонику
# 			$span_name =~ s/(.*)(\.png)/$1/gm;
					
# 			# $_ =~ s/(.*)/<div id="wrap_cont"><div id="container"> <div id="line1"> <img src="img\/blocks\/marks\/p_new.png" style="visibility: hidden;"\/> <\/div> <div id="line2"> <img src="img\/blocks\/marks\/p_akciya.png" style="visibility: hidden;"> <img src="img\/cat\/$cattype\/$zakaz_firm\/$1"> <img src="img\/blocks\/marks\/p_podzakaz.png" style="visibility: hidden;"> <\/div> <div id="line3"> <span id="name">$span_name<\/span> <img src="img\/blocks\/marks\/p_cube.png" style="visibility: hidden;"> <\/div> <img id="more" src="img\/blocks\/marks\/p_more.png"> <\/div><div id="wc_keyz"><\/div><div id="wc_zakaz"><div id="wc_but_1"><\/div><div id="wc_but_2"><\/div><\/div><\/div>/m;																								
			
# 			# $_ =~ s/(.*)/<div id="wrap_cont"><div id="container"> <div id="line1"> <img src="img\/blocks\/marks\/p_new.png" style="visibility: hidden;"\/> <\/div> <div id="line2"> <img src="img\/blocks\/marks\/p_akciya.png" style="visibility: hidden;"> <img src="img\/cat\/$cattype\/$zakaz_firm\/$1"> <img src="img\/blocks\/marks\/p_podzakaz.png" style="visibility: hidden;"> <\/div> <div id="line3"> <span id="name">$span_name<\/span> <img src="img\/blocks\/marks\/p_cube.png" style="visibility: hidden;"> <\/div> <img id="more" src="img\/blocks\/marks\/p_more.png"> <\/div><div id="wc_keyz"><\/div><div id="wc_zakaz"><div id="wc_but_1"><\/div><div id="wc_but_2"><\/div><\/div><\/div>/m;																								
# 			$_ =~ s/(.*)/<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">СУПЕРЦЕНА<\/span><\/div><div id="block_b"><div id="block_b_img" class="lit_e"><\/div><\/div><div id="block_c"><img src="img\/cat\/$cattype\/$zakaz_firm\/$1" alt=""><\/div><div id="block_d"><div id="block_d_hollow"><\/div><div id="block_d_basket"><\/div><\/div><div id="block_e"><span id="cat_name">$span_name<\/span><img id="more" src="img\/blocks\/marks\/p_more.png"><\/div><\/div>/m;

# 			$all .= $_;
# 			print $all; $all = "";
# 		} @chain = (); 
# 		print qq(<\/div>); # Конец построения секции "super"

# 		# $tmp1 = '<div id="hs"><img id="ico" src="img/common/catalog/ico/ico_zakaz_price.png" /><h3  id="p1" lass="col_red nw">ПОД ЗАКАЗ</h3> <h3 id="p1" class="col_red nw">СУПЕРЦЕНА </h3><img src="img/common/catalog/new.png" /><h3 id="p1" class="nw">ТЕХНОЛОГИИ</h3>&;AAA</div>'.$all;
# 		# # Вывод метки о размере
# 		# if ($cur_sz == 0)	{$tmp1 =~ s/(&;AAA)/<div id="bline_size"><\/div>/m;}
# 		# else 				{$tmp1 =~ s/(&;AAA)/<div id="bline_size"><h2>$cur_sz<\/h2><br\/>mm<\/div>/m;}
		
# 		# print $tmp1.'</div>';
# 		# $all = "";







# # zakaz
# 		# Начало секции "zakaz"
# 		print qq(<div id="frame" class="zakaz">); # Присваиваем секции класс
# 		# Заголовок секции - "В наличии (zakaz)"
# 		# print qq(<div id="frame_title"><div id="f_size">f_size<\/div><div id="f_logo"><img src="img/common/catalog-new/section_zakaz.png" alt=""><\/div><\/div>);

# 		# Вывод информации о размере секции
# 		if ($cur_sz eq "00") {print qq(<div id="frame_title"><div id="f_size">f_size<\/div><div id="f_logo"><img src="img/common/catalog-new/section_zakaz.png" alt=""><\/div><\/div>);}
# 		else {
# 			print qq(<div id="frame_title"><div id="f_size"><h2>$cur_sz<\/h2><br\/>mm<\/div><div id="f_logo"><img src="img/common/catalog-new/section_zakaz.png" alt=""><\/div><\/div>);
# 		}



# 		$zakaz_firm = "faro";
# 		$absImg = "/home/er191922/public_html/xckd5a/img/cat/$cattype/$zakaz_firm/";
# 		@chain = glob "$absImg*.*";	# Сканирование каталога

# 		foreach (@chain) {s/$absImg//gm;} # Убираем название директории

# 		# foreach (@chain) {print $_, "<br/>";}

# 		foreach (@chain) { # Отбор по размеру и цвету
# 			@a = split("-", $_);
# 			# Когда файл оканч. цветом (а не характер. 7P-10x12), то хвост - 7P.png! < Необход. отсеить
# 			$a[3] =~ s/(.*)(\.png)/$1/gm;

# 			# # Сортировка по цвету для заказной пряжки отключена	
# 			# if ($color eq "xx") {$zcol = "04";}
# 			# else				{$zcol = $color;}

# 			# if (($a[2] eq $cur_sz)&&($a[3] eq $zcol)) {push(@b, $_);}; 

# 			if ($a[2] eq $cur_sz) {push(@b, $_);}; 
# 		} @chain = @b; @b = ();

# 		# # Если пряжки в таком размере нет
# 		# $arr_len = @chain;
# 		# if ($arr_len==0) {$all .= '<img src="img/common/catalog/out_of_stock.png"></img>';}

# 		foreach (@chain) {
# 			$span_name = $_;		

# 				# Исправление переноса /R
# 				if ($span_name =~ m/\^/) {
# 					# $span_name = AAA . $span_name;

# 					# Пересборка подписи с добавлением <br/> после слешей .../R .../2P для корректного переноса
# 					# иначе браузер переносит не в том месте (т.е. сразу после слеша и иногда не делает этого!)
# 					@x = split('-', $span_name);
# 					$s_name = $x[0]."-".$x[1]."<br/>-".$x[2]."-".$x[3]."-".$x[4]; #."-".$x[5];
# 					$span_name = $s_name;
# 				} 
# 			$span_name =~ s/\^/&frasl;/gm; # Преобразование крышки ^ в "/" переименованием в безоп. html-мнемонику
# 			$span_name =~ s/(.*)(\.png)/$1/gm;
					
# 			# $_ =~ s/(.*)/<div id="wrap_cont"><div id="container"> <div id="line1"> <img src="img\/blocks\/marks\/p_new.png" style="visibility: hidden;"\/> <\/div> <div id="line2"> <img src="img\/blocks\/marks\/p_akciya.png" style="visibility: hidden;"> <img src="img\/cat\/$cattype\/$zakaz_firm\/$1"> <img src="img\/blocks\/marks\/p_podzakaz.png" style="visibility: hidden;"> <\/div> <div id="line3"> <span id="name">$span_name<\/span> <img src="img\/blocks\/marks\/p_cube.png" style="visibility: hidden;"> <\/div> <img id="more" src="img\/blocks\/marks\/p_more.png"> <\/div><div id="wc_keyz"><\/div><div id="wc_zakaz"><div id="wc_but_1"><\/div><div id="wc_but_2"><\/div><\/div><\/div>/m;																								
			
# 			# $_ =~ s/(.*)/<div id="wrap_cont"><div id="container"> <div id="line1"> <img src="img\/blocks\/marks\/p_new.png" style="visibility: hidden;"\/> <\/div> <div id="line2"> <img src="img\/blocks\/marks\/p_akciya.png" style="visibility: hidden;"> <img src="img\/cat\/$cattype\/$zakaz_firm\/$1"> <img src="img\/blocks\/marks\/p_podzakaz.png" style="visibility: hidden;"> <\/div> <div id="line3"> <span id="name">$span_name<\/span> <img src="img\/blocks\/marks\/p_cube.png" style="visibility: hidden;"> <\/div> <img id="more" src="img\/blocks\/marks\/p_more.png"> <\/div><div id="wc_keyz"><\/div><div id="wc_zakaz"><div id="wc_but_1"><\/div><div id="wc_but_2"><\/div><\/div><\/div>/m;																								
# 			$_ =~ s/(.*)/<div id="wrap_cont_m3"><div id="block_a"><span id="cat_name">ПОД ЗАКАЗ<\/span><\/div><div id="block_b"><div id="block_b_img" class="lit_e"><\/div><\/div><div id="block_c"><img src="img\/cat\/$cattype\/$zakaz_firm\/$1" alt=""><\/div><div id="block_d"><div id="block_d_hollow"><\/div><div id="block_d_basket"><\/div><\/div><div id="block_e"><span id="cat_name">$span_name<\/span><img id="more" src="img\/blocks\/marks\/p_more.png"><\/div><\/div>/m;

# 			$all .= $_;
# 			print $all; $all = "";
# 		} @chain = (); 
# 		print qq(<\/div>); # Конец построения секции "zakaz"
		
# 		# $tmp1 = '<div id="hs"><img id="ico" src="img/common/catalog/ico/ico_zakaz.png" /><h3 id="p1" class="nw">ПОД ЗАКАЗ</h3>&;AAA</div>'.$all;
# 		# # Вывод метки о размере
# 		# if ($cur_sz == 0)	{$tmp1 =~ s/(&;AAA)/<div id="bline_size"><\/div>/m;}
# 		# else 				{$tmp1 =~ s/(&;AAA)/<div id="bline_size"><h2>$cur_sz<\/h2><br\/>mm<\/div>/m;}	
	
# 		# print $tmp1.'</div>'; # Закрываем секцию
# 		# $all = "";



} 

	# Конец суперблока
	print qq(<\/div>);



} # Универсальный алгоритм разбора контента (для редизайна)

close DEBUG;
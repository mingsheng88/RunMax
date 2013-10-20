var totalItem=localStorage.getItem("totalItems");
var str = '<li data-theme="b" data-role="list-divider" class="sec-header-wording"><a>Items</a></li>';
//var str='';
for (i = 0; i < totalItem; i++) {
	var it = new item((i));
	 str = str+'<li><a onclick="buyItem('+i+')" href="javascript:void(0)"><img src="css/global/images/' + it.image_location + '" /><h1>' + it.name + ' (Price: '+it.price+' )</h1><p>' + it.description + '</p></a></li>';
}

$('#coins').html("Coins owned: "+localStorage.getItem('coins'));
$('#itemList').html(str).listview('refresh');

function buyItem(itemId){
	var it = new item((itemId));
	var coins=localStorage.getItem('coins');

	var r = confirm("Are you sure to buy "+it.name+"?");
	if (r == true) {
		if(it.price>coins){
			alert("Insufficient coins!");
		}else{
			coins=coins-it.price;
			localStorage.setItem('coins',coins);
			it.quantity=it.quantity+1;
			it.update();
			window.location = "itemShop.html";
		}
	}else{
		
	}
	
	
	
}
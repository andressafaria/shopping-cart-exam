var ShoppingController = {
	
	init: function () {
		ShoppingController.setForm();
		ShoppingController.showList();
	},
	
	setForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			ShoppingController.addCart(form);
			//it is to avoid form submition
			event.preventDefault();
		});
		ShoppingController.setFocus();
	},
	
	setFocus: function() {
		var inputDescricao = document.getElementById('description');
		inputDescricao.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();
		ShoppingController.setFocus();
	},
	
	addCart: function(form) {
		var cart = {
			descricao: form.description.value,
			qtd: form.qtd.value,
			price: form.price.value
		};
		ShoppingService.add(cart, function(addedCart) {
			ShoppingController.addToHTML(addedCart);
			ShoppingController.clearForm();
		});
	},
	
	deleteGuest: function(imgDelete) {
		var 
			cartDescription = imgDelete.dataset.cartdescription,
			carttId = imgDelete.dataset.cartid;
		
		if(confirm('Are you sure to delete ' + cartdescription + '?')) {
			ShoppingService.remove(cartId, function(isDeleted) {
				if(isDeleted) {
					$(imgDelete).parents('dl').remove();
				}
			})
		}
	},
	
	showList: function () {
		ShoppingService.getList(function(list) {
			list.forEach(function(cart) {
				ShoppingController.addToHTML(cart);
			});	
		});
	},
	
	addToHTML: function (cart) {
		var
			cartList = document.getElementById('cartList'),
			dl = document.createElement('dl'),
			//dt = ShoppingController.createDT(cart),
			dddescrition = ShoppingController.createDD(cart.description, 'description'),
			imgDelete = ShoppingController.createDelete(cart),
			ddQtd = ShoppingController.createDD(cart.qtd, 'qtd'),
			imgDelete = ShoppingController.createDelete(cart),
			ddPrice = ShoppingController.createDD(cart.price,'price')
		
		ddDescription.appendChild(imgDelete);
		
		//dl.appendChild(dt);
		dl.appendChild(ddDescription);
		dl.appendChild(ddQtd);
		dl.appendChild(ddPrice);

		cartList.appendChild(dl);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	/*createDT: function(guest) {
		var 
			dt = document.createElement('dt'),
			img = GuestController.createImage('http://www.gravatar.com/avatar/' + md5(guest.email));
		
		dt.appendChild(img);
		dt.className = "photo";
		
		return dt;
	},
	
	createDD: function(value, className) {
		var dd = document.createElement('dd');
		
		dd.innerHTML = value;
		dd.className = className;
		
		return dd;
	},*/
	
	createDelete: function(cart) {
		var imgDelete = CartController.createImage('assets/images/delete.gif');
		
		imgDelete.setAttribute('data-cartid', cart.id);
		imgDelete.setAttribute('data-cartdescription', cart.description);
		
		imgDelete.addEventListener('click', function() {
			ShoppingController.deleteShopping(this);
		});
		
		return imgDelete;
	}

};

//TODO consider to have an HTMLService.js
//initialization
ShoppingController.init();

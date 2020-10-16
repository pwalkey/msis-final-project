var app = new Vue({
  el: '#phppage',

  data: {
  	personList: []
  },

//   methods: {
created(){
  	// console.log("6");
  	fetch("php/Person/")
  	.then(response => response.json())
  	.then( json => {
  		this.personList = json;
  		console.log(json)
  	});
}
//   }

})


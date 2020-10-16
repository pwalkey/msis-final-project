var app = new Vue({
  el: '#memberpage',

  data: {
  	personList: []
  },

  methods: {
  	created(){
  		console.log("6");
  		fetch("php/Person/index.php")
  		.then(response => response.json())
  		.then( json => {
  			this.personList = json;
  			console.log(this.personList);
  		})
  	}
  }

})


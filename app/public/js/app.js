var app = new Vue({
  el: '#phppage',

  data: {
	  personList: [],
	  newmemberForm: {}
  },

  methods: {
	newmemberData() {
		return {
			LastName: "",
			FirstName: "",
			Position: ""
		}
	  },
	handleNewMemberForm( evt ) {
		// evt.preventDefault();  // Redundant w/ Vue's submit.prevent
  
		// TODO: Validate the data!
  
		fetch('php/Person/create.php', {
		  method:'POST',
		  body: JSON.stringify(this.newmemberForm),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})
		.then( response => response.json() )
		.then( json => {
		  console.log("Returned from post:", json);
		  // TODO: test a result was returned!
		//   this.psList.push(json[0]);
		  this.personList=json;
		  this.newmemberForm = this.newmemberData();
		});
  
		console.log("Creating (POSTing)...!");
		console.log(this.newmemberForm);
	  },
	},
	created(){
		// console.log("6");
		fetch("php/Person/")
		.then(response => response.json())
		.then( json => {
			this.personList = json;
			console.log(this.personList)
		});
	}
})


var app = new Vue({
  el: '#phppage',

  data: {
	  personList: [],
	  certificationList:[],
	  newmemberForm: {},
	  newcredentialForm: {}
  },

  methods: {
	newmemberData() {
		return {
			LastName: "",
			FirstName: "",
			Position: ""
		}
	  },
	newcredentialata(){
		return {
			Agency: "",
			Name: "",
			ExpirationPeriod: ""
		}
	},
	createMember( evt ) {
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
	//   deleteMember( evt ) {
	// 	// evt.preventDefault();  // Redundant w/ Vue's submit.prevent
  
	// 	// TODO: Validate the data!
  
	// 	fetch('php/Person/delete.php', {
	// 	  method:'POST',
	// 	  body: JSON.stringify(this.newmemberForm),
	// 	  headers: {
	// 		"Content-Type": "application/json; charset=utf-8"
	// 	  }
	// 	})
	// 	.then( response => response.json() )
	// 	.then( json => {
	// 	  console.log("Returned from post:", json);
	// 	  // TODO: test a result was returned!
	// 	//   this.psList.push(json[0]);
	// 	  this.personList=json;
	// 	  this.newmemberForm = this.newmemberData();
	// 	});
  
	// 	console.log("Creating (POSTing)...!");
	// 	console.log(this.newmemberForm);
	//   },
	createCredential( evt ) {
		// evt.preventDefault();  // Redundant w/ Vue's submit.prevent
  
		// TODO: Validate the data!
  
		fetch('php/Certification/create.php', {
		  method:'POST',
		  body: JSON.stringify(this.newcredentialForm),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})
		.then( response => response.json() )
		.then( json => {
		  console.log("Returned from post:", json);
		  this.certificationList=json;
		  this.newcredentialForm = this.newcredentialata();
		});
  
		console.log("Creating (POSTing)...!");
		console.log(this.newcredentialForm);
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

		fetch("php/Certification/")
		.then(response => response.json())
		.then( json => {
			this.certificationList = json;
			console.log(this.certificationList)
		});
	},
})


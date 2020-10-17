var app = new Vue({
  el: '#phppage',

  data: {
	  memberList: [],
	  activeMember : null,
	  certificationList:[],
	  activeCertification : null,
	  userList: [],
	  activeUser: null,
	  expiredCertificationList: [],
	  newmemberForm: {},
	  newcredentialForm: {},
	  newuserForm: {}
  },

  methods: {
	newmemberData() {
		return {
			LastName: "",
			FirstName: "",
			Position: ""
		}
	  },
	newcredentialData(){
		return {
			Agency: "",
			Name: "",
			ExpirationPeriod: ""
		}
	},
		newuserData() {
		return {
			Email: "",
			Password: ""
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
		  this.memberList=json;
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
	// 	  this.memberList=json;
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
		  this.certificationList = json;
		  this.newcredentialForm = this.newcredentialData();
		});
  
		console.log("Creating (POSTing)...!");
		console.log(this.newcredentialForm);
	  },

	getCredential( evt ) {
		// evt.preventDefault();  // Redundant w/ Vue's submit.prevent
  
		// TODO: Validate the data!
  
		fetch('php/EditCertification/', {
		  method:'POST',
		  body: JSON.stringify(this.activeCertification),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})
		.then( response => response.json() )
		.then( json => {
		  console.log("Returned from post:", json);
		  this.certificationList = json;
		  this.newcredentialForm = this.newcredentialData();
		});
  
		console.log("Creating (POSTing)...!");
		console.log(this.newcredentialForm);
	  },
	

	createUser( evt ) {
		// evt.preventDefault();  // Redundant w/ Vue's submit.prevent
  
		// TODO: Validate the data!
  
		fetch('php/User/create.php', {
		  method:'POST',
		  body: JSON.stringify(this.newuserForm),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})
		.then( response => response.json() )
		.then( json => {
		  console.log("Returned from post:", json);
		  this.userList=json;
		  this.newuserForm = this.newuserData();
		});
  
		console.log("Creating (POSTing)...!");
		console.log(this.newuserForm);
	  },
	getMembers(){
		fetch("php/Person/")
		.then(response => response.json())
		.then( json => {
			this.memberList = json;
			console.log(this.memberList)
		});
	},

	getUsers(){
		fetch("php/User/")
		.then(response => response.json())
		.then( json => {
			this.userList = json;
			console.log(this.userList)
		});
	},

	getCertifications(){
		fetch("php/Certification/")
		.then(response => response.json())
		.then( json => {
			this.certificationList = json;
			console.log(this.certificationList)
		});
	}
	},


	



	mounted(){
		// console.log("6");
		this.getCertifications();
		this.getUsers();
		this.getMembers();

		if(localStorage.activeCertification) this.activeCertification = localStorage.activeCertification;
	}
	})



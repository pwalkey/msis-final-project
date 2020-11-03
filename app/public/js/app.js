var app = new Vue({
  el: '#phppage',

  data: {
	  memberList: [],
	  activeMember : {},
	  certificationList:[],
	  activeCertification : {},
	  userList: [],
	  activeUser: {},
	  expiredCertificationList: [],
	  newmemberForm: {},
	  newcredentialForm: {},
	  newuserForm: {},
	  name: '',
  },

  // created: function() {
	 //  	console.log("CREATED VUE APP")
	 //  	var loaded = localStorage.getItem('aUser');
	 //  	if (loaded)
	 //  	{
	 //  		this.activeUser = JSON.parse(localStorage.getItem('aUser'));
	 //  	}
	 //  	else
	 //  	{
	 //  		console.warn('unable to load user; first time here?')
	 //  	}
	 //  	loaded = localStorage.getItem('aMember');
	 //  	if (loaded)
	 //  	{
	 //  		this.activeMember = JSON.parse(localStorage.getItem('aMember'));
	 //  	}
	 //  	else
	 //  	{
	 //  		console.warn('unable to load member; first time here?')
	 //  	}
	 //  	loaded = localStorage.getItem('aCertification');
	 //  	if (loaded)
	 //  	{
	 //  		this.activeCertification = JSON.parse(localStorage.getItem('aCertification'));
	 //  	}
	 //  	else
	 //  	{
	 //  		console.warn('unable to load certification; first time here?')
	 //  	}
	 //  },

  methods: {
  	loadData(){
	  	console.log("CREATED VUE APP")
	  	var loaded = localStorage.getItem('aUser');
	  	if (loaded)
	  	{
	  		this.activeUser = JSON.parse(localStorage.getItem('aUser'));
	  	}
	  	else
	  	{
	  		console.warn('unable to load user; first time here?')
	  	}
	  	loaded = localStorage.getItem('aMember');
	  	if (loaded)
	  	{
	  		this.activeMember = JSON.parse(localStorage.getItem('aMember'));
	  	}
	  	else
	  	{
	  		console.warn('unable to load member; first time here?')
	  	}
	  	loaded = localStorage.getItem('aCertification');
	  	if (loaded)
	  	{
	  		this.activeCertification = JSON.parse(localStorage.getItem('aCertification'));
	  	}
	  	else
	  	{
	  		console.warn('unable to load certification; first time here?')
	  	}
	  		
	  		console.log(JSON.stringify(this.activeMember));

  	},
  	resetData(){
  		console.log("DATA RESET");
  		this.activeCertification = {};
  		this.activeUser = {};
  		this.activeMember = {};
  	},
  	testfunc(){
  		console.log("test function running");
  	},

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
		console.log(JSON.stringify(this.newmemberForm));
		console.log(this.newmemberForm);
	  },

	  printMember()
	  {
	  	//console.log(this.activeUser.UserID);
	  	console.log(this.name);
	  },
	  storeItem()
	  {
	  	localStorage.setItem('aUser', JSON.stringify(this.activeUser));
	  	localStorage.setItem('aMember', JSON.stringify(this.activeMember));
	  	localStorage.setItem('aCertification', JSON.stringify(this.activeCertification));
	  },



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

	  deleteCredential(evt){
		// evt.preventDefault();  // Redundant w/ Vue's submit.prevent
  
		// TODO: Validate the data!
		fetch('php/Certification/delete.php', {
		  method:'POST',
		  body: JSON.stringify(this.activeCertification),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})

		.then( response => response.json())
		.then( json => {
		   console.log("Returned from post:", json);
		   // TODO: test a result was returned!
		 //   this.psList.push(json[0]);
		   this.certificationList=json;
		   this.activeCertification = {};
		 });
  
		 console.log("Deleting Certification" + JSON.stringify(this.activeCertification));

	  },

	  	updateCredential(){
		console.log(JSON.stringify(this.activeCertification));
		  fetch('php/Certification/update.php', {
		  method:'POST',
		  body: JSON.stringify(this.activeCertification),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})
  
		 console.log("Updating Certification" + JSON.stringify(this.activeCertification));
	},
	
	getUsers(){
		fetch("php/User/")
		.then(response => response.json())
		.then( json => {
			this.userList = json;
			console.log(this.userList)
		});
	},

	getExpiredCertifications(){
		fetch("php/Reports/")
		.then(response => response.json())
		.then( json => {
			this.expiredCertificationList = json;
			console.log(this.expiredCertificationList)
		});
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

	  deleteUser(evt){
		// evt.preventDefault();  // Redundant w/ Vue's submit.prevent
  
		// TODO: Validate the data!
		fetch('php/User/delete.php', {
		  method:'POST',
		  body: JSON.stringify(this.activeUser),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})

		.then( response => response.json())
		.then( json => {
		   console.log("Returned from post:", json);
		   // TODO: test a result was returned!
		 //   this.psList.push(json[0]);
		   this.userList=json;
		   this.activeUser = {};
		 });
  
		 console.log("Deleting User" + JSON.stringify(this.activeUser));

	  },

	 updateUser(){
		console.log(JSON.stringify(this.activeUser));
		  fetch('php/User/update.php', {
		  method:'POST',
		  body: JSON.stringify(this.activeUser),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})
  
		 console.log("Updating User" + JSON.stringify(this.activeUser));
	},

	getMembers(){
		fetch("php/Person/")
		.then(response => response.json())
		.then( json => {
			this.memberList = json;
			console.log(this.memberList)
		});
	},

	updateMember(){
		console.log(JSON.stringify(this.activeMember));
		  fetch('php/Person/update.php', {
		  method:'POST',
		  body: JSON.stringify(this.activeMember),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})
  
		 console.log("Updating Member" + JSON.stringify(this.activeMember));
	},

	deleteMember(evt) {
		// evt.preventDefault();  // Redundant w/ Vue's submit.prevent
  
		// TODO: Validate the data!
		fetch('php/Person/delete.php', {
		  method:'POST',
		  body: JSON.stringify(this.activeMember),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})

		.then( response => response.json())
		.then( json => {
		   console.log("Returned from post:", json);
		   // TODO: test a result was returned!
		 //   this.psList.push(json[0]);
		   this.memberList=json;
		   this.activeMember = {};
		 });
  
		 console.log("Deleting Member" + JSON.stringify(this.activeMember));
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
		this.getCertifications();
		this.getUsers();
		this.getMembers();
		this.getExpiredCertifications();
	}
	})



var editapp = new Vue({
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
	  newPersonCredentialForm: {},
	  newuserForm: {},
	  PersonCertificationList: [],
	  name: '',
  },

  created: function() {
	  	console.log("CREATED VUE APP")
	  	this.getCertifications();

	  	console.log(this.activeMember.PersonID);
	  	console.log(this.newPersonCredentialForm.PersonID);
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
	  	this.newPersonCredentialForm.PersonID = this.activeMember.PersonID;
	  },

  methods: {

  	newcredentialData() {
		return {
			PersonID: "",
			CertificationID: "",
			DateAcquired: ""
		}
	  },


  	getPersonCredential(){
		fetch('php/PersonCertification/index.php', {
		  method:'POST',
		  body: JSON.stringify(this.newPersonCredentialForm),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})
		.then( response => response.json() )
		.then( json => {
		  console.log("Returned from post:", json);
		  // TODO: test a result was returned!
		//   this.psList.push(json[0]);
		  this.PersonCertificationList=json;
		  this.newPersonCredentialForm = this.newcredentialData();
		})
	},
 

  	

  	 createPersonCredential(){

  	 	console.log(this.newPersonCredentialForm);
		fetch('php/PersonCertification/add.php', {
		  method:'POST',
		  body: JSON.stringify(this.newPersonCredentialForm),
		  headers: {
			"Content-Type": "application/json; charset=utf-8"
		  }
		})
		.then( response => response.json() )
		.then( json => {
		  console.log("Returned from post:", json);
		  // TODO: test a result was returned!
		//   this.psList.push(json[0]);
		})
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

	getCertifications(){
		fetch("php/Certification/")
		.then(response => response.json())
		.then( json => {
			this.certificationList = json;
			console.log(this.certificationList)
		});
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
	}
}

	})



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
	  newuserForm: {},
	  name: '',
  },

  created: function() {
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
	  },

  methods: {

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



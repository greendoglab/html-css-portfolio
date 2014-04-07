function validateForm(form) {

  var fname = document.form1.fname.value; 
  var lname = document.form1.lname.value; 
  var email = document.form1.email.value;
  var msg = document.form1.msg.value;  
  var err = false;

  if (!fname) {
    //alert("Please, enter your first name.");
    document.form1.fname.style.background = "red";
    err = true;
  } 
  if (!lname) {
    //alert("Please, enter your last name.");
    document.form1.lname.style.background = "red";
    err = true;
  } 
  if (!email) {
    //alert("Please, enter your e-mail.");
    document.form1.email.style.background = "red";
    err = true;
  } 
  if (!msg) {
    //alert("Please, enter your message to us.");
    document.form1.msg.style.background = "red";
    err = true;
  }
  if(err == true) return false; 
}


function clrRed(input) {
 input.style.background = "white";
}
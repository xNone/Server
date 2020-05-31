function sendAccountInfo(state){
    $(".alert-danger").hide();
    if(state === 0){    //Login State
        let loginName = document.getElementById("loginName");
        let loginPass = document.getElementById("loginPass");
        $("#loginButton").hide();

        mp.trigger("loginDataToServer", loginName.value, loginPass.value, state);
        } else {    //Register State
        let registerName = document.getElementById("registerName");
		let registerPass = document.getElementById("registerPass");
		let registerMail = document.getElementById("registerMail");
        $("#registerButton").hide();

		mp.trigger("loginDataToServer", registerName.value, registerPass.value, registerMail.value, state);
    }
}
function show_hide_password(target){
	var input = document.getElementById("loginPass");
	if (input.getAttribute("type") == "password") {
		target.classList.add("view");
		input.setAttribute("type", "text");
	} else {
		target.classList.remove("view");
		input.setAttribute("type", "password");
	}
	return false;
}

function show_hide(target2){
	var input = document.getElementById("registerPass");
	if (input.getAttribute("type") == "password") {
		target2.classList.add("view2");
		input.setAttribute("type", "text");
	} else {
		target2.classList.remove("view2");
		input.setAttribute("type", "password");
	}
	return false;
}

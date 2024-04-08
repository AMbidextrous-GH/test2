

 // script.js
document.addEventListener("DOMContentLoaded", function() {
	var btnPass = document.getElementById("buttonPassword");
	btnPass.addEventListener("click", function() {
	  togglePasswordVisibility();
	  toggleButtonColor();
	});
  });
  
  function togglePasswordVisibility() {
	var txtPass = document.getElementById("textPassword");
	var btnPass = document.getElementById("buttonPassword");
	if (txtPass.type === "text") {
	  txtPass.type = "password";
	  btnPass.value = "みえる";
	} else {
	  txtPass.type = "text";
	  btnPass.value = "みえない";
	}
  }
  
  function toggleButtonColor() {
	var btnPass = document.getElementById("buttonPassword");
	if (btnPass.value === "みえる") {
	  btnPass.style.color = "white"; // 表示時の文字色
	  btnPass.style.backgroundColor = "blue"; // 表示時の色
	} else {
	  btnPass.style.color = "white"; // 非表示時の文字色
	  btnPass.style.backgroundColor = "red"; // 非表示時の色
	}
  }
   
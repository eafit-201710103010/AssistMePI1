function login(){
  usuario = document.getElementById("usuario").value;
  password = document.getElementById("contraseña").value;

  if(usuario == "" || password === ""){
    alert("Por favor ingrese los datos");
  }
  else{
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:5000/log_in?nombre=${usuario}&password=${password}`, false);
    xhttp.send();
    console.log(xhttp.status);
    if(xhttp.status == 500){
      alert("Usuario o contraseña incorrectos");
      document.getElementById("usuario").value = "";
      document.getElementById("contraseña").value = "";
    }
    else if(xhttp.status == 200){
      localStorage["usuario"] = usuario;
      window.location.href = "../Perfil/perfil.html"
    }
    else{
      alert("Error en la autentificación")
      document.getElementById("usuario").value = "";
      document.getElementById("contraseña").value = "";
    }

  }
}
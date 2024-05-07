const button_login = document.getElementById("bottone_login");
let div_login = document.getElementById("btn-accessi");
let div_privato = document.getElementById("stato_accesso");


const checkLog = async (username, password) => {
    console.log(username, password);
    try {
      const funz = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const result = await funz.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  };
  
button_login.onclick = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    checkLog(username, password).then((result) => {
      console.log(result);
      if (result.result == "Ok") {
        div_login.classList.remove("d-flex");
        div_login.classList.add("d-none");
        div_privato.classList.remove("d-none");
        div_privato.classList.add("d-flex");
        load().then((js) => {
          render(js);
        });
      }
    });
  };
  
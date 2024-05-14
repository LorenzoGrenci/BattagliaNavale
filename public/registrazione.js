const button_reg = document.getElementById("btn_register");



const checkReg = async (username, password) => {
  console.log(username, password);
  const funz = await fetch("/registrazione", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })});
  const result = await funz.json();
  return result;
};

button_reg.onclick = () => {
  let username = document.getElementById("inUsername").value;
  let password = document.getElementById("inPassword").value;
  checkReg(username, password).then((result) => {
    console.log(result);
    if (result.result == "Ok") {
      window.location.replace("index.html"),
      load().then((js) => {
        render(js);
      });
    }
  });
};

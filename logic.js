const fs = require('fs');
const textarea = document.getElementById('editor');
const numbers = document.getElementById("numbers");

var javafile = "";
var folderPath = "";

document.getElementById("logo").addEventListener('click', () => {
  window.location.reload();
});

document.getElementById("close").addEventListener('click', () => {
  window.close();
});

textarea.addEventListener("keyup", (e) => {
  const num = e.target.value.split("\n").length;
  numbers.innerHTML = Array(num).fill("<span></span>").join("");
  
});
textarea.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value =
      textarea.value.substring(0, start) +
      "\t" +
      textarea.value.substring(end);
    event.preventDefault();
  }
});

document.getElementById("pathfield").addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    event.preventDefault();
    folderPath = document.getElementById("pathfield").value;
    folderFetch();
  }
});

window.addEventListener("error", errorlog);
eval(document.getElementById("editor").value);

function errorlog(Error) {
  if (Error) {
    errs.push(Error);
    document.getElementById("logger").value += Error.message + '\n';
    document.getElementById("error").innerHTML = '<span id="status"></span> ' + errs.length + ' Errors';
    document.getElementById("status").style.background = "#FF5A5A";
  }
  else {
    return;
  }
}

async function folderFetch () {
  fs.readdir(folderPath, (files) => {
    files.forEach(file => {
      document.getElementById("directory").innerHTML += file + '\n';
    });
  });
}

async function fileFetch () {
  let fileText = fs.readFileSync(javafile);
  let jsonParsed = JSON.parse(fileText);
  document.getElementById('editor').innerHTML = jsonParsed;
}
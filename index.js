console.log("This is my project 6 from JavaScript course");

// Utility functions:
// 1. Utility function to get DOM element from string
function getElementFromString(s) {
  // let body = document.getElementsByTagName("body");
  const hide = document.querySelector(".hidden");
  if (hide !== null) {
    return;
  }
  let div = document.createElement("div");
  div.className = "hidden";
  div.innerHTML = `
  <h6>This will be permanently deleted?</h6>
  <div>
    <button class="YES">Yes</button>
    <button class="NO">No</button>
  </div>`;
  document.body.appendChild(div);
  // document.querySelector(".hidden").style.display = "flex";
  document.querySelector(".YES").addEventListener("click", () => {
    document.querySelector(".hidden").remove();
    document.getElementById(s).remove();
  });
  document.querySelector(".NO").addEventListener("click", () => {
    document.querySelector(".hidden").remove();
  });
  return;
}

// Initialize no of parameters
let addedParamCount = 0;

// Hide the parameters box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "block";
  document.getElementById("parametersBox").style.display = "none";
});

// If the user clicks on + button, add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div id="${addedParamCount}" class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter
                  </label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${
                          addedParamCount + 2
                        }" placeholder="Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${
                          addedParamCount + 2
                        }" placeholder="Value">
                    </div>
                    <button onclick="getElementFromString(${addedParamCount})" class="btn btn-primary deleteParam"> - </button>
                    </div>`;
  params.innerHTML += string;
  addedParamCount++;
});

// If the user clicks on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // Show please wait in the response box to request patience from the user
  // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
  document.getElementById("responsePrism").innerHTML =
    "Please wait.. Fetching response...";

  // Fetch all the values user has entered
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  // If user has used params option instead of json, collect all the parameters in an object
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  // Log all the values in the console for debugging
  console.log("URL is ", url);
  console.log("requestType is ", requestType);
  console.log("contentType is ", contentType);
  console.log("data is ", data);

  // if the request type is get, invoke fetch api to create a post request
  if (requestType == "GET" && url != "") {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        console.log(response.status);
        return response.text();
      })
      .then((text) => {
        // document.getElementById('responseJsonText').value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else if (requestType == "POST" && url != "") {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById('responseJsonText').value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    document.getElementById("responsePrism").innerHTML = "Request URL is Empty";
    Prism.highlightAll();
  }
});

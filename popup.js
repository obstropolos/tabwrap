//Functions for the first slot

//On load, check if there's a custom heading set
document.addEventListener('DOMContentLoaded', function () {
  let headingChange = document.getElementById('slotOne');

  //Pull the potentially saved data from storage and apply
  chrome.storage.local.get(["slotOne"], function (data) {
    if (data["slotOne"]) {
      headingChange.innerHTML = data["slotOne"]
    } else {
      headingChange.innerHTML = "Slot 1"
    };
  });
}, false);

//On load, check if there's an existing wrap to show info for
document.addEventListener('DOMContentLoaded', function() {
  let checkInfoButton = document.getElementById('infoOne');
  
  //Pull the potentially saved wrap and demonstrate info
  chrome.storage.local.get(["wrapA"], function(data){
    if (data["wrapA"]) {
      checkInfoButton.style.display = "";
      checkInfoButton.addEventListener('click', function () {
        alert(data["wrapA"].join('\r\n'));
      });
    } else {
      checkInfoButton.style.display = "none";
    };
  });

}, false);

//Wrap tabs from the existing window
document.addEventListener('DOMContentLoaded', function() {
    let checkPageButton = document.getElementById('wrapOne');
    checkPageButton.addEventListener('click', function() {

      //Check if there's a wrap already set, if not, create new array filled with tab urls
      chrome.storage.local.get(["wrapA"], function(data){
        if (data["wrapA"]) {
          alert("Wrap 1 is already set.");
        } else {
          let wrapA = [];
          chrome.tabs.query({ currentWindow: true }, function (tabs) {
            for (i = 0; i < tabs.length; i++) {
              wrapA.push(tabs[i].url);
            };
            chrome.storage.local.set({ "wrapA": wrapA }, function () {
              alert("Wrap 1 - Set!" + '\r\n' + wrapA.join('\r\n'));

              //Create info button upon initializing
              let checkInfoButton = document.getElementById('infoOne');
              checkInfoButton.style.display = "";
              chrome.storage.local.get("wrapA", function(data) {
                checkInfoButton.addEventListener('click', function () {
                  alert(data["wrapA"].join('\r\n'));
                });
              });

              //New heading changes
              let newHeading = prompt("Rename Slot 1", "");
              document.getElementById("slotOne").innerHTML = newHeading;
              chrome.storage.local.set({"slotOne": newHeading}, function() {
                console.log("New heading set.");
              });
            });
          });
        };
      });

    }, false);
  }, false);

//Deploy the first wrap 
document.addEventListener('DOMContentLoaded', function() {
    let checkPageButton = document.getElementById('deployOne');
    checkPageButton.addEventListener('click', function() {

      //Check to see if a wrap exists
      chrome.storage.local.get(["wrapA"], function(data) {
        if (data["wrapA"]) {
          chrome.windows.create({ focused: true, url: data.wrapA });
        } else {
          alert("Wrap 1 is empty.")
        };
      });

    }, false);
  }, false);

//Delete the stored wrap and restore everything
document.addEventListener('DOMContentLoaded', function () {
  let checkPageButton = document.getElementById('deleteOne');
  checkPageButton.addEventListener('click', function () {
    
    chrome.storage.local.get(["wrapA"], function(data) {
      if (data["wrapA"]) {
        chrome.storage.local.remove("wrapA", function () {
          alert("Wrap 1 has been deleted.");

          //Get rid of info button 
          let checkInfoButton = document.getElementById('infoOne');
          checkInfoButton.style.display = "none";

          //Get rid of custom title
          chrome.storage.local.get(["slotOne"], function() {
            chrome.storage.local.remove("slotOne", function () {
            });
            let newHeading = document.getElementById("slotOne");
            newHeading.innerHTML = "Slot 1";
          });
        });
      } else {
        alert("Wrap 1 is empty.")
      };
    });

  }, false);
}, false);

//Functions for the second slot

document.addEventListener('DOMContentLoaded', function () {
  let headingChange = document.getElementById('slotTwo');

  chrome.storage.local.get(["slotTwo"], function (data) {
    if (data["slotTwo"]) {
      headingChange.innerHTML = data["slotTwo"]
    } else {
      headingChange.innerHTML = "Slot 2"
    };
  });
}, false);

document.addEventListener('DOMContentLoaded', function () {
  let checkInfoButton = document.getElementById('infoTwo');

  chrome.storage.local.get(["wrapB"], function (data) {
    if (data["wrapB"]) {
      checkInfoButton.style.display = "";
      checkInfoButton.addEventListener('click', function () {
        alert(data["wrapB"].join('\r\n'));
      });
    } else {
      checkInfoButton.style.display = "none";
    };
  });

}, false);

document.addEventListener('DOMContentLoaded', function () {
  let checkPageButton = document.getElementById('wrapTwo');
  checkPageButton.addEventListener('click', function () {

    chrome.storage.local.get(["wrapB"], function (data) {
      if (data["wrapB"]) {
        alert("Wrap 2 is already set.");
      } else {
        let wrapB = [];
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
          for (i = 0; i < tabs.length; i++) {
            wrapB.push(tabs[i].url);
          };
          chrome.storage.local.set({ "wrapB": wrapB }, function () {
            alert("Wrap 2 - Set!" + '\r\n' + wrapB.join('\r\n'));

            let checkInfoButton = document.getElementById('infoTwo');
            checkInfoButton.style.display = "";
            checkInfoButton.addEventListener('click', function () {
              alert(wrapB.join('\r\n'));
            });

            let newHeading = prompt("Rename Slot 2", "");
            document.getElementById("slotTwo").innerHTML = newHeading;
            chrome.storage.local.set({ "slotTwo": newHeading }, function () {
              console.log("New heading set.");
            });
          });
        });
      };
    });

  }, false);
}, false);

document.addEventListener('DOMContentLoaded', function () {
  let checkPageButton = document.getElementById('deployTwo');
  checkPageButton.addEventListener('click', function () {

    chrome.storage.local.get(["wrapB"], function (data) {
      if (data["wrapB"]) {
        chrome.windows.create({ focused: true, url: data.wrapB });
      } else {
        alert("Wrap 2 is empty.")
      };
    });

  }, false);
}, false);

document.addEventListener('DOMContentLoaded', function () {
  let checkPageButton = document.getElementById('deleteTwo');
  checkPageButton.addEventListener('click', function () {

    chrome.storage.local.get(["wrapB"], function (data) {
      if (data["wrapB"]) {
        chrome.storage.local.remove("wrapB", function () {
          alert("Wrap 2 has been deleted.");

          let checkInfoButton = document.getElementById('infoTwo');
          checkInfoButton.style.display = "none";

          chrome.storage.local.get(["slotTwo"], function () {
            chrome.storage.local.remove("slotTwo", function () {
            });
            let newHeading = document.getElementById("slotTwo");
            newHeading.innerHTML = "Slot 2";
          });
        });
      } else {
        alert("Wrap 2 is empty.");
      };
    });

  }, false);
}, false);

//Functions for the third slot.

document.addEventListener('DOMContentLoaded', function () {
  let headingChange = document.getElementById('slotThree');

  chrome.storage.local.get(["slotThree"], function (data) {
    if (data["slotThree"]) {
      headingChange.innerHTML = data["slotThree"]
    } else {
      headingChange.innerHTML = "Slot 3"
    };
  });
}, false);

document.addEventListener('DOMContentLoaded', function () {
  let checkInfoButton = document.getElementById('infoThree');

  chrome.storage.local.get(["wrapC"], function (data) {
    if (data["wrapC"]) {
      checkInfoButton.style.display = "";
      checkInfoButton.addEventListener('click', function () {
        alert(data["wrapC"].join('\r\n'));
      });
    } else {
      checkInfoButton.style.display = "none";
    };
  });

}, false);

document.addEventListener('DOMContentLoaded', function () {
  let checkPageButton = document.getElementById('wrapThree');
  checkPageButton.addEventListener('click', function () {

    chrome.storage.local.get(["wrapC"], function (data) {
      if (data["wrapC"]) {
        alert("Slot 3 is already set.");
      } else {
        let wrapC = [];
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
          for (i = 0; i < tabs.length; i++) {
            wrapC.push(tabs[i].url);
          };
          chrome.storage.local.set({ "wrapC": wrapC }, function () {
            alert("Slot 3 - Set!" + '\r\n' + wrapC.join('\r\n'));

            //Create info button upon initializing
            let checkInfoButton = document.getElementById('infoThree');
            checkInfoButton.style.display = "";
            checkInfoButton.addEventListener('click', function () {
              alert(wrapC.join('\r\n'));
            });

            //New heading changes
            let newHeading = prompt("Rename Slot 3", "");
            document.getElementById("slotThree").innerHTML = newHeading;
            chrome.storage.local.set({ "slotThree": newHeading }, function () {
              console.log("New heading set.");
            });
          });
        });
      };
    });
  }, false);
}, false);

document.addEventListener('DOMContentLoaded', function () {
  let checkPageButton = document.getElementById('deployThree');
  checkPageButton.addEventListener('click', function () {

    chrome.storage.local.get(["wrapC"], function (data) {
      if (data["wrapC"]) {
        chrome.windows.create({ focused: true, url: data.wrapC });
      } else {
        alert("Wrap 3 is empty.")
      };
    });

  }, false);
}, false);

document.addEventListener('DOMContentLoaded', function () {
  let checkPageButton = document.getElementById('deleteThree');
  checkPageButton.addEventListener('click', function () {

    chrome.storage.local.get(["wrapC"], function (data) {
      if (data["wrapC"]) {
        chrome.storage.local.remove("wrapC", function () {
          alert("Wrap 3 has been deleted.");

          let checkInfoButton = document.getElementById('infoThree');
          checkInfoButton.style.display = "none";

          chrome.storage.local.get(["slotThree"], function () {
            chrome.storage.local.remove("slotThree", function () {
            });
            let newHeading = document.getElementById("slotThree");
            newHeading.innerHTML = "Slot 3";
          });
        });
      } else {
        alert("Wrap 3 is empty.")
      };
    });

  }, false);
}, false);


//Logo alert
document.addEventListener('DOMContentLoaded', function() {
  let logo = document.getElementById('tabwrapLogo');
  logo.addEventListener('click', function() {
    alert("TabWrap - Wrap tabs, deploy wraps, delete wraps - all in an easy-to-use interface.")
  })
})
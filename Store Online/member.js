var memberList = [];
var formUpload = {};
function loadmemberList() {
  loading(true);
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load", displayData);
  xhttp.open(
    "GET",
    "http://localhost:3000/products"
  );
  xhttp.send();
}
// loadmemberList();
setTimeout(() => {
  loadmemberList();
}, 500);
function displayData(e) {
  // console.log(e)
  var respone = e.target.response;
  var jsonData = JSON.parse(respone);
  memberList = jsonData;
  // console.log(jsonData)
  setupData(jsonData);
}
function setupData(jsonData) {
  if (jsonData.length > 0) {
    var div = "<div class = 'grid'>";
    for (var i = 0; i <= jsonData.length - 1; i++) {
      var rating = '';
      for(var n=1; n<=5;n++){
        if (jsonData[i].rating.rate > n){
          rating += '<i class="rating__star fas fa-star"></i>'
        }
        else{
          rating += '<i class="rating__star far fa-star"></i>'
        }
      }
      var image = '<div class = "image-container"><div class ="image-product" style = "background-image : url('+jsonData[i].image+')"></div></div>'
      var title = "<p class='title-img'>" + jsonData[i].title + "</p>";
      var price = "<p class='price'>" + jsonData[i].price + ' $'+ "</p>"; 
      var subDes = '<div class ="flex-row"><div class ="rating">'+rating+'</div><div class = "count">Đã bán: '+jsonData[i].rating.count+'</div></div>'
      // var des = "<p>" + jsonData[i].description + "</p>";
      div += '<div class = "member-item"><a href = "detail.html"> ' + image + ' ' + title + ' ' + price + ' ' + subDes + '</div>'
    }
    div += '</div>'
    renderData(div);
  } else {
    var memberelm = document.getElementById("memberlist");
    memberelm.innerHTML = "";
    
  }
  setTimeout(() => {
    loading(false);
  }, 1000);
}

function renderData(data) {
  var memberelm = document.getElementById("memberlist");
  if (memberelm != undefined) {
    memberelm.innerHTML = data;
    document.addEventListener(
      "click",
      function (e) {
        e = e || window.event;
        var target = e.target;

        if (target.type == "checkbox" && target.nodeName == "INPUT") {
          var id = target.id;
          var idmember = id.slice(9, id.length);
          console.log(idmember);
          // console.log(id.length)
          // console.log(target)
          // console.log(id)
          updateStatus(idmember);
        }

        // console.log(target)
        if (target.nodeName == "BUTTON" && target.className == "btn-delete") {
          loading(true);
          var id = target.id;
          var idmember = id.slice(11, id.length);
          deletemember(idmember);
        }
      },
      false
    );
  }
}

function deletemember(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load", loadmemberList);
  xhttp.open(
    "DELETE",
    "https://63ee18d3d466e0c18ba93b38.mockapi.io/api/teammember/" + id
  );
  // xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhttp.send();
  // loadmemberList();
}
function updateStatus(e) {
  loading(true);
  var dataput = {
    IsDone: true,
  };
  var json = JSON.stringify(dataput);
  var xhttp = new XMLHttpRequest();

  xhttp.addEventListener("load", loadmemberList);
  xhttp.open(
    "PUT",
    "https://63ee18d3d466e0c18ba93b38.mockapi.io/api/teammember/" + e
  );
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send(json);
  // loadmemberList();
}
function filter() {
  var inputelm = document.getElementById("global-search");
  if (inputelm != undefined) {
    var text = inputelm.value;
    var memberFilter = memberList.filter((e) => {
      var lowerText = e.name.toLowerCase();
      if (lowerText.includes(text)) {
        return e;
      }
    });
    setupData(memberFilter);
    // console.log(memberFilter)
  }
}

function showModalPost() {
  var modalElm = document.getElementById("modal");
  if (modalElm) {
    modalElm.style.display = "flex";
  }
}

function hideModalPost() {
  var modalElm = document.getElementById("modal");
  if (modalElm) {
    modalElm.style.display = "none";
  }
}

function createmember() {
  //lay text duoc nhap vao the input
  var inputelm = document.getElementById("input-name");
  var inputdes = document.getElementById("input-des");
  if (inputelm && inputdes != undefined) {
    var textName = inputelm.value;
    var textDes = inputdes.value;
    formUpload.name = textName;
    formUpload.description = textDes;
  }
  //goi api post
  var json = JSON.stringify(formUpload);
  var settings = {
    "url": "https://63ee18d3d466e0c18ba93b38.mockapi.io/api/teammember",
    "method": "POST",
    "contentType": "application/json",
    "data": json,
  };

  $.ajax(settings).done(function (response) {
    var modalElm = document.getElementById("modal");
    if (modalElm) {
      modalElm.style.display = "none";
    };
    loadmemberList();
  })
  
  // const xhr = new XMLHttpRequest();
  // xhr.open(
  //   "POST",
  //   "https://63ee18d3d466e0c18ba93b38.mockapi.io/api/teammember",
  //   true
  // );

  // //Send the proper header information along with the request
  // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  // xhr.onreadystatechange = () => {
  //   // Call a function when the state changes.
  //   if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
  //     // Request finished. Do processing here.
  //     //clear the input va dong modal
  //     document.getElementById("inputADD").value = "";
  //     hideModalPost();
  //   }
  // };
  // xhr.send(json);

  // loadmemberList();
  //goi lai data moi
}
function loading(isloading) {
  let elm = document.getElementById("loading");
  if (elm) {
    if (isloading == true) {
      elm.style.display = "flex";
    } else {
      elm.style.display = "none";
    }
  }
}
//upload image bang JS
setTimeout(() => {
  uploadImg();
}, 1000);
function uploadImg() {
  var img_input = document.querySelector(".image-input");

  if (img_input) {
    img_input.addEventListener("change", function (e) {
      var reader = new FileReader();
      var file = null;
      reader.onload = function () {
        var output = document.getElementById('display-img');
        var img = document.createElement('img')
        img.src = reader.result;
        file = e.target.files[0]
        var urlPromise = fileToBase64(file)
        urlPromise.then(url => {
          // console.log(url)
          formUpload.avatar = url
        })
        output.appendChild(img)
      }
      reader.readAsDataURL(e.target.files[0]);


    })
  }
};
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



//convert file sang dang base 64, sau do put len API
// function convertImg(){
//   var fileInput = document.getElementsByClassName('image-input');
//   fileInput.addEventListener('change', function() {
//     var file = fileInput.files[0];
//     fileToBase64(file, function(base64String) {
//       console.log(base64String);
//     });
//   });
// }

//validate form: bắt buộc có giá trị name, file, không bắt buộc description, nếu không nhập đủ trường thông tin, hiển thị warning dòng chữ màu đỏ.
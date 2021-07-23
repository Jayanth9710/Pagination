const display = document.createElement("div");
    display.className="display";
    display.innerHTML=`
    <div class="pagination"></div>`;
    document.body.append(display);
function loadUsers(users){
  const list=document.createElement("div");
  list.className="list";
  users.forEach((user) =>{
    const container=document.createElement("div");
    container.className="container";
    
    container.innerHTML = `
    
    <div class="usercards">
    <div>Name:</div>
    <div>${user.name}</div>
    <div>E-mail ID:</div>
    <div>${user.email}</div>
    </div>
    `;
    
    list.append(container);
  });
  document.body.append(list);
}

async function getUsers() {
  const data = await fetch(
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
    {
      method: "GET"
    }
  );

  const users = await data.json();
  const Pages = Math.ceil(users.length / 10);
 
  
  const pagination = document.querySelector(".pagination");
  
  for (let i = 1; i <= Pages; i++) {
    const page = document.createElement("button");
    page.className="page-button";
    
    page.innerText = i;


    page.onclick = function () {
         
  
      const pageUsers = users.filter(
        (user, index) => index >= (i - 1) * 10 && index < i * 10
      );
      document.querySelector(".list").remove();
      loadUsers(pageUsers);
    };
    
    pagination.append(page);
  }

  
  const firstTenUsers = users.filter((user, index) => index < 10);
  console.log(firstTenUsers);

  console.log("No of users are ", users.length);

  loadUsers(firstTenUsers);
}
getUsers();
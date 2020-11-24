//list containing the expenses information
var expList = [];
var expTitleList = [];
var expDispTitle = [];

//setting counter
var count = 0;

function setBudget(){
    //resetting the warning
    document.getElementById("warning").innerHTML = "";

    document.getElementById('budVal').innerHTML = document.getElementById('budInp').value;
    setColor(document.getElementById('budInp').value, document.getElementById('budVal'))
    if(document.getElementById("balVal").innerHTML) {
        calcExpenses();
    }
}

function calcExpenses() {
    let expense = parseInt(document.getElementById("expInp").value);
    let budget = parseInt(document.getElementById("budVal").innerHTML);
    let expenseTitle = document.getElementById("expT").value + "" + count;
    let expenseDispTitle = document.getElementById("expT").value;


    //adding new exp to the lists when exp != 0
    if(expense != 0 ) {
        if( expenseTitle != "") {
            //incrementing the counter
            count++;

            //resetting the warning
            document.getElementById("warning").innerHTML = "";

            expList.push(parseInt(expense));
            expDispTitle.push(expenseDispTitle);
            expTitleList.push(expenseTitle);

            //adding expense to the expense list on html page
            if(expTitleList.length == 1){
                createNewElement("first-row");
            }
            else {
                let txt = "" + expTitleList[expTitleList.length - 2];
                createNewElement(txt);
            }
        }
        else {
            //showing the warning
            document.getElementById("warning").innerHTML = "Please enter an expense title";
        }
    }

     //calc and setting the exp in html
    let expenses = expList.reduce(function(a, b){
        return a + b;
    }, 0);
    document.getElementById("expVal").innerHTML = expenses; 
    let balance = budget - expenses;
    document.getElementById("balVal").innerHTML = balance;

    //setting the color
    setColor(balance,  document.getElementById("balVal"));
    setColor(budget, document.getElementById("budVal"))

    //reseting the inputs
    document.getElementById("expInp").value = 0;
    document.getElementById("budInp").value = 0;
    document.getElementById("expT").value = "";
}

function setColor(val, dom){
    if(val <= 0) {
        dom.style.color = 'red';
    }
    else{
        dom.style.color = 'green';
    }
}

function createNewElement(parentElementId) {
    let node = document.getElementById(parentElementId);
    //adding the counter for uniqueness
    let idSet = expTitleList[expTitleList.length - 1];
    //parallel for name, i.e. display name
    let disp = expDispTitle[expDispTitle.length - 1];
    let txt =  '<tr id="'+ idSet +'"><td>' + disp +'</td><td>'+ expList[expList.length - 1] +'</td><td><button onClick="deleteElement(\''+ idSet+ '\')"></td></tr>';
    node.insertAdjacentHTML('afterend', txt);
}

function deleteElement(eId) {
    let txt = "" + eId + "";
    document.getElementById(txt).remove();
    //element removed from html page
    
    for(var i = expList.length - 1; i >= 0 ; i--) {
        if(txt == expTitleList[i]) {
            expTitleList.splice(i, 1);
            expList.splice(i, 1);
            break;
        }
    }
    //element removed from lists;

    refresh();

}

function refresh(){
    let bud = document.getElementById("budVal").innerHTML;
    //calculating expenses again;
    let expenses = expList.reduce(function(a, b){
        return a + b;
    }, 0);
    //calculating bal again
    let bal = parseInt(bud) - expenses;
    //refreshing the values
    document.getElementById("expVal").innerHTML = expenses;
    document.getElementById("balVal").innerHTML = bal;
    setColor(expenses, document.getElementById("expVal"));
    setColor(bal,document.getElementById("balVal") )
}

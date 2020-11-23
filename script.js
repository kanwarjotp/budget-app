//list containing the expenses information
var expList = [];
var expTitleList = [];

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
    let expenseTitle = document.getElementById("expT").value;

    //adding new exp to the lists when exp != 0
    if(expense != 0 ) {
        if( expenseTitle != "") {
            //resetting the warning
            document.getElementById("warning").innerHTML = "";

            expList.push(parseInt(expense));
            expTitleList.push(expenseTitle);

            //adding expense to the expense list on html page
            if(expTitleList.length == 1){
                createNewElement("last-row");
            }
            else {
                let txt = "" + expensesTitle[-1];
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
    let idSet = expTitleList[expTitleList.length - 1];
    let txt =  '<tr id="'+ idSet +'"><td>' + idSet +'</td></tr>';
    node.insertAdjacentHTML('afterend', txt);
}

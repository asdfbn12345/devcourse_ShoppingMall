function compareVariable() {
    let num = 10;
    const num2 = 30;

    const greaterVariable = num > num2
        ? "num"
        : "num2";
    const smallerVariable = num < num2
        ? "num"
        : "num2";

    alert(`The ${greaterVariable} is greater than ${smallerVariable}`)
}

function popId() {
    let userId = document.getElementById('txt_id').value;

    if (!userId) {
        alert('아이디를 입력해주세요.');
    } else {
        alert(`Welcome ${userId}!`);
    }
}

function myFunction() {
    alert('1');
    alert('2');
    alert('3');
}
$('#transactionAmount').focusout(function () {
    $.getJSON('http://localhost:3000/lastRate', function (data) {
        var dolarKuru = data.selling
        var transAmount = $('#transactionAmount').val()
        var finalAmount = transAmount * dolarKuru
        $('#finalAmount').val(finalAmount)  
    })
})
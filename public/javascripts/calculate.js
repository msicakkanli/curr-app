
// calculate TL amount to selected currency
$('#transactionAmount').focusout(function () {
    var currency = $('#finalCurrecy option:selected').text()
    if (currency === 'USD' || currency==='EUR' || currency==='GBP') {
        $.getJSON('http://localhost:3000/api/lastRate/' + currency, function (data) {
            var transType = $('#transactionType option:selected').text()
            if (transType === 'Alış') {
                var dolarKuru = data.selling
                var transAmount = $('#transactionAmount').val()
                var finalAmount = transAmount * dolarKuru
                $('#finalAmount').val(finalAmount)
            } else {
                var dolarKuru = data.buying
                var transAmount = $('#transactionAmount').val()
                var finalAmount = transAmount * dolarKuru
                $('#finalAmount').val(finalAmount)
            }
        })
    } else {
        $.getJSON('http://localhost:3000/api/lastCoin/' + currency , function (data) {
            var transType = $('#transactionType option:selected').text()
            if (transType === 'Alış') {
                var coinKuru = data.selling
                var transAmount = $('#transactionAmount').val()
                var finalAmount = transAmount * coinKuru
                $('#finalAmount').val(finalAmount)
            } else {
                var coinKuru = data.buying
                var transAmount = $('#transactionAmount').val()
                var finalAmount = transAmount * coinKuru
                $('#finalAmount').val(finalAmount)
            }
        })
    }

})


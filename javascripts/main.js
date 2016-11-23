
function addEvent(el, eventName, handler){
    if (el.addEventListener) {
        el.addEventListener(eventName, handler);
    } else {
        el.attachEvent('on' + eventName, function(){
            handler.call(el);
        });
    }
};

var paymentForm = function(formSelector){

    var formSelector = formSelector;
    var doSubmit = false;
    var getCurrentForm = function(){ return document.querySelector(formSelector) };

    var getInputFromDataCheckoutAttr = function(dataCheckout){
        form = getCurrentForm();
        return form.querySelector('input[data-checkout="' + dataCheckout + '"]');
    };

    var getInputFromID = function(id){
        form = getCurrentForm();
        return form.querySelector('#' + id);
    };

    var getCurrentFormAsHash = {
        cardNumber: getInputFromDataCheckoutAttr('cardNumber')
    };

    var getBin = function(){
        formHash = getCurrentFormAsHash;
        ccNumber = formHash.cardNumber;
        return ccNumber.value.replace(/[ .-]/g, '').slice(0, 6);
    };

    var clearOptions = function(){

    }



    var initialize = function(){
        addEvent(getCurrentForm(), 'submit', doPay);
    };

    var doPay = function(event){
        console.log("doPay");
        event.preventDefault();
        Mercadopago.createToken(getCurrentForm(), createTokenCallback);
    };

    var createTokenCallback = function(status, response) {
        if (status != 200 && status != 201) {
            $(".alert-danger").show();
            $(".alert-success").hide();
            $(".alert-danger").html("<p>" + JSON.stringify(response) + "</p>");
        }else{
            $(".alert-danger").hide();
            var form = getCurrentForm();
            var card = document.createElement('input');
            card.setAttribute('name',"token");
            card.setAttribute('type',"hidden");
            card.setAttribute('value',response.id);
            form.appendChild(card);
            doSubmit=true;
            $(".alert-success").show();
            $(".alert-success").html("<p>CardToken: " + JSON.stringify(response.id) + "</p>");
        }
    };

    initialize();

}




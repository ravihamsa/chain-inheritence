var Person = function(name){
    this.name = name;
    var methodQue = {};

    this.addToMethodQue = function(func, namespace){
        if(!func || typeof func !== 'function'){
            throw new Error ('invalid input, try using function');
        }
        namespace = namespace || '_';

        var funcArray = methodQue[namespace];
        if(!funcArray){
            funcArray = methodQue[namespace] = [];
        }
        funcArray.push(func);
    }

    this.executeMethodQue = function(){
        for(var namespace in methodQue){
            var funcArray = methodQue[namespace];
            var args;
            for(var j= 0, len=funcArray.length; j<len; j++){
                var func = funcArray[j];
                args = func.call(this, args);
            }
        }
    }
}


var person = new Person('Ravi');
person.addToMethodQue(function(callback){
    console.log(arguments);
    return 'one';
})


person.addToMethodQue(function(){
    console.log(arguments);
    return 'two';
})

person.addToMethodQue(function(){
    console.log(arguments);
    return 'three';
})

person.executeMethodQue();
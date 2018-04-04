
let str = 'users/:id/detail';


if(str.slice(-6) == 'detail'){
    let pattern = /(\d)+/g;

    str.replace(pattern,function(m){
        // console.log(m1);
        return ':id';
    })               
    console.log(str)
}

// let a = 'ssss';

// a = a.replace(/s/g,'as')

// console.log(a);

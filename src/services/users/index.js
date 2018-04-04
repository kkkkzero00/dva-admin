/*处理异步请求*/
import commonServices from 'utils/commonServices';

class User extends commonServices{
    constructor(name){
        super(name);
    }
}

/*请求数据*/

export default new User('users');




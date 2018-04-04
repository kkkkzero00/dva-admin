/*处理异步请求*/
import commonServices from 'utils/commonServices';

class Manager extends commonServices{
    constructor(name){
        super(name);
    }
}

/*请求数据*/

export default new Manager('manager');




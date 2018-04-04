import commonListModel from 'utils/commonListModel';
import axios from 'axios';


var usersModel = {
    namespace:'users',
    effects:{
        *getTitle({payload},{call,put,select}){
            console.log('getTitle');
        }
    }
}

export default commonListModel(usersModel)

// export default usersModel
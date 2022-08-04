import moment from 'moment';
import 'moment/locale/id';


const Moment = (dateTime) => {
    return moment(dateTime).startOf('day').fromNow();
}

export default Moment
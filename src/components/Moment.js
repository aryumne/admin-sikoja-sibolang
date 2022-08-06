import moment from 'moment';
import 'moment/locale/id';


export const Relative = (dateTime) => {
    return moment(dateTime).startOf('day').fromNow();
}

export const Format = (dateTime) => {
    return moment(dateTime).format('LL');
}

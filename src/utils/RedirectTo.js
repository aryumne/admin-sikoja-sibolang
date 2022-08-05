import { useNavigate } from 'react-router-dom';

export default function RedirectTo(destination, { res, status } = {}) {
    const navigate = useNavigate();
    if (res) {
        res.writeHead(status || 302, { Location: destination })
        res.end()
    } else {
        if (destination[0] === '/' && destination[1] !== '/') {
            navigate(destination)
        } else {
            window.location = destination
        }
    }
}
import { Error } from '@mui/icons-material';
import SizedBox from './../sizedBox/sizedBox';
import "./errorFetch.css"

function ErrorFetch(props) {
    var msg = props.msg ?? "Error fetching data"
    var height = props.height ?? "100%"
    return (
    <div className='error-widget' style={{height:height}}>
    <Error
        color = "error"
        fontSize='16px'
      />
    <SizedBox width="6px"></SizedBox>
    <p>{msg}</p>
    </div>
    );
}

export default ErrorFetch;
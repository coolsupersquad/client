
import Login from "../components/Login"
import { db, firebaseAuth } from '../config/constants';
import { logout } from '../helpers/auth';
import Button from '@material-ui/core/Button';

export default function() {
    return (
        <div>
            { window.user? 
                <div>
                    <h1> Account </h1>
                    
                    <Button variant="contained"
                    primary={false}
                    onClick={event => logout()}
                    >
                        Sign out
                    </Button>
                </div>
             :
                <div>
                    <h1> Sign in </h1>
                    <Login />
                </div>
            }

        </div>
    )
}

import {User} from "../../model/User";
import {useUserDataStore} from "../../store/userData";

export default new class AuthService {

    login(user: User) {
        const userDataStore = useUserDataStore()
        userDataStore.username = user.username
    }

}

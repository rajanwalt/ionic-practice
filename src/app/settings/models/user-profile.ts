import { UserProfileComponent } from '../user-profile/user-profile.component';

export class UserProfile {
    static fromAPI(data:any) : UserProfile  {
        return new UserProfile(
            data.firstname,
            data.lastname,
            data.email
        )
    }
    constructor(
        public firstname,
        public lastname,
        public email
    ) {}
}
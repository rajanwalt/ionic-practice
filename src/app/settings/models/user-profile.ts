export class UserProfile {
    static fromAPI(data:any) : UserProfile  {
        return new UserProfile(
            data.firstname,
            data.lastname,
            data.email,
            data.id,
            data.country
        )
    }
    constructor(
        public firstname,
        public lastname,
        public email,
        public id,
        public country
    ) {}
}
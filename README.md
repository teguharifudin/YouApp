![](https://www.teguharief.com/img/teguh-arief.png)

# YouApp

a project of login/profile/chat using NestJS, MongoDB and Node.js implemented using Docker with JWT Token, DTO, validations, and Socket.IO.

## Dockerize

```
git clone git@github.com:teguharifudin/YouApp.git
```
```
cd YouApp
```
```
docker compose build
```
```
docker compose up
```

## Usage

Then run the app at http://localhost:3000/api

### Register with validation

User A
```
{
    "username": "teguh",
    "password": "123456",
    "email": "teguh.arifudin@gmail.com",
    "passwordConfirm": "1234"
}
```
User B
```
{
    "username": "arief",
    "password": "123456",
    "email": "teguh.arifudin@gmail.com",
    "passwordConfirm": "123456"
}
```

### Login Token

User A
```
{
    "username": "teguh",
    "password": "123456"
}
```

### Create Profile with validation, and authorization
The registered username cannot be used twice. And implement Birthday date ​​to Horoscope and Zodiac values.

### Update Profile with Register/user id, validation, and authorization
If the file is not updated (unchecked "Send empty value" in Swagger), it means the old file is still same.

### Get Profile with username
{
  "_id": "668a3da6720652f6e1806e24",
  "username": "teguh",
  "fullName": "Teguh Arifudin",
  "gender": "Male",
  "birthday": "1921-10-07",
  "horoscope": "Libra",
  "zodiac": "Pig",
  "height": "",
  "weight": "",
  "interest": "Coding",
  "file": "68c27f53fc28db8e4d3a5f5417942492.jpg",
  "createdAt": "2024-07-07T07:03:02.081Z",
  "updateAt": "2024-07-07T07:03:02.081Z",
  "__v": 0
}

### Send Message with authorization

User A to User B
```
{
  "receiverId": "arief",
  "content": "Assalamualaikum"
}
```

### View Message with authorization
Login with User B to get receiverId.

## Contributing

Please use the [issue tracker](https://github.com/teguharifudin/YouApp/issues) to report any bugs or file feature requests.

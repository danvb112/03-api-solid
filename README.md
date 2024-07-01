# 03-api-solid

# Gympass style app.

## FRs (functional requirements)

- [X] It should be possible to register.
- [X] It should be possible to authenticate.
- [] It should be possible to retrieve the profile of a logged-in user.
- [] It should be possible to obtain the number of check-ins performed by the logged-in user.
- [] It should be possible for the user to retrieve their check-in history.
- [] It should be possible for the user to search for nearby gyms.
- [] It should be possible for the user to search for gyms by name.
- [] It should be possible for the user to check in at a gym.
- [] It should be possible to validate a user's check-in.
- [] It should be possible to register a gym.

## BRs (Business rules)

- [X] The user must not be able to register with a duplicate email.
- [] The user cannot make two check-ins on the same day.
- [] The user cannot check in if not near the gym.
- [] The check-in can only be validated up to 20 minutes after it is created.
- [] The check-in can only be validated by administrators.
- [] The gym can only be registered by administrators.

## NFRs (non-functional requirements)

- [X] The user's password needs to be encrypted.
- [X] The application data needs to be persisted in a PostgreSQL database.
- [] All data lists need to be paginated with 20 items per page.
- [] The user should be identified by a JWT, JSON Web Token.
export interface UserDTO {
  name: string,
  surname: string,
  login: string,
  bio: string,
  mail: string,
  phone: string,
  profession: string,
  social: SocialDTO,
}

interface SocialDTO {
  linkedin: string,
  twitter: string,
  github: string,
}

// "user": {
//   "name": "Raphael",
//   "surname": "Gregg",
//   "login": "raphaelgregg",
//   "bio": "about",
//   "mail": "raphaelgregg@gmail.com",
//   "phone": "91992720408",
//   "social": {
//     "linkedin": "https://www.linkedin.com/in/raphaelgregg",
//     "twitter": "https://twitter.com/raphaelgregg",
//     "github": "https://github.com/raphaelgregg"
//   }
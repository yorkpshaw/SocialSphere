# Data Models

## User
| name             | type               | unique | optional |
| ---------------- | ------             | ------ | -------- |
| _id              | string             | yes    | no       |
| firstName        | string             | yes    | no       |
| lastName         | string             | yes    | no       |
| friends          | array<object>      | no     | no       |
| email            | string             |        |
| password         | string             |        |
| picturePath      | string ref         |        |
| location         | string             |        |
| occupation       | string             |        |
| viewedProfile    | number             |        |
| impressions      | number             |        |


## Post
| name             | type               | unique | optional |
| ---------------- | ------             | ------ | -------- |
| _id              | string             | yes    | no       |
| userID           | string ref         | yes    | no       |
| firstName        | string             | yes    | no       |
| lastName         | string             | no     | no       |
| location         | string             |        |          |
| description      | string             |        |          |
| userPicturePath  | string ref         |        |          |
| picturePath      | string ref         |        |          |
| likes            | object<string ref> |        |          |
| comments         | array<string>      |        |          |

## Friend (Sub Doc)
| name             | type               | unique | optional |
| ---------------- | ------             | ------ | -------- |
| _id              | string             | yes    | no       |
| firstName        | string             | yes    | no       |
| lastName         | string             | yes    | no       |
| picturePath      | string ref         | no     | no       |
| occupation       | string             |        |          |
| location         | string             |        |          |

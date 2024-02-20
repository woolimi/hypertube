import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Comment } from "../../comment/comment.entity";
import { User } from "../../user/user.entity";
import { Movie } from "../../movie/movie.entity";

export const CommentFactory = setSeederFactory(Comment, (faker: Faker) => {
  const comment = new Comment();
  comment.content = faker.lorem.sentence();

  return comment;
});

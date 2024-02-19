import { Column, Entity, Index } from "typeorm";

@Index("IDX_78a916df40e02a9deb1c4b75ed", ["username"], { unique: true })
@Index("IDX_e12875dfb3b1d92d7d7c5377e2", ["email"], { unique: true })
@Entity("user", { schema: "hypertube" })
export class User {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  public id: string;

  @Column("varchar", { name: "firstName", length: 255 })
  public firstName: string;

  @Column("varchar", { name: "lastName", length: 255 })
  public lastName: string;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  public username: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  public email: string;

  @Column("varchar", { name: "password", length: 255 })
  public password: string;

  @Column("varchar", { name: "image", length: 255 })
  public image: string;

  @Column("tinyint", { name: "emailVerified", default: () => "'0'" })
  public emailVerified: number;

  @Column("varchar", { name: "refreshToken", length: 255 })
  public refreshToken: string;

  @Column("varchar", {
    name: "provider",
    length: 255,
    default: () => "'local'",
  })
  public provider: string;
}

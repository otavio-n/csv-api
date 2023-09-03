class User {
  id?: string;
  name: string;
  city: string;
  country: string;
  favorite_sport: string;

  private constructor({ name, city, country, favorite_sport }: User) {
    return Object.assign(this, {
      name,
      city,
      country,
      favorite_sport,
    });
  }

  static create({ name, city, country, favorite_sport }: User) {
    const user = new User({ name, city, country, favorite_sport });
    return user;
  }

  static getProperties() {
    return ["name", "city", "country", "favorite_sport"];
  }
}

export { User };

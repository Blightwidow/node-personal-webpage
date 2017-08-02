import * as Interface from "../interfaces";
import * as Entity from "../entities";

export class UserRepository implements Interface.UserRepository {
  private readonly _store: Array<Entity.User> = [
    {
      id: 0,
      firstName: "theo",
      lastName: "dammaretz",
      dateOfBirth: new Date("01-14-1993"),
      position: "Web and Software engineer",
      contactInfos: [
        new Entity.ContactPoint(Entity.ContactPoint.Type.Email, "theo@dammaretz.fr"),
        new Entity.ContactPoint(Entity.ContactPoint.Type.Website, "https://www.linkedin.com/in/theodammaretz/"),
        new Entity.ContactPoint(Entity.ContactPoint.Type.Website, "https://github.com/Blightwidow"),
        new Entity.ContactPoint(Entity.ContactPoint.Type.Resume, "https://github.com/Blightwidow/latex-cv/raw/build/cv.pdf"),
      ],
      biography: [
        "I am a Software and Web engineer. I have a deep knowledge of both software programming (JAVA, C, C++, JavaScript) and web programming (PHP, HTML, CSS, JavaScript, Angular2, ServiceWorkers). I already accumulate 2 years of experience with a 1+ year in programming and an additional year researching in a laboratory.",
        "Until recently, I was developing both software and website for Le Courrier de Russie. I was in charge of maintaining and developing the journal's website in addition to develop the software frameworks for the journal publishing branch. I succeeded to increase SEO rankings, optimizing page speeds and develop Angular 2 applications. Previous experience includes software development work with Synergetik (France) and Full Electronic System (France) and research at Tohoku University.",
        "If you care for web and software performance and usability, we are alike.",
        "I have a Master Degree from the Grenoble Institute of technologies in Programming and Electronics of Embedded systems.",
      ]
    }
  ];

  public getById(id: number): Entity.User {
    for (let i = 0; i < this._store.length; i++) {
      const user = this._store[i];
      if (user.id === id) {
        return user;
      }
    }
    throw new Error(`Nonexisting user from userID ${id}`);
  }

  public getAll(): Array<Entity.User> {
    return this._store;
  }
}

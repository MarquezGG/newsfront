import myAvatar from "../../assets/my_avatar.jpg";
import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img src={myAvatar} alt="Author" className="about__image" />
        <div className="about__content">
          <h2 className="about__title">About the author</h2>
          <p className="about__text">
            My name is Eduard Petrosian and I'm a current software engineering
            student at TripleTen. I'm an aspiring software developer working on
            web applications to grow my skills in web development and
            JavaScript. I enjoy learning through practice, experimenting with
            ideas, and turning concepts into functional applications. This
            project is part of my ongoing learning journey.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;

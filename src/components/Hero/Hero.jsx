import Container from "../Container/Container.jsx";
import { SearchBox } from "../SearchBox/SearchBox.jsx";
import css from "./Hero.module.css";

const Hero = ({ setSearchQuery }) => {
  return (
    <section className={css.hero}>
      <Container>
        <div className={css.content}>
          <h1 className={css.title}>
            Plan, Cook, and <br />
            Share Your Flavors
          </h1>
          <SearchBox setSearch={setSearchQuery} />
        </div>
      </Container>
    </section>
  );
};

export default Hero;

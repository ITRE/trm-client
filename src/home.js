import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <main className="wrapper">
        <header>
          <picture className="lozad banner" data-iesrc="assets/banner-holder.png" data-alt="Placeholder Image for the TRM Banner">
            <source srcSet="assets/banner-holder.png" type="image/png" />
            <source srcSet="assets/banner-holder.webp" type="image/webp" />
          </picture>
        </header>
        <section className="splash">
          <h1>Some Kind of Title!</h1>
          <a className="button" href="/download">Download Now</a>
        </section>
        <section className="Content">
          <p>
            The Triangle Regional Model is a state of the practice travel demand model developed and maintained by the
            Travel Behavior Modeling Group and four stakeholder sponsors: NC Department of Transportation,
            Durham-Chapel Hill-Carrboro Metropolitan Planning Organization, Capital Area Metropolitan Planning Organization, and GoTriangle.
            The Triangle Regional Model is used to plan transportation investments in the Triangle region of North Carolina.
          </p>
        </section>
      </main>
    );
  }
}

export default Home;

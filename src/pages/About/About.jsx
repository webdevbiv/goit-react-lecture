import { NavLink, Outlet } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h2>About page</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum quasi
        totam eum modi iure facere corrupti accusamus saepe beatae maxime
        numquam, porro soluta distinctio? Deserunt laborum ut ad amet maxime!
        Soluta corrupti est, veritatis delectus inventore eos nemo odit ducimus,
        assumenda eligendi exercitationem, aperiam dolorem animi suscipit.
        Laudantium, asperiores. Ipsum aspernatur perferendis amet, pariatur
        aliquam laboriosam nam labore consequatur quos. Vel aspernatur
        architecto beatae provident natus perferendis doloremque rem maxime.
        Harum tenetur voluptatum recusandae et nihil doloribus veritatis
        incidunt ex temporibus cupiditate, natus maiores voluptates beatae dicta
        voluptas vero animi! Delectus nihil, deserunt quaerat ducimus blanditiis
        ut minus, corrupti inventore odio maxime eum non natus sapiente dolores
        temporibus voluptatem quis quisquam nesciunt hic. Ipsum impedit
        explicabo reprehenderit excepturi temporibus modi.
      </p>
      <nav>
        <NavLink to="aim">Aim</NavLink>
        <NavLink to="team">Team</NavLink>
        <NavLink to="history">History</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default About;

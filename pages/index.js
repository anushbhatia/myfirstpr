import React from "react";
import Link from "next/link";
import ProjectCard from '../components/Project';
function IndexPage(props) {
  return (
    <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">Your Contribution</h1>
      <ul>
        {props.blogs.map((blog, idx) => {
          return (
            <li key={idx}>
              <ProjectCard
                title={blog.name}
                href={`wwww.github.com/${blog.slug}`}
                description={blog.bio}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/contributors`, "utf-8");

  const blogs = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = `${process.cwd()}/contributors/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      const { data } = matter(rawContent);

      return { ...data, id: uuid() };
    });

  return {
    props: { blogs },
  };
}

export default IndexPage;

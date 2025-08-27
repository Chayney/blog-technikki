import Link from "next/link";
import { client } from "../libs/client";
import { GetStaticProps } from "next";
import { BlogProps } from "../types/blog";

// SSG
export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const data = await client.get({ endpoint: 'blog' });
  console.log(data);
  return {
    props: {
      blogs: data.contents
    }
  }
}

export default function Home({ blogs }: BlogProps) {
  return (
    <>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link href={`blog/${blog.id}`}>
            {blog.title}
          </Link>
        </li>
      ))}
    </>
  );
}

import Link from 'next/link';
import { client } from '../libs/client';
import { GetStaticProps } from 'next';
import { Props } from '../types/blog';
import { CategoryList } from '../shared/sidebar/category/components/category';
import styles from '../styles/list.module.css';
import Image from 'next/image';
import { Header } from '../shared/header/components/header';

// SSG
export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogData = await client.get({ endpoint: 'blog' });
  const categoryData = await client.get({ endpoint: 'category' });

  return {
    props: {
      blogs: blogData.contents,
      lists: categoryData.contents,
    }
  };
};

export default function Home({ blogs, lists }: Props) {
  return (
    <>
      <Header />
      <div className={styles.parentContainer}>
        <div className={styles.leftContainer}>
          {blogs.map((blog) => (
            <li className={styles.childContainer} key={blog.id}>
              <div className={styles.imageContainer}>
                <Image className={styles.contentImage}
                  src={blog.image.url}      
                  alt={blog.title}         
                  width={500}                
                  height={300}               
                  priority                   
                />
              </div>
              <div className={styles.titleContainer}>
                <Link href={`/blog/${blog.id}`}>
                  <h2 className={styles.contentTitle}>{blog.title}</h2>
                </Link>
              </div>
              <div className={styles.dateContainer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="6" x2="12" y2="12" />
                  <line x1="12" y1="12" x2="16" y2="14" />
                </svg>
                <span className={styles.date}>{ new Date(blog.updatedAt).toISOString().slice(0, 10) }</span>
              </div>
              <div className={styles.buttonContainer}>
                {blog.categories.map((cat) => (
                  <Link key={cat.id} href={`/blog/${blog.id}`}>
                      <button className={styles.button}>{cat.name}</button>
                  </Link>
                ))}
              </div>
              </li>
          ))}
        </div>
        <div className={styles.rightContainer}>
          <CategoryList categories={lists} /> {/* ← props渡す */}
        </div>
      </div>
    </>
  );
}

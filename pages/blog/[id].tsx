import { client } from "../../libs/client";
import { Blog } from "../../types/blog";
import { GetStaticPaths, GetStaticProps } from "next";
import { Header } from "../../shared/header/components/header";
import styles from '../../styles/content.module.css';
import Image from "next/image";

// SSG: パスの生成
export const getStaticPaths: GetStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog" });

    const paths = data.contents.map((content: Blog) => ({
        params: { id: content.id },
    }));

    return {
        paths,
        fallback: false,
    };
};

// SSG: 各記事のデータ取得
export const getStaticProps: GetStaticProps<{ blog: Blog }> = async (context) => {
    const id = context.params?.id as string;

    const data = await client.get({
        endpoint: "blog",
        contentId: id,
    });

    return {
        props: {
            blog: data,
        },
    };
};

export default function BlogId({ blog }: { blog: Blog }) {
    return (
        <>
            <Header />
            <main className={styles.parentContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={blog.image.url}
                            alt={`画像: ${blog.title}`}
                            width={blog.image.width}
                            height={blog.image.height}
                            className={styles.contentImage}
                            unoptimized
                            priority
                        />
                    </div>
                    <h1 className={styles.contentTitle}>{blog.title}</h1>
                    <p>{new Date(blog.updatedAt).toISOString().slice(0, 10)}</p>
                    <div className={`${styles.richContent}`} dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.dummy}></div>
                </div>
            </main>
        </>
    );
}

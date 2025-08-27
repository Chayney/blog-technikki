import { client } from "@/libs/client";
import { Blog } from "../../types/blog";
import { GetStaticPaths, GetStaticProps } from "next";

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
        <main>
            <h1>{blog.title}</h1>
            <p>{blog.publishedAt}</p>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </main>
    );
}

import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { client } from '../../libs/client';
import { CategoryPageProps } from '../../types/blog';
import { Category } from '../../shared/sidebar/category/types/category';

// 静的生成するパス一覧を取得
export const getStaticPaths: GetStaticPaths = async () => {
    const categoryData = await client.get({ endpoint: 'category' });

    const paths = categoryData.contents.map((cat: Category) => ({
        params: { id: cat.id },
    }));

    return {
        paths,
        fallback: false, // ※存在しないIDは404になる
    };
};

// 各カテゴリページに必要なデータを取得
export const getStaticProps: GetStaticProps = async (context) => {
    const categoryId = context.params?.id;

    if (typeof categoryId !== 'string') {
        return { notFound: true };
    }

    // カテゴリ情報取得（カテゴリ名など）
    const categoryData = await client.get({ endpoint: 'category', contentId: categoryId });

    // カテゴリに属するブログ一覧取得
    const blogData = await client.get({
        endpoint: 'blog',
        queries: {
            filters: `category[contains]${categoryId}`,
        },
    });

    return {
        props: {
            category: categoryData,
            blogs: blogData.contents,
        },
    };
};

// カテゴリページ本体
export default function CategoryPage({ category, blogs }: CategoryPageProps) {
    return (
        <div>
            <h1>カテゴリ: {category.name}</h1>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link href={`/blog/${blog.id}`}>
                            {blog.title}
                        </Link>
                    </li>
                ))}
            </ul>
            {blogs.length === 0 && <p>このカテゴリには記事がありません。</p>}
        </div>
    );
}

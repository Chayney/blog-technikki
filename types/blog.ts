type Category = {
    id: string,
    name: string
}

type Image = {
    url: string,
    height: number,
    width: number
}

type Blog = {
    id: string,
    title: string,
    image: Image,
    content: string,
    categories: Category[],
    publishedAt: string,
    updatedAt: string
};

export type BlogProps = {
    blogs: Blog[]
};

export type Props = BlogProps & {
    lists: Category[]
};

export type CategoryPageProps = BlogProps & {
    category: Category;
};

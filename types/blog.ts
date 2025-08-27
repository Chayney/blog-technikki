export type Blog = {
    id: string,
    title: string,
    content: string,
    category: string,
    publishedAt: string,
    updatedAt: string
};

export type BlogProps = {
    blogs: Blog[]
}
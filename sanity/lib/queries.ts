import {defineQuery} from "groq";

export const Startup_Query =
    defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
    _id, 
    title, 
    slug,
    _createdAt,
    author -> {
        _id, name, image, bio
    }, 
    views,
    description,
    category,
    image,
    }`);

export const Startup_By_Id_Query =
    defineQuery(`*[_type == "startup" && _id == $id][0]{
    _id, 
    title, 
    slug,
    _createdAt,
    author -> {
    _id, name, username, image, bio
    }, 
    views,
    description,
    category,
    image,
    pitch,
}`);

export const Startup_Views_Query = defineQuery(`
    *[_type == "startup" && _id == $id][0]{
        _id, views
    }
`);


export const Author_By_Github_Id_Query = defineQuery(`
    *[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
`);

export const Startup_By_Author_Query =
    defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
    _id, 
    title, 
    slug,
    _createdAt,
    author -> {
        _id, name, image, bio
    }, 
    views,
    description,
    category,
    image,
}`);

export const Author_By_Id_Query = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
}`);


export const Playlist_By_Slug_Query =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
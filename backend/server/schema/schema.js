const User = require('../models/user')
const Post = require('../models/post')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');



const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        brand: {type: GraphQLString},
        yearProduced: {type: GraphQLString},
        description: {type: GraphQLString },
        condition: {type: GraphQLString },
        favorites: {type: GraphQLInt},
        user: {
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId);
            },
        },
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        dateCreated: {type: GraphQLString},
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return Post.find();
            },
        },
        post: {
            type: PostType,
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                return Post.findById(args.id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent,args){
                return User.find();
            },
        },
        user: {
            type: UserType,
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                return User.findById(args.id);
            },
        },
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args : {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
                dateCreated: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                const user = new User({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    dateCreated: args.dateCreated,
                });

                return user.save();
            }
        },
        deleteUser: {
            type: UserType,
            args : {
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return User.findOneAndDelete(args.id);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
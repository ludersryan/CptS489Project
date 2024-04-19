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
    GraphQLEnumType,
    GraphQLFloat,
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
        price: {type: GraphQLFloat},
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
        searchPosts: {
            type: new GraphQLList(PostType),
            args: {
                name: {type: GraphQLString},
                brand: {type: GraphQLString},
                condition: {type: GraphQLString},
                price: {type: GraphQLFloat},
                yearProduced: {type: GraphQLString},
            },
            resolve(parent, args){
                return Post.find(args);
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
        // user queries
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

        // post queries
        addPost: {
            type: PostType,
            args : {
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type:GraphQLString},
                brand: {type: new GraphQLNonNull(GraphQLString)},
                yearProduced: {type: GraphQLString},
                price: {type: new GraphQLNonNull(GraphQLFloat)},
                favorites: {
                    type: GraphQLInt,
                    defaultValue: 0
                },
                condition: {
                    type: new GraphQLEnumType({
                        name: 'PostCondition',
                        values :{
                            'Mint': {value: 'Mint'},
                            'Excellent': {value: 'Excellent'},
                            'Good': {value: 'Good'},
                            'Fair': {value: 'Fair'},
                            'Poor': {value: 'Poor'},
                            'Parts': {value: 'For parts or not working'},
                        }
                    }),
                    defaultValue: 'None',
                },
                userId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                const post = new Post({
                    name: args.name,
                    description: args.description,
                    brand: args.brand,
                    yearProduced: args.yearProduced,
                    favorites: args.favorites || 0,
                    condition: args.condition,
                    userId: args.userId,
                });
                return post.save();
            },
        },
        deletePost: {
            type: PostType,
            args : {
                id : {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Post.findByIdAndDelete(args.id)
            },

        },
        updatePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                brand: {type: GraphQLString},
                yearProduced: {type: GraphQLString},
                description: {type: GraphQLString},
                price: {type: GraphQLFloat},
                favorites: {type: GraphQLInt},
                condition: {
                    type: new GraphQLEnumType({
                        name: 'PostConditionUpdate',
                        values :{
                            'Mint': {value: 'Mint'},
                            'Excellent': {value: 'Excellent'},
                            'Good': {value: 'Good'},
                            'Fair': {value: 'Fair'},
                            'Poor': {value: 'Poor'},
                            'Parts': {value: 'For parts or not working'},
                        }
                    }),
                },
            },
            resolve(parent,args){
                return Post.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            condition: args.condition,

                        },
                    },
                    { new : true }
                );
            }
        }
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { generateToken } from '../helpers/jwt.js'
import loginResolver from '../resolvers/loginResolver.js'
import signUpResolver from '../resolvers/signUpResolver.js'
import { addPostResolver, updatePostResolver } from '../resolvers/postResolver.js'
import { updateUserResolver } from '../resolvers/updateUserResolver.js'

import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLFloat,
} from 'graphql';
import { token } from 'morgan'



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

const LoginResponseType = new GraphQLObjectType({
    name: 'LoginResponse',
    fields: {
        token: {type: GraphQLString},
        id: {type: GraphQLID},
    },
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
        login: {
            type: LoginResponseType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: loginResolver,
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
                dateCreated: {type: GraphQLString},
            },
            resolve: signUpResolver,
        },
        updateUser: {
            type: UserType,
            args : {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                dateCreated: {type: GraphQLString},
            },
            resolve: updateUserResolver,
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
                    defaultValue: 'N/A',
                },
                userId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve : addPostResolver,
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
            resolve: updatePostResolver,
        }
    },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation
});
import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import WishList from '../models/wishlist.model.js'
import loginResolver from '../resolvers/loginResolver.js'
import signUpResolver from '../resolvers/signUpResolver.js'
import { addPostResolver, updatePostResolver, searchPostsResolver } from '../resolvers/postResolver.js'
import updateUserResolver from '../resolvers/updateUserResolver.js'
import { addToWishListResolver, removeFromWishListResolver } from '../resolvers/wishListResolver.js'

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
        totalListings: {type: GraphQLInt},
        itemsSold: {type: GraphQLInt},
        itemsBought: {type: GraphQLInt},
        avgRating: {type: GraphQLFloat},
        aboutMe: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return Post.find({userId: parent.id});
            },
        },

    }),
});

const LoginResponseType = new GraphQLObjectType({
    name: 'LoginResponse',
    fields: {
        token: {type: GraphQLString},
        id: {type: GraphQLID},
    },
});

const WishListType = new GraphQLObjectType({
    name: 'WishList',
    fields: () => ({
        postId: {type: GraphQLID},
        userId: {type: GraphQLID},
        dateAdded: {type: GraphQLString},
    }),
});

const PostConditionEnum = new GraphQLEnumType({
    name: 'PostCondition',
    values :{
        'Mint': {value: 'Mint'},
        'Excellent': {value: 'Excellent'},
        'Good': {value: 'Good'},
        'Fair': {value: 'Fair'},
        'Poor': {value: 'Poor'},
        'Parts': {value: 'For parts or not working'},
        'None': {value: 'None'},
    }
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
            resolve: searchPostsResolver,
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
        // return all posts in a user's wishlist
        wishList: {
            type: new GraphQLList(PostType),
            args: {userId: {type: GraphQLID}},
            async resolve(parent, args){
                try{
                    const wishList = await WishList.find({ userId: args.userId })
                    .populate('postId')
                    .exec();
                    return wishList.map((wishList => wishList.postId));
                } catch(err){
                    throw new Error('Failed to retrieve wishlist: ' + err.message);
                }
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
                dateCreated: {type: GraphQLString},
                totalListings: {type: GraphQLInt},
                itemsSold: {type: GraphQLInt},
                itemsBought: {type: GraphQLInt},
                avgRating: {type: GraphQLFloat},
                aboutMe: {type: GraphQLString},
            },
            resolve: signUpResolver,
        },
        login: {
            type: LoginResponseType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: loginResolver,
        },
        updateUser: {
            type: UserType,
            args : {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                dateCreated: {type: GraphQLString},
                totalListings: {type: GraphQLInt},
                itemsSold: {type: GraphQLInt},
                itemsBought: {type: GraphQLInt},
                avgRating: {type: GraphQLFloat},
                aboutMe: {type: GraphQLString},
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
                    type: PostConditionEnum,
                    defaultValue: 'None'
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
                    type: PostConditionEnum,
                    defaultValue: 'None'
                },
            },
            resolve: updatePostResolver,
        },
        // wishlist queries
        addToWishList: {
            type: WishListType,
            args : {
                userId: {type: new GraphQLNonNull(GraphQLID)},
                postId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: addToWishListResolver,
        },
        removeFromWishList: {
            type: WishListType,
            args : {
                userId: {type: new GraphQLNonNull(GraphQLID)},
                postId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: removeFromWishListResolver,
        },
    },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation
});
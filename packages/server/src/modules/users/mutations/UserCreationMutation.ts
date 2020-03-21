import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import User from '../UserModel';
import { load } from '../UserLoader';
import { UserConnection } from '../../rootType';
import hashPassword from '../../../util/hashPassword';

import Queue from '../../../util/queue';
import RegisteredEmail from '../../../jobs/RegisteredEmail';

interface userArguments {
  username: string;
  password: string;
  email: string;
}

const mutation = mutationWithClientMutationId({
  name: 'createUser',
  inputFields: {
    username: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: userArguments) => {
    const { username, email, password } = args;

    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (emailExists) {
      throw new Error('Email already in use');
    }
    if (usernameExists) {
      throw new Error('Username already in use');
    }

    const hashed_pass = await hashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashed_pass,
    });

    await Queue.add(RegisteredEmail.key, {
      newUser,
    });

    return {
      id: newUser._id,
      error: null,
    };
  },
  outputFields: {
    userEdge: {
      type: UserConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const newUser = await load(context, id);

        if (!newUser) return null;
        return {
          cursor: toGlobalId('User', newUser._id),
          node: newUser,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default {
  ...mutation,
};
